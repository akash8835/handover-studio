import test from 'node:test';import assert from 'node:assert/strict';
import {buildIndex,sanitizeEvents,searchIndex,secondsLabel} from '../src/timeline.mjs';
const events=[{type:4,timestamp:1000,data:{href:'https://example.test/settings'}},{type:2,timestamp:1000,data:{node:{type:0,id:1,childNodes:[{type:2,id:2,tagName:'div',attributes:{},childNodes:[{type:3,id:3,textContent:'Billing settings'},{type:2,id:4,tagName:'input',attributes:{value:'private'}}]}]}}},{type:3,timestamp:2000,data:{source:0,texts:[{id:3,value:'Sensitive company'}],attributes:[],adds:[]}}];
test('indexes DOM text and navigation with timestamp',()=>{let a=buildIndex(events);assert(a.some(x=>x.text.includes('Billing settings')));assert(a.some(x=>x.sec===1));});
test('redaction removes selected text and later updates',()=>{let a=sanitizeEvents(events,[3]);let s=JSON.stringify(a);assert(!s.includes('Billing settings'));assert(!s.includes('Sensitive company'));assert(!s.includes('private'));assert(s.includes('[Redacted]'));});
test('redaction removes descendant values',()=>{let a=sanitizeEvents(events,[2]);assert(!JSON.stringify(a).includes('Billing'));});
test('search never invents missing evidence',()=>{assert.equal(searchIndex(buildIndex(events),'unknown spaceship').length,0);assert(searchIndex(buildIndex(events),'billing').length>0)});
test('formats timestamps',()=>assert.equal(secondsLabel(125),'2:05'));
