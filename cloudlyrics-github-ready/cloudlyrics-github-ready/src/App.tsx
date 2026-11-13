import React, { useState, useEffect, useRef, useCallback } from 'react';

// ==========================================
// INLINE SVG ICONS (Self-contained & reliable)
// ==========================================
const Icon = {
  Play: () => <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>,
  Pause: () => <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>,
  Undo: () => <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a5 5 0 015 5v2M3 10l6-6M3 10l6 6"/></svg>,
  Redo: () => <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 10H11a5 5 0 00-5 5v2M21 10l-6-6m6 6l-6 6"/></svg>,
  Music: () => <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12 0c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/></svg>,
  Mic: () => <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"/></svg>,
  Image: () => <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21"/></svg>,
  Type: () => <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>,
  Sparkles: () => <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>,
  Download: () => <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>,
  Save: () => <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V3"/></svg>,
  Plus: () => <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Trash: () => <svg className="w-3.5 h-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path strokeLinecap="round" strokeLinejoin="round" d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>,
  Folder: () => <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>,
  Volume: () => <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>,
  Mute: () => <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>,
  Table: () => <svg className="w-3.5 h-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>,
  Ratio916: () => <svg className="w-3.5 h-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="2"/></svg>,
  Ratio169: () => <svg className="w-3.5 h-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/></svg>,
  Ratio11: () => <svg className="w-3.5 h-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>,
  ZoomIn: () => <svg className="w-3.5 h-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>,
  ZoomOut: () => <svg className="w-3.5 h-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>,
  SkipBack: () => <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/></svg>,
  Smartphone: () => <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
  Monitor: () => <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
};

// ==========================================
// PRESET BACKGROUND DEFINITIONS & PALETTES (14 CINEMATIC PRESETS)
// ==========================================
const BACKGROUND_PRESETS = [
  { id: 'dreamy_blue', name: 'Dreamy Blue Clouds', color1: '#0B192C', color2: '#1E3E62', color3: '#3B6790', accent: '#7FA1C3' },
  { id: 'purple_ethereal', name: 'Purple Ethereal Sky', color1: '#12072B', color2: '#2E1460', color3: '#5B2A9D', accent: '#C084FC' },
  { id: 'pink_sunset', name: 'Pink Sunset Clouds', color1: '#23091E', color2: '#5E1B42', color3: '#B84A62', accent: '#FDA4AF' },
  { id: 'dark_storm', name: 'Dark Storm Atmosphere', color1: '#07090E', color2: '#141A26', color3: '#263147', accent: '#64748B' },
  { id: 'midnight_moon', name: 'Midnight Moon', color1: '#040611', color2: '#0D173A', color3: '#1D2F6F', accent: '#E2E8F0' },
  { id: 'golden_sunrise', name: 'Golden Sunrise', color1: '#211203', color2: '#593309', color3: '#A86418', accent: '#FDE047' },
  { id: 'rainy_window', name: 'Rainy Window', color1: '#090D14', color2: '#131C2B', color3: '#1E2B3C', accent: '#38BDF8' },
  { id: 'starry_night', name: 'Starry Night', color1: '#02040A', color2: '#0B1124', color3: '#1A1842', accent: '#A5B4FC' },
  { id: 'aurora_borealis', name: 'Aurora Borealis', color1: '#021014', color2: '#063B3A', color3: '#107869', accent: '#34D399' },
  { id: 'cyberpunk_neon', name: 'Cyberpunk Neon Grid', color1: '#090214', color2: '#280647', color3: '#700B60', accent: '#F43F5E' },
  { id: 'velvet_crimson', name: 'Velvet Crimson Opera', color1: '#140307', color2: '#3B0813', color3: '#7F1124', accent: '#FB7185' },
  { id: 'lofi_dusk', name: 'Lo-Fi Warm Dusk', color1: '#181024', color2: '#3E2647', color3: '#874C62', accent: '#FDBA74' },
  { id: 'deep_ocean', name: 'Deep Ocean Biolum', color1: '#010B14', color2: '#04243D', color3: '#094E78', accent: '#22D3EE' },
  { id: 'solar_eclipse', name: 'Solar Corona Eclipse', color1: '#050507', color2: '#1C140D', color3: '#4D2F12', accent: '#F59E0B' }
];

// Curated fonts available for typography studio (14 Bundled Fonts + Custom Upload)
const DEFAULT_FONTS = [
  { name: 'Montserrat (Cinema Bold)', family: '"Montserrat", sans-serif' },
  { name: 'Plus Jakarta Sans (Apple Studio)', family: '"Plus Jakarta Sans", sans-serif' },
  { name: 'Syne (Avant-Garde Art)', family: '"Syne", sans-serif' },
  { name: 'Bebas Neue (Headline Impact)', family: '"Bebas Neue", sans-serif' },
  { name: 'Space Grotesk (Modern Kinetic)', family: '"Space Grotesk", sans-serif' },
  { name: 'Playfair Display (Editorial Serif)', family: '"Playfair Display", serif' },
  { name: 'Cormorant Garamond (Luxury Lyric)', family: '"Cormorant Garamond", serif' },
  { name: 'Cinzel (Epic Film)', family: '"Cinzel", serif' },
  { name: 'Poppins (Geometric Studio)', family: '"Poppins", sans-serif' },
  { name: 'Oswald (Tall Impact)', family: '"Oswald", sans-serif' },
  { name: 'Pacifico (Retro Brush)', family: '"Pacifico", cursive' },
  { name: 'Caveat (Handwritten Lyric)', family: '"Caveat", cursive' },
  { name: 'Inter (Modern Clean)', family: '"Inter", sans-serif' },
  { name: 'JetBrains Mono (Minimal Tech)', family: '"JetBrains Mono", monospace' }
];

const ANIMATIONS = [
  { id: 'fade', name: 'Fade In / Fade Out', desc: 'Smooth alpha opacity transition' },
  { id: 'slide_up', name: 'Slide Up', desc: 'Rises smoothly from below with fade' },
  { id: 'word_reveal', name: 'Word Reveal', desc: 'Words illuminate progressively across line' },
  { id: 'letter_reveal', name: 'Letter Reveal', desc: 'Characters fade & rise sequentially' },
  { id: 'typewriter', name: 'Typewriter', desc: 'Crisp terminal-style character reveal' },
  { id: 'zoom', name: 'Soft Zoom', desc: 'Cinematic scale expansion' },
  { id: 'float', name: 'Smooth Floating', desc: 'Weightless sine-wave drift' },
  { id: 'blur', name: 'Blur to Sharp', desc: 'Rack-focus lens transition' },
  { id: 'glow', name: 'Cinematic Glow', desc: 'Breathing neon halo bloom' },
  { id: 'static', name: 'Minimal Static', desc: 'Instant cut without motion' },
  { id: 'custom_keyframes', name: '★ Custom Keyframe Motion', desc: 'User-designed keyframe timeline with X/Y, Scale, Rotation, Opacity & Easing' }
];

const EASING_FUNCTIONS = {
  linear: { name: 'Linear (Constant)', fn: (t) => t },
  easeOutCubic: { name: 'Ease Out Cubic (Smooth Deceleration)', fn: (t) => 1 - Math.pow(1 - t, 3) },
  easeInOutCubic: { name: 'Ease In-Out Cubic (Cinematic)', fn: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2 },
  backOutOvershoot: { name: 'Overshoot Pop (Dynamic Snap)', fn: (t) => { const c1 = 1.70158; const c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); } },
  elasticSpring: { name: 'Elastic Spring (Kinetic Bounce)', fn: (t) => t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1 }
};

const DEFAULT_CUSTOM_KEYFRAMES = [
  { id: 'kf_0', timePct: 0, offsetX: 0, offsetY: 45, scale: 0.75, rotation: -6, opacity: 0, blur: 10 },
  { id: 'kf_1', timePct: 20, offsetX: 0, offsetY: 0, scale: 1.0, rotation: 0, opacity: 1, blur: 0 },
  { id: 'kf_2', timePct: 82, offsetX: 0, offsetY: 0, scale: 1.02, rotation: 0, opacity: 1, blur: 0 },
  { id: 'kf_3', timePct: 100, offsetX: 0, offsetY: -35, scale: 0.9, rotation: 4, opacity: 0, blur: 8 }
];

const interpolateCustomKeyframes = (keyframes, progressPct, easingId = 'easeOutCubic') => {
  const sorted = [...(keyframes && keyframes.length >= 2 ? keyframes : DEFAULT_CUSTOM_KEYFRAMES)].sort((a, b) => a.timePct - b.timePct);
  if (progressPct <= sorted[0].timePct) return sorted[0];
  if (progressPct >= sorted[sorted.length - 1].timePct) return sorted[sorted.length - 1];

  let prev = sorted[0];
  let next = sorted[sorted.length - 1];
  for (let i = 0; i < sorted.length - 1; i++) {
    if (progressPct >= sorted[i].timePct && progressPct <= sorted[i + 1].timePct) {
      prev = sorted[i];
      next = sorted[i + 1];
      break;
    }
  }
  const span = Math.max(0.0001, next.timePct - prev.timePct);
  const rawT = Math.max(0, Math.min(1, (progressPct - prev.timePct) / span));
  const easeFn = EASING_FUNCTIONS[easingId]?.fn || EASING_FUNCTIONS.easeOutCubic.fn;
  const e = easeFn(rawT);

  return {
    offsetX: prev.offsetX + (next.offsetX - prev.offsetX) * e,
    offsetY: prev.offsetY + (next.offsetY - prev.offsetY) * e,
    scale: prev.scale + (next.scale - prev.scale) * e,
    rotation: prev.rotation + (next.rotation - prev.rotation) * e,
    opacity: Math.max(0, Math.min(1, prev.opacity + (next.opacity - prev.opacity) * rawT)),
    blur: Math.max(0, prev.blur + (next.blur - prev.blur) * rawT)
  };
};

// ==========================================
// PURE-JS STANDARD .ZIP ARCHIVE PACKAGER & READER (ZERO EXTERNAL DEPENDENCY)
// ==========================================
const crc32Table = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    table[i] = c >>> 0;
  }
  return table;
})();

const computeCRC32 = (bytes) => {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < bytes.length; i++) {
    crc = (crc >>> 8) ^ crc32Table[(crc ^ bytes[i]) & 0xFF];
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
};

const createZipArchiveBlob = (files) => {
  const encoder = new TextEncoder();
  const localChunks = [];
  const centralChunks = [];
  let offset = 0;

  files.forEach((f) => {
    const nameBytes = encoder.encode(f.path);
    const dataBytes = f.data instanceof Uint8Array ? f.data : new Uint8Array(f.data);
    const crc = computeCRC32(dataBytes);
    const size = dataBytes.byteLength;

    const lfh = new Uint8Array(30 + nameBytes.length);
    const lfv = new DataView(lfh.buffer);
    lfv.setUint32(0, 0x04034b50, true);
    lfv.setUint16(4, 20, true);
    lfv.setUint16(6, 0x0800, true);
    lfv.setUint16(8, 0, true);
    lfv.setUint16(10, 0, true);
    lfv.setUint16(12, 0, true);
    lfv.setUint32(14, crc, true);
    lfv.setUint32(18, size, true);
    lfv.setUint32(22, size, true);
    lfv.setUint16(26, nameBytes.length, true);
    lfv.setUint16(28, 0, true);
    lfh.set(nameBytes, 30);

    localChunks.push(lfh, dataBytes);

    const cdh = new Uint8Array(46 + nameBytes.length);
    const cdv = new DataView(cdh.buffer);
    cdv.setUint32(0, 0x02014b50, true);
    cdv.setUint16(4, 20, true);
    cdv.setUint16(6, 20, true);
    cdv.setUint16(8, 0x0800, true);
    cdv.setUint16(10, 0, true);
    cdv.setUint16(12, 0, true);
    cdv.setUint16(14, 0, true);
    cdv.setUint32(16, crc, true);
    cdv.setUint32(20, size, true);
    cdv.setUint32(24, size, true);
    cdv.setUint16(28, nameBytes.length, true);
    cdv.setUint16(30, 0, true);
    cdv.setUint16(32, 0, true);
    cdv.setUint16(34, 0, true);
    cdv.setUint16(36, 0, true);
    cdv.setUint32(38, 0, true);
    cdv.setUint32(42, offset, true);
    cdh.set(nameBytes, 46);

    centralChunks.push(cdh);
    offset += lfh.byteLength + size;
  });

  const cdSize = centralChunks.reduce((acc, c) => acc + c.byteLength, 0);
  const eocd = new Uint8Array(22);
  const eocdv = new DataView(eocd.buffer);
  eocdv.setUint32(0, 0x06054b50, true);
  eocdv.setUint16(4, 0, true);
  eocdv.setUint16(6, 0, true);
  eocdv.setUint16(8, files.length, true);
  eocdv.setUint16(10, files.length, true);
  eocdv.setUint32(12, cdSize, true);
  eocdv.setUint32(16, offset, true);
  eocdv.setUint16(20, 0, true);

  return new Blob([...localChunks, ...centralChunks, eocd], { type: 'application/zip' });
};

const parseZipArchiveBuffer = async (arrayBuffer) => {
  const bytes = new Uint8Array(arrayBuffer);
  const view = new DataView(arrayBuffer);
  const decoder = new TextDecoder();
  const extracted = {};

  let eocdOffset = -1;
  for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 65557); i--) {
    if (view.getUint32(i, true) === 0x06054b50) {
      eocdOffset = i;
      break;
    }
  }
  if (eocdOffset === -1) throw new Error('Invalid ZIP file: End of Central Directory not found.');

  const totalEntries = view.getUint16(eocdOffset + 10, true);
  let cdPtr = view.getUint32(eocdOffset + 16, true);

  for (let i = 0; i < totalEntries; i++) {
    if (view.getUint32(cdPtr, true) !== 0x02014b50) break;
    const compressionMethod = view.getUint16(cdPtr + 10, true);
    const compSize = view.getUint32(cdPtr + 20, true);
    const nameLen = view.getUint16(cdPtr + 28, true);
    const extraLen = view.getUint16(cdPtr + 30, true);
    const commentLen = view.getUint16(cdPtr + 32, true);
    const localHeaderOffset = view.getUint32(cdPtr + 42, true);

    const path = decoder.decode(bytes.subarray(cdPtr + 46, cdPtr + 46 + nameLen));
    const lfhNameLen = view.getUint16(localHeaderOffset + 26, true);
    const lfhExtraLen = view.getUint16(localHeaderOffset + 28, true);
    const dataStart = localHeaderOffset + 30 + lfhNameLen + lfhExtraLen;
    const rawSlice = bytes.subarray(dataStart, dataStart + compSize);

    if (compressionMethod === 0) {
      extracted[path] = rawSlice.slice();
    } else if (compressionMethod === 8 && typeof DecompressionStream !== 'undefined') {
      const ds = new DecompressionStream('deflate-raw');
      const writer = ds.writable.getWriter();
      writer.write(rawSlice);
      writer.close();
      const resp = new Response(ds.readable);
      extracted[path] = new Uint8Array(await resp.arrayBuffer());
    }
    cdPtr += 46 + nameLen + extraLen + commentLen;
  }
  return extracted;
};

const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return '00:00.00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 100);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
};

const extractPeaksFromAudioBuffer = (audioBuffer, numBars = 140) => {
  if (!audioBuffer) return new Array(numBars).fill(0.25);
  const channelData = audioBuffer.getChannelData(0);
  const step = Math.max(1, Math.floor(channelData.length / numBars));
  const peaks = [];
  for (let i = 0; i < numBars; i++) {
    let max = 0;
    const start = i * step;
    for (let j = 0; j < step && start + j < channelData.length; j += 12) {
      const val = Math.abs(channelData[start + j]);
      if (val > max) max = val;
    }
    peaks.push(Math.max(0.08, Math.min(1, max)));
  }
  return peaks;
};

// ==========================================
// INDEXED DB PERSISTENCE SERVICE
// ==========================================
const DB_NAME = 'CloudLyricsDB';
const DB_VERSION = 2;

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('projects')) {
        db.createObjectStore('projects', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('session_assets')) {
        db.createObjectStore('session_assets', { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = (e) => reject(e.target.error);
  });
};

const saveProjectToIDB = async (project) => {
  if (!project || !project.id) return;
  try {
    const db = await openDB();
    const tx = db.transaction('projects', 'readwrite');
    const store = tx.objectStore('projects');
    await new Promise((res, rej) => {
      const req = store.put(project);
      req.onsuccess = res;
      req.onerror = rej;
    });
  } catch (e) {
    console.error('Failed to save to IndexedDB:', e);
  }
};

const getAllProjectsFromIDB = async () => {
  try {
    const db = await openDB();
    const tx = db.transaction('projects', 'readonly');
    const store = tx.objectStore('projects');
    return new Promise((resolve, reject) => {
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    return [];
  }
};

const deleteProjectFromIDB = async (id) => {
  try {
    const db = await openDB();
    const tx = db.transaction('projects', 'readwrite');
    const store = tx.objectStore('projects');
    await new Promise((res, rej) => {
      const req = store.delete(id);
      req.onsuccess = res;
      req.onerror = rej;
    });
  } catch (e) {}
};

const cacheSessionAssetToIDB = async (id, blob, meta = {}) => {
  try {
    const db = await openDB();
    const tx = db.transaction('session_assets', 'readwrite');
    tx.objectStore('session_assets').put({ id, blob, meta, updatedAt: Date.now() });
  } catch (e) {}
};

const clearAllSessionAssetsFromIDB = async () => {
  try {
    const db = await openDB();
    const tx = db.transaction('session_assets', 'readwrite');
    tx.objectStore('session_assets').clear();
  } catch (e) {}
};

// ==========================================
// SHARED CANVAS 2D FRAME RENDER ENGINE
// ==========================================
const renderFrameToCanvas = (ctx, width, height, currentTime, project, mediaAssets = {}) => {
  const { background, typography, animation, lyrics, syncMode, showSafeArea } = project;

  ctx.save();
  ctx.clearRect(0, 0, width, height);

  // 1. DRAW BACKGROUND
  const customMedia = mediaAssets.bgVideoElement || mediaAssets.bgImageElement;
  if (background.type === 'custom' && customMedia) {
    ctx.save();
    ctx.globalAlpha = (background.opacity ?? 100) / 100;
    const blurPx = (background.blur || 0) * (width / 1000);
    if (blurPx > 0 || (background.brightness ?? 100) !== 100 || (background.contrast ?? 100) !== 100) {
      ctx.filter = `blur(${blurPx}px) brightness(${background.brightness ?? 100}%) contrast(${background.contrast ?? 100}%)`;
    }
    let scale = (background.scale || 100) / 100;
    let offsetX = (background.offsetX || 0) * (width / 100);
    let offsetY = (background.offsetY || 0) * (height / 100);

    if (background.motion === 'drift') {
      offsetX += Math.sin(currentTime * 0.5) * (width * 0.025);
      offsetY += Math.cos(currentTime * 0.35) * (height * 0.015);
    } else if (background.motion === 'zoom') {
      scale *= 1.05 + Math.sin(currentTime * 0.3) * 0.05;
    } else if (background.motion === 'pulse') {
      ctx.globalAlpha = ((background.opacity ?? 100) / 100) * (0.88 + Math.sin(currentTime * 2) * 0.12);
    }

    const mediaW = customMedia.videoWidth || customMedia.width || width;
    const mediaH = customMedia.videoHeight || customMedia.height || height;
    let dw = width * scale;
    let dh = height * scale;

    if (background.fitMode === 'cover') {
      const imgRatio = mediaW / mediaH;
      const canvasRatio = width / height;
      if (imgRatio > canvasRatio) {
        dh = height * scale;
        dw = dh * imgRatio;
      } else {
        dw = width * scale;
        dh = dw / imgRatio;
      }
    } else if (background.fitMode === 'contain') {
      const imgRatio = mediaW / mediaH;
      const canvasRatio = width / height;
      if (imgRatio > canvasRatio) {
        dw = width * scale;
        dh = dw / imgRatio;
      } else {
        dh = height * scale;
        dw = dh * imgRatio;
      }
    }
    const dx = (width - dw) / 2 + offsetX;
    const dy = (height - dh) / 2 + offsetY;
    ctx.drawImage(customMedia, dx, dy, dw, dh);
    ctx.restore();
  } else {
    const preset = BACKGROUND_PRESETS.find(p => p.id === background.presetId) || BACKGROUND_PRESETS[0];
    const c1 = background.type === 'gradient' ? (background.customColor1 || '#0F172A') : preset.color1;
    const c2 = background.type === 'gradient' ? (background.customColor2 || '#4C1D95') : preset.color2;
    const c3 = background.type === 'gradient' ? (background.customColor3 || '#831843') : preset.color3;
    const accentColor = background.type === 'gradient' ? (background.customColor2 || '#A855F7') : preset.accent;

    ctx.save();
    ctx.globalAlpha = (background.opacity ?? 100) / 100;
    const blurPx = (background.blur || 0) * (width / 1000);
    if (blurPx > 0 || (background.brightness ?? 100) !== 100 || (background.contrast ?? 100) !== 100) {
      ctx.filter = `blur(${blurPx}px) brightness(${background.brightness ?? 100}%) contrast(${background.contrast ?? 100}%)`;
    }

    const motionFactor = background.motion === 'none' ? 0 : 1;
    const t = currentTime * motionFactor;

    const grad = ctx.createLinearGradient(0, 0, width * 0.4, height);
    const tShift = Math.sin(t * 0.35) * 0.08;
    grad.addColorStop(0, c1);
    grad.addColorStop(Math.max(0.1, Math.min(0.9, 0.52 + tShift)), c2);
    grad.addColorStop(1, c3);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    if (background.type !== 'gradient') {
      if (preset.id === 'midnight_moon') {
        const moonX = width * 0.72 + Math.sin(t * 0.1) * 15;
        const moonY = height * 0.22;
        const moonR = Math.min(width, height) * 0.11;
        const halo = ctx.createRadialGradient(moonX, moonY, moonR * 0.2, moonX, moonY, moonR * 3.0);
        halo.addColorStop(0, 'rgba(241, 245, 249, 0.92)');
        halo.addColorStop(0.25, 'rgba(191, 219, 254, 0.3)');
        halo.addColorStop(1, 'rgba(30, 41, 93, 0)');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(moonX, moonY, moonR * 3.0, 0, Math.PI * 2);
        ctx.fill();
      } else if (preset.id === 'rainy_window') {
        ctx.strokeStyle = 'rgba(186, 230, 253, 0.22)';
        ctx.lineWidth = Math.max(1, width / 650);
        ctx.beginPath();
        for (let i = 0; i < 28; i++) {
          const rx = ((i * 97 + t * 40) % 100) / 100 * width;
          const ry = ((i * 53 + t * (380 + (i % 5) * 40)) % (height + 100)) - 50;
          ctx.moveTo(rx, ry);
          ctx.lineTo(rx - 4, ry + 34 * (height / 1000));
        }
        ctx.stroke();
      } else if (preset.id === 'starry_night') {
        for (let i = 0; i < 36; i++) {
          const sx = ((i * 137.5) % 100) / 100 * width;
          const sy = ((i * 293.3) % 100) / 100 * height;
          const twinkle = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(t * (1.5 + (i % 4)) + i));
          const sr = (1.2 + (i % 3)) * (width / 1000);
          ctx.fillStyle = `rgba(224, 231, 255, ${twinkle * 0.85})`;
          ctx.fillRect(sx, sy, sr * 1.6, sr * 1.6);
        }
      } else if (preset.id === 'cyberpunk_neon') {
        ctx.strokeStyle = 'rgba(244, 63, 94, 0.22)';
        ctx.lineWidth = Math.max(1, width / 600);
        const horizon = height * 0.62;
        ctx.beginPath();
        for (let i = -8; i <= 8; i++) {
          ctx.moveTo(width * 0.5 + i * (width * 0.04), horizon);
          ctx.lineTo(width * 0.5 + i * (width * 0.22), height);
        }
        for (let j = 0; j < 7; j++) {
          const prog = ((j / 7) + (t * 0.15) % (1 / 7));
          const yPos = horizon + Math.pow(prog, 1.8) * (height - horizon);
          ctx.moveTo(0, yPos);
          ctx.lineTo(width, yPos);
        }
        ctx.stroke();
      }
    }

    const numOrbs = 4;
    for (let i = 0; i < numOrbs; i++) {
      const seed = i * 2.1;
      const orbX = width * (0.2 + 0.6 * (0.5 + 0.5 * Math.sin(t * 0.25 + seed)));
      const orbY = height * (0.25 + 0.5 * (0.5 + 0.5 * Math.cos(t * 0.2 + seed * 1.4)));
      const radius = Math.min(width, height) * (0.35 + (i % 2) * 0.16);
      const radGrad = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, radius);
      radGrad.addColorStop(0, accentColor + '2E');
      radGrad.addColorStop(1, accentColor + '00');
      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(orbX, orbY, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    const vignette = ctx.createRadialGradient(width / 2, height / 2, width * 0.25, width / 2, height / 2, Math.max(width, height) * 0.78);
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(2,4,10,0.62)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  // 2. FIND ACTIVE LYRIC AT CURRENT TIMESTAMP
  let activeLine = null;
  for (let i = 0; i < (lyrics || []).length; i++) {
    const l = lyrics[i];
    if (currentTime >= l.startTime && currentTime <= l.endTime) {
      activeLine = l;
      break;
    }
  }

  // 2.5 DRAW INTRO / OUTRO TEMPLATES
  const firstLyric = lyrics?.[0];
  const lastLyric = lyrics?.[lyrics.length - 1];
  const introEndLimit = project.intro?.endTime ?? (firstLyric ? firstLyric.startTime : 5);
  const outroStartLimit = project.outro?.startTime ?? (lastLyric ? lastLyric.endTime : (project.audio?.duration || 24) - 3);

  if (project.intro?.enabled && currentTime >= 0 && currentTime < introEndLimit) {
    ctx.save();
    const distToEnd = Math.max(0, introEndLimit - currentTime);
    const alpha = Math.min(1, currentTime / 0.4) * Math.min(1, distToEnd / 0.45);
    const slideOffset = distToEnd < 0.45 ? (1 - distToEnd / 0.45) * -35 * (height / 1000) : 0;
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    const posX = ((typography.positionX ?? 50) / 100) * width;
    const posY = ((typography.positionY ?? 50) / 100) * height + slideOffset;
    ctx.textAlign = typography.align || 'center';
    ctx.textBaseline = 'middle';
    const titleSize = ((typography.fontSize || 48) / 1000) * height * 1.35;
    const artistSize = titleSize * 0.45;
    ctx.shadowColor = typography.shadowColor || 'rgba(0,0,0,0.85)';
    ctx.shadowBlur = 24 * (height / 1000);

    ctx.font = `700 ${artistSize * 0.62}px ${typography.fontFamily || 'sans-serif'}`;
    ctx.fillStyle = 'rgba(255,255,255,0.65)';
    ctx.fillText('NOW PLAYING', posX, posY - titleSize * 0.95);

    ctx.font = `800 ${titleSize}px ${typography.fontFamily || 'sans-serif'}`;
    ctx.fillStyle = typography.textColor || '#FFFFFF';
    ctx.fillText(project.intro.title || 'Song Title', posX, posY - titleSize * 0.15);

    ctx.font = `600 ${artistSize}px ${typography.fontFamily || 'sans-serif'}`;
    ctx.fillStyle = typography.highlightColor || '#C084FC';
    ctx.fillText(project.intro.artist || 'Artist Name', posX, posY + titleSize * 0.65);
    ctx.restore();
  } else if (project.outro?.enabled && currentTime >= outroStartLimit) {
    ctx.save();
    const elapsedOutro = Math.max(0, currentTime - outroStartLimit);
    const alpha = Math.min(1, elapsedOutro / 0.5);
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    const posX = ((typography.positionX ?? 50) / 100) * width;
    const posY = ((typography.positionY ?? 50) / 100) * height;
    ctx.textAlign = typography.align || 'center';
    ctx.textBaseline = 'middle';
    const size = ((typography.fontSize || 48) / 1000) * height * 1.15;
    const subSize = size * 0.45;
    ctx.shadowColor = typography.shadowColor || 'rgba(0,0,0,0.85)';
    ctx.shadowBlur = 20 * (height / 1000);

    ctx.font = `800 ${size}px ${typography.fontFamily || 'sans-serif'}`;
    ctx.fillStyle = typography.textColor || '#FFFFFF';
    ctx.fillText(project.outro.text || 'Thanks for Listening!', posX, posY - size * 0.35);

    ctx.font = `600 ${subSize}px ${typography.fontFamily || 'sans-serif'}`;
    ctx.fillStyle = typography.highlightColor || '#C084FC';
    ctx.fillText(project.outro.subtext || 'Subscribe & Share on YouTube', posX, posY + size * 0.55);
    ctx.restore();
  }

  // 3. DRAW LYRICS IF ACTIVE
  if (activeLine && (activeLine.text?.trim().length > 0 || activeLine.isInstrumental)) {
    const lineDuration = Math.max(0.1, activeLine.endTime - activeLine.startTime);
    const elapsed = currentTime - activeLine.startTime;
    const remaining = activeLine.endTime - currentTime;
    const progress = Math.max(0, Math.min(1, elapsed / lineDuration));

    const animDur = Math.min(animation.duration || 0.4, lineDuration / 2);
    const enterProgress = animDur > 0 ? Math.min(1, elapsed / animDur) : 1;
    const exitProgress = animDur > 0 ? Math.min(1, remaining / animDur) : 1;
    const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
    const smoothEnter = easeOutCubic(enterProgress);
    const smoothExit = easeOutCubic(exitProgress);

    let alpha = 1;
    let translateX = 0;
    let translateY = 0;
    let scale = 1;
    let rotationDeg = 0;
    let blurVal = 0;
    let extraGlow = 0;

    if (animation.preset === 'custom_keyframes') {
      const kfState = interpolateCustomKeyframes(
        animation.customKeyframes || DEFAULT_CUSTOM_KEYFRAMES,
        progress * 100,
        animation.easing || 'easeOutCubic'
      );
      alpha = kfState.opacity;
      scale = kfState.scale;
      translateX = (kfState.offsetX / 100) * width;
      translateY = (kfState.offsetY / 100) * height;
      rotationDeg = kfState.rotation || 0;
      blurVal = (kfState.blur || 0) * (height / 1000);
    } else if (animation.preset === 'fade') {
      alpha = Math.min(smoothEnter, smoothExit);
    } else if (animation.preset === 'slide_up') {
      alpha = Math.min(smoothEnter, smoothExit);
      translateY = (1 - smoothEnter) * (height * 0.045);
    } else if (animation.preset === 'zoom') {
      alpha = Math.min(smoothEnter, smoothExit);
      scale = 0.84 + 0.16 * smoothEnter;
    } else if (animation.preset === 'float') {
      alpha = Math.min(smoothEnter, smoothExit);
      translateY = Math.sin(currentTime * 2.5) * (height * 0.012);
    } else if (animation.preset === 'blur') {
      alpha = Math.min(smoothEnter, smoothExit);
      blurVal = (1 - smoothEnter) * 14 * (height / 1000);
    } else if (animation.preset === 'glow') {
      alpha = Math.min(smoothEnter, smoothExit);
      extraGlow = (0.5 + 0.5 * Math.sin(currentTime * 4)) * 28;
    }

    ctx.save();
    const posX = ((typography.positionX ?? 50) / 100) * width + translateX;
    const posY = ((typography.positionY ?? 50) / 100) * height + translateY;
    ctx.translate(posX, posY);
    if (rotationDeg !== 0) {
      ctx.rotate((rotationDeg * Math.PI) / 180);
    }
    ctx.scale(scale, scale);
    if (blurVal > 0.2) {
      ctx.filter = `blur(${blurVal.toFixed(1)}px)`;
    }
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

    const baseFontSize = ((typography.fontSize || 48) / 1000) * height;
    ctx.font = `${typography.fontWeight || '700'} ${baseFontSize}px ${typography.fontFamily || 'sans-serif'}`;
    ctx.textAlign = typography.align || 'center';
    ctx.textBaseline = 'middle';

    if (activeLine.isInstrumental) {
      const pulse = 0.5 + 0.5 * Math.sin(currentTime * 4.5);
      ctx.shadowColor = typography.highlightColor || '#C084FC';
      ctx.shadowBlur = (20 + pulse * 20) * (height / 1000);
      const barCount = 9;
      const barSpacing = baseFontSize * 0.42;
      const totalBarW = (barCount - 1) * barSpacing;
      ctx.fillStyle = typography.highlightColor || '#C084FC';
      for (let b = 0; b < barCount; b++) {
        const bx = -totalBarW / 2 + b * barSpacing;
        const bh = baseFontSize * (0.28 + 0.65 * Math.abs(Math.sin(currentTime * 5.2 + b * 0.7)));
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(bx - baseFontSize * 0.09, -bh / 2 - baseFontSize * 0.65, baseFontSize * 0.18, bh, 8);
        else ctx.rect(bx - baseFontSize * 0.09, -bh / 2 - baseFontSize * 0.65, baseFontSize * 0.18, bh);
        ctx.fill();
      }
      ctx.font = `700 ${baseFontSize * 0.52}px ${typography.fontFamily || 'sans-serif'}`;
      ctx.fillStyle = typography.textColor || '#FFFFFF';
      ctx.fillText('🎵  I N S T R U M E N T A L  🎵', 0, baseFontSize * 0.45);
      ctx.restore();
    } else {
      const maxTextWidth = ((typography.maxWidth || 84) / 100) * width;
      let displayStr = activeLine.text;
      if (animation.preset === 'typewriter' || animation.preset === 'letter_reveal') {
        const charCount = Math.floor(displayStr.length * Math.min(1, elapsed / (lineDuration * 0.75)));
        displayStr = displayStr.slice(0, Math.max(1, charCount));
      }

      const rawWords = displayStr.split(' ');
      const wrappedLines = [];
      let currentLineWords = [];
      let currentTestStr = '';

      for (let i = 0; i < rawWords.length; i++) {
        const word = rawWords[i];
        const testLine = currentTestStr ? currentTestStr + ' ' + word : word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxTextWidth && currentLineWords.length > 0) {
          wrappedLines.push(currentLineWords);
          currentLineWords = [{ word, index: i }];
          currentTestStr = word;
        } else {
          currentLineWords.push({ word, index: i });
          currentTestStr = testLine;
        }
      }
      if (currentLineWords.length > 0) wrappedLines.push(currentLineWords);

      const lineHeightPx = baseFontSize * (typography.lineHeight || 1.35);
      const totalBlockHeight = wrappedLines.length * lineHeightPx;
      const startY = -totalBlockHeight / 2 + lineHeightPx / 2;

      if (typography.showBox) {
        let maxW = 0;
        wrappedLines.forEach(wl => {
          const str = wl.map(w => w.word).join(' ');
          const m = ctx.measureText(str);
          if (m.width > maxW) maxW = m.width;
        });
        const padX = baseFontSize * 0.6;
        const padY = baseFontSize * 0.42;
        ctx.save();
        ctx.fillStyle = typography.boxColor || 'rgba(11, 13, 18, 0.68)';
        const boxW = maxW + padX * 2;
        const boxH = totalBlockHeight + padY * 2;
        let boxX = -boxW / 2;
        if (typography.align === 'left') boxX = -padX;
        if (typography.align === 'right') boxX = -maxW - padX;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(boxX, -totalBlockHeight / 2 - padY, boxW, boxH, 16 * (height / 1000));
        else ctx.rect(boxX, -totalBlockHeight / 2 - padY, boxW, boxH);
        ctx.fill();
        ctx.restore();
      }

      if ((typography.shadowBlur || 0) > 0 || extraGlow > 0) {
        ctx.shadowColor = extraGlow > 0 ? (typography.highlightColor || '#C084FC') : (typography.shadowColor || 'rgba(0,0,0,0.85)');
        ctx.shadowBlur = ((typography.shadowBlur || 0) + extraGlow) * (height / 1000);
        ctx.shadowOffsetY = 4 * (height / 1000);
      }

      wrappedLines.forEach((wl, lineIdx) => {
        const y = startY + lineIdx * lineHeightPx;
        const lineText = wl.map(w => w.word).join(' ');

        if (syncMode === 'word' || animation.preset === 'word_reveal') {
          const totalLineWidth = ctx.measureText(lineText).width;
          let cursorX = -totalLineWidth / 2;
          if (typography.align === 'left') cursorX = 0;
          if (typography.align === 'right') cursorX = -totalLineWidth;
          const origAlign = ctx.textAlign;
          ctx.textAlign = 'left';

          wl.forEach((wObj) => {
            const wordData = activeLine.words && activeLine.words[wObj.index];
            let isHighlighted = false;
            if (syncMode === 'word' && wordData && wordData.startTime !== undefined) {
              isHighlighted = currentTime >= wordData.startTime;
            } else {
              const wordThreshold = wObj.index / Math.max(1, rawWords.length);
              isHighlighted = progress >= wordThreshold * 0.85;
            }
            ctx.fillStyle = isHighlighted ? (typography.highlightColor || '#C084FC') : (typography.textColor || '#FFFFFF');
            if ((typography.strokeWidth || 0) > 0) {
              ctx.lineWidth = typography.strokeWidth * (height / 1000);
              ctx.strokeStyle = typography.strokeColor || '#000000';
              ctx.strokeText(wObj.word, cursorX, y);
            }
            ctx.fillText(wObj.word, cursorX, y);
            cursorX += ctx.measureText(wObj.word + ' ').width;
          });
          ctx.textAlign = origAlign;
        } else {
          if ((typography.strokeWidth || 0) > 0) {
            ctx.lineWidth = typography.strokeWidth * (height / 1000);
            ctx.strokeStyle = typography.strokeColor || '#000000';
            ctx.strokeText(lineText, 0, y);
          }
          ctx.fillStyle = typography.textColor || '#FFFFFF';
          ctx.fillText(lineText, 0, y);
        }
      });
      ctx.restore();
    }
  }

  // 3.5 DRAW CUSTOM FOREGROUND OVERLAY ASSET (PNG, GIF, WebM) & VISUAL EFFECTS (VFX)
  const overlayCfg = project.overlay || {};
  const overlayMedia = mediaAssets.overlayVideoElement || mediaAssets.overlayImageElement;
  if (overlayCfg.enabled && overlayMedia) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, (overlayCfg.opacity ?? 80) / 100));
    ctx.globalCompositeOperation = overlayCfg.blendMode || 'screen';
    const ovScale = (overlayCfg.scale ?? 100) / 100;
    const ovW = (overlayMedia.videoWidth || overlayMedia.width || width) * ovScale;
    const ovH = (overlayMedia.videoHeight || overlayMedia.height || height) * ovScale;
    const fitW = overlayCfg.fitCover ? width * ovScale : ovW;
    const fitH = overlayCfg.fitCover ? height * ovScale : ovH;
    const ovX = ((overlayCfg.positionX ?? 50) / 100) * width - fitW / 2;
    const ovY = ((overlayCfg.positionY ?? 50) / 100) * height - fitH / 2;
    ctx.drawImage(overlayMedia, ovX, ovY, fitW, fitH);
    ctx.restore();
  }

  const vfxType = overlayCfg.vfxPreset || 'none';
  if (vfxType !== 'none') {
    const vfxIntensity = (overlayCfg.vfxIntensity ?? 60) / 100;
    ctx.save();
    if (vfxType === 'embers') {
      ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < 32; i++) {
        const seed = i * 71.3;
        const ex = (((seed * 13.7 + Math.sin(currentTime * 1.2 + i) * 35) % 100) / 100) * width;
        const ey = height - (((currentTime * (55 + (i % 5) * 18) + seed * 29) % (height + 80)) - 40);
        const er = Math.max(0.5, (2 + (i % 4) * 1.5) * (width / 1000));
        ctx.fillStyle = i % 2 === 0 ? `rgba(251, 146, 60, ${0.75 * vfxIntensity})` : `rgba(244, 63, 94, ${0.65 * vfxIntensity})`;
        ctx.beginPath();
        ctx.arc(ex, ey, er, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (vfxType === 'snow') {
      for (let i = 0; i < 40; i++) {
        const sx = (((i * 89.1 + Math.sin(currentTime * 0.8 + i) * 20) % 100) / 100) * width;
        const sy = ((currentTime * (45 + (i % 4) * 15) + i * 67) % (height + 40)) - 20;
        const sr = Math.max(0.5, (2 + (i % 3) * 1.4) * (width / 1000));
        ctx.fillStyle = `rgba(241, 245, 249, ${0.75 * vfxIntensity})`;
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (vfxType === 'bokeh') {
      ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < 12; i++) {
        const bx = (0.1 + 0.8 * (0.5 + 0.5 * Math.sin(currentTime * 0.22 + i * 1.7))) * width;
        const by = (0.1 + 0.8 * (0.5 + 0.5 * Math.cos(currentTime * 0.18 + i * 2.3))) * height;
        const br = Math.max(1, (28 + (i % 4) * 22) * (width / 1000));
        const bGrad = ctx.createRadialGradient(bx, by, 0, bx, by, br);
        bGrad.addColorStop(0, `rgba(56, 189, 248, ${0.28 * vfxIntensity})`);
        bGrad.addColorStop(0.7, `rgba(99, 102, 241, ${0.14 * vfxIntensity})`);
        bGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = bGrad;
        ctx.beginPath();
        ctx.arc(bx, by, br, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (vfxType === 'film_grain') {
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.07 * vfxIntensity})`;
      ctx.lineWidth = 1;
      for (let y = 0; y < height; y += 6) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      const scratchX = ((Math.floor(currentTime * 24) * 173) % 100) / 100 * width;
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.18 * vfxIntensity})`;
      ctx.beginPath();
      ctx.moveTo(scratchX, 0);
      ctx.lineTo(scratchX + 2, height);
      ctx.stroke();
    }
    ctx.restore();
  }

  // 4. DRAW SAFE AREA OVERLAY
  if (showSafeArea) {
    ctx.save();
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.55)';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 8]);
    ctx.strokeRect(width * 0.08, height * 0.14, width * 0.84, height * 0.64);
    ctx.restore();
  }

  ctx.restore();
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [project, setProject] = useState({
    id: 'proj_' + Date.now(),
    name: 'Untitled Lyric Video',
    aspectRatio: '9:16',
    showSafeArea: false,
    syncMode: 'line',
    audio: { fileName: '', duration: 0, audioUrl: null, waveformPeaks: [] },
    lyrics: [],
    intro: { enabled: true, title: 'Song Title', artist: 'Artist Name', template: 'cinema', endTime: 2.5 },
    outro: { enabled: true, text: 'Thanks for Watching!', subtext: 'Subscribe & Share on YouTube', startTime: 22.5 },
    background: {
      type: 'preset',
      presetId: 'purple_ethereal',
      customUrl: null,
      customFileName: '',
      customMediaType: 'image',
      customColor1: '#0F172A',
      customColor2: '#4C1D95',
      customColor3: '#831843',
      fitMode: 'cover',
      scale: 100,
      blur: 0,
      brightness: 100,
      contrast: 100,
      opacity: 100,
      motion: 'drift',
      offsetX: 0,
      offsetY: 0
    },
    overlay: {
      enabled: false,
      customUrl: null,
      customFileName: '',
      mediaType: 'image',
      blendMode: 'screen',
      opacity: 75,
      scale: 100,
      positionX: 50,
      positionY: 50,
      fitCover: true,
      vfxPreset: 'none',
      vfxIntensity: 60
    },
    typography: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: 52,
      fontWeight: '700',
      textColor: '#FFFFFF',
      highlightColor: '#C084FC',
      align: 'center',
      letterSpacing: 1,
      lineHeight: 1.35,
      positionX: 50,
      positionY: 50,
      shadowBlur: 18,
      shadowColor: 'rgba(0,0,0,0.85)',
      strokeWidth: 0,
      strokeColor: '#000000',
      showBox: false,
      boxColor: 'rgba(11, 13, 18, 0.72)',
      maxWidth: 84
    },
    animation: {
      preset: 'slide_up',
      duration: 0.45,
      easing: 'easeOutCubic',
      customKeyframes: DEFAULT_CUSTOM_KEYFRAMES
    }
  });

  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [activeTab, setActiveTab] = useState('audio_lyrics');

  // Website & 3-Second Cinematic Transition Animation State
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [isTransitioningToStudio, setIsTransitioningToStudio] = useState(false);
  const [showGuidedTour, setShowGuidedTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [tourTargetRect, setTourTargetRect] = useState(null);
  const transitionCanvasRef = useRef(null);

  const detectIsMobileDevice = useCallback(() => {
    if (typeof window === 'undefined') return false;
    const isNarrow = window.innerWidth < 768;
    const isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '');
    return isNarrow || (isMobileUA && window.innerWidth < 1024);
  }, []);

  const [isPhoneMode, setIsPhoneMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768 || /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '');
  });
  const [compactPhonePreview, setCompactPhonePreview] = useState(false);

  useEffect(() => {
    const handleViewportResize = () => setIsPhoneMode(detectIsMobileDevice());
    window.addEventListener('resize', handleViewportResize);
    return () => window.removeEventListener('resize', handleViewportResize);
  }, [detectIsMobileDevice]);

  const [availableFonts, setAvailableFonts] = useState(DEFAULT_FONTS);
  const [customBackgrounds, setCustomBackgrounds] = useState([]);
  const [customOverlays, setCustomOverlays] = useState([]);
  const [selectedKeyframeIdx, setSelectedKeyframeIdx] = useState(0);
  const [isZipPackaging, setIsZipPackaging] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isSyncRecording, setIsSyncRecording] = useState(false);
  const [syncTapSound, setSyncTapSound] = useState(true);
  const [activeSyncIndex, setActiveSyncIndex] = useState(0);
  const [activeWordSyncIndex, setActiveWordSyncIndex] = useState(0);
  const [selectedLyricId, setSelectedLyricId] = useState(null);
  const [timelineZoom, setTimelineZoom] = useState(1);

  const [showExportModal, setShowExportModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTimingTable, setShowTimingTable] = useState(false);
  const [savedProjectsList, setSavedProjectsList] = useState([]);
  const [lyricsRawText, setLyricsRawText] = useState('');
  const [notification, setNotification] = useState(null);

  // Export state
  const [exportConfig, setExportConfig] = useState({ resolution: '720p', fps: 30 });
  const [exportStatus, setExportStatus] = useState('idle');
  const [exportProgress, setExportProgress] = useState(0);
  const [exportedVideoUrl, setExportedVideoUrl] = useState(null);
  const [exportedVideoExt, setExportedVideoExt] = useState('mp4');
  const exportAbortRef = useRef(false);

  const showToast = useCallback((msg, type = 'info') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4200);
  }, []);

  const audioRef = useRef(null);
  const decodedAudioBufferRef = useRef(null);
  const sharedAudioCtxRef = useRef(null);
  const webAudioSourceRef = useRef(null);
  const webAudioGainRef = useRef(null);
  const webAudioStartCtxTimeRef = useRef(0);
  const webAudioStartOffsetRef = useRef(0);
  const isPlayingRef = useRef(false);
  const canvasRef = useRef(null);
  const projectRef = useRef(project);
  const currentTimeRef = useRef(0);
  const playheadDomRef = useRef(null);
  const saveTimeoutRef = useRef(null);
  const mediaAssetsRef = useRef({
    bgImageElement: null,
    bgVideoElement: null,
    overlayImageElement: null,
    overlayVideoElement: null
  });
  const sessionBlobsRef = useRef({
    audio: null,
    backgrounds: new Map(),
    overlays: new Map(),
    fonts: new Map()
  });
  const timelineContainerRef = useRef(null);

  const getUnlockedAudioContext = useCallback(async () => {
    if (!sharedAudioCtxRef.current) {
      sharedAudioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = sharedAudioCtxRef.current;
    if (ctx.state === 'suspended') await ctx.resume();
    return ctx;
  }, []);

  const stopWebAudioPlayback = useCallback(() => {
    if (webAudioSourceRef.current) {
      try {
        webAudioSourceRef.current.onended = null;
        webAudioSourceRef.current.stop(0);
        webAudioSourceRef.current.disconnect();
      } catch (_) {}
      webAudioSourceRef.current = null;
    }
    if (audioRef.current && !audioRef.current.paused) {
      try { audioRef.current.pause(); } catch (_) {}
    }
    isPlayingRef.current = false;
    setIsPlaying(false);
  }, []);

  const startWebAudioPlayback = useCallback(async (fromOffset = null) => {
    const ctx = await getUnlockedAudioContext();
    let buffer = decodedAudioBufferRef.current;
    if (!buffer && projectRef.current?.audio?.audioUrl) {
      try {
        const resp = await fetch(projectRef.current.audio.audioUrl);
        const arr = await resp.arrayBuffer();
        buffer = await ctx.decodeAudioData(arr);
        decodedAudioBufferRef.current = buffer;
      } catch (_) {}
    }
    stopWebAudioPlayback();
    const duration = buffer?.duration || projectRef.current?.audio?.duration || 24;
    let startOffset = fromOffset !== null ? fromOffset : currentTimeRef.current;
    if (startOffset >= duration - 0.15 || startOffset < 0) startOffset = 0;

    if (buffer) {
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.playbackRate.value = playbackRate || 1;
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(isMuted ? 0 : (volume > 0 ? volume : 0.95), ctx.currentTime);
      source.connect(gainNode);
      gainNode.connect(ctx.destination);
      webAudioSourceRef.current = source;
      webAudioGainRef.current = gainNode;
      webAudioStartCtxTimeRef.current = ctx.currentTime;
      webAudioStartOffsetRef.current = startOffset;
      currentTimeRef.current = startOffset;
      setCurrentTime(startOffset);

      source.onended = () => {
        if (isPlayingRef.current) {
          isPlayingRef.current = false;
          setIsPlaying(false);
        }
      };
      source.start(0, startOffset);
      isPlayingRef.current = true;
      setIsPlaying(true);
      return true;
    }
    return false;
  }, [getUnlockedAudioContext, stopWebAudioPlayback, playbackRate, isMuted, volume]);

  const playSyncTapFeedback = useCallback(async () => {
    if (!syncTapSound) return;
    try {
      const ctx = await getUnlockedAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.065);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.075);
    } catch (_) {}
  }, [syncTapSound, getUnlockedAudioContext]);

  // ==========================================
  // CUSTOM 3-SECOND CINEMATIC TRANSITION ANIMATION
  // ==========================================
  const trigger3SecCinematicTransition = useCallback((launchTourAfter = true) => {
    if (isTransitioningToStudio) return;
    const mobileDetected = detectIsMobileDevice();
    setIsPhoneMode(mobileDetected);
    setActiveTab('audio_lyrics');
    setIsTransitioningToStudio(true);

    setTimeout(() => {
      setShowLandingPage(false);
    }, 1500);

    setTimeout(() => {
      setIsTransitioningToStudio(false);
      showToast(mobileDetected ? '📱 Phone Studio Ready!' : '💻 Desktop Pro Studio Ready!', 'info');
      if (launchTourAfter) {
        setTourStep(0);
        setShowGuidedTour(true);
      }
    }, 3000);
  }, [isTransitioningToStudio, detectIsMobileDevice, showToast]);

  useEffect(() => {
    if (!isTransitioningToStudio || !transitionCanvasRef.current) return;
    const canvas = transitionCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 260 }, () => ({
      x: w / 2 + (Math.random() - 0.5) * 80,
      y: h / 2 + (Math.random() - 0.5) * 80,
      angle: Math.random() * Math.PI * 2,
      speed: 2 + Math.random() * 14,
      size: 1.5 + Math.random() * 4.5,
      color: ['#38BDF8', '#2563EB', '#60A5FA', '#9333EA', '#F43F5E'][Math.floor(Math.random() * 5)]
    }));

    let rafId;
    const startTime = performance.now();
    const durationMs = 3000;

    const animateTransition = (now) => {
      const elapsed = Math.max(0, now - startTime);
      const progress = Math.max(0, Math.min(1, elapsed / durationMs));

      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = `rgba(3, 6, 12, ${progress < 0.8 ? 0.94 : Math.max(0, 0.94 * (1 - (progress - 0.8) * 5))})`;
      ctx.fillRect(0, 0, w, h);

      const radius1 = Math.max(0, progress * Math.max(w, h) * 1.25);
      const radius2 = Math.max(0, (progress - 0.25) * Math.max(w, h) * 1.0);

      ctx.save();
      if (radius1 > 0) {
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, radius1, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${Math.max(0, (1 - progress) * 0.9)})`;
        ctx.lineWidth = 4;
        ctx.stroke();
      }

      if (radius2 > 0) {
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, radius2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(147, 51, 234, ${Math.max(0, (1 - progress) * 0.75)})`;
        ctx.lineWidth = 3;
        ctx.stroke();
      }
      ctx.restore();

      particles.forEach(p => {
        p.angle += 0.04;
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.speed *= 1.018;

        ctx.save();
        ctx.globalAlpha = Math.max(0, 1 - progress);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.size), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      ctx.save();
      ctx.globalAlpha = progress < 0.5 ? progress * 2 : Math.max(0, 2 - progress * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('CLOUDLYRIC STUDIO', w / 2, h / 2 - 14);
      ctx.fillStyle = '#38BDF8';
      ctx.font = '600 12px "JetBrains Mono", monospace';
      ctx.fillText('INITIALIZING CINEMATIC ENGINE...', w / 2, h / 2 + 18);
      ctx.restore();

      if (progress < 1) {
        rafId = requestAnimationFrame(animateTransition);
      }
    };

    rafId = requestAnimationFrame(animateTransition);
    return () => cancelAnimationFrame(rafId);
  }, [isTransitioningToStudio]);

  const TOUR_STEPS = [
    { targetId: 'tour-upload-audio', tabToActivate: 'audio_lyrics', badge: '1 / 8 • AUDIO UPLOAD', title: 'Upload Your Song (MP3 / WAV)', desc: 'Click this button to load your song file locally in your browser session.' },
    { targetId: 'tour-intro-outro', tabToActivate: 'audio_lyrics', badge: '2 / 8 • YOUTUBE INTRO & OUTRO', title: 'Song Title, Artist & Ending Credits', desc: 'Customize your opening Song Title & Artist card here. It vanishes automatically when you press SPACE for your first lyric!' },
    { targetId: 'tour-nav-sync', tabToActivate: 'sync', badge: '3 / 8 • LIVE SYNC TAB', title: 'Open Live Sync Deck', desc: 'Switch to the Sync tab when you are ready to play your song and synchronize lyrics in real time.' },
    { targetId: 'tour-sync-tap', tabToActivate: 'sync', badge: '4 / 8 • SPACEBAR / TAP SYNC', title: 'Tap or Press [SPACE] on Each Lyric', desc: 'As the singer sings each line, click this glowing button or press SPACEBAR to lock its exact timestamp.' },
    { targetId: 'tour-instrumental-btn', tabToActivate: 'sync', badge: '5 / 8 • INSTRUMENTAL BREAK [I]', title: 'Insert Music Break Live [I]', desc: 'When a long music solo comes in the middle of the song, click this button (or press I) to show an Instrumental Break until you press SPACE again!' },
    { targetId: 'tour-nav-visuals', tabToActivate: 'background', badge: '6 / 8 • ASSETS, VFX & FONTS', title: 'Upload Custom Backgrounds, Overlays & Fonts', desc: 'Open the Visuals & Style panel to upload custom backgrounds, PNG/GIF/WebM overlays, custom fonts, or build custom keyframe animations.' },
    { targetId: 'tour-mode-switch', tabToActivate: 'sync', badge: '7 / 8 • PHONE & LAPTOP SWITCH', title: 'Switch Between Phone & Desktop UI', desc: 'Toggle between the thumb-friendly Mobile Phone Studio and the full Multi-Track Desktop Studio anytime.' },
    { targetId: 'tour-export-btn', tabToActivate: 'sync', badge: '8 / 8 • RENDER HD MP4', title: 'Export Final MP4 Video + Audio', desc: 'When finished, click Export MP4 here to render and download your synchronized video locally!' }
  ];

  const handleTourStepChange = useCallback((nextIdx) => {
    if (nextIdx < 0) return;
    if (nextIdx >= TOUR_STEPS.length) {
      setShowGuidedTour(false);
      setTourTargetRect(null);
      showToast('You are all set! Start creating your lyric video.', 'success');
      return;
    }
    setActiveTab(TOUR_STEPS[nextIdx].tabToActivate);
    setTourStep(nextIdx);
  }, [showToast]);

  useEffect(() => {
    if (!showGuidedTour) {
      setTourTargetRect(null);
      return;
    }
    const stepObj = TOUR_STEPS[tourStep];
    if (!stepObj) return;
    const updateRect = () => {
      const el = document.getElementById(stepObj.targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          setTourTargetRect({ top: r.top, left: r.left, width: r.width, height: r.height });
          return;
        }
      }
      setTourTargetRect(null);
    };
    const t = setTimeout(updateRect, 90);
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, true);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, true);
    };
  }, [showGuidedTour, tourStep, activeTab, isPhoneMode]);

  useEffect(() => { projectRef.current = project; }, [project]);

  const scheduleSaveAndHistory = useCallback((nextProject) => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      setHistory(prev => {
        const sliced = prev.slice(-25);
        sliced.push(JSON.stringify(nextProject));
        setHistoryIndex(sliced.length - 1);
        return sliced;
      });
      saveProjectToIDB(nextProject);
    }, 350);
  }, []);

  const updateProject = useCallback((updater) => {
    setProject(prev => {
      const partial = typeof updater === 'function' ? updater(prev) : updater;
      const next = { ...prev, ...partial, id: prev?.id || partial?.id || 'proj_' + Date.now() };
      projectRef.current = next;
      scheduleSaveAndHistory(next);
      return next;
    });
  }, [scheduleSaveAndHistory]);

  const undo = () => {
    if (historyIndex > 0) {
      setProject(JSON.parse(history[historyIndex - 1]));
      setHistoryIndex(historyIndex - 1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setProject(JSON.parse(history[historyIndex + 1]));
      setHistoryIndex(historyIndex + 1);
    }
  };

  useEffect(() => {
    return () => stopWebAudioPlayback();
  }, [stopWebAudioPlayback]);

  useEffect(() => {
    const effectiveVol = isMuted ? 0 : volume;
    if (webAudioGainRef.current && sharedAudioCtxRef.current) {
      webAudioGainRef.current.gain.setValueAtTime(effectiveVol, sharedAudioCtxRef.current.currentTime);
    }
    if (audioRef.current) {
      audioRef.current.volume = effectiveVol;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    let rafId;
    let lastUiSync = 0;
    const renderLoop = (timestamp) => {
      const proj = projectRef.current;
      const maxDur = proj?.audio?.duration || 24;

      if (isPlayingRef.current && sharedAudioCtxRef.current && webAudioSourceRef.current) {
        const elapsed = (sharedAudioCtxRef.current.currentTime - webAudioStartCtxTimeRef.current) * (webAudioSourceRef.current.playbackRate?.value || 1);
        const liveTime = Math.min(maxDur, webAudioStartOffsetRef.current + elapsed);
        currentTimeRef.current = liveTime;
        if (liveTime >= maxDur) {
          stopWebAudioPlayback();
        } else if (timestamp - lastUiSync > 80) {
          setCurrentTime(liveTime);
          lastUiSync = timestamp;
        }
      }

      if (playheadDomRef.current && maxDur) {
        playheadDomRef.current.style.left = `${Math.min(100, Math.max(0, (currentTimeRef.current / maxDur) * 100))}%`;
      }

      const canvas = canvasRef.current;
      if (canvas && proj) {
        renderFrameToCanvas(canvas.getContext('2d'), canvas.width, canvas.height, currentTimeRef.current, proj, mediaAssetsRef.current);
      }
      rafId = requestAnimationFrame(renderLoop);
    };
    rafId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(rafId);
  }, [stopWebAudioPlayback]);

  const togglePlay = async () => {
    if (!decodedAudioBufferRef.current && !project.audio?.audioUrl) {
      showToast('Please upload an MP3 or WAV audio file first.', 'error');
      return;
    }
    try {
      if (isMuted) setIsMuted(false);
      if (isPlayingRef.current) stopWebAudioPlayback();
      else await startWebAudioPlayback(currentTimeRef.current);
    } catch (err) {
      showToast('Playback error: ' + err.message, 'error');
    }
  };

  const toggleSyncRecordingSession = async () => {
    if (!decodedAudioBufferRef.current && !project.audio?.audioUrl) {
      showToast('Please upload a song first.', 'error');
      return;
    }
    if (isSyncRecording) {
      setIsSyncRecording(false);
      stopWebAudioPlayback();
      return;
    }
    try {
      setIsMuted(false);
      setIsSyncRecording(true);
      await startWebAudioPlayback(0);
      showToast('Music playing! Press SPACE on each lyric, [I] for Instrumental, [O] for Outro.', 'success');
    } catch (e) {
      showToast('Error: ' + e.message, 'error');
    }
  };

  const handleSeek = (time) => {
    const validTime = Math.max(0, Math.min(project.audio?.duration || 100, time));
    currentTimeRef.current = validTime;
    setCurrentTime(validTime);
    if (isPlayingRef.current) startWebAudioPlayback(validTime);
    if (mediaAssetsRef.current.bgVideoElement) {
      mediaAssetsRef.current.bgVideoElement.currentTime = validTime % (mediaAssetsRef.current.bgVideoElement.duration || 10);
    }
    if (mediaAssetsRef.current.overlayVideoElement) {
      mediaAssetsRef.current.overlayVideoElement.currentTime = validTime % (mediaAssetsRef.current.overlayVideoElement.duration || 10);
    }
  };

  const handleCaptureTimestamp = useCallback(() => {
    if (!isPlayingRef.current) startWebAudioPlayback(currentTimeRef.current);
    playSyncTapFeedback();
    const now = Number(currentTimeRef.current.toFixed(2));
    const maxDur = project.audio?.duration || 24;

    if (project.syncMode === 'line') {
      if (activeSyncIndex < project.lyrics.length) {
        const updatedLyrics = [...project.lyrics];
        let nextIntro = project.intro;
        if (project.intro?.enabled && (activeSyncIndex === 0 || now < (project.intro?.endTime || 999))) {
          nextIntro = { ...project.intro, endTime: now };
        }
        if (activeSyncIndex > 0) {
          updatedLyrics[activeSyncIndex - 1] = {
            ...updatedLyrics[activeSyncIndex - 1],
            endTime: Number(Math.max(updatedLyrics[activeSyncIndex - 1].startTime + 0.15, now - 0.03).toFixed(2))
          };
        }
        updatedLyrics[activeSyncIndex] = {
          ...updatedLyrics[activeSyncIndex],
          startTime: now,
          endTime: Number(Math.min(maxDur, now + 3.2).toFixed(2))
        };
        updateProject({ lyrics: updatedLyrics, intro: nextIntro });
        setSelectedLyricId(updatedLyrics[activeSyncIndex].id);
        setActiveSyncIndex(prev => Math.min(updatedLyrics.length - 1, prev + 1));
      }
    } else {
      const currentLine = project.lyrics[activeSyncIndex];
      if (!currentLine) return;
      const updatedLyrics = [...project.lyrics];
      const words = [...(currentLine.words || [])];

      if (activeWordSyncIndex === 0) {
        currentLine.startTime = now;
        if (activeSyncIndex > 0) {
          updatedLyrics[activeSyncIndex - 1].endTime = Number(Math.max(updatedLyrics[activeSyncIndex - 1].startTime + 0.1, now - 0.03).toFixed(2));
        }
      }
      if (words[activeWordSyncIndex]) {
        words[activeWordSyncIndex] = { ...words[activeWordSyncIndex], startTime: now, endTime: Number((now + 0.45).toFixed(2)) };
        if (activeWordSyncIndex > 0) words[activeWordSyncIndex - 1].endTime = now;
      }
      currentLine.words = words;
      currentLine.endTime = Number(Math.min(maxDur, now + 2.0).toFixed(2));
      updatedLyrics[activeSyncIndex] = currentLine;
      updateProject({ lyrics: updatedLyrics });

      if (activeWordSyncIndex + 1 < words.length) {
        setActiveWordSyncIndex(activeWordSyncIndex + 1);
      } else if (activeSyncIndex + 1 < updatedLyrics.length) {
        setActiveSyncIndex(activeSyncIndex + 1);
        setActiveWordSyncIndex(0);
      }
    }
  }, [activeSyncIndex, activeWordSyncIndex, project.lyrics, project.syncMode, project.intro, project.audio?.duration, startWebAudioPlayback, updateProject, playSyncTapFeedback]);

  const handleInsertInstrumentalNow = useCallback(() => {
    if (!isPlayingRef.current) startWebAudioPlayback(currentTimeRef.current);
    playSyncTapFeedback();
    const now = Number(currentTimeRef.current.toFixed(2));
    const maxDur = project.audio?.duration || 24;
    const updatedLyrics = [...project.lyrics];
    let nextIntro = project.intro;
    if (project.intro?.enabled && now < (project.intro?.endTime || 0)) {
      nextIntro = { ...project.intro, endTime: now };
    }
    const prevIdx = activeSyncIndex > 0 ? activeSyncIndex - 1 : 0;
    if (updatedLyrics[prevIdx] && updatedLyrics[prevIdx].startTime < now) {
      updatedLyrics[prevIdx] = { ...updatedLyrics[prevIdx], endTime: Number(Math.max(updatedLyrics[prevIdx].startTime + 0.15, now - 0.02).toFixed(2)) };
    }
    const instLine = {
      id: 'inst_' + Date.now(),
      text: '🎵 Instrumental Break 🎵',
      isInstrumental: true,
      startTime: now,
      endTime: Number(Math.min(maxDur, now + 8).toFixed(2)),
      words: []
    };
    const insertAt = Math.min(updatedLyrics.length, Math.max(0, activeSyncIndex));
    updatedLyrics.splice(insertAt, 0, instLine);
    updateProject({ lyrics: updatedLyrics, intro: nextIntro });
    setSelectedLyricId(instLine.id);
    setActiveSyncIndex(insertAt + 1);
    showToast(`🎵 Instrumental added at ${formatTime(now)}! Press SPACE when next lyric starts.`, 'info');
  }, [activeSyncIndex, project.lyrics, project.intro, project.audio?.duration, startWebAudioPlayback, playSyncTapFeedback, updateProject, showToast]);

  const handleTriggerOutroNow = useCallback(() => {
    playSyncTapFeedback();
    const now = Number(currentTimeRef.current.toFixed(2));
    const updatedLyrics = [...project.lyrics];
    const prevIdx = activeSyncIndex > 0 ? activeSyncIndex - 1 : updatedLyrics.length - 1;
    if (updatedLyrics[prevIdx] && updatedLyrics[prevIdx].startTime < now) {
      updatedLyrics[prevIdx] = { ...updatedLyrics[prevIdx], endTime: Number(Math.max(updatedLyrics[prevIdx].startTime + 0.15, now - 0.02).toFixed(2)) };
    }
    updateProject(p => ({
      lyrics: updatedLyrics,
      outro: { ...p.outro, enabled: true, startTime: now }
    }));
    showToast(`🎬 Ending Credits Outro set at ${formatTime(now)}!`, 'success');
  }, [activeSyncIndex, project.lyrics, playSyncTapFeedback, updateProject, showToast]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = document.activeElement?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || document.activeElement?.isContentEditable) return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (isSyncRecording || activeTab === 'sync') {
          handleCaptureTimestamp();
        } else {
          togglePlay();
        }
      } else if (e.code === 'KeyI' && (isSyncRecording || activeTab === 'sync')) {
        e.preventDefault();
        handleInsertInstrumentalNow();
      } else if (e.code === 'KeyO' && (isSyncRecording || activeTab === 'sync')) {
        e.preventDefault();
        handleTriggerOutroNow();
      } else if (e.code === 'Backspace' && (isSyncRecording || activeTab === 'sync')) {
        e.preventDefault();
        setActiveSyncIndex(prev => Math.max(0, prev - 1));
      } else if (e.code === 'ArrowDown' || e.code === 'ArrowRight') {
        e.preventDefault();
        setActiveSyncIndex(prev => Math.min(project.lyrics.length - 1, prev + 1));
      } else if (e.code === 'ArrowUp' || e.code === 'ArrowLeft') {
        e.preventDefault();
        setActiveSyncIndex(prev => Math.max(0, prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSyncRecording, activeTab, handleCaptureTimestamp, handleInsertInstrumentalNow, handleTriggerOutroNow, project.lyrics.length]);

  // ==========================================
  // SESSION-BASED ASSET UPLOADS (NO LOGIN / NO CLOUD)
  // ==========================================
  const handleAudioUpload = async (file) => {
    if (!file) return;
    if (sessionBlobsRef.current.audio?.url) {
      try { URL.revokeObjectURL(sessionBlobsRef.current.audio.url); } catch (_) {}
    }
    const url = URL.createObjectURL(file);
    sessionBlobsRef.current.audio = { fileName: file.name, blob: file, url };
    cacheSessionAssetToIDB('active_audio', file, { fileName: file.name });

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    try {
      showToast('Decoding audio & generating waveform...', 'info');
      stopWebAudioPlayback();
      const arrBuf = await file.arrayBuffer();
      const decodedData = await audioCtx.decodeAudioData(arrBuf);
      decodedAudioBufferRef.current = decodedData;
      const peaks = extractPeaksFromAudioBuffer(decodedData, 140);
      updateProject({
        audio: { fileName: file.name, duration: decodedData.duration, audioUrl: url, waveformPeaks: peaks }
      });
      setCurrentTime(0);
      currentTimeRef.current = 0;
      showToast(`Loaded "${file.name}" (${formatTime(decodedData.duration)}) in session!`, 'success');
    } catch (e) {
      showToast('Audio load error: ' + e.message, 'error');
    }
  };

  const handleLyricsImport = (text) => {
    setLyricsRawText(text);
    const lines = text.split('\n').filter(l => l.trim().length > 0);
    const totalDur = project.audio?.duration || 24;
    const slot = Math.max(1.8, totalDur / Math.max(1, lines.length));
    const parsed = lines.map((l, idx) => {
      const clean = l.trim();
      return {
        id: 'l_' + Date.now() + '_' + idx,
        text: clean,
        startTime: Number((idx * slot).toFixed(2)),
        endTime: Number(((idx + 1) * slot - 0.15).toFixed(2)),
        words: clean.split(/\s+/).map((w, wIdx, arr) => ({
          word: w,
          startTime: Number((idx * slot + (wIdx / arr.length) * slot).toFixed(2)),
          endTime: Number((idx * slot + ((wIdx + 1) / arr.length) * slot).toFixed(2))
        }))
      };
    });
    updateProject({ lyrics: parsed });
  };

  const handleAddLyricLine = () => {
    const last = project.lyrics[project.lyrics.length - 1];
    const start = last ? Number((last.endTime + 0.1).toFixed(2)) : Number(currentTime.toFixed(2));
    const newLine = {
      id: 'l_' + Date.now(),
      text: 'New lyric line',
      startTime: start,
      endTime: Number((start + 2.5).toFixed(2)),
      words: [
        { word: 'New', startTime: start, endTime: start + 1 },
        { word: 'lyric', startTime: start + 1, endTime: start + 1.8 },
        { word: 'line', startTime: start + 1.8, endTime: start + 2.5 }
      ]
    };
    updateProject({ lyrics: [...project.lyrics, newLine] });
    setLyricsRawText([...project.lyrics, newLine].map(l => l.text).join('\n'));
  };

  const handleDeleteLyricLine = (id) => {
    const next = project.lyrics.filter(l => l.id !== id);
    updateProject({ lyrics: next });
    setLyricsRawText(next.map(l => l.text).join('\n'));
  };

  const handleBgMediaUpload = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const isVideo = file.type.startsWith('video/');
    const item = { id: 'bg_' + Date.now(), name: file.name, url, mediaType: isVideo ? 'video' : 'image' };

    sessionBlobsRef.current.backgrounds.set(url, {
      fileName: file.name,
      blob: file,
      mediaType: isVideo ? 'video' : 'image'
    });
    cacheSessionAssetToIDB(item.id, file, { type: 'background', fileName: file.name });

    if (isVideo) {
      const vid = document.createElement('video');
      vid.src = url;
      vid.muted = true;
      vid.loop = true;
      vid.playsInline = true;
      vid.onloadeddata = () => {
        vid.play().catch(() => {});
        mediaAssetsRef.current.bgVideoElement = vid;
        mediaAssetsRef.current.bgImageElement = null;
        setCustomBackgrounds(p => [item, ...p]);
        updateProject(p => ({ background: { ...p.background, type: 'custom', customUrl: url, customFileName: file.name, customMediaType: 'video' } }));
        showToast(`Loaded video background: ${file.name} (Session Asset)`, 'success');
      };
    } else {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        mediaAssetsRef.current.bgImageElement = img;
        mediaAssetsRef.current.bgVideoElement = null;
        setCustomBackgrounds(p => [item, ...p]);
        updateProject(p => ({ background: { ...p.background, type: 'custom', customUrl: url, customFileName: file.name, customMediaType: 'image' } }));
        showToast(`Loaded image background: ${file.name} (Session Asset)`, 'success');
      };
    }
  };

  const handleOverlayMediaUpload = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const isVideo = file.type.startsWith('video/');
    const newOvItem = { id: 'ov_' + Date.now(), name: file.name, url, mediaType: isVideo ? 'video' : 'image' };

    sessionBlobsRef.current.overlays.set(url, {
      fileName: file.name,
      blob: file,
      mediaType: isVideo ? 'video' : 'image'
    });
    cacheSessionAssetToIDB(newOvItem.id, file, { type: 'overlay', fileName: file.name });

    if (isVideo) {
      const vid = document.createElement('video');
      vid.src = url;
      vid.muted = true;
      vid.loop = true;
      vid.playsInline = true;
      vid.onloadeddata = () => {
        vid.play().catch(() => {});
        mediaAssetsRef.current.overlayVideoElement = vid;
        mediaAssetsRef.current.overlayImageElement = null;
        setCustomOverlays(prev => [newOvItem, ...prev]);
        updateProject(prev => ({
          overlay: { ...prev.overlay, enabled: true, customUrl: url, customFileName: file.name, mediaType: 'video' }
        }));
        showToast(`Loaded WebM/Video Overlay "${file.name}"`, 'success');
      };
    } else {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        mediaAssetsRef.current.overlayImageElement = img;
        mediaAssetsRef.current.overlayVideoElement = null;
        setCustomOverlays(prev => [newOvItem, ...prev]);
        updateProject(prev => ({
          overlay: { ...prev.overlay, enabled: true, customUrl: url, customFileName: file.name, mediaType: 'image' }
        }));
        showToast(`Loaded PNG/GIF Overlay "${file.name}"`, 'success');
      };
    }
  };

  const handleCustomFontUpload = async (file) => {
    if (!file) return;
    try {
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, ' ').trim() || 'CustomStudioFont';
      const familyId = `Font_${Date.now()}`;
      const buf = await file.arrayBuffer();
      const face = new FontFace(familyId, buf);
      const loaded = await face.load();
      document.fonts.add(loaded);
      const newFont = {
        id: familyId,
        fileName: file.name,
        cleanName,
        name: `${cleanName} (Custom)`,
        family: `"${familyId}", sans-serif`,
        isCustom: true
      };
      sessionBlobsRef.current.fonts.set(familyId, {
        fontFamilyId: familyId,
        fileName: file.name,
        cleanName,
        family: newFont.family,
        blob: file
      });
      cacheSessionAssetToIDB(familyId, file, { type: 'font', fileName: file.name });

      setAvailableFonts(p => [newFont, ...p]);
      updateProject(p => ({ typography: { ...p.typography, fontFamily: newFont.family } }));
      showToast(`Custom font "${cleanName}" installed in session!`, 'success');
    } catch (e) {
      showToast('Font error: ' + e.message, 'error');
    }
  };

  const cleanupSessionResources = async () => {
    stopWebAudioPlayback();
    if (sessionBlobsRef.current.audio?.url) {
      try { URL.revokeObjectURL(sessionBlobsRef.current.audio.url); } catch (_) {}
    }
    sessionBlobsRef.current.backgrounds.forEach((_, url) => {
      try { URL.revokeObjectURL(url); } catch (_) {}
    });
    sessionBlobsRef.current.overlays.forEach((_, url) => {
      try { URL.revokeObjectURL(url); } catch (_) {}
    });
    sessionBlobsRef.current.audio = null;
    sessionBlobsRef.current.backgrounds.clear();
    sessionBlobsRef.current.overlays.clear();
    sessionBlobsRef.current.fonts.clear();
    mediaAssetsRef.current = { bgImageElement: null, bgVideoElement: null, overlayImageElement: null, overlayVideoElement: null };
    setCustomBackgrounds([]);
    setCustomOverlays([]);
    setAvailableFonts(DEFAULT_FONTS);
    await clearAllSessionAssetsFromIDB();
    updateProject(p => ({
      background: { ...p.background, type: 'preset', customUrl: null },
      overlay: { ...p.overlay, enabled: false, customUrl: null },
      typography: { ...p.typography, fontFamily: DEFAULT_FONTS[0].family }
    }));
    showToast('Session memory & temporary ObjectURLs cleaned up.', 'info');
  };

  // ==========================================
  // FULL .ZIP PROJECT BUNDLE EXPORT & IMPORT
  // ==========================================
  const exportProjectZipBundle = async () => {
    setIsZipPackaging(true);
    try {
      showToast('Packaging project configuration, timings, custom motions & uploaded assets into .ZIP...', 'info');
      const encoder = new TextEncoder();
      const zipEntries = [];
      const manifestAssets = {
        audioPath: null,
        backgroundPath: null,
        overlayPath: null,
        fonts: []
      };

      if (sessionBlobsRef.current.audio?.blob) {
        const safeAudioName = (sessionBlobsRef.current.audio.fileName || 'track.mp3').replace(/[^a-zA-Z0-9._-]/g, '_');
        manifestAssets.audioPath = `assets/audio/${safeAudioName}`;
        const buf = await sessionBlobsRef.current.audio.blob.arrayBuffer();
        zipEntries.push({ path: manifestAssets.audioPath, data: new Uint8Array(buf) });
      }

      if (project.background?.customUrl && sessionBlobsRef.current.backgrounds.has(project.background.customUrl)) {
        const bgAsset = sessionBlobsRef.current.backgrounds.get(project.background.customUrl);
        const safeBgName = (bgAsset.fileName || 'background.png').replace(/[^a-zA-Z0-9._-]/g, '_');
        manifestAssets.backgroundPath = `assets/backgrounds/${safeBgName}`;
        manifestAssets.backgroundMediaType = bgAsset.mediaType;
        const buf = await bgAsset.blob.arrayBuffer();
        zipEntries.push({ path: manifestAssets.backgroundPath, data: new Uint8Array(buf) });
      }

      if (project.overlay?.customUrl && sessionBlobsRef.current.overlays.has(project.overlay.customUrl)) {
        const ovAsset = sessionBlobsRef.current.overlays.get(project.overlay.customUrl);
        const safeOvName = (ovAsset.fileName || 'overlay.png').replace(/[^a-zA-Z0-9._-]/g, '_');
        manifestAssets.overlayPath = `assets/overlays/${safeOvName}`;
        manifestAssets.overlayMediaType = ovAsset.mediaType;
        const buf = await ovAsset.blob.arrayBuffer();
        zipEntries.push({ path: manifestAssets.overlayPath, data: new Uint8Array(buf) });
      }

      for (const [, fontObj] of sessionBlobsRef.current.fonts.entries()) {
        const safeFontFile = (fontObj.fileName || 'custom.ttf').replace(/[^a-zA-Z0-9._-]/g, '_');
        const fontZipPath = `assets/fonts/${safeFontFile}`;
        const buf = await fontObj.blob.arrayBuffer();
        zipEntries.push({ path: fontZipPath, data: new Uint8Array(buf) });
        manifestAssets.fonts.push({
          fontFamilyId: fontObj.fontFamilyId,
          cleanName: fontObj.cleanName,
          fileName: fontObj.fileName,
          family: fontObj.family,
          path: fontZipPath
        });
      }

      const portableProject = {
        version: '2.1-session-zip',
        exportedAt: new Date().toISOString(),
        project,
        manifestAssets
      };
      zipEntries.unshift({
        path: 'project.json',
        data: encoder.encode(JSON.stringify(portableProject, null, 2))
      });

      const zipBlob = createZipArchiveBlob(zipEntries);
      const a = document.createElement('a');
      const dlUrl = URL.createObjectURL(zipBlob);
      a.href = dlUrl;
      a.download = `${project.name.replace(/[^a-zA-Z0-9_-]/g, '_') || 'cloudlyric_project'}.zip`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(dlUrl), 10000);
      showToast('Downloaded complete .ZIP Project Bundle (Config + Timings + Fonts + Media)!', 'success');
    } catch (err) {
      showToast('Failed to package .ZIP: ' + err.message, 'error');
    } finally {
      setIsZipPackaging(false);
    }
  };

  const importProjectArchive = async (file) => {
    if (!file) return;
    if (file.name.endsWith('.json') || file.name.endsWith('.cloudlyrics')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          const projData = imported.project || imported;
          setProject(prev => ({ ...prev, ...projData, id: projData.id || 'proj_' + Date.now() }));
          setLyricsRawText((projData.lyrics || []).map(l => l.text).join('\n'));
          setShowProjectModal(false);
          showToast('Project configuration imported!', 'success');
        } catch (_) {
          showToast('Invalid JSON project file.', 'error');
        }
      };
      reader.readAsText(file);
      return;
    }

    setIsZipPackaging(true);
    try {
      showToast(`Extracting "${file.name}" & restoring session assets...`, 'info');
      const arrBuf = await file.arrayBuffer();
      const filesMap = await parseZipArchiveBuffer(arrBuf);
      if (!filesMap['project.json']) {
        throw new Error('Archive does not contain a valid project.json manifest.');
      }

      const decoder = new TextDecoder();
      const parsedPayload = JSON.parse(decoder.decode(filesMap['project.json']));
      const restoredProject = parsedPayload.project || parsedPayload;
      const manifest = parsedPayload.manifestAssets || {};

      if (Array.isArray(manifest.fonts)) {
        for (const fMeta of manifest.fonts) {
          const fontBytes = filesMap[fMeta.path];
          if (fontBytes) {
            const fontBlob = new Blob([fontBytes]);
            const fontFace = new FontFace(fMeta.fontFamilyId, fontBytes.buffer);
            const loadedFace = await fontFace.load();
            document.fonts.add(loadedFace);
            sessionBlobsRef.current.fonts.set(fMeta.fontFamilyId, {
              fontFamilyId: fMeta.fontFamilyId,
              fileName: fMeta.fileName,
              cleanName: fMeta.cleanName,
              family: fMeta.family,
              blob: fontBlob
            });
            setAvailableFonts(prev => [
              { id: fMeta.fontFamilyId, name: `${fMeta.cleanName} (Restored Font)`, family: fMeta.family, isCustom: true },
              ...prev.filter(x => x.family !== fMeta.family)
            ]);
          }
        }
      }

      if (manifest.audioPath && filesMap[manifest.audioPath]) {
        const audioBytes = filesMap[manifest.audioPath];
        const audioBlob = new Blob([audioBytes], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        sessionBlobsRef.current.audio = {
          fileName: restoredProject.audio?.fileName || 'restored_audio.mp3',
          blob: audioBlob,
          url: audioUrl
        };
        restoredProject.audio = { ...restoredProject.audio, audioUrl };
        try {
          const actx = new (window.AudioContext || window.webkitAudioContext)();
          const decoded = await actx.decodeAudioData(audioBytes.buffer.slice(0));
          decodedAudioBufferRef.current = decoded;
          restoredProject.audio.duration = decoded.duration;
          restoredProject.audio.waveformPeaks = extractPeaksFromAudioBuffer(decoded, 140);
        } catch (e) {}
      }

      if (manifest.backgroundPath && filesMap[manifest.backgroundPath]) {
        const bgBytes = filesMap[manifest.backgroundPath];
        const isVid = manifest.backgroundMediaType === 'video';
        const bgBlob = new Blob([bgBytes], { type: isVid ? 'video/mp4' : 'image/png' });
        const bgUrl = URL.createObjectURL(bgBlob);
        const bgName = manifest.backgroundPath.split('/').pop();
        sessionBlobsRef.current.backgrounds.set(bgUrl, { fileName: bgName, blob: bgBlob, mediaType: isVid ? 'video' : 'image' });
        restoredProject.background = { ...restoredProject.background, type: 'custom', customUrl: bgUrl, customFileName: bgName, customMediaType: isVid ? 'video' : 'image' };
        setCustomBackgrounds(prev => [{ id: 'bg_' + Date.now(), name: bgName, url: bgUrl, mediaType: isVid ? 'video' : 'image' }, ...prev]);

        if (isVid) {
          const vid = document.createElement('video');
          vid.src = bgUrl;
          vid.muted = true;
          vid.loop = true;
          vid.playsInline = true;
          vid.onloadeddata = () => {
            vid.play().catch(() => {});
            mediaAssetsRef.current.bgVideoElement = vid;
            mediaAssetsRef.current.bgImageElement = null;
          };
        } else {
          const img = new Image();
          img.src = bgUrl;
          img.onload = () => {
            mediaAssetsRef.current.bgImageElement = img;
            mediaAssetsRef.current.bgVideoElement = null;
          };
        }
      }

      if (manifest.overlayPath && filesMap[manifest.overlayPath]) {
        const ovBytes = filesMap[manifest.overlayPath];
        const isVid = manifest.overlayMediaType === 'video';
        const ovBlob = new Blob([ovBytes], { type: isVid ? 'video/webm' : 'image/png' });
        const ovUrl = URL.createObjectURL(ovBlob);
        const ovName = manifest.overlayPath.split('/').pop();
        sessionBlobsRef.current.overlays.set(ovUrl, { fileName: ovName, blob: ovBlob, mediaType: isVid ? 'video' : 'image' });
        restoredProject.overlay = { ...(restoredProject.overlay || {}), enabled: true, customUrl: ovUrl, customFileName: ovName, mediaType: isVid ? 'video' : 'image' };
        setCustomOverlays(prev => [{ id: 'ov_' + Date.now(), name: ovName, url: ovUrl, mediaType: isVid ? 'video' : 'image' }, ...prev]);

        if (isVid) {
          const vid = document.createElement('video');
          vid.src = ovUrl;
          vid.muted = true;
          vid.loop = true;
          vid.playsInline = true;
          vid.onloadeddata = () => {
            vid.play().catch(() => {});
            mediaAssetsRef.current.overlayVideoElement = vid;
            mediaAssetsRef.current.overlayImageElement = null;
          };
        } else {
          const img = new Image();
          img.src = ovUrl;
          img.onload = () => {
            mediaAssetsRef.current.overlayImageElement = img;
            mediaAssetsRef.current.overlayVideoElement = null;
          };
        }
      }

      setProject(prev => ({ ...prev, ...restoredProject }));
      setLyricsRawText((restoredProject.lyrics || []).map(l => l.text).join('\n'));
      setShowProjectModal(false);
      showToast('Complete .ZIP Project & all custom assets restored to session!', 'success');
    } catch (err) {
      showToast('Failed to restore .ZIP project: ' + err.message, 'error');
    } finally {
      setIsZipPackaging(false);
    }
  };

  // ==========================================
  // LOCAL MP4 + AUDIO RENDERING PIPELINE
  // ==========================================
  const getResolutionDimensions = (res, aspect) => {
    const base = res === '1080p' ? 1080 : 720;
    if (aspect === '9:16') return { width: base, height: Math.round((base * 16) / 9) };
    if (aspect === '16:9') return { width: Math.round((base * 16) / 9), height: base };
    return { width: base, height: base };
  };

  const startLocalVideoRender = async () => {
    setExportStatus('rendering');
    setExportProgress(0);
    if (exportedVideoUrl) {
      URL.revokeObjectURL(exportedVideoUrl);
      setExportedVideoUrl(null);
    }
    exportAbortRef.current = false;
    stopWebAudioPlayback();

    const { width, height } = getResolutionDimensions(exportConfig.resolution, project.aspectRatio);
    const fps = exportConfig.fps || 30;
    const duration = Math.min(project.audio?.duration || 24, 300);

    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = width;
    offscreenCanvas.height = height;
    const ctx = offscreenCanvas.getContext('2d');

    try {
      const canvasStream = offscreenCanvas.captureStream(fps);
      const combinedTracks = [...canvasStream.getVideoTracks()];
      let exportAudioCtx = null;
      let audioSource = null;

      if (decodedAudioBufferRef.current) {
        exportAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (exportAudioCtx.state === 'suspended') await exportAudioCtx.resume();
        const dest = exportAudioCtx.createMediaStreamDestination();
        audioSource = exportAudioCtx.createBufferSource();
        audioSource.buffer = decodedAudioBufferRef.current;
        audioSource.connect(dest);
        combinedTracks.push(...dest.stream.getAudioTracks());
      }

      const combinedStream = new MediaStream(combinedTracks);
      const mimeTypes = ['video/mp4;codecs=avc1,mp4a.40.2', 'video/mp4', 'video/webm;codecs=vp9,opus', 'video/webm'];
      const selectedMime = mimeTypes.find(m => MediaRecorder.isTypeSupported(m)) || '';
      const recorder = new MediaRecorder(combinedStream, selectedMime ? { mimeType: selectedMime, videoBitsPerSecond: 6000000 } : undefined);
      const chunks = [];
      recorder.ondataavailable = e => { if (e.data && e.data.size > 0) chunks.push(e.data); };

      const recordingPromise = new Promise((resolve, reject) => {
        recorder.onstop = () => {
          const ext = selectedMime.includes('mp4') ? 'mp4' : 'webm';
          setExportedVideoExt(ext);
          resolve(new Blob(chunks, { type: selectedMime || 'video/mp4' }));
        };
        recorder.onerror = reject;
      });

      recorder.start(100);
      if (audioSource) audioSource.start(0);

      const startTimePerf = performance.now();
      await new Promise((resolve) => {
        const stepFrame = () => {
          if (exportAbortRef.current) {
            if (recorder.state !== 'inactive') recorder.stop();
            if (audioSource) { try { audioSource.stop(); } catch (_) {} }
            resolve();
            return;
          }
          const elapsedSec = (performance.now() - startTimePerf) / 1000;
          if (elapsedSec >= duration) {
            if (recorder.state !== 'inactive') recorder.stop();
            if (audioSource) { try { audioSource.stop(); } catch (_) {} }
            resolve();
            return;
          }
          renderFrameToCanvas(ctx, width, height, elapsedSec, project, mediaAssetsRef.current);
          setExportProgress(Math.min(99, Math.round((elapsedSec / duration) * 100)));
          setTimeout(stepFrame, 1000 / fps);
        };
        stepFrame();
      });

      if (exportAbortRef.current) {
        if (exportAudioCtx) exportAudioCtx.close();
        setExportStatus('idle');
        return;
      }

      const finalBlob = await recordingPromise;
      if (exportAudioCtx) exportAudioCtx.close();
      setExportedVideoUrl(URL.createObjectURL(finalBlob));
      setExportProgress(100);
      setExportStatus('completed');
      showToast('Video rendered with synchronized stereo audio, custom overlays & animations!', 'success');
    } catch (err) {
      setExportStatus('error');
      showToast('Export error: ' + err.message, 'error');
    }
  };

  const openSavedProjectsModal = async () => {
    const list = await getAllProjectsFromIDB();
    setSavedProjectsList(list || []);
    setShowProjectModal(true);
  };

  const { width: canvasWidth, height: canvasHeight } = getResolutionDimensions('720p', project.aspectRatio);
  const currentActiveLyricIdx = project.lyrics.findIndex(l => currentTime >= l.startTime && currentTime <= l.endTime);

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-[#03060C] text-slate-100 font-sans overflow-hidden select-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Caveat:wght@600;700&family=Cinzel:wght@600;700;800&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&family=Montserrat:wght@600;700;800&family=Oswald:wght@600;700&family=Pacifico&family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Poppins:wght@500;600;700&family=Space+Grotesk:wght@500;700&family=Syne:wght@700;800&display=swap');
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #040811; }
        ::-webkit-scrollbar-thumb { background: #162238; border-radius: 9999px; }
        .apple-btn { transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .apple-btn:hover { transform: translateY(-1px); }
        .apple-btn:active { transform: scale(0.98); }
        @keyframes tourPulseRing {
          0%, 100% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.7), 0 0 25px rgba(37, 99, 235, 0.8); }
          50% { box-shadow: 0 0 0 8px rgba(56, 189, 248, 0), 0 0 38px rgba(56, 189, 248, 1); }
        }
      `}</style>

      {/* ==========================================
          CLOUDLYRIC OFFICIAL MINIMALIST DARK-BLUE WEBSITE
          ========================================== */}
      {showLandingPage && (
        <div className={`fixed inset-0 z-50 bg-[#02050A] text-slate-100 overflow-y-auto overflow-x-hidden select-text transition-all duration-700 ${isTransitioningToStudio ? 'opacity-0 scale-105 blur-md pointer-events-none' : 'opacity-100 scale-100'}`}>
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full bg-blue-600/10 blur-[140px]" />
            <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-sky-500/5 blur-[130px]" />
          </div>

          <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#02050A]/85 border-b border-slate-800/70">
            <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#0B1528] border border-blue-500/40 flex items-center justify-center text-sky-400">
                  <Icon.Sparkles />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-base tracking-tight text-white">CloudLyric</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-blue-950/80 text-sky-400 border border-blue-800/50">Studio</span>
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-8 text-xs font-medium text-slate-400">
                <a href="#features" className="hover:text-white transition">Capabilities</a>
                <a href="#creator" className="hover:text-sky-400 transition">Creator</a>
              </div>

              <button
                onClick={() => trigger3SecCinematicTransition(true)}
                className="apple-btn px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-900/30 border border-blue-400/30 flex items-center space-x-1.5"
              >
                <span>Try It For Free</span>
                <span>→</span>
              </button>
            </div>
          </header>

          <section className="relative max-w-5xl mx-auto px-4 sm:px-8 pt-14 sm:pt-24 pb-16 text-center space-y-6">
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-[#071020] border border-blue-500/30 text-[11px] font-medium text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span>Crafted by <strong className="text-sky-400 tracking-wider">P U N I T &nbsp; A R Y A</strong></span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12] max-w-3xl mx-auto">
              Minimalist Lyric Video Production. <br />
              <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Account-Free &amp; Synchronized in One Pass.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed font-normal">
              Zero login required. Upload custom backgrounds, overlays &amp; fonts directly into your session, tap <kbd className="px-1.5 py-0.5 bg-[#0A1324] border border-slate-700 rounded text-sky-300 font-mono text-xs">SPACE</kbd> as each lyric is sung, and export MP4 video or a portable <code className="text-sky-300">.ZIP</code> project bundle.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => trigger3SecCinematicTransition(true)}
                className="w-full sm:w-auto apple-btn px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-xl shadow-blue-950/60 border border-blue-400/30 flex items-center justify-center space-x-2"
              >
                <span>Try It For Free (Interactive Tour)</span>
                <span>→</span>
              </button>
              <button
                onClick={() => trigger3SecCinematicTransition(false)}
                className="w-full sm:w-auto apple-btn px-6 py-3.5 rounded-xl bg-[#071020] hover:bg-[#0C1A33] text-slate-300 text-xs font-semibold border border-slate-800 flex items-center justify-center space-x-2"
              >
                <span>Open Studio Directly</span>
              </button>
            </div>

            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
              {[
                { label: 'Synchronization', val: 'Live Spacebar & Touch' },
                { label: 'Custom Assets', val: 'BG, Overlays, VFX & Fonts' },
                { label: 'Keyframe Studio', val: 'Custom Easing & Motion' },
                { label: 'Zero Login', val: 'MP4 & .ZIP Bundle Export' }
              ].map((stat, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#060D1A] border border-slate-800/80">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">{stat.label}</div>
                  <div className="text-xs font-semibold text-slate-200 mt-1">{stat.val}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="features" className="max-w-6xl mx-auto px-4 sm:px-8 py-14 border-t border-slate-900">
            <div className="mb-10">
              <span className="text-[11px] font-mono uppercase tracking-widest text-sky-400">Architecture</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Account-Free Creative Editor</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { badge: 'SPACE', title: 'One-Pass Live Sync', desc: 'Play your audio and tap SPACEBAR (or the mobile touch pad) as each line is sung. Frame-accurate timestamps lock in automatically.' },
                { badge: 'KEY [I] & [O]', title: 'Live Instrumental & Outro', desc: 'Press [I] live for an animated equalizer break during music solos, and press [O] to trigger ending credits on the beat.' },
                { badge: 'DIRECT ASSETS', title: 'Backgrounds, Overlays & Fonts', desc: 'Upload JPG/PNG/WebP/MP4/WebM backgrounds, PNG/GIF/WebM foreground overlays, and TTF/OTF/WOFF/WOFF2 fonts with zero account required.' },
                { badge: 'KEYFRAMES', title: 'Custom Keyframe Motion Builder', desc: 'Design custom text animations with multi-stop keyframes, X/Y offset, scale, rotation, opacity, motion blur, and easing curves.' },
                { badge: '.ZIP BUNDLE', title: 'Portable Project .ZIP Archive', desc: 'Download your entire session (config, timings, custom fonts, audio, and backgrounds) as a self-contained .ZIP file to resume anytime.' },
                { badge: 'MP4 + AAC', title: 'Local Video Rendering', desc: 'Renders frames, custom overlays, VFX, and stereo audio directly inside your browser into a downloadable MP4 file.' }
              ].map((f, i) => (
                <div key={i} className="p-5 rounded-2xl bg-[#050B16] border border-slate-800/80 hover:border-blue-500/40 transition flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <span className="inline-block text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-[#0A162C] text-sky-400 border border-blue-500/20">
                      {f.badge}
                    </span>
                    <h3 className="text-sm font-bold text-white">{f.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="creator" className="max-w-5xl mx-auto px-4 sm:px-8 py-12">
            <div className="rounded-2xl bg-gradient-to-b from-[#071226] to-[#040914] border border-blue-500/30 p-6 sm:p-10 text-center space-y-4 shadow-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-sky-300 text-[10px] font-mono uppercase tracking-widest">
                <span>★ Creator Spotlight &amp; Shoutout</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                Special Shoutout to <span className="text-sky-400 tracking-widest">P U N I T &nbsp; A R Y A</span> (पुनीत आर्य)
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Thank you to <strong className="text-white">Punit Arya (पुनीत आर्य)</strong> for envisioning and building this wonderful lyric video studio — empowering creators, musicians, and editors to synchronize and render professional lyric videos effortlessly on any device.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => trigger3SecCinematicTransition(true)}
                  className="apple-btn px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg border border-blue-400/30"
                >
                  Enter Studio &amp; Start Hover Tutorial →
                </button>
              </div>
            </div>
          </section>

          <footer className="border-t border-slate-900 py-6 px-4 text-center text-[11px] text-slate-500">
            CloudLyric Studio • Created with Vision by <strong className="text-slate-300">P U N I T  A R Y A (पुनीत आर्य)</strong>
          </footer>
        </div>
      )}

      {/* ==========================================
          3-SECOND CINEMATIC TRANSITION ANIMATION OVERLAY
          ========================================== */}
      {isTransitioningToStudio && (
        <div className="fixed inset-0 z-[60] pointer-events-none flex items-center justify-center">
          <canvas ref={transitionCanvasRef} className="w-full h-full block" />
        </div>
      )}

      {/* ==========================================
          REAL BUTTON-BY-BUTTON HOVER SPOTLIGHT TUTORIAL
          ========================================== */}
      {showGuidedTour && !showLandingPage && (() => {
        const currentTour = TOUR_STEPS[tourStep] || TOUR_STEPS[0];
        const rect = tourTargetRect;
        const isSmallViewport = typeof window !== 'undefined' && window.innerWidth < 640;
        const tooltipWidth = isSmallViewport ? Math.min(340, window.innerWidth - 24) : 330;
        let cardTop = isSmallViewport ? window.innerHeight - 235 : window.innerHeight / 2 - 100;
        let cardLeft = isSmallViewport ? 12 : window.innerWidth / 2 - tooltipWidth / 2;

        if (rect) {
          if (isSmallViewport) {
            const targetInBottomHalf = rect.top > window.innerHeight * 0.52;
            cardTop = targetInBottomHalf ? Math.max(12, rect.top - 210) : Math.min(window.innerHeight - 220, rect.top + rect.height + 14);
            cardLeft = 12;
          } else {
            const spaceBelow = window.innerHeight - (rect.top + rect.height);
            if (spaceBelow > 210) {
              cardTop = rect.top + rect.height + 16;
            } else {
              cardTop = Math.max(16, rect.top - 195);
            }
            cardLeft = Math.max(16, Math.min(window.innerWidth - tooltipWidth - 16, rect.left + rect.width / 2 - tooltipWidth / 2));
          }
        }

        return (
          <div className="fixed inset-0 z-50 pointer-events-none">
            <div className="fixed inset-0 bg-[#02050B]/60 pointer-events-auto" onClick={() => setShowGuidedTour(false)} />

            {rect && (
              <div
                style={{
                  position: 'fixed',
                  top: rect.top - 6,
                  left: rect.left - 6,
                  width: rect.width + 12,
                  height: rect.height + 12,
                  animation: 'tourPulseRing 1.6s infinite'
                }}
                className="z-50 rounded-xl border-2 border-sky-400 bg-sky-400/10 pointer-events-none transition-all duration-300"
              >
                <div className="absolute -top-3 -right-2 px-1.5 py-0.5 rounded bg-sky-400 text-[#02060D] text-[9px] font-extrabold uppercase tracking-wider shadow">
                  ★ Target
                </div>
              </div>
            )}

            <div
              style={{
                position: 'fixed',
                top: cardTop,
                left: cardLeft,
                width: tooltipWidth
              }}
              className="z-50 pointer-events-auto bg-[#071122] border border-sky-400/50 rounded-2xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.9)] space-y-3 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-950 text-sky-400 border border-sky-500/30">
                  {currentTour.badge}
                </span>
                <button onClick={() => setShowGuidedTour(false)} className="text-[11px] text-slate-400 hover:text-white">
                  Skip ✕
                </button>
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">{currentTour.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{currentTour.desc}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div className="flex items-center space-x-1">
                  {TOUR_STEPS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleTourStepChange(idx)}
                      className={`h-1.5 rounded-full transition-all ${tourStep === idx ? 'w-5 bg-sky-400' : 'w-1.5 bg-slate-700'}`}
                    />
                  ))}
                </div>

                <div className="flex items-center space-x-1.5">
                  {tourStep > 0 && (
                    <button
                      onClick={() => handleTourStepChange(tourStep - 1)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#0B1830] hover:bg-[#122447] text-slate-300 text-xs font-semibold border border-slate-700"
                    >
                      Back
                    </button>
                  )}
                  <button
                    onClick={() => handleTourStepChange(tourStep + 1)}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow"
                  >
                    {tourStep === TOUR_STEPS.length - 1 ? 'Finish ✓' : 'Next Button →'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Hidden HTMLAudioElement */}
      <audio ref={audioRef} src={project.audio?.audioUrl || undefined} preload="auto" className="hidden" />

      {/* ==========================================
          TOP STUDIO HEADER BAR
          ========================================== */}
      <header className="h-12 sm:h-14 border-b border-slate-800/80 bg-[#050A14] px-2 sm:px-4 flex items-center justify-between gap-1.5 sm:gap-2 z-20 shrink-0 w-full">
        <div className="flex items-center space-x-1.5 sm:space-x-2 min-w-0 flex-1">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0B172E] flex items-center justify-center border border-blue-500/40 text-sky-400 shrink-0">
            <Icon.Sparkles />
          </div>
          <div className="min-w-0 flex-1 max-w-[115px] xs:max-w-[150px] sm:max-w-[220px]">
            <input
              type="text"
              value={project.name}
              onChange={(e) => updateProject({ name: e.target.value })}
              className="bg-transparent text-xs sm:text-sm font-semibold text-slate-100 hover:bg-white/5 focus:bg-white/10 focus:outline-none rounded px-1.5 py-0.5 transition w-full truncate"
            />
          </div>

          <div className="hidden md:flex items-center space-x-1 border-l border-white/10 pl-3">
            <button onClick={undo} disabled={historyIndex <= 0} title="Undo" className="p-1.5 rounded-lg hover:bg-white/5 disabled:opacity-30 text-slate-300">
              <Icon.Undo />
            </button>
            <button onClick={redo} disabled={historyIndex >= history.length - 1} title="Redo" className="p-1.5 rounded-lg hover:bg-white/5 disabled:opacity-30 text-slate-300">
              <Icon.Redo />
            </button>
          </div>
        </div>

        <div className="hidden xl:flex items-center bg-[#081121] p-1 rounded-xl border border-slate-800 space-x-1">
          {[
            { id: '9:16', label: '9:16 Reels', icon: Icon.Ratio916 },
            { id: '16:9', label: '16:9 YouTube', icon: Icon.Ratio169 },
            { id: '1:1', label: '1:1 Square', icon: Icon.Ratio11 }
          ].map(r => {
            const RIcon = r.icon;
            return (
              <button
                key={r.id}
                onClick={() => updateProject({ aspectRatio: r.id })}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                  project.aspectRatio === r.id ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <RIcon />
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
          <button
            onClick={() => setShowLandingPage(true)}
            className="apple-btn px-2 py-1.5 bg-[#091224] hover:bg-[#10203D] text-slate-300 text-[11px] font-medium rounded-lg border border-slate-800 flex items-center space-x-1"
            title="Website"
          >
            <span>🌐</span>
            <span className="hidden sm:inline">Website</span>
          </button>

          <button
            onClick={() => { setTourStep(0); setShowGuidedTour(true); }}
            className="apple-btn px-2 py-1.5 bg-[#091224] hover:bg-[#10203D] text-sky-400 text-[11px] font-medium rounded-lg border border-blue-500/30 flex items-center space-x-1"
            title="Hover Tour"
          >
            <span>🎓</span>
            <span className="hidden sm:inline">Tour</span>
          </button>

          <button
            id="tour-mode-switch"
            onClick={() => {
              const nextMode = !isPhoneMode;
              setIsPhoneMode(nextMode);
              showToast(nextMode ? 'Switched to Phone Studio' : 'Switched to Desktop Studio', 'info');
            }}
            className={`apple-btn flex items-center space-x-1 px-2 sm:px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition ${
              isPhoneMode ? 'bg-blue-600/20 text-sky-300 border-blue-500/40' : 'bg-[#091224] hover:bg-[#10203D] text-slate-200 border-slate-800'
            }`}
          >
            {isPhoneMode ? <Icon.Monitor /> : <Icon.Smartphone />}
            <span className="hidden md:inline">{isPhoneMode ? 'Desktop UI' : 'Phone UI'}</span>
          </button>

          <button
            onClick={openSavedProjectsModal}
            className="flex items-center space-x-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg bg-[#091224] hover:bg-[#10203D] border border-slate-800 text-[11px] sm:text-xs font-medium text-slate-200 transition"
            title="Download / Import Project .ZIP Bundle"
          >
            <Icon.Folder />
            <span className="hidden lg:inline">Project .ZIP</span>
          </button>

          <button
            id="tour-export-btn"
            onClick={() => { setExportStatus('idle'); setShowExportModal(true); }}
            className="apple-btn flex items-center space-x-1 px-2.5 sm:px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] sm:text-xs font-semibold shadow-lg shadow-blue-950/50 border border-blue-400/30 transition"
          >
            <Icon.Download />
            <span>Export</span>
          </button>
        </div>
      </header>

      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed bottom-16 sm:bottom-6 right-3 left-3 sm:left-auto z-50 flex items-center space-x-2.5 px-4 py-2.5 rounded-xl bg-[#071124]/95 border border-blue-500/40 shadow-2xl text-xs font-medium text-slate-100 backdrop-blur-md">
          <span className={`w-2 h-2 rounded-full shrink-0 ${notification.type === 'error' ? 'bg-rose-500' : 'bg-sky-400'}`} />
          <span className="truncate">{notification.msg}</span>
        </div>
      )}

      {/* ==========================================
          ADAPTIVE WORKSPACE BODY: PHONE STUDIO VS DESKTOP STUDIO
          ========================================== */}
      {isPhoneMode ? (
        <div className="flex-1 flex flex-col bg-[#03060C] overflow-hidden min-h-0 w-full">
          <div className="w-full max-w-lg mx-auto flex-1 flex flex-col min-h-0 bg-[#050B16] sm:border-x border-slate-800/80 shadow-2xl overflow-hidden">
            {/* Compact Top Video Preview & Scrubber */}
            <div className="bg-[#030710] px-2.5 py-2 border-b border-slate-800/80 shrink-0 flex flex-col items-center w-full">
              <div className="w-full flex items-center justify-between gap-1 mb-1.5">
                <div className="flex items-center space-x-1">
                  {['9:16', '16:9', '1:1'].map(r => (
                    <button
                      key={r}
                      onClick={() => updateProject({ aspectRatio: r })}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                        project.aspectRatio === r ? 'bg-blue-600 text-white' : 'bg-[#091326] text-slate-400'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                  <button
                    onClick={() => updateProject({ showSafeArea: !project.showSafeArea })}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border transition ${
                      project.showSafeArea ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'bg-[#091326] text-slate-400 border-transparent'
                    }`}
                  >
                    Safe
                  </button>
                </div>

                <div className="flex items-center space-x-1.5">
                  <span className="text-[10px] font-mono text-sky-400">
                    {formatTime(currentTime)}
                  </span>
                  <button
                    onClick={() => setCompactPhonePreview(!compactPhonePreview)}
                    className="px-2 py-0.5 rounded bg-[#091326] border border-slate-800 text-[10px] font-semibold text-slate-300 active:scale-95"
                  >
                    {compactPhonePreview ? '↕ Expand' : '↕ Mini'}
                  </button>
                </div>
              </div>

              <div
                style={{
                  aspectRatio: project.aspectRatio === '9:16' ? '9/16' : project.aspectRatio === '16:9' ? '16/9' : '1/1',
                  height: compactPhonePreview ? '78px' : 'min(26vh, 185px)'
                }}
                className="relative rounded-xl overflow-hidden border border-slate-800 bg-black shadow-lg flex items-center justify-center transition-all duration-200"
              >
                <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} className="w-full h-full object-contain" />
              </div>

              <div className="w-full flex items-center space-x-2 mt-2">
                <button
                  onClick={() => handleSeek(0)}
                  className="p-1.5 rounded-lg bg-[#091326] text-slate-300 shrink-0 active:scale-95"
                  title="Restart"
                >
                  <Icon.SkipBack />
                </button>
                <button
                  onClick={togglePlay}
                  className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow shrink-0 active:scale-95"
                >
                  {isPlaying ? <Icon.Pause /> : <Icon.Play />}
                </button>
                <input
                  type="range"
                  min="0"
                  max={project.audio?.duration || 24}
                  step="0.05"
                  value={currentTime}
                  onChange={(e) => handleSeek(parseFloat(e.target.value))}
                  className="flex-1 min-w-0 accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded-lg bg-[#091326] text-slate-300 shrink-0 active:scale-95"
                >
                  {isMuted ? <Icon.Mute /> : <Icon.Volume />}
                </button>
              </div>
            </div>

            {/* Scrollable Mobile Content Area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-2.5 sm:p-3 space-y-2.5 min-h-0 w-full">
              {activeTab === 'audio_lyrics' && (
                <div className="space-y-2.5 w-full">
                  <div className="bg-[#081121] border border-slate-800 rounded-2xl p-3 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-white">1. Upload Audio Track</span>
                      <span className="text-[10px] font-mono text-sky-400 truncate max-w-[140px]">
                        {project.audio?.fileName || 'No song loaded'}
                      </span>
                    </div>
                    <label id="tour-upload-audio" className="w-full py-2.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 rounded-xl flex items-center justify-center space-x-1.5 cursor-pointer text-xs font-bold text-sky-200 active:scale-95 transition">
                      <Icon.Music />
                      <span>Upload MP3 / WAV Song</span>
                      <input type="file" accept="audio/*" onChange={(e) => handleAudioUpload(e.target.files[0])} className="hidden" />
                    </label>
                  </div>

                  <div id="tour-intro-outro" className="bg-[#081121] border border-slate-800 rounded-2xl p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">2. YouTube Intro &amp; Outro</span>
                      <div className="flex items-center space-x-3">
                        <label className="flex items-center space-x-1 text-[10px] text-slate-300">
                          <input
                            type="checkbox"
                            checked={project.intro?.enabled ?? true}
                            onChange={(e) => updateProject(p => ({ intro: { ...p.intro, enabled: e.target.checked } }))}
                            className="accent-blue-500 rounded"
                          />
                          <span>Intro</span>
                        </label>
                        <label className="flex items-center space-x-1 text-[10px] text-slate-300">
                          <input
                            type="checkbox"
                            checked={project.outro?.enabled ?? true}
                            onChange={(e) => updateProject(p => ({ outro: { ...p.outro, enabled: e.target.checked } }))}
                            className="accent-blue-500 rounded"
                          />
                          <span>Outro</span>
                        </label>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Song Title"
                        value={project.intro?.title || ''}
                        onChange={(e) => updateProject(p => ({ intro: { ...p.intro, title: e.target.value } }))}
                        className="w-full min-w-0 bg-[#040914] border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Artist / Singer"
                        value={project.intro?.artist || ''}
                        onChange={(e) => updateProject(p => ({ intro: { ...p.intro, artist: e.target.value } }))}
                        className="w-full min-w-0 bg-[#040914] border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="bg-[#081121] border border-slate-800 rounded-2xl p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">3. Paste Song Lyrics</span>
                      <span className="text-[10px] text-slate-400">{project.lyrics.length} lines</span>
                    </div>
                    <textarea
                      rows="5"
                      value={lyricsRawText}
                      onChange={(e) => handleLyricsImport(e.target.value)}
                      placeholder="Paste your lyrics here (one line per row)..."
                      className="w-full bg-[#040914] border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500 leading-relaxed select-text"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'sync' && (
                <div className="space-y-2.5 w-full">
                  <div className="flex items-center justify-between gap-2 bg-[#081121] p-2.5 rounded-2xl border border-slate-800">
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => updateProject({ syncMode: 'line' })}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${
                          project.syncMode === 'line' ? 'bg-blue-600 text-white' : 'bg-[#040914] text-slate-400'
                        }`}
                      >
                        Line Mode
                      </button>
                      <button
                        onClick={() => updateProject({ syncMode: 'word' })}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${
                          project.syncMode === 'word' ? 'bg-blue-600 text-white' : 'bg-[#040914] text-slate-400'
                        }`}
                      >
                        Word Mode
                      </button>
                    </div>
                    <button
                      onClick={toggleSyncRecordingSession}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition shrink-0 ${
                        isSyncRecording ? 'bg-rose-600 text-white animate-pulse' : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {isSyncRecording ? '⏹ Stop Sync' : '▶ Start Song'}
                    </button>
                  </div>

                  <button
                    id="tour-sync-tap"
                    onClick={handleCaptureTimestamp}
                    className="w-full py-4 px-3 rounded-2xl bg-gradient-to-b from-blue-600 to-blue-800 active:scale-[0.98] transition shadow-xl border border-sky-400/40 flex flex-col items-center justify-center space-y-1 text-center"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-sky-200 bg-black/30 px-2.5 py-0.5 rounded-full">
                      👆 TAP WHEN LINE #{activeSyncIndex + 1} IS SUNG
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-white leading-snug line-clamp-2 break-words max-w-full">
                      {project.lyrics[activeSyncIndex]?.text || 'Paste lyrics in Tab 1 first'}
                    </span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      id="tour-instrumental-btn"
                      onClick={handleInsertInstrumentalNow}
                      className="py-2 px-2 bg-[#09152B] border border-blue-500/30 rounded-xl text-[11px] font-bold text-sky-300 active:scale-95 truncate"
                    >
                      🎵 Instrumental Now
                    </button>
                    <button
                      onClick={handleTriggerOutroNow}
                      className="py-2 px-2 bg-[#09152B] border border-slate-700 rounded-xl text-[11px] font-bold text-slate-200 active:scale-95 truncate"
                    >
                      🎬 Start Outro Now
                    </button>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    {project.lyrics.map((line, idx) => (
                      <div
                        key={line.id}
                        onClick={() => setActiveSyncIndex(idx)}
                        className={`p-2 rounded-xl border text-xs flex items-center justify-between gap-1.5 transition ${
                          idx === activeSyncIndex ? 'bg-blue-950/60 border-sky-400/60 text-white' : 'bg-[#081121] border-slate-800/80 text-slate-300'
                        }`}
                      >
                        <span className="text-[10px] font-mono text-slate-500 w-4 shrink-0">{idx + 1}</span>
                        <input
                          type="text"
                          value={line.text}
                          onChange={(e) => {
                            const updated = [...project.lyrics];
                            updated[idx] = { ...updated[idx], text: e.target.value };
                            updateProject({ lyrics: updated });
                          }}
                          className="flex-1 min-w-0 bg-transparent text-xs text-white focus:outline-none truncate"
                        />
                        <button
                          onClick={(e) => { e.stopPropagation(); handleSeek(line.startTime); }}
                          className="text-[10px] font-mono text-sky-400 shrink-0 px-1.5 py-0.5 rounded bg-black/30"
                        >
                          {formatTime(line.startTime)}
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeleteLyricLine(line.id); }}
                          className="p-1 text-slate-500 hover:text-rose-400 shrink-0"
                        >
                          <Icon.Trash />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(activeTab === 'background' || activeTab === 'typography' || activeTab === 'animation') && (
                <div className="space-y-2.5 w-full">
                  <div className="p-2.5 rounded-xl bg-blue-950/30 border border-blue-500/25 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-sky-200/90 leading-tight">
                      🔒 <strong>Account-Free Session:</strong> Download <strong>.ZIP</strong> to save all assets permanently.
                    </span>
                    <button
                      onClick={exportProjectZipBundle}
                      disabled={isZipPackaging}
                      className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-[10px] font-bold shrink-0"
                    >
                      {isZipPackaging ? 'ZIP...' : 'Save .ZIP'}
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5">
                    <label className="py-2 px-2 bg-[#0C1930] border border-blue-500/40 rounded-xl text-[11px] font-bold text-sky-200 flex items-center justify-center space-x-1 cursor-pointer active:scale-95">
                      <Icon.Image />
                      <span className="truncate">+ BG</span>
                      <input type="file" accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm" onChange={(e) => handleBgMediaUpload(e.target.files[0])} className="hidden" />
                    </label>
                    <label className="py-2 px-2 bg-[#0C1930] border border-purple-500/40 rounded-xl text-[11px] font-bold text-purple-200 flex items-center justify-center space-x-1 cursor-pointer active:scale-95">
                      <Icon.Sparkles />
                      <span className="truncate">+ Overlay</span>
                      <input type="file" accept="image/png,image/gif,image/webp,video/webm,video/mp4" onChange={(e) => handleOverlayMediaUpload(e.target.files[0])} className="hidden" />
                    </label>
                    <label className="py-2 px-2 bg-[#0C1930] border border-blue-500/40 rounded-xl text-[11px] font-bold text-sky-200 flex items-center justify-center space-x-1 cursor-pointer active:scale-95">
                      <Icon.Type />
                      <span className="truncate">+ Font</span>
                      <input type="file" accept=".ttf,.otf,.woff,.woff2" onChange={(e) => handleCustomFontUpload(e.target.files[0])} className="hidden" />
                    </label>
                  </div>

                  <div className="bg-[#081121] p-3 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Foreground VFX &amp; Overlay</span>
                      {project.overlay?.customUrl && (
                        <label className="flex items-center space-x-1 text-[10px] text-sky-300">
                          <input
                            type="checkbox"
                            checked={project.overlay?.enabled || false}
                            onChange={(e) => updateProject(p => ({ overlay: { ...p.overlay, enabled: e.target.checked } }))}
                            className="accent-blue-500 rounded"
                          />
                          <span>Show Overlay</span>
                        </label>
                      )}
                    </div>
                    <select
                      value={project.overlay?.vfxPreset || 'none'}
                      onChange={(e) => updateProject(p => ({ overlay: { ...(p.overlay || {}), vfxPreset: e.target.value } }))}
                      className="w-full bg-[#040914] border border-slate-800 rounded-xl p-2 text-xs text-white outline-none"
                    >
                      <option value="none">No Procedural VFX Overlay</option>
                      <option value="embers">🔥 Floating Fire Embers</option>
                      <option value="bokeh">✨ Dreamy Cinema Bokeh Orbs</option>
                      <option value="snow">❄️ Soft Winter Snowfall</option>
                      <option value="film_grain">🎞️ 35mm Vintage Scanlines &amp; Scratch</option>
                    </select>
                  </div>

                  <div className="bg-[#081121] p-3 rounded-2xl border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-white">14 Atmospheric Shaders</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {BACKGROUND_PRESETS.map(p => (
                        <button
                          key={p.id}
                          onClick={() => updateProject(prev => ({ background: { ...prev.background, type: 'preset', presetId: p.id } }))}
                          className={`p-2 rounded-xl border text-left transition ${
                            project.background.type === 'preset' && project.background.presetId === p.id
                              ? 'border-sky-400 bg-blue-950/40'
                              : 'border-slate-800 bg-[#040914]'
                          }`}
                        >
                          <div className="h-5 rounded-md mb-1" style={{ background: `linear-gradient(135deg, ${p.color1}, ${p.color2}, ${p.color3})` }} />
                          <div className="text-[10px] font-semibold text-slate-200 truncate">{p.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#081121] p-3 rounded-2xl border border-slate-800 space-y-2.5">
                    <span className="text-xs font-bold text-white block">Typography &amp; Motion</span>
                    <select
                      value={project.typography.fontFamily}
                      onChange={(e) => updateProject(p => ({ typography: { ...p.typography, fontFamily: e.target.value } }))}
                      className="w-full bg-[#040914] border border-slate-800 rounded-xl p-2 text-xs text-white"
                    >
                      {availableFonts.map(f => (
                        <option key={f.name} value={f.family}>{f.name}</option>
                      ))}
                    </select>

                    <div>
                      <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                        <span>Font Size</span>
                        <span>{project.typography.fontSize}px</span>
                      </div>
                      <input
                        type="range"
                        min="24"
                        max="96"
                        value={project.typography.fontSize}
                        onChange={(e) => updateProject(p => ({ typography: { ...p.typography, fontSize: parseInt(e.target.value, 10) } }))}
                        className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg"
                      />
                    </div>

                    <select
                      value={project.animation.preset}
                      onChange={(e) => updateProject(p => ({ animation: { ...p.animation, preset: e.target.value } }))}
                      className="w-full bg-[#040914] border border-slate-800 rounded-xl p-2 text-xs text-white"
                    >
                      {ANIMATIONS.map(a => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Mobile Navigation Bar */}
            <nav className="h-14 bg-[#040812] border-t border-slate-800 grid grid-cols-4 gap-1 px-2 shrink-0 w-full">
              {[
                { id: 'audio_lyrics', label: '1. Audio/Text', icon: Icon.Music },
                { id: 'sync', label: '2. Tap Sync', icon: Icon.Mic, domId: 'tour-nav-sync' },
                { id: 'background', label: '3. Visuals', icon: Icon.Image, domId: 'tour-nav-visuals' },
                { id: 'export_trigger', label: '4. Export MP4', icon: Icon.Download }
              ].map(tab => {
                const TIcon = tab.icon;
                const isActive = activeTab === tab.id || (tab.id === 'background' && (activeTab === 'typography' || activeTab === 'animation'));
                return (
                  <button
                    key={tab.id}
                    id={tab.domId}
                    onClick={() => {
                      if (tab.id === 'export_trigger') {
                        setExportStatus('idle');
                        setShowExportModal(true);
                      } else {
                        setActiveTab(tab.id);
                      }
                    }}
                    className={`flex flex-col items-center justify-center rounded-xl my-1 transition ${
                      tab.id === 'export_trigger'
                        ? 'bg-blue-600 text-white font-bold'
                        : isActive
                        ? 'bg-blue-950/80 text-sky-400 border border-blue-500/30 font-bold'
                        : 'text-slate-400'
                    }`}
                  >
                    <TIcon />
                    <span className="text-[10px] mt-0.5 truncate max-w-full px-1">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      ) : (
        /* ==========================================
           FULL DESKTOP MULTI-TRACK STUDIO
           ========================================== */
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
          <div className="flex-1 flex overflow-hidden min-h-0">
            {/* Left Vertical Studio Navigation Rail */}
            <nav className="w-20 bg-[#050A14] border-r border-slate-800/80 flex flex-col items-center py-4 space-y-2 shrink-0">
              {[
                { id: 'audio_lyrics', label: 'Lyrics', icon: Icon.Music },
                { id: 'sync', label: 'Sync', icon: Icon.Mic, domId: 'tour-nav-sync' },
                { id: 'background', label: 'Visuals', icon: Icon.Image, domId: 'tour-nav-visuals' },
                { id: 'typography', label: 'Fonts', icon: Icon.Type },
                { id: 'animation', label: 'Motion', icon: Icon.Sparkles }
              ].map(t => {
                const TIcon = t.icon;
                const active = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    id={t.domId}
                    onClick={() => setActiveTab(t.id)}
                    className={`w-14 py-2.5 rounded-xl flex flex-col items-center justify-center space-y-1 transition ${
                      active ? 'bg-blue-600 text-white shadow-lg shadow-blue-950/60' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <TIcon />
                    <span className="text-[10px] font-semibold">{t.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Left Inspector Panel */}
            <aside className="w-80 lg:w-96 bg-[#060C18] border-r border-slate-800/80 flex flex-col overflow-y-auto p-4 space-y-4 shrink-0">
              {activeTab === 'audio_lyrics' && (
                <div className="space-y-4">
                  <div className="bg-[#091326] border border-slate-800 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">1. Audio Track (MP3 / WAV)</span>
                      <span className="text-[10px] font-mono text-sky-400 truncate max-w-[140px]">{project.audio?.fileName || 'No song loaded'}</span>
                    </div>
                    <label id="tour-upload-audio" className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center justify-center space-x-2 cursor-pointer text-xs font-bold shadow transition">
                      <Icon.Music />
                      <span>Upload Audio File</span>
                      <input type="file" accept="audio/*" onChange={(e) => handleAudioUpload(e.target.files[0])} className="hidden" />
                    </label>
                  </div>

                  <div id="tour-intro-outro" className="bg-[#091326] border border-slate-800 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">2. YouTube Intro &amp; Outro Cards</span>
                      <label className="flex items-center space-x-1.5 text-[11px] text-slate-300">
                        <input
                          type="checkbox"
                          checked={project.intro?.enabled ?? true}
                          onChange={(e) => updateProject(p => ({ intro: { ...p.intro, enabled: e.target.checked } }))}
                          className="accent-blue-500 rounded"
                        />
                        <span>Intro Active</span>
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Song Title"
                        value={project.intro?.title || ''}
                        onChange={(e) => updateProject(p => ({ intro: { ...p.intro, title: e.target.value } }))}
                        className="bg-[#040914] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Artist Name"
                        value={project.intro?.artist || ''}
                        onChange={(e) => updateProject(p => ({ intro: { ...p.intro, artist: e.target.value } }))}
                        className="bg-[#040914] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                      <label className="flex items-center space-x-1.5 text-[11px] text-slate-300">
                        <input
                          type="checkbox"
                          checked={project.outro?.enabled ?? true}
                          onChange={(e) => updateProject(p => ({ outro: { ...p.outro, enabled: e.target.checked } }))}
                          className="accent-blue-500 rounded"
                        />
                        <span>Outro Credits</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Thanks for Watching!"
                        value={project.outro?.text || ''}
                        onChange={(e) => updateProject(p => ({ outro: { ...p.outro, text: e.target.value } }))}
                        className="bg-[#040914] border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] text-white w-44"
                      />
                    </div>
                  </div>

                  <div className="bg-[#091326] border border-slate-800 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">3. Paste or Edit Song Lyrics</span>
                      <button onClick={handleAddLyricLine} className="text-[11px] text-sky-400 hover:underline flex items-center space-x-1">
                        <Icon.Plus />
                        <span>Add Line</span>
                      </button>
                    </div>
                    <textarea
                      rows="8"
                      value={lyricsRawText}
                      onChange={(e) => handleLyricsImport(e.target.value)}
                      placeholder="Paste song lyrics here (one lyric line per row)..."
                      className="w-full bg-[#040914] border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500 leading-relaxed select-text"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'sync' && (
                <div className="space-y-3">
                  <div className="bg-[#091326] border border-slate-800 rounded-2xl p-3.5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">One-Pass Live Sync</div>
                        <div className="text-[10px] text-slate-400">Line {activeSyncIndex + 1} of {project.lyrics.length}</div>
                      </div>
                      <button
                        onClick={toggleSyncRecordingSession}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                          isSyncRecording ? 'bg-rose-600 text-white animate-pulse' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        }`}
                      >
                        {isSyncRecording ? '⏹ Stop Sync' : '▶ Start Song + Sync'}
                      </button>
                    </div>

                    <div className="flex bg-[#040914] p-1 rounded-xl border border-slate-800">
                      {['line', 'word'].map(m => (
                        <button
                          key={m}
                          onClick={() => updateProject({ syncMode: m })}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                            project.syncMode === m ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {m}-by-{m} Sync
                        </button>
                      ))}
                    </div>

                    <button
                      id="tour-sync-tap"
                      onClick={handleCaptureTimestamp}
                      className="w-full py-5 px-4 rounded-2xl bg-gradient-to-b from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 active:scale-[0.99] transition shadow-xl border border-sky-400/40 flex flex-col items-center justify-center space-y-1.5 text-center"
                    >
                      <span className="text-[10px] font-mono uppercase tracking-widest text-sky-200 bg-black/30 px-2.5 py-0.5 rounded-full">
                        Press [SPACEBAR] or Click Here
                      </span>
                      <span className="text-sm font-extrabold text-white line-clamp-2">
                        {project.lyrics[activeSyncIndex]?.text || 'No Lyrics Loaded Yet'}
                      </span>
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        id="tour-instrumental-btn"
                        onClick={handleInsertInstrumentalNow}
                        className="py-2.5 px-3 bg-[#0C1A33] hover:bg-[#12264A] border border-blue-500/30 rounded-xl text-xs font-bold text-sky-300 transition"
                      >
                        🎵 Instrumental [I]
                      </button>
                      <button
                        onClick={handleTriggerOutroNow}
                        className="py-2.5 px-3 bg-[#0C1A33] hover:bg-[#12264A] border border-slate-700 rounded-xl text-xs font-bold text-slate-200 transition"
                      >
                        🎬 Start Outro [O]
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    {project.lyrics.map((line, idx) => (
                      <div
                        key={line.id}
                        onClick={() => setActiveSyncIndex(idx)}
                        className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 cursor-pointer transition ${
                          idx === activeSyncIndex
                            ? 'bg-blue-950/70 border-sky-400/70 text-white'
                            : 'bg-[#091326] border-slate-800/80 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-[10px] font-mono text-slate-500 w-5">{idx + 1}</span>
                        <input
                          type="text"
                          value={line.text}
                          onChange={(e) => {
                            const updated = [...project.lyrics];
                            updated[idx] = { ...updated[idx], text: e.target.value };
                            updateProject({ lyrics: updated });
                          }}
                          className="flex-1 bg-transparent text-xs text-white focus:outline-none"
                        />
                        <span
                          onClick={(e) => { e.stopPropagation(); handleSeek(line.startTime); }}
                          className="text-[10px] font-mono text-sky-400 hover:underline"
                        >
                          {formatTime(line.startTime)}
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeleteLyricLine(line.id); }}
                          className="p-1 text-slate-500 hover:text-rose-400"
                        >
                          <Icon.Trash />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'background' && (
                <div className="space-y-4">
                  <div className="bg-[#091326] border border-slate-800 rounded-2xl p-4 space-y-3">
                    <span className="text-xs font-bold text-white block">Custom Image / Video Background</span>
                    <label className="w-full py-2.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 rounded-xl flex items-center justify-center space-x-2 cursor-pointer text-xs font-bold text-sky-300 transition">
                      <Icon.Image />
                      <span>Upload JPG, PNG, WebP, MP4, WebM</span>
                      <input type="file" accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm" onChange={(e) => handleBgMediaUpload(e.target.files[0])} className="hidden" />
                    </label>
                  </div>

                  {/* FOREGROUND OVERLAYS (PNG, GIF, WEBM) & VISUAL EFFECTS (VFX) */}
                  <div className="bg-[#091326] border border-slate-800 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-sky-400">Foreground Overlays &amp; VFX</span>
                      <label className="flex items-center space-x-1.5 text-[11px] text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={project.overlay?.enabled || false}
                          onChange={(e) => updateProject(p => ({ overlay: { ...(p.overlay || {}), enabled: e.target.checked } }))}
                          className="accent-sky-500 rounded"
                        />
                        <span>Enable Overlay</span>
                      </label>
                    </div>

                    <label className="border border-dashed border-sky-500/40 hover:border-sky-400 bg-[#040914] rounded-xl p-3 flex items-center space-x-3 cursor-pointer transition">
                      <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0">
                        <Icon.Plus />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-white truncate">
                          {project.overlay?.customFileName || 'Upload Custom Overlay (PNG, GIF, WebM)'}
                        </div>
                        <div className="text-[10px] text-slate-400">Renders in front of background &amp; in MP4 export</div>
                      </div>
                      <input type="file" accept="image/png,image/gif,image/webp,video/webm,video/mp4" onChange={(e) => handleOverlayMediaUpload(e.target.files[0])} className="hidden" />
                    </label>

                    {project.overlay?.enabled && project.overlay?.customUrl && (
                      <div className="space-y-2.5 pt-2 border-t border-slate-800">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-slate-400">Blend Mode</span>
                          <select
                            value={project.overlay?.blendMode || 'screen'}
                            onChange={(e) => updateProject(p => ({ overlay: { ...p.overlay, blendMode: e.target.value } }))}
                            className="bg-[#040914] border border-slate-700 rounded-lg px-2 py-1 text-[11px] text-white outline-none"
                          >
                            <option value="screen">Screen (Add Light)</option>
                            <option value="source-over">Normal Alpha</option>
                            <option value="lighten">Lighten</option>
                            <option value="overlay">Overlay Contrast</option>
                            <option value="multiply">Multiply Darken</option>
                          </select>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                            <span>Overlay Opacity</span>
                            <span className="font-mono text-slate-200">{project.overlay?.opacity ?? 75}%</span>
                          </div>
                          <input
                            type="range"
                            min="5"
                            max="100"
                            value={project.overlay?.opacity ?? 75}
                            onChange={(e) => updateProject(p => ({ overlay: { ...p.overlay, opacity: Number(e.target.value) } }))}
                            className="w-full accent-sky-400 bg-slate-800 h-1.5 rounded-lg"
                          />
                        </div>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-800 space-y-2">
                      <label className="text-[11px] font-semibold text-slate-300 block">Atmospheric Visual Effects (VFX)</label>
                      <select
                        value={project.overlay?.vfxPreset || 'none'}
                        onChange={(e) => updateProject(p => ({ overlay: { ...(p.overlay || {}), vfxPreset: e.target.value } }))}
                        className="w-full bg-[#040914] border border-slate-800 rounded-xl p-2 text-xs text-slate-200 outline-none"
                      >
                        <option value="none">None (Clean Output)</option>
                        <option value="embers">🔥 Rising Fire Embers</option>
                        <option value="bokeh">✨ Dreamy Cinema Bokeh Orbs</option>
                        <option value="snow">❄️ Soft Winter Snowfall</option>
                        <option value="film_grain">🎞️ 35mm Vintage Film Scanlines</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-[#091326] border border-slate-800 rounded-2xl p-4 space-y-3">
                    <span className="text-xs font-bold text-white block">14 Atmospheric Canvas Shaders</span>
                    <div className="grid grid-cols-2 gap-2">
                      {BACKGROUND_PRESETS.map(p => (
                        <button
                          key={p.id}
                          onClick={() => updateProject(prev => ({ background: { ...prev.background, type: 'preset', presetId: p.id } }))}
                          className={`p-2 rounded-xl border text-left transition ${
                            project.background.type === 'preset' && project.background.presetId === p.id
                              ? 'border-sky-400 bg-blue-950/50'
                              : 'border-slate-800 bg-[#040914] hover:border-slate-700'
                          }`}
                        >
                          <div className="h-7 rounded-lg mb-1.5" style={{ background: `linear-gradient(135deg, ${p.color1}, ${p.color2}, ${p.color3})` }} />
                          <div className="text-[11px] font-semibold text-slate-200 truncate">{p.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'typography' && (
                <div className="space-y-4">
                  <div className="bg-[#091326] border border-slate-800 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Font Family</span>
                      <label className="text-[11px] text-sky-400 hover:underline cursor-pointer">
                        + Upload .TTF/.OTF/.WOFF
                        <input type="file" accept=".ttf,.otf,.woff,.woff2" onChange={(e) => handleCustomFontUpload(e.target.files[0])} className="hidden" />
                      </label>
                    </div>
                    <select
                      value={project.typography.fontFamily}
                      onChange={(e) => updateProject(p => ({ typography: { ...p.typography, fontFamily: e.target.value } }))}
                      className="w-full bg-[#040914] border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                    >
                      {availableFonts.map(f => (
                        <option key={f.name} value={f.family}>{f.name}</option>
                      ))}
                    </select>

                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Font Size</span>
                        <span>{project.typography.fontSize}px</span>
                      </div>
                      <input
                        type="range"
                        min="24"
                        max="110"
                        value={project.typography.fontSize}
                        onChange={(e) => updateProject(p => ({ typography: { ...p.typography, fontSize: parseInt(e.target.value, 10) } }))}
                        className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Base Text Color</label>
                        <input
                          type="color"
                          value={project.typography.textColor}
                          onChange={(e) => updateProject(p => ({ typography: { ...p.typography, textColor: e.target.value } }))}
                          className="w-full h-9 rounded-lg bg-[#040914] border border-slate-800 cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Active Highlight</label>
                        <input
                          type="color"
                          value={project.typography.highlightColor}
                          onChange={(e) => updateProject(p => ({ typography: { ...p.typography, highlightColor: e.target.value } }))}
                          className="w-full h-9 rounded-lg bg-[#040914] border border-slate-800 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'animation' && (
                <div className="space-y-4">
                  <div className="bg-[#091326] border border-slate-800 rounded-2xl p-4 space-y-2.5">
                    <span className="text-xs font-bold text-white block mb-1">Lyric Motion Presets &amp; Keyframes</span>
                    {ANIMATIONS.map(a => (
                      <button
                        key={a.id}
                        onClick={() => updateProject(p => ({ animation: { ...p.animation, preset: a.id } }))}
                        className={`w-full p-2.5 rounded-xl border text-left transition ${
                          project.animation.preset === a.id
                            ? 'bg-blue-950/70 border-sky-400 text-white'
                            : 'bg-[#040914] border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold">{a.name}</div>
                        <div className="text-[10px] text-slate-400">{a.desc}</div>
                      </button>
                    ))}
                  </div>

                  {/* CUSTOM KEYFRAME MOTION EDITOR */}
                  {project.animation.preset === 'custom_keyframes' && (() => {
                    const kfs = project.animation.customKeyframes || DEFAULT_CUSTOM_KEYFRAMES;
                    const safeIdx = Math.min(selectedKeyframeIdx, kfs.length - 1);
                    const activeKf = kfs[safeIdx] || kfs[0];

                    const updateActiveKeyframe = (field, val) => {
                      const nextKfs = kfs.map((k, i) => i === safeIdx ? { ...k, [field]: val } : k);
                      updateProject(p => ({ animation: { ...p.animation, customKeyframes: nextKfs } }));
                    };

                    return (
                      <div className="p-3.5 rounded-2xl bg-[#091326] border border-sky-500/40 space-y-3 shadow-xl">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-sky-300 uppercase tracking-wider">★ Keyframe Timeline</span>
                          <button
                            onClick={() => updateProject(p => ({ animation: { ...p.animation, customKeyframes: DEFAULT_CUSTOM_KEYFRAMES } }))}
                            className="text-[10px] text-slate-400 hover:text-white underline"
                          >
                            Reset
                          </button>
                        </div>

                        <div>
                          <label className="text-[11px] text-slate-300 block mb-1">Easing Curve</label>
                          <select
                            value={project.animation.easing || 'easeOutCubic'}
                            onChange={(e) => updateProject(p => ({ animation: { ...p.animation, easing: e.target.value } }))}
                            className="w-full bg-[#040914] border border-slate-700 rounded-xl p-2 text-xs text-white outline-none"
                          >
                            {Object.entries(EASING_FUNCTIONS).map(([k, v]) => (
                              <option key={k} value={k}>{v.name}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[11px] text-slate-400">Keyframe Stops</span>
                            <button
                              onClick={() => {
                                const newKf = { id: 'kf_' + Date.now(), timePct: 50, offsetX: 0, offsetY: 0, scale: 1.05, rotation: 0, opacity: 1, blur: 0 };
                                const nextKfs = [...kfs, newKf].sort((a, b) => a.timePct - b.timePct);
                                updateProject(p => ({ animation: { ...p.animation, customKeyframes: nextKfs } }));
                                setSelectedKeyframeIdx(nextKfs.findIndex(x => x.id === newKf.id));
                              }}
                              className="px-2 py-0.5 rounded bg-blue-600/30 border border-sky-400/40 text-sky-200 text-[10px] font-bold"
                            >
                              + Add Stop
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {kfs.map((kf, idx) => (
                              <button
                                key={kf.id || idx}
                                onClick={() => setSelectedKeyframeIdx(idx)}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold border transition ${
                                  idx === safeIdx ? 'bg-sky-500 text-[#02060D] border-white' : 'bg-[#040914] text-slate-300 border-slate-800'
                                }`}
                              >
                                {kf.timePct}%
                              </button>
                            ))}
                          </div>
                        </div>

                        {activeKf && (
                          <div className="space-y-2 pt-2 border-t border-slate-800">
                            {[
                              { label: 'Timing Position', key: 'timePct', min: 0, max: 100, step: 1, unit: '%' },
                              { label: 'Position X Offset', key: 'offsetX', min: -50, max: 50, step: 1, unit: '%' },
                              { label: 'Position Y Offset', key: 'offsetY', min: -50, max: 50, step: 1, unit: '%' },
                              { label: 'Scale Multiplier', key: 'scale', min: 0.2, max: 2.2, step: 0.05, unit: 'x' },
                              { label: 'Rotation Angle', key: 'rotation', min: -90, max: 90, step: 1, unit: '°' },
                              { label: 'Alpha Opacity', key: 'opacity', min: 0, max: 1, step: 0.05, unit: '' },
                              { label: 'Motion Blur', key: 'blur', min: 0, max: 25, step: 0.5, unit: 'px' }
                            ].map(prop => (
                              <div key={prop.key}>
                                <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                                  <span>{prop.label}</span>
                                  <span className="font-mono text-sky-300">{activeKf[prop.key]}{prop.unit}</span>
                                </div>
                                <input
                                  type="range"
                                  min={prop.min}
                                  max={prop.max}
                                  step={prop.step}
                                  value={activeKf[prop.key] ?? 0}
                                  onChange={(e) => updateActiveKeyframe(prop.key, parseFloat(e.target.value))}
                                  className="w-full accent-sky-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}
            </aside>

            {/* Center Real-Time Canvas Video Preview */}
            <main className="flex-1 bg-[#03060C] flex flex-col items-center justify-between p-4 overflow-hidden min-h-0">
              <div className="w-full flex items-center justify-between text-xs text-slate-400 px-2">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#081121] border border-slate-800 font-mono text-[11px] text-sky-400">
                    {project.aspectRatio} • {canvasWidth}×{canvasHeight}
                  </span>
                  <button
                    onClick={() => updateProject({ showSafeArea: !project.showSafeArea })}
                    className={`px-2.5 py-1 rounded-md border text-[11px] transition ${
                      project.showSafeArea ? 'bg-rose-500/20 border-rose-500/40 text-rose-300' : 'bg-[#081121] border-slate-800 text-slate-400'
                    }`}
                  >
                    Safe Zone
                  </button>
                </div>
                <div className="text-[11px] font-mono text-slate-300">
                  { currentActiveLyricIdx >= 0 ? `Active Line #${currentActiveLyricIdx + 1}` : 'Waiting for Lyric Cue' }
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center w-full min-h-0 py-2">
                <div
                  style={{
                    aspectRatio: project.aspectRatio === '9:16' ? '9/16' : project.aspectRatio === '16:9' ? '16/9' : '1/1',
                    maxHeight: '100%',
                    maxWidth: '100%'
                  }}
                  className="relative rounded-2xl overflow-hidden border border-slate-800/90 shadow-[0_25px_70px_rgba(0,0,0,0.85)] bg-black flex items-center justify-center"
                >
                  <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} className="w-full h-full object-contain" />
                </div>
              </div>

              {/* Master Transport Bar */}
              <div className="w-full max-w-2xl bg-[#070E1C] border border-slate-800/90 rounded-2xl px-4 py-2.5 flex items-center space-x-4 shadow-xl">
                <button
                  onClick={() => handleSeek(0)}
                  className="p-2 rounded-lg hover:bg-white/5 text-slate-300"
                  title="Restart"
                >
                  <Icon.SkipBack />
                </button>
                <button
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow"
                >
                  {isPlaying ? <Icon.Pause /> : <Icon.Play />}
                </button>
                <span className="text-xs font-mono text-sky-400 w-28">
                  {formatTime(currentTime)} / {formatTime(project.audio?.duration || 0)}
                </span>
                <input
                  type="range"
                  min="0"
                  max={project.audio?.duration || 24}
                  step="0.02"
                  value={currentTime}
                  onChange={(e) => handleSeek(parseFloat(e.target.value))}
                  className="flex-1 accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <button onClick={() => setIsMuted(!isMuted)} className="p-1.5 text-slate-300 hover:text-white">
                  {isMuted ? <Icon.Mute /> : <Icon.Volume />}
                </button>
              </div>
            </main>
          </div>

          {/* Bottom Multi-Track Waveform & Lyric Blocks Timeline */}
          <div className="h-36 bg-[#050A14] border-t border-slate-800/80 flex flex-col shrink-0">
            <div className="h-8 px-4 border-b border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center space-x-3">
                <span className="font-bold text-slate-200">MULTI-TRACK TIMELINE</span>
                <span>Click anywhere on the waveform to scrub</span>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => setTimelineZoom(z => Math.max(1, z - 0.5))} className="p-1 hover:text-white"><Icon.ZoomOut /></button>
                <span className="font-mono text-[10px]">{timelineZoom}x</span>
                <button onClick={() => setTimelineZoom(z => Math.min(4, z + 0.5))} className="p-1 hover:text-white"><Icon.ZoomIn /></button>
              </div>
            </div>

            <div
              ref={timelineContainerRef}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left + e.currentTarget.scrollLeft;
                const totalW = rect.width * timelineZoom;
                const pct = Math.max(0, Math.min(1, clickX / totalW));
                handleSeek(pct * (project.audio?.duration || 24));
              }}
              className="flex-1 relative overflow-x-auto overflow-y-hidden cursor-pointer select-none"
            >
              <div style={{ width: `${timelineZoom * 100}%` }} className="h-full relative">
                <div className="absolute inset-x-0 bottom-2 h-12 flex items-end justify-between px-2 opacity-35 pointer-events-none">
                  {(project.audio?.waveformPeaks?.length ? project.audio.waveformPeaks : new Array(100).fill(0.2)).map((pk, idx) => (
                    <div
                      key={idx}
                      style={{ height: `${Math.max(12, pk * 100)}%` }}
                      className="w-1 bg-sky-500 rounded-full"
                    />
                  ))}
                </div>

                <div className="absolute inset-x-0 top-3 h-11">
                  {project.lyrics.map((l, idx) => {
                    const maxDur = project.audio?.duration || 24;
                    const leftPct = (l.startTime / maxDur) * 100;
                    const widthPct = Math.max(0.8, ((l.endTime - l.startTime) / maxDur) * 100);
                    return (
                      <div
                        key={l.id}
                        style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                        className={`absolute top-0 h-9 rounded-lg px-2 flex items-center text-[10px] font-semibold truncate border ${
                          l.isInstrumental
                            ? 'bg-amber-500/25 border-amber-400/60 text-amber-200'
                            : idx === activeSyncIndex
                            ? 'bg-blue-600/50 border-sky-400 text-white'
                            : 'bg-[#0C1930]/90 border-blue-500/30 text-slate-200'
                        }`}
                      >
                        {l.text}
                      </div>
                    );
                  })}
                </div>

                <div
                  ref={playheadDomRef}
                  style={{ left: `${((currentTime / (project.audio?.duration || 24)) * 100) || 0}%` }}
                  className="absolute top-0 bottom-0 w-0.5 bg-sky-400 shadow-[0_0_10px_#38BDF8] pointer-events-none z-10"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          LOCAL MP4 VIDEO EXPORT MODAL
          ========================================== */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#071020] border border-blue-500/30 rounded-2xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Export MP4 Lyric Video</h3>
              <button onClick={() => setShowExportModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Resolution</label>
                <select
                  value={exportConfig.resolution}
                  onChange={(e) => setExportConfig(p => ({ ...p, resolution: e.target.value }))}
                  className="w-full bg-[#040914] border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                >
                  <option value="720p">720p HD (Fast Render)</option>
                  <option value="1080p">1080p Full HD</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Frame Rate</label>
                <select
                  value={exportConfig.fps}
                  onChange={(e) => setExportConfig(p => ({ ...p, fps: Number(e.target.value) }))}
                  className="w-full bg-[#040914] border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                >
                  <option value={30}>30 FPS</option>
                  <option value={60}>60 FPS</option>
                </select>
              </div>
            </div>

            {exportStatus === 'rendering' && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-sky-400 font-mono">
                  <span>Rendering Video + Stereo Audio...</span>
                  <span>{exportProgress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div style={{ width: `${exportProgress}%` }} className="h-full bg-blue-500 transition-all" />
                </div>
              </div>
            )}

            {exportStatus === 'completed' && exportedVideoUrl && (
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-300">Render Complete!</span>
                <a
                  href={exportedVideoUrl}
                  download={`${project.name || 'cloudlyric'}.${exportedVideoExt}`}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                >
                  Download .{exportedVideoExt.toUpperCase()}
                </a>
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-2">
              {exportStatus === 'rendering' ? (
                <button
                  onClick={() => { exportAbortRef.current = true; }}
                  className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold"
                >
                  Cancel Render
                </button>
              ) : (
                <button
                  onClick={startLocalVideoRender}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg"
                >
                  Start Local Video Render
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          ACCOUNT-FREE SESSION & .ZIP PROJECT BUNDLE MODAL
          ========================================== */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#071020] border border-blue-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Account-Free Project Bundle (.ZIP)</h3>
                <p className="text-[11px] text-slate-400">No login or cloud required — Package or restore your entire session locally</p>
              </div>
              <button onClick={() => setShowProjectModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs text-slate-300 leading-relaxed">
              <strong className="text-sky-300">Session-Based Privacy:</strong> Uploaded backgrounds, overlays, audio, and fonts stay strictly in your browser&apos;s current session memory. They will not survive clearing browser data or switching devices unless you <strong>Download Project (.ZIP)</strong> below.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={exportProjectZipBundle}
                disabled={isZipPackaging}
                className="apple-btn py-3 px-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-xs text-white font-bold rounded-xl border border-blue-400/40 shadow-lg flex items-center justify-center space-x-2"
              >
                <Icon.Download />
                <span>{isZipPackaging ? 'Packaging .ZIP...' : 'Download Project (.ZIP)'}</span>
              </button>

              <label className="apple-btn py-3 px-4 bg-[#101E38] hover:bg-[#16294C] text-xs text-sky-200 font-bold rounded-xl border border-sky-500/40 text-center cursor-pointer flex items-center justify-center space-x-2">
                <Icon.Folder />
                <span>{isZipPackaging ? 'Restoring...' : 'Import Project (.ZIP / .JSON)'}</span>
                <input
                  type="file"
                  accept=".zip,.json,.cloudlyrics"
                  onChange={(e) => importProjectArchive(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>

            <div className="p-3 rounded-xl bg-[#040914] border border-slate-800 flex items-center justify-between text-xs">
              <div className="text-slate-400">
                Active Session Assets:{' '}
                <strong className="text-slate-200">
                  {(sessionBlobsRef.current.audio ? 1 : 0) +
                    sessionBlobsRef.current.backgrounds.size +
                    sessionBlobsRef.current.overlays.size +
                    sessionBlobsRef.current.fonts.size}
                </strong>{' '}
                (Audio, BG, Overlays, Fonts)
              </div>
              <button
                onClick={cleanupSessionResources}
                className="px-2.5 py-1 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-500/30 text-[11px] font-semibold"
              >
                Free Session Memory
              </button>
            </div>

            <div className="max-h-44 overflow-y-auto space-y-2">
              {savedProjectsList.length === 0 ? (
                <div className="text-xs text-slate-500 text-center py-4">No browser snapshots saved yet.</div>
              ) : (
                savedProjectsList.map(p => (
                  <div key={p.id} className="p-3 rounded-xl bg-[#040914] border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{p.name}</div>
                      <div className="text-[10px] text-slate-500">{p.lyrics?.length || 0} lyric lines</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setProject(p);
                          setLyricsRawText((p.lyrics || []).map(l => l.text).join('\n'));
                          setShowProjectModal(false);
                          showToast(`Loaded "${p.name}"`, 'success');
                        }}
                        className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-semibold"
                      >
                        Open
                      </button>
                      <button
                        onClick={async () => {
                          await deleteProjectFromIDB(p.id);
                          openSavedProjectsModal();
                        }}
                        className="p-1.5 text-slate-500 hover:text-rose-400"
                      >
                        <Icon.Trash />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}