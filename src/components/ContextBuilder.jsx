import { useState, useRef } from 'react';

/* ── Icons (inline SVG) ──────────────────────────────────────────── */
const Ico = ({ d, size = 16, stroke = 'currentColor', sw = 1.5, fill = 'none', viewBox = '0 0 24 24' }) => (
  <svg width={size} height={size} viewBox={viewBox} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {typeof d === 'string' ? <path d={d}/> : d}
  </svg>
);

const icons = {
  cloud:    <><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></>,
  mail:     <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></>,
  heart:    <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>,
  file:     <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></>,
  note:     <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
  photo:    <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></>,
  upload:   <><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></>,
  check:    <><polyline points="20 6 9 17 4 12"/></>,
  x:        <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
  copy:     <><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>,
  sparkle:  <><path d="M12 3L13.5 8.5H19L14.5 12L16 17.5L12 14L8 17.5L9.5 12L5 8.5H10.5Z"/></>,
  folder:   <><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></>,
  tag:      <><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>,
  brain:    <><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.16z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.16z"/></>,
  download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
};

/* ── Data sources ────────────────────────────────────────────────── */
const SOURCES = [
  { id: 'drive',      label: 'iCloud Drive',  icon: 'cloud',    color: '#3B82F6', count: 8  },
  { id: 'gmail',      label: 'Gmail',         icon: 'mail',     color: '#EA4335', count: 6  },
  { id: 'health',     label: 'Health',        icon: 'heart',    color: '#FF2D55', count: 5  },
  { id: 'calendar',   label: 'Calendar',      icon: 'calendar', color: '#FF9F0A', count: 7  },
  { id: 'notes',      label: 'Notes',         icon: 'note',     color: '#FFD60A', count: 9  },
  { id: 'photos',     label: 'Photos',        icon: 'photo',    color: '#30D158', count: 4  },
  { id: 'upload',     label: 'Upload Files',  icon: 'upload',   color: '#9B8FF5', count: 0  },
];

/* ── Files per source ────────────────────────────────────────────── */
const FILES = {
  drive: [
    { id: 'd1', name: 'Resume_2026.pdf',        ext: 'pdf',  size: '128 KB', preview: 'Senior designer · 5 yrs experience · USC grad · Figma, Framer, SwiftUI', category: 'professional' },
    { id: 'd2', name: 'Portfolio_v3.pdf',        ext: 'pdf',  size: '4.2 MB', preview: '14 case studies across product, brand & motion design', category: 'professional' },
    { id: 'd3', name: 'Goals_2026.md',           ext: 'md',   size: '6 KB',   preview: 'Ship Icarus iOS app · Grow to 500 users · Learn 3D modeling', category: 'goals' },
    { id: 'd4', name: 'Bio_short.txt',           ext: 'txt',  size: '2 KB',   preview: '24 · Los Angeles · designer building tools for self-aware people', category: 'personal' },
    { id: 'd5', name: 'Skills_inventory.md',     ext: 'md',   size: '8 KB',   preview: 'Expert: Figma, Prototyping · Proficient: SwiftUI, React, Framer', category: 'professional' },
    { id: 'd6', name: 'Reading_list_2026.txt',   ext: 'txt',  size: '3 KB',   preview: '18 books · themes: design systems, consciousness, startups', category: 'intellectual' },
    { id: 'd7', name: 'Values_manifesto.md',     ext: 'md',   size: '5 KB',   preview: 'Craft over speed · Systems thinking · Aesthetic as function', category: 'personal' },
    { id: 'd8', name: 'Side_projects.md',        ext: 'md',   size: '4 KB',   preview: 'Icarus, Meridian, personal brand, font collection WIP', category: 'professional' },
  ],
  gmail: [
    { id: 'g1', name: 'Communication_patterns', ext: 'ai',   size: 'analyzed', preview: 'Avg response 47 min · most active 10am–1pm · direct & warm tone', category: 'social' },
    { id: 'g2', name: 'Top_contacts',           ext: 'ai',   size: 'analyzed', preview: 'Johnny Lee, Ronnie Cheung, Turat B. — weekly+ threads', category: 'social' },
    { id: 'g3', name: 'Newsletters_subscribed', ext: 'ai',   size: 'analyzed', preview: 'Dense Discovery, Cofolios, Sidebar, It\'s Nice That — design focused', category: 'intellectual' },
    { id: 'g4', name: 'Work_emails_summary',    ext: 'ai',   size: 'analyzed', preview: 'LavaLab collab, Meridian shipping, client feedback threads', category: 'professional' },
    { id: 'g5', name: 'Personal_emails_summary',ext: 'ai',   size: 'analyzed', preview: 'Family check-ins, friends, apartment hunting, travel plans', category: 'personal' },
    { id: 'g6', name: 'Tone_profile',           ext: 'ai',   size: 'analyzed', preview: 'Concise, friendly, uses "→" and lowercase, avoids corporate speak', category: 'personal' },
  ],
  health: [
    { id: 'h1', name: 'Activity_summary',       ext: 'csv',  size: '14 KB',  preview: 'Avg 8,400 steps · 4× weekly strength training · 2× yoga', category: 'health' },
    { id: 'h2', name: 'Sleep_patterns',         ext: 'csv',  size: '9 KB',   preview: 'Avg 7.2h · best nights: Sunday/Monday · consistent 11pm bedtime', category: 'health' },
    { id: 'h3', name: 'Mindfulness_log',        ext: 'csv',  size: '6 KB',   preview: '18 sessions last month · avg 12 min · mostly morning', category: 'health' },
    { id: 'h4', name: 'Energy_patterns',        ext: 'ai',   size: 'analyzed', preview: 'Peak: 9–11am · slump: 2–3pm · creative flow: evenings', category: 'health' },
    { id: 'h5', name: 'Nutrition_notes',        ext: 'txt',  size: '3 KB',   preview: 'Mostly plant-based · intermittent fasting · matcha not coffee', category: 'health' },
  ],
  calendar: [
    { id: 'c1', name: 'Recurring_commitments',  ext: 'ai',   size: 'analyzed', preview: 'LavaLab Tue 6pm · Meridian standup MWF 10am · gym M/W/F/Sat', category: 'professional' },
    { id: 'c2', name: 'Upcoming_deadlines',      ext: 'ai',   size: 'analyzed', preview: 'Apr 1 Convergence demo · Apr 3 pitch deck · Apr 18 brand pres.', category: 'goals' },
    { id: 'c3', name: 'Time_allocation',         ext: 'ai',   size: 'analyzed', preview: 'Design 38% · Meetings 22% · Learning 15% · Personal 25%', category: 'professional' },
    { id: 'c4', name: 'Social_calendar',         ext: 'ai',   size: 'analyzed', preview: '2× weekly friend dinners · bi-weekly family call · monthly events', category: 'social' },
    { id: 'c5', name: 'Deep_work_blocks',        ext: 'ai',   size: 'analyzed', preview: 'Mornings 9–12 protected · Figma sessions avg 2.5h · no meetings before 10', category: 'professional' },
    { id: 'c6', name: 'Travel_history',          ext: 'ai',   size: 'analyzed', preview: 'NYC (Jan), SF (Feb), Austin (Mar) · upcoming: Tokyo (Jun)', category: 'personal' },
    { id: 'c7', name: 'Meeting_patterns',        ext: 'ai',   size: 'analyzed', preview: 'Prefers 30-min slots · back-to-back avoidance · video on default', category: 'social' },
  ],
  notes: [
    { id: 'n1', name: 'Daily_journal_excerpts',  ext: 'txt',  size: '28 KB',  preview: 'Stream-of-consciousness · gratitude practice · 180 days running', category: 'personal' },
    { id: 'n2', name: 'Work_ideas_dump',         ext: 'md',   size: '12 KB',  preview: '47 product ideas · feature concepts · redesign thoughts', category: 'professional' },
    { id: 'n3', name: 'Brainstorms_collab',      ext: 'md',   size: '9 KB',   preview: 'Whiteboard sessions with team · Icarus UX decisions · experiments', category: 'professional' },
    { id: 'n4', name: 'Personal_reflections',    ext: 'txt',  size: '15 KB',  preview: 'Quarterly reviews · what worked · growth areas · identity notes', category: 'personal' },
    { id: 'n5', name: 'Quotes_inspiration',      ext: 'txt',  size: '5 KB',   preview: '"Design is how it works." · 84 saved quotes, mostly design & philosophy', category: 'intellectual' },
    { id: 'n6', name: 'Learning_notes',          ext: 'md',   size: '18 KB',  preview: 'SwiftUI course · 3D modeling · design systems · book summaries', category: 'intellectual' },
    { id: 'n7', name: 'Relationship_notes',      ext: 'txt',  size: '7 KB',   preview: 'Notes on people I care about · how I can support them · shared memories', category: 'social' },
    { id: 'n8', name: 'Fears_and_blockers',      ext: 'txt',  size: '4 KB',   preview: 'Shipping before ready · visibility · perfectionism patterns', category: 'personal' },
    { id: 'n9', name: 'Dream_log',               ext: 'txt',  size: '6 KB',   preview: '3× weekly entries · recurring themes: building, travel, unknown spaces', category: 'personal' },
  ],
  photos: [
    { id: 'p1', name: 'Places_metadata',         ext: 'ai',   size: 'analyzed', preview: 'Most visited: USC campus, Silverlake coffee shops, Venice boardwalk', category: 'personal' },
    { id: 'p2', name: 'Activity_context',        ext: 'ai',   size: 'analyzed', preview: 'Frequent: coffee shops, outdoor workouts, design events, travel', category: 'personal' },
    { id: 'p3', name: 'Social_photo_patterns',   ext: 'ai',   size: 'analyzed', preview: 'Most photographed with: close friend group (4 people), solo travel shots', category: 'social' },
    { id: 'p4', name: 'Aesthetic_profile',       ext: 'ai',   size: 'analyzed', preview: 'High contrast, architecture, minimal composition, golden hour bias', category: 'intellectual' },
  ],
  upload: [],
};

/* ── Categories ──────────────────────────────────────────────────── */
const CATEGORIES = [
  { id: 'professional', label: 'Professional',  color: '#6BAED6', desc: 'Work, skills, career' },
  { id: 'personal',     label: 'Personal',       color: '#C084FC', desc: 'Identity, values, life' },
  { id: 'health',       label: 'Health',         color: '#FF6B9D', desc: 'Wellness, habits, energy' },
  { id: 'social',       label: 'Social',         color: '#34D399', desc: 'Relationships, communication' },
  { id: 'intellectual', label: 'Intellectual',   color: '#FBBF24', desc: 'Interests, learning, ideas' },
  { id: 'goals',        label: 'Goals',          color: '#F97316', desc: 'Aspirations, deadlines' },
];

const EXT_COLORS = {
  pdf:  '#F08060', md: '#9B8FF5', txt: '#6BAED6',
  csv:  '#34D399', ai: '#C9A84C',
};

/* ── Compile output ──────────────────────────────────────────────── */
function compileProfile(selectedIds, userCategories) {
  const allFiles = Object.values(FILES).flat();
  const selected = allFiles.filter(f => selectedIds.has(f.id));
  if (!selected.length) return '';

  const grouped = {};
  CATEGORIES.forEach(c => { grouped[c.id] = []; });

  selected.forEach(f => {
    const cat = userCategories[f.id] || f.category || 'personal';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(f);
  });

  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  let out = `# AI CONTEXT PROFILE\nGenerated: ${date}\n`;
  out += `Files included: ${selected.length} · Sources: ${[...new Set(selected.map(f => f.id[0]))].length}\n\n`;
  out += `---\n\n`;

  CATEGORIES.forEach(cat => {
    const files = grouped[cat.id];
    if (!files.length) return;
    out += `## ${cat.label.toUpperCase()}\n\n`;
    files.forEach(f => {
      out += `**${f.name}**\n${f.preview}\n\n`;
    });
  });

  return out.trim();
}

/* ── File card ───────────────────────────────────────────────────── */
function FileCard({ file, selected, onToggle, assignedCategory, onCategoryChange }) {
  const [showCatPicker, setShowCatPicker] = useState(false);
  const cat = CATEGORIES.find(c => c.id === (assignedCategory || file.category));

  return (
    <div
      onClick={onToggle}
      style={{
        background: selected ? 'rgba(201,168,76,0.07)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${selected ? 'rgba(201,168,76,0.35)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 12, padding: '13px 14px',
        cursor: 'pointer', position: 'relative',
        transition: 'all 0.15s',
        boxShadow: selected ? '0 0 0 1px rgba(201,168,76,0.15)' : 'none',
      }}
      onMouseEnter={e => { if (!selected) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
      onMouseLeave={e => { if (!selected) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
        {/* Ext badge */}
        <div style={{
          width: 32, height: 32, borderRadius: 8, flexShrink: 0,
          background: `${EXT_COLORS[file.ext] || '#888'}18`,
          border: `1px solid ${EXT_COLORS[file.ext] || '#888'}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 8, fontWeight: 800, color: EXT_COLORS[file.ext] || '#888',
          letterSpacing: '0.5px', textTransform: 'uppercase',
          fontFamily: '"SF Mono", monospace',
        }}>
          {file.ext === 'ai' ? '✦' : file.ext}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            color: selected ? '#fff' : 'rgba(255,255,255,0.82)',
            fontSize: 12, fontWeight: 600, marginBottom: 2,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{file.name}</div>
          <div style={{ color: 'rgba(255,255,255,0.22)', fontSize: 10 }}>{file.size}</div>
        </div>
        {/* Check */}
        <div style={{
          width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
          background: selected ? '#C9A84C' : 'rgba(255,255,255,0.06)',
          border: `1.5px solid ${selected ? '#C9A84C' : 'rgba(255,255,255,0.12)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.15s',
        }}>
          {selected && <Ico d={icons.check} size={10} stroke="#000" sw={2.5}/>}
        </div>
      </div>

      {/* Preview */}
      <div style={{
        color: 'rgba(255,255,255,0.38)', fontSize: 11, lineHeight: 1.5,
        overflow: 'hidden', display: '-webkit-box',
        WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
      }}>{file.preview}</div>

      {/* Category tag */}
      {selected && cat && (
        <div style={{ marginTop: 9, position: 'relative' }}>
          <button
            onClick={e => { e.stopPropagation(); setShowCatPicker(v => !v); }}
            style={{
              background: `${cat.color}18`, border: `1px solid ${cat.color}40`,
              borderRadius: 20, padding: '3px 10px',
              color: cat.color, fontSize: 10, fontWeight: 600,
              cursor: 'pointer', letterSpacing: '0.3px',
            }}
          >
            {cat.label} ▾
          </button>

          {showCatPicker && (
            <div style={{
              position: 'absolute', top: 26, left: 0, zIndex: 99,
              background: '#1A1824', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10, padding: 6, display: 'flex', flexDirection: 'column', gap: 2,
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }}>
              {CATEGORIES.map(c => (
                <button key={c.id} onClick={e => {
                  e.stopPropagation();
                  onCategoryChange(file.id, c.id);
                  setShowCatPicker(false);
                }} style={{
                  background: (assignedCategory || file.category) === c.id ? `${c.color}18` : 'transparent',
                  border: 'none', borderRadius: 7, padding: '5px 10px',
                  color: c.color, fontSize: 11, cursor: 'pointer',
                  textAlign: 'left', fontWeight: 600,
                }}>{c.label}</button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Compiled output view ────────────────────────────────────────── */
function CompiledView({ output, onBack }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const download = () => {
    const blob = new Blob([output], { type: 'text/markdown' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'ai_context_profile.md';
    a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onBack} style={{
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8, padding: '5px 12px', color: '#aaa', fontSize: 12, cursor: 'pointer',
          }}>← Back</button>
          <div>
            <div style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>AI Context Profile</div>
            <div style={{ color: '#555', fontSize: 11 }}>ready to paste into any AI</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={copy} style={{
            background: copied ? 'rgba(105,209,122,0.15)' : 'rgba(255,255,255,0.06)',
            border: `1px solid ${copied ? 'rgba(105,209,122,0.4)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 9, padding: '7px 14px', cursor: 'pointer',
            color: copied ? '#69D17A' : '#aaa', fontSize: 12, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s',
          }}>
            <Ico d={copied ? icons.check : icons.copy} size={13} stroke="currentColor"/>
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button onClick={download} style={{
            background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)',
            borderRadius: 9, padding: '7px 14px', cursor: 'pointer',
            color: '#C9A84C', fontSize: 12, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <Ico d={icons.download} size={13} stroke="currentColor"/>
            Download .md
          </button>
        </div>
      </div>

      {/* Output */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '20px 28px',
        fontFamily: '"SF Mono", "Fira Code", monospace',
        fontSize: 12, lineHeight: 1.75, color: 'rgba(255,255,255,0.75)',
        scrollbarWidth: 'thin',
      }}>
        {output.split('\n').map((line, i) => {
          if (line.startsWith('## ')) return (
            <div key={i} style={{ color: '#C9A84C', fontWeight: 800, fontSize: 13, marginTop: 24, marginBottom: 8 }}>{line}</div>
          );
          if (line.startsWith('# ')) return (
            <div key={i} style={{ color: '#fff', fontWeight: 800, fontSize: 15, marginBottom: 4 }}>{line.slice(2)}</div>
          );
          if (line.startsWith('**') && line.endsWith('**')) return (
            <div key={i} style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 700, marginTop: 12, marginBottom: 2 }}>{line.replace(/\*\*/g, '')}</div>
          );
          if (line === '---') return <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '16px 0' }}/>;
          if (line === '') return <div key={i} style={{ height: 6 }}/>;
          return <div key={i} style={{ color: 'rgba(255,255,255,0.5)' }}>{line}</div>;
        })}
      </div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────── */
export default function ContextBuilder() {
  const [activeSource,    setActiveSource]    = useState('drive');
  const [selectedIds,     setSelectedIds]     = useState(new Set());
  const [userCategories,  setUserCategories]  = useState({});
  const [showCompiled,    setShowCompiled]    = useState(false);
  const [compiledOutput,  setCompiledOutput]  = useState('');
  const [search,          setSearch]          = useState('');
  const [filterCat,       setFilterCat]       = useState(null);
  const fileInputRef = useRef(null);

  const sourceFiles = (FILES[activeSource] || []).filter(f => {
    if (search && !f.name.toLowerCase().includes(search.toLowerCase()) && !f.preview.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterCat && (userCategories[f.id] || f.category) !== filterCat) return false;
    return true;
  });

  const toggle = (id) => setSelectedIds(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const assignCategory = (fileId, catId) => {
    setUserCategories(prev => ({ ...prev, [fileId]: catId }));
  };

  const selectAll = () => setSelectedIds(prev => {
    const next = new Set(prev);
    sourceFiles.forEach(f => next.add(f.id));
    return next;
  });

  const clearSource = () => setSelectedIds(prev => {
    const next = new Set(prev);
    sourceFiles.forEach(f => next.delete(f.id));
    return next;
  });

  const compile = () => {
    const out = compileProfile(selectedIds, userCategories);
    setCompiledOutput(out);
    setShowCompiled(true);
  };

  // Count selected per category
  const catCounts = {};
  CATEGORIES.forEach(c => { catCounts[c.id] = 0; });
  selectedIds.forEach(id => {
    const allFiles = Object.values(FILES).flat();
    const f = allFiles.find(x => x.id === id);
    if (f) {
      const cat = userCategories[id] || f.category || 'personal';
      catCounts[cat] = (catCounts[cat] || 0) + 1;
    }
  });

  if (showCompiled && compiledOutput) {
    return (
      <div style={{ width: '100%', height: '100%', background: '#08080F', color: '#fff' }}>
        <CompiledView output={compiledOutput} onBack={() => setShowCompiled(false)}/>
      </div>
    );
  }

  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#08080F',
      display: 'flex', fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#fff', overflow: 'hidden',
    }}>

      {/* ── Left sidebar ── */}
      <div style={{
        width: 210, flexShrink: 0,
        background: 'rgba(255,255,255,0.02)',
        borderRight: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', flexDirection: 'column',
        overflowY: 'auto', scrollbarWidth: 'none',
      }}>
        {/* Header */}
        <div style={{ padding: '20px 16px 12px' }}>
          <div style={{ color: '#fff', fontSize: 14, fontWeight: 800, marginBottom: 2 }}>Context Builder</div>
          <div style={{ color: '#444', fontSize: 11 }}>select files · assign categories</div>
        </div>

        {/* Selected count */}
        {selectedIds.size > 0 && (
          <div style={{
            margin: '0 12px 12px', padding: '10px 12px',
            background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)',
            borderRadius: 10,
          }}>
            <div style={{ color: '#C9A84C', fontSize: 13, fontWeight: 700 }}>{selectedIds.size} files selected</div>
            <div style={{ color: 'rgba(201,168,76,0.6)', fontSize: 10, marginTop: 2 }}>
              {Object.entries(catCounts).filter(([,v]) => v > 0).map(([k,v]) => {
                const cat = CATEGORIES.find(c => c.id === k);
                return `${v} ${cat?.label}`;
              }).join(' · ')}
            </div>
          </div>
        )}

        {/* Sources */}
        <div style={{ padding: '0 8px', flex: 1 }}>
          <div style={{ color: '#333', fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 8px 8px' }}>Data Sources</div>
          {SOURCES.map(src => {
            const active = activeSource === src.id;
            const srcFiles = FILES[src.id] || [];
            const selCount = srcFiles.filter(f => selectedIds.has(f.id)).length;
            return (
              <button
                key={src.id}
                onClick={() => { setActiveSource(src.id); setSearch(''); }}
                style={{
                  width: '100%', background: active ? `${src.color}12` : 'transparent',
                  border: `1px solid ${active ? src.color + '30' : 'transparent'}`,
                  borderRadius: 9, padding: '8px 10px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 9, marginBottom: 3,
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ color: src.color, flexShrink: 0 }}>
                  <Ico d={icons[src.icon]} size={14} stroke={src.color}/>
                </div>
                <span style={{ color: active ? '#fff' : '#888', fontSize: 12, fontWeight: active ? 600 : 400, flex: 1, textAlign: 'left' }}>{src.label}</span>
                {selCount > 0 && (
                  <span style={{
                    background: `${src.color}25`, color: src.color,
                    fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 10,
                  }}>{selCount}</span>
                )}
                {selCount === 0 && src.count > 0 && (
                  <span style={{ color: '#333', fontSize: 10 }}>{src.count}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Category filter */}
        <div style={{ padding: '12px 8px 8px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ color: '#333', fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '0 8px 8px' }}>Filter by Category</div>
          <button onClick={() => setFilterCat(null)} style={{
            width: '100%', background: !filterCat ? 'rgba(255,255,255,0.06)' : 'transparent',
            border: `1px solid ${!filterCat ? 'rgba(255,255,255,0.12)' : 'transparent'}`,
            borderRadius: 7, padding: '5px 10px', cursor: 'pointer',
            color: !filterCat ? '#fff' : '#444', fontSize: 11, textAlign: 'left', marginBottom: 2,
          }}>All categories</button>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setFilterCat(filterCat === cat.id ? null : cat.id)} style={{
              width: '100%', background: filterCat === cat.id ? `${cat.color}12` : 'transparent',
              border: `1px solid ${filterCat === cat.id ? cat.color + '30' : 'transparent'}`,
              borderRadius: 7, padding: '5px 10px', cursor: 'pointer',
              color: filterCat === cat.id ? cat.color : '#555', fontSize: 11,
              textAlign: 'left', marginBottom: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span>{cat.label}</span>
              {catCounts[cat.id] > 0 && <span style={{ color: cat.color, fontSize: 10, fontWeight: 700 }}>{catCounts[cat.id]}</span>}
            </button>
          ))}
        </div>

        {/* Compile button */}
        <div style={{ padding: '12px 12px 16px' }}>
          <button
            onClick={compile}
            disabled={selectedIds.size === 0}
            style={{
              width: '100%', padding: '11px',
              background: selectedIds.size > 0 ? 'linear-gradient(135deg, #C9A84C, #A8882A)' : 'rgba(255,255,255,0.05)',
              border: 'none', borderRadius: 10, cursor: selectedIds.size > 0 ? 'pointer' : 'not-allowed',
              color: selectedIds.size > 0 ? '#000' : '#333', fontWeight: 700, fontSize: 13,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              transition: 'all 0.2s',
              boxShadow: selectedIds.size > 0 ? '0 4px 16px rgba(201,168,76,0.35)' : 'none',
            }}
          >
            <Ico d={icons.sparkle} size={14} stroke={selectedIds.size > 0 ? '#000' : '#333'} fill={selectedIds.size > 0 ? '#000' : 'none'}/>
            Generate Profile
          </button>
        </div>
      </div>

      {/* ── Main file area ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Toolbar */}
        <div style={{
          padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0,
        }}>
          {/* Source label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {(() => { const src = SOURCES.find(s => s.id === activeSource); return src ? (
              <>
                <Ico d={icons[src.icon]} size={16} stroke={src.color}/>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{src.label}</span>
                <span style={{ color: '#333', fontSize: 12 }}>— {sourceFiles.length} items</span>
              </>
            ) : null; })()}
          </div>

          {/* Search */}
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search files..."
            style={{
              marginLeft: 'auto', background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.09)', borderRadius: 8,
              padding: '6px 12px', color: '#fff', fontSize: 12, outline: 'none',
              width: 200,
            }}
          />

          {/* Select all / clear */}
          <button onClick={selectAll} style={{
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 8, padding: '6px 12px', color: '#888', fontSize: 12, cursor: 'pointer',
          }}>Select all</button>
          <button onClick={clearSource} style={{
            background: 'transparent', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 8, padding: '6px 12px', color: '#555', fontSize: 12, cursor: 'pointer',
          }}>Clear</button>
        </div>

        {/* File grid */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '16px 20px',
          scrollbarWidth: 'thin',
        }}>
          {activeSource === 'upload' ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: '2px dashed rgba(255,255,255,0.12)', borderRadius: 16,
                padding: '60px 40px', textAlign: 'center', cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
            >
              <div style={{ color: '#444', marginBottom: 12 }}><Ico d={icons.upload} size={32} stroke="#444"/></div>
              <div style={{ color: '#888', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Drop files here or click to browse</div>
              <div style={{ color: '#333', fontSize: 12 }}>Supports PDF, TXT, MD, CSV, JSON</div>
              <input ref={fileInputRef} type="file" multiple accept=".pdf,.txt,.md,.csv,.json" style={{ display: 'none' }}/>
            </div>
          ) : sourceFiles.length === 0 ? (
            <div style={{ padding: 40, textAlign: 'center', color: '#333', fontSize: 13 }}>No files match your filter</div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 10,
            }}>
              {sourceFiles.map(f => (
                <FileCard
                  key={f.id}
                  file={f}
                  selected={selectedIds.has(f.id)}
                  onToggle={() => toggle(f.id)}
                  assignedCategory={userCategories[f.id]}
                  onCategoryChange={assignCategory}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Right panel: summary ── */}
      <div style={{
        width: 260, flexShrink: 0,
        borderLeft: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', flexDirection: 'column',
        background: 'rgba(255,255,255,0.015)',
        overflowY: 'auto', scrollbarWidth: 'none',
      }}>
        <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 2 }}>Profile Summary</div>
          <div style={{ color: '#333', fontSize: 11 }}>{selectedIds.size} files across {Object.values(catCounts).filter(v => v > 0).length} categories</div>
        </div>

        {/* Category breakdown */}
        <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          {CATEGORIES.map(cat => {
            const count = catCounts[cat.id] || 0;
            const total = [...selectedIds].reduce((n, id) => n + (((userCategories[id] || (Object.values(FILES).flat().find(f => f.id === id)?.category)) === cat.id) ? 1 : 0), 0);
            return (
              <div key={cat.id} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: count ? cat.color : '#333', fontSize: 11, fontWeight: count ? 600 : 400 }}>{cat.label}</span>
                  <span style={{ color: count ? cat.color : '#222', fontSize: 11, fontWeight: 700 }}>{count}</span>
                </div>
                <div style={{ height: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 99 }}>
                  <div style={{
                    height: '100%', borderRadius: 99,
                    background: cat.color,
                    width: selectedIds.size > 0 ? `${(count / selectedIds.size) * 100}%` : '0%',
                    transition: 'width 0.3s',
                  }}/>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected file list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 14px' }}>
          {selectedIds.size === 0 ? (
            <div style={{ color: '#2a2a2a', fontSize: 12, textAlign: 'center', paddingTop: 20 }}>
              Click files to add them to your profile
            </div>
          ) : (
            <>
              <div style={{ color: '#333', fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 10 }}>Selected</div>
              {[...selectedIds].map(id => {
                const allFiles = Object.values(FILES).flat();
                const f = allFiles.find(x => x.id === id);
                if (!f) return null;
                const cat = CATEGORIES.find(c => c.id === (userCategories[id] || f.category));
                return (
                  <div key={id} style={{
                    display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8,
                    padding: '7px 9px', background: 'rgba(255,255,255,0.03)',
                    borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)',
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: cat?.color || '#888', flexShrink: 0 }}/>
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
                    <button onClick={() => toggle(id)} style={{
                      background: 'none', border: 'none', cursor: 'pointer', color: '#444', padding: 0, flexShrink: 0,
                    }}>
                      <Ico d={icons.x} size={12} stroke="#444"/>
                    </button>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

    </div>
  );
}
