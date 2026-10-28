import {firebaseConfig as config} from './firebase-config.mjs';
import {createRemoteJWKSet,jwtVerify} from 'jose';
import {passwordHash} from './auth.mjs';
const keys=createRemoteJWKSet(new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'));
export async function firebaseCall(action,body,fetcher=fetch){let r=await fetcher('https://identitytoolkit.googleapis.com/v1/accounts:'+action+'?key='+config.apiKey,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});let x=await r.json();if(!r.ok){const code=x.error?.message?.split(' : ')[0]||'AUTH_UNAVAILABLE';let error=new Error(friendly(code));error.code=code;throw error;}return x;}
export function friendly(code){return ({EMAIL_EXISTS:'This email already has an account. Sign in or reset your password.',INVALID_LOGIN_CREDENTIALS:'Email or password is incorrect.',EMAIL_NOT_FOUND:'Email or password is incorrect.',INVALID_PASSWORD:'Email or password is incorrect.',TOO_MANY_ATTEMPTS_TRY_LATER:'Too many attempts. Wait before trying again.',OPERATION_NOT_ALLOWED:'Email sign-in is not enabled yet.',INVALID_OOB_CODE:'This link is invalid or already used. Request a new one.',EXPIRED_OOB_CODE:'This link has expired. Request a new one.',USER_DISABLED:'This account is disabled.',TOKEN_EXPIRED:'Your session expired. Sign in again.'})[code]||'Authentication could not finish. Please try again.';}
export async function verifyFirebase(token,keyset=keys){const {payload}=await jwtVerify(token,keyset,{issuer:'https://securetoken.google.com/'+config.projectId,audience:config.projectId,algorithms:['RS256']});if(!payload.sub||payload.sub.length>128)throw Error('Invalid account token.');return payload;}
export async function resolveFirebaseSession(data,env,{verify=verifyFirebase,call=firebaseCall,fetcher=fetch}={}){try{let token=data.idToken;let payload;try{payload=await verify(token)}catch(e){if(e.code!=='ERR_JWT_EXPIRED')return false;const r=await fetcher('https://securetoken.googleapis.com/v1/token?key='+config.apiKey,{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'refresh_token',refresh_token:data.refreshToken})});if(!r.ok)return false;const x=await r.json();token=x.id_token;payload=await verify(token);data.idToken=token;data.refreshToken=x.refresh_token;}
const info=await call('lookup',{idToken:token});const u=info.users?.[0];if(!u||u.disabled||!u.emailVerified||payload.sub!==data.uid||Number(u.validSince||0)>data.authTime)return false;if(await env.STORE.get('principal:'+data.principal)!=='firebase-uid:'+data.uid)return false;return data.principal;}catch{return false}}
export async function loginFirebase(body,env,{signup=false,verify=verifyFirebase,call=firebaseCall}={}){let email=String(body.email||'').trim().toLowerCase(),password=String(body.password||'');if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw Error('Enter a valid email address.');if(password.length<12||password.length>200)throw Error('Use a password of 12 to 200 characters.');const digest=async s=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))].map(x=>x.toString(16).padStart(2,'0')).join('');const userKey='user-email:'+await digest(email);let legacyRaw=await env.STORE.get(userKey),legacy=legacyRaw?JSON.parse(legacyRaw):null;
if(signup&&legacy&&!legacy.firebaseUid)throw Error('This email has an existing beta account. Sign in with its current password to keep your recordings.');let result;try{result=await call(signup?'signUp':'signInWithPassword',{email,password,returnSecureToken:true})}catch(err){if(!signup&&legacy&&!legacy.firebaseUid&&['INVALID_LOGIN_CREDENTIALS','EMAIL_NOT_FOUND'].includes(err.code)&&await passwordHash(password,legacy.salt)===legacy.passwordHash)result=await call('signUp',{email,password,returnSecureToken:true});else throw err;}
if(signup&&String(body.name||'').trim()){await call('update',{idToken:result.idToken,displayName:String(body.name).trim().slice(0,100)});}
const payload=await verify(result.idToken);let info=await call('lookup',{idToken:result.idToken});let user=info.users?.[0];if(!user)throw Error('Could not validate this account.');let principal=await env.STORE.get('firebase-uid:'+payload.sub);if(!principal){if(legacy){if(legacy.firebaseUid&&legacy.firebaseUid!==payload.sub)throw Error('Account identity mismatch.');if(!legacy.firebaseUid&&await passwordHash(password,legacy.salt)!==legacy.passwordHash)throw Error('Use your original beta password to link and preserve your existing recordings.');principal=legacy.id;legacy.firebaseUid=payload.sub;await env.STORE.put(userKey,JSON.stringify(legacy));}else principal=crypto.randomUUID();await env.STORE.put('firebase-uid:'+payload.sub,principal);await env.STORE.put('principal:'+principal,'firebase-uid:'+payload.sub);}
await env.STORE.put('firebase-profile:'+payload.sub,JSON.stringify({email,userKey:legacy?userKey:null}));
const pending={idToken:result.idToken,refreshToken:result.refreshToken,uid:payload.sub,principal,authTime:payload.auth_time,email};if(!user.emailVerified){const pendingToken=crypto.randomUUID()+crypto.randomUUID();await env.STORE.put('auth-pending:'+pendingToken,JSON.stringify(pending),{expirationTtl:3600});let sent=false,sendError=false;if(signup){try{await call('sendOobCode',{requestType:'VERIFY_EMAIL',idToken:result.idToken});sent=true;}catch{sendError=true;}}return {pendingToken,verified:false,email,sent,sendError};}return {verified:true,data:pending};}

export async function deleteFirebaseIdentity(req,store,principal){
 const cookie=(req.headers.get('cookie')||'').match(/studio_session=([^;]+)/)?.[1];
 const bearer=req.headers.get('authorization')?.replace(/^Bearer /,'');
 const digest=async s=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))].map(x=>x.toString(16).padStart(2,'0')).join('');
 const raw=cookie?await store.get('session:'+cookie):bearer?await store.get('device:'+await digest(bearer)):null;
 if(!raw?.startsWith('{'))return;
 const data=JSON.parse(raw);if(data.principal!==principal||!await resolveFirebaseSession(data,{STORE:store}))throw Error('Sign in again before deleting your account.');
 try{await firebaseCall('delete',{idToken:data.idToken});}catch{throw Error('Sign in again, then retry account deletion. No recordings have been deleted.');}
 const profile=JSON.parse(await store.get('firebase-profile:'+data.uid)||'null');
 if(profile?.userKey){const legacy=JSON.parse(await store.get(profile.userKey)||'null');if(legacy?.id===principal)await store.delete(profile.userKey);}
 await store.delete('firebase-uid:'+data.uid);await store.delete('firebase-profile:'+data.uid);
}

export async function loginGoogle(body,env,{verify=verifyFirebase,call=firebaseCall}={}){
 const original=await verify(String(body.idToken||''));
 if(original.firebase?.sign_in_provider!=='google.com'||!original.email_verified)throw Error('A verified Google sign-in is required.');
 const info=await call('lookup',{idToken:body.idToken});const user=info.users?.[0];
 if(!user||user.disabled||!user.emailVerified||user.localId!==original.sub)throw Error('Google identity could not be validated.');
 const email=String(user.email||'').toLowerCase();
 const digest=async s=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))].map(x=>x.toString(16).padStart(2,'0')).join('');
 const userKey='user-email:'+await digest(email);const raw=await env.STORE.get(userKey),legacy=raw?JSON.parse(raw):null;
 let principal=await env.STORE.get('firebase-uid:'+original.sub);
 if(legacy&&!legacy.firebaseUid){if(!body.legacyPassword)return {needsLegacyPassword:true};if(await passwordHash(String(body.legacyPassword),legacy.salt)!==legacy.passwordHash)throw Error('Original beta password is incorrect. Your existing recordings have not changed.');}
 if(legacy?.firebaseUid&&legacy.firebaseUid!==original.sub)throw Error('Account identity mismatch. Sign in using the original method.');
 const exchanged=await call('signInWithIdp',{postBody:new URLSearchParams({id_token:String(body.googleIdToken||''),providerId:'google.com'}).toString(),requestUri:'https://'+config.authDomain,returnSecureToken:true});
 const payload=await verify(exchanged.idToken);if(payload.sub!==original.sub)throw Error('Google identity mismatch.');
 if(!principal){principal=legacy?.id||crypto.randomUUID();if(legacy&&!legacy.firebaseUid){await call('update',{idToken:exchanged.idToken,password:String(body.legacyPassword)});legacy.firebaseUid=payload.sub;await env.STORE.put(userKey,JSON.stringify(legacy));}await env.STORE.put('firebase-uid:'+payload.sub,principal);await env.STORE.put('principal:'+principal,'firebase-uid:'+payload.sub);}
 await env.STORE.put('firebase-profile:'+payload.sub,JSON.stringify({email,name:user.displayName||'',userKey:legacy?userKey:null}));
 return {verified:true,data:{idToken:exchanged.idToken,refreshToken:exchanged.refreshToken,uid:payload.sub,principal,authTime:payload.auth_time,email}};
}
