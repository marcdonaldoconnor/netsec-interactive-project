// localDict.js
function saveDict(key, dict) {
  if (typeof key !== 'string' || key === '') {
    console.error('[saveDict] key must be a non-empty string');
    return;
  }
  try {
    localStorage.setItem(key, JSON.stringify(dict));
  } catch (e) {
    console.warn('[saveDict] Failed to save:', e);
  }
}

function loadDict(key, defaultDict = {}) {
  if (typeof key !== 'string' || key === '') {
    console.error('[loadDict] key must be a non-empty string');
    return defaultDict;
  }
  try {
    const json = localStorage.getItem(key);
    return json === null ? defaultDict : JSON.parse(json);
  } catch (e) {
    console.warn('[loadDict] Corrupt data for key', key);
    return defaultDict;
  }
}

function updateDict(key, updates) {
  if (typeof key !== 'string' || key === '') {
    console.error('[updateDict] key must be a non-empty string');
    return {};
  }
  if (!updates || typeof updates !== 'object') {
    console.warn('[updateDict] updates must be a plain object');
    return loadDict(key);
  }
  const current = loadDict(key, {});
  const merged = { ...current, ...updates };
  saveDict(key, merged);
  return merged;
}