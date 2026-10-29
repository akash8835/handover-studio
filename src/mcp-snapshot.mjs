// Explicit owner selection is required by the caller. This function never discovers other recordings.
export function createSnapshot(selected, {now = Date.now(), expiresAt, maxRecordings = 10} = {}) {
 if (!Array.isArray(selected) || !selected.length || selected.length > maxRecordings) throw Error('Select 1 to 10 recordings.');
 if (!Number.isFinite(expiresAt) || expiresAt <= now || expiresAt > now + 7 * 86400000) throw Error('Choose an expiry within 7 days.');
 const seen = new Set();
 const recordings = selected.map(({recording, evidence}) => {
  if (!recording || typeof recording.id !== 'string' || seen.has(recording.id)) throw Error('Invalid recording selection.');
  seen.add(recording.id);
  if (recording.videoEdit) throw Error('Edited video evidence must be rebuilt before coding-agent access.');
  if (!Array.isArray(evidence) || evidence.length > 500) throw Error('Recording evidence is unavailable or too large.');
  // Accept only evidence already sanitized by the recording index. Never copy arbitrary record fields.
  return {id: recording.id, title: String(recording.title || 'Untitled').slice(0,160), duration: Math.max(0,Number(recording.duration)||0), evidence: evidence.filter(e => e.type !== 'note').map(e => {
   if (!Number.isFinite(e.sec) || e.sec < 0 || typeof e.text !== 'string') throw Error('Invalid sanitized evidence.');
   return {sec:e.sec,text:e.text.slice(0,2500),type:String(e.type||'captured').slice(0,30)};
  })};
 });
 const snapshot = {version:1,createdAt:now,expiresAt,recordings};
 if (JSON.stringify(snapshot).length > 150000) throw Error('Selected evidence exceeds the access snapshot limit. Select fewer recordings.');
 return snapshot;
}
