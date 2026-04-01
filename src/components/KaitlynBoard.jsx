import { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────────
   Each sticker: a real SVG sticker design + panel data
───────────────────────────────────────────────────────────────── */
const STICKERS = [
  {
    id: 'projects',
    top: 38, left: 44, rot: -9, w: 96, h: 78,
    panel: {
      title: 'Projects', accent: '#C97B5A',
      rows: [
        { main: 'Meridian Dashboard v2',  dim: 'UI Design',  tag: 'In Progress', tc: '#C97B5A' },
        { main: 'Icarus Onboarding Flow', dim: 'UX',         tag: 'In Review',   tc: '#C9A84C' },
        { main: 'Brand Kit 2026',         dim: 'Branding',   tag: 'Drafting',    tc: '#9B8FF5' },
        { main: 'iOS Widget Screens',     dim: 'iOS',        tag: 'Blocked',     tc: '#F08060' },
        { main: 'LavaLab Pitch Deck',     dim: 'Slides',     tag: 'Done ✓',      tc: '#69D17A' },
      ],
    },
    svg: (
      <svg width="96" height="78" viewBox="0 0 96 78" fill="none">
        <rect x="1" y="1" width="94" height="76" rx="6" fill="#F7F1E6" stroke="#D4C4A0" strokeWidth="1"/>
        <rect x="5" y="5" width="86" height="68" rx="4" fill="none" stroke="#E8D8B8" strokeWidth="0.5"/>
        <line x1="8" y1="8" x2="18" y2="8" stroke="#C8A87A" strokeWidth="0.8"/>
        <line x1="8" y1="8" x2="8" y2="18" stroke="#C8A87A" strokeWidth="0.8"/>
        <line x1="88" y1="8" x2="78" y2="8" stroke="#C8A87A" strokeWidth="0.8"/>
        <line x1="88" y1="8" x2="88" y2="18" stroke="#C8A87A" strokeWidth="0.8"/>
        <line x1="8" y1="70" x2="18" y2="70" stroke="#C8A87A" strokeWidth="0.8"/>
        <line x1="8" y1="70" x2="8" y2="60" stroke="#C8A87A" strokeWidth="0.8"/>
        <line x1="88" y1="70" x2="78" y2="70" stroke="#C8A87A" strokeWidth="0.8"/>
        <line x1="88" y1="70" x2="88" y2="60" stroke="#C8A87A" strokeWidth="0.8"/>
        <text x="48" y="23" textAnchor="middle" fontSize="7.5" fill="#9A7A50" letterSpacing="2.5" fontFamily="Georgia,serif">PROJECTS</text>
        <line x1="24" y1="28" x2="72" y2="28" stroke="#D4C4A0" strokeWidth="0.5"/>
        <path d="M39 38 L52 38 L57 43 L57 56 L39 56 Z" stroke="#B8926A" strokeWidth="1.2" fill="none"/>
        <line x1="39" y1="43" x2="57" y2="43" stroke="#B8926A" strokeWidth="0.8"/>
        <line x1="43" y1="43" x2="43" y2="56" stroke="#D4C4A0" strokeWidth="0.5"/>
        <line x1="47" y1="43" x2="47" y2="56" stroke="#D4C4A0" strokeWidth="0.5"/>
        <line x1="51" y1="43" x2="51" y2="56" stroke="#D4C4A0" strokeWidth="0.5"/>
        <line x1="52" y1="38" x2="57" y2="43" stroke="#B8926A" strokeWidth="1.2"/>
        <line x1="52" y1="38" x2="52" y2="43" stroke="#B8926A" strokeWidth="1.2"/>
        <text x="48" y="68" textAnchor="middle" fontSize="6.5" fill="#C8A87A" letterSpacing="1.5" fontFamily="system-ui,sans-serif">IN PROGRESS</text>
      </svg>
    ),
  },
  {
    id: 'palette',
    top: 22, left: 228, rot: 4, w: 84, h: 84,
    panel: {
      title: 'Color Systems', accent: '#9B8FF5',
      type: 'palettes',
      palettes: [
        { name: 'Meridian Dark',  sw: ['#08080F','#1A1A2E','#9B8FF5','#C9A84C','#6BAED6'] },
        { name: 'Icarus Warm',   sw: ['#1C1008','#3D2B1F','#C4947A','#C4A06A','#FFF5E4'] },
        { name: 'Studio Pastel', sw: ['#FFD6E0','#FFEFBA','#C3F0CA','#C8E6FF','#E8D5FF'] },
        { name: 'Clean Minimal', sw: ['#FFFFFF','#F0EDEA','#D0CCC8','#6B6560','#1C1916'] },
      ],
    },
    svg: (
      <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
        <circle cx="42" cy="42" r="40" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="1"/>
        <path d="M42 2 A40 40 0 0 1 82 42 L42 42 Z" fill="#FFB3BA"/>
        <path d="M82 42 A40 40 0 0 1 42 82 L42 42 Z" fill="#B5EAD7"/>
        <path d="M42 82 A40 40 0 0 1 2 42 L42 42 Z" fill="#C7CEEA"/>
        <path d="M2 42 A40 40 0 0 1 42 2 L42 42 Z" fill="#FFDAC1"/>
        <circle cx="42" cy="42" r="14" fill="white" stroke="#E8E0D8" strokeWidth="1"/>
        <circle cx="42" cy="42" r="2" fill="#D8D0C8"/>
        <line x1="42" y1="28" x2="42" y2="56" stroke="#E0D8D0" strokeWidth="0.5"/>
        <line x1="28" y1="42" x2="56" y2="42" stroke="#E0D8D0" strokeWidth="0.5"/>
      </svg>
    ),
  },
  {
    id: 'inspo',
    top: 30, left: 406, rot: -5, w: 78, h: 100,
    panel: {
      title: 'Inspiration', accent: '#5B8A8A',
      rows: [
        { main: 'Dribbble',        dim: 'soft UI & glass',    tag: '14 saves', tc: '#5B8A8A' },
        { main: 'Behance',         dim: 'mobile app flows',   tag: '9 saves',  tc: '#5B8A8A' },
        { main: 'Pinterest',       dim: 'workspace setups',   tag: '31 saves', tc: '#5B8A8A' },
        { main: 'Are.na',          dim: 'typography',         tag: '7 saves',  tc: '#5B8A8A' },
        { main: 'Figma Community', dim: 'design systems',     tag: '22 saves', tc: '#5B8A8A' },
      ],
    },
    svg: (
      <svg width="78" height="100" viewBox="0 0 78 100" fill="none">
        <rect x="1" y="1" width="76" height="98" rx="5" fill="#1A2E2E" stroke="#2A4040" strokeWidth="1"/>
        <rect x="6" y="12" width="66" height="1" fill="#2E4A4A"/>
        <rect x="6" y="86" width="66" height="1" fill="#2E4A4A"/>
        <text x="39" y="9" textAnchor="middle" fontSize="5.5" fill="#4A7070" letterSpacing="3" fontFamily="system-ui,sans-serif">✦ ✦ ✦</text>
        <text x="39" y="38" textAnchor="middle" fontSize="22" fill="#7BB8B8" fontFamily="Georgia,serif" fontWeight="bold" fontStyle="italic">IN</text>
        <text x="39" y="62" textAnchor="middle" fontSize="22" fill="#7BB8B8" fontFamily="Georgia,serif" fontWeight="bold" fontStyle="italic">SPO</text>
        <line x1="18" y1="68" x2="60" y2="68" stroke="#2E4A4A" strokeWidth="0.8"/>
        <text x="39" y="80" textAnchor="middle" fontSize="6" fill="#4A7070" letterSpacing="2" fontFamily="system-ui,sans-serif">MOODBOARD</text>
        <text x="39" y="94" textAnchor="middle" fontSize="5" fill="#3A5858" letterSpacing="1" fontFamily="system-ui,sans-serif">2 0 2 6</text>
      </svg>
    ),
  },
  {
    id: 'focus',
    top: 162, left: 30, rot: 5, w: 128, h: 56,
    panel: {
      title: 'Focus Sessions', accent: '#D4956A',
      type: 'stats',
      current: 'Meridian onboarding — screen 4/7',
      stats: [
        { label: 'Hours in Figma',   value: '6.5h',   dim: 'today'       },
        { label: 'Screens designed', value: '14',     dim: 'this week'   },
        { label: 'Deep work streak', value: '4 days', dim: 'consecutive' },
        { label: 'Flow sessions',    value: '3 ×90m', dim: 'avg length'  },
      ],
    },
    svg: (
      <svg width="128" height="56" viewBox="0 0 128 56" fill="none">
        <rect x="1" y="1" width="126" height="54" rx="27" fill="#1A1410" stroke="#3A2E28" strokeWidth="1"/>
        <rect x="8" y="8" width="38" height="40" rx="3" fill="#2A2018"/>
        <rect x="10" y="8" width="3" height="3" rx="1" fill="#3A3028"/>
        <rect x="43" y="8" width="3" height="3" rx="1" fill="#3A3028"/>
        <rect x="10" y="45" width="3" height="3" rx="1" fill="#3A3028"/>
        <rect x="43" y="45" width="3" height="3" rx="1" fill="#3A3028"/>
        <circle cx="27" cy="28" r="10" stroke="#D4956A" strokeWidth="1.2" fill="none"/>
        <circle cx="27" cy="28" r="5" stroke="#8A5A3A" strokeWidth="0.8" fill="none"/>
        <circle cx="27" cy="28" r="1.5" fill="#D4956A"/>
        <line x1="27" y1="18" x2="27" y2="14" stroke="#D4956A" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="82" y="12" width="40" height="32" rx="2" fill="none"/>
        <text x="102" y="26" textAnchor="middle" fontSize="9" fill="#D4956A" fontFamily="system-ui,sans-serif" fontWeight="700" letterSpacing="0.5">DEEP</text>
        <text x="102" y="38" textAnchor="middle" fontSize="9" fill="#D4956A" fontFamily="system-ui,sans-serif" fontWeight="700" letterSpacing="0.5">WORK</text>
        <line x1="56" y1="14" x2="56" y2="42" stroke="#3A2E28" strokeWidth="1"/>
        <text x="64" y="31" textAnchor="middle" fontSize="6" fill="#6A5040" letterSpacing="1.5" fontFamily="system-ui,sans-serif">MODE</text>
      </svg>
    ),
  },
  {
    id: 'review',
    top: 148, left: 430, rot: -6, w: 82, h: 82,
    panel: {
      title: 'Awaiting Feedback', accent: '#7A9EC4',
      type: 'feedback',
      feedbacks: [
        { from: 'Johnny', on: 'iMessage UI mockups',   age: '2h',     urgent: false },
        { from: 'Ronnie', on: 'GTM one-pager layout',  age: '1 day',  urgent: true  },
        { from: 'Turat',  on: 'Dashboard data viz',    age: '3h',     urgent: false },
        { from: 'Team',   on: 'App icon variants ×3',  age: '5 days', urgent: true  },
      ],
    },
    svg: (
      <svg width="82" height="82" viewBox="0 0 82 82" fill="none">
        <circle cx="41" cy="41" r="40" fill="#0E1824" stroke="#1E3040" strokeWidth="1"/>
        <circle cx="41" cy="41" r="33" fill="none" stroke="#1A2C40" strokeWidth="8"/>
        <circle cx="41" cy="41" r="24" fill="none" stroke="#162438" strokeWidth="1"/>
        <circle cx="41" cy="41" r="18" fill="none" stroke="#1E3048" strokeWidth="1"/>
        <ellipse cx="41" cy="41" rx="18" ry="9" fill="none" stroke="#7A9EC4" strokeWidth="1.2"/>
        <circle cx="41" cy="41" r="5" fill="none" stroke="#7A9EC4" strokeWidth="1.2"/>
        <circle cx="41" cy="41" r="2" fill="#7A9EC4"/>
        <circle cx="59" cy="41" r="2" fill="#3A5878" opacity="0.6"/>
        <circle cx="23" cy="41" r="2" fill="#3A5878" opacity="0.6"/>
        <text x="41" y="74" textAnchor="middle" fontSize="6" fill="#3A5878" letterSpacing="2.5" fontFamily="system-ui,sans-serif">REVIEW</text>
      </svg>
    ),
  },
  {
    id: 'saved',
    top: 244, left: 52, rot: 11, w: 76, h: 94,
    panel: {
      title: 'Reference Library', accent: '#C4547A',
      rows: [
        { main: 'Raycast onboarding',     dim: 'UX Pattern', tag: '↗', tc: '#C4547A' },
        { main: 'Linear empty states',    dim: 'UI',         tag: '↗', tc: '#C4547A' },
        { main: 'Stripe docs design',     dim: 'Typography', tag: '↗', tc: '#C4547A' },
        { main: 'Notion icon system',     dim: 'Icons',      tag: '↗', tc: '#C4547A' },
        { main: 'Vercel dark palette',    dim: 'Color',      tag: '↗', tc: '#C4547A' },
        { main: 'Apple HIG',             dim: 'Guidelines', tag: '↗', tc: '#C4547A' },
      ],
    },
    svg: (
      <svg width="76" height="94" viewBox="0 0 76 94" fill="none">
        <rect x="1" y="8" width="74" height="78" rx="2" fill="#F9F6F0" stroke="#E0D8CC" strokeWidth="1"/>
        <rect x="1" y="8" width="74" height="18" rx="2" fill="#F0E8E0" stroke="#E0D8CC" strokeWidth="1"/>
        <line x1="1" y1="26" x2="75" y2="26" stroke="#E0D8CC" strokeWidth="1"/>
        {[0,1,2,3,4].map(i => (
          <circle key={i} cx={10 + i*14} cy={4} r={3} fill="#F9F6F0" stroke="#E0D8CC" strokeWidth="0.8"/>
        ))}
        {[0,1,2,3,4].map(i => (
          <circle key={i} cx={10 + i*14} cy={90} r={3} fill="#F9F6F0" stroke="#E0D8CC" strokeWidth="0.8"/>
        ))}
        <text x="38" y="20" textAnchor="middle" fontSize="8" fill="#8A7060" letterSpacing="1.5" fontFamily="Georgia,serif">ARCHIVE</text>
        <rect x="26" y="34" width="24" height="32" rx="2" fill="none" stroke="#C4547A" strokeWidth="1.2"/>
        <path d="M26 56 L38 48 L50 56" fill="none" stroke="#C4547A" strokeWidth="1.2"/>
        <path d="M38 34 L38 66" stroke="#E0D8CC" strokeWidth="0.5" strokeDasharray="2 2"/>
        <text x="38" y="78" textAnchor="middle" fontSize="6.5" fill="#A89080" letterSpacing="1" fontFamily="system-ui,sans-serif">SAVED REFS</text>
        <line x1="14" y1="83" x2="62" y2="83" stroke="#E0D8CC" strokeWidth="0.5"/>
        <text x="38" y="90" textAnchor="middle" fontSize="5.5" fill="#C0A898" letterSpacing="0.5" fontFamily="system-ui,sans-serif">kaitlyn.design</text>
      </svg>
    ),
  },
  {
    id: 'deadlines',
    top: 262, left: 228, rot: -4, w: 90, h: 82,
    panel: {
      title: 'Upcoming Dates', accent: '#6BA88A',
      type: 'events',
      events: [
        { date: 'Apr 1',  name: 'Convergence demo',        urgent: true  },
        { date: 'Apr 3',  name: 'LavaLab pitch deck final', urgent: true  },
        { date: 'Apr 7',  name: 'Icarus onboarding v1',    urgent: false },
        { date: 'Apr 12', name: 'App Store screenshots',    urgent: false },
        { date: 'Apr 18', name: 'Brand refresh pres.',      urgent: false },
      ],
    },
    svg: (
      <svg width="90" height="82" viewBox="0 0 90 82" fill="none">
        <rect x="1" y="1" width="88" height="80" rx="4" fill="#F4F8F5" stroke="#C8DCD0" strokeWidth="1"/>
        <rect x="1" y="1" width="88" height="22" rx="4" fill="#6BA88A" stroke="#5A9878" strokeWidth="1"/>
        <rect x="1" y="12" width="88" height="11" fill="#6BA88A"/>
        <text x="45" y="16" textAnchor="middle" fontSize="8" fill="white" letterSpacing="1.5" fontFamily="system-ui,sans-serif" fontWeight="700">APRIL</text>
        <line x1="45" y1="22" x2="45" y2="81" stroke="#C8DCD0" strokeWidth="0.5"/>
        {[0,1,2,3,4,5,6].map(i => (
          <text key={i} x={10 + i*12} y="32" textAnchor="middle" fontSize="6" fill="#8AB8A0" fontFamily="system-ui,sans-serif">{'SMTWTFS'[i]}</text>
        ))}
        {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].map((d, i) => {
          const row = Math.floor(i / 7);
          const col = i % 7;
          const urgent = d === 1 || d === 3;
          return (
            <g key={d}>
              {urgent && <circle cx={10 + col*12} cy={41 + row*10} r={5} fill="#F08060" opacity="0.25"/>}
              <text x={10 + col*12} y={44 + row*10} textAnchor="middle" fontSize="6.5"
                fill={urgent ? '#D46A50' : d <= 5 ? '#5A8870' : '#B8CCB8'}
                fontFamily="system-ui,sans-serif" fontWeight={urgent ? '700' : '400'}>
                {d}
              </text>
            </g>
          );
        })}
      </svg>
    ),
  },
  {
    id: 'collabs',
    top: 240, left: 390, rot: 7, w: 110, h: 74,
    panel: {
      title: 'Design Requests', accent: '#C4A84A',
      type: 'requests',
      requests: [
        { from: 'Johnny', ask: 'Claude agent response component', p: 'high' },
        { from: 'Turat',  ask: 'Biometric chart redesign',        p: 'mid'  },
        { from: 'Ronnie', ask: 'Tester onboarding assets',        p: 'high' },
        { from: 'Ronnie', ask: 'TikTok preview cards',            p: 'low'  },
      ],
    },
    svg: (
      <svg width="110" height="74" viewBox="0 0 110 74" fill="none">
        <circle cx="36" cy="37" r="34" fill="#FFF5E0" stroke="#E8D898" strokeWidth="1"/>
        <circle cx="74" cy="37" r="34" fill="#E8F0FF" stroke="#C8D8F0" strokeWidth="1"/>
        <path d="M55 8.4 A34 34 0 0 1 55 65.6 A34 34 0 0 1 55 8.4 Z" fill="#F0ECD8" opacity="0.8"/>
        <text x="22" y="32" textAnchor="middle" fontSize="7" fill="#B89040" fontFamily="system-ui,sans-serif" fontWeight="700" letterSpacing="0.5">YOUR</text>
        <text x="22" y="43" textAnchor="middle" fontSize="7" fill="#B89040" fontFamily="system-ui,sans-serif" fontWeight="700" letterSpacing="0.5">WORK</text>
        <text x="55" y="32" textAnchor="middle" fontSize="6.5" fill="#8A8060" fontFamily="system-ui,sans-serif" letterSpacing="-0.3">col-</text>
        <text x="55" y="43" textAnchor="middle" fontSize="6.5" fill="#8A8060" fontFamily="system-ui,sans-serif" letterSpacing="-0.3">lab</text>
        <text x="88" y="32" textAnchor="middle" fontSize="7" fill="#5060A0" fontFamily="system-ui,sans-serif" fontWeight="700" letterSpacing="0.5">TEAM</text>
        <text x="88" y="43" textAnchor="middle" fontSize="7" fill="#5060A0" fontFamily="system-ui,sans-serif" fontWeight="700" letterSpacing="0.5">WORK</text>
      </svg>
    ),
  },
  {
    id: 'portfolio',
    top: 152, left: 228, rot: -3, w: 88, h: 88,
    panel: {
      title: 'Portfolio Picks', accent: '#9B8FF5',
      type: 'picks',
      picks: [
        { name: 'Meridian Dark Dashboard',  tag: 'Product',  year: '2026' },
        { name: 'Icarus Brand Identity',    tag: 'Branding', year: '2026' },
        { name: 'LavaLab Website',          tag: 'Web',      year: '2025' },
        { name: 'Breeze iMessage Concept',  tag: 'Mobile',   year: '2026' },
      ],
    },
    svg: (
      <svg width="88" height="88" viewBox="0 0 88 88" fill="none">
        <circle cx="44" cy="44" r="42" fill="#F8F5FF" stroke="#D8D0F0" strokeWidth="1"/>
        {Array.from({length:36}).map((_, i) => {
          const angle = (i / 36) * Math.PI * 2;
          const r = 38;
          const x1 = 44 + (r-2) * Math.cos(angle);
          const y1 = 44 + (r-2) * Math.sin(angle);
          const x2 = 44 + r * Math.cos(angle);
          const y2 = 44 + r * Math.sin(angle);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C8C0E8" strokeWidth="0.6"/>;
        })}
        <circle cx="44" cy="44" r="32" fill="#F0ECFC" stroke="#D0C8EC" strokeWidth="0.5"/>
        <polygon points="44,24 48.5,37 62,37 51.5,45.5 55,58 44,50 33,58 36.5,45.5 26,37 39.5,37"
          fill="none" stroke="#9B8FF5" strokeWidth="1.4" strokeLinejoin="round"/>
        <polygon points="44,30 47,38.5 56,38.5 49,43.5 51.5,52 44,47 36.5,52 39,43.5 32,38.5 41,38.5"
          fill="#E8E0FC" stroke="#B8B0E8" strokeWidth="0.5"/>
        <text x="44" y="70" textAnchor="middle" fontSize="6" fill="#8878D0" letterSpacing="2.5" fontFamily="system-ui,sans-serif">PORTFOLIO</text>
        <line x1="20" y1="73" x2="68" y2="73" stroke="#D0C8EC" strokeWidth="0.5"/>
        <text x="44" y="81" textAnchor="middle" fontSize="5.5" fill="#B8B0D8" letterSpacing="1" fontFamily="system-ui,sans-serif">best works</text>
      </svg>
    ),
  },
];

/* ── Panel ───────────────────────────────────────────────────────── */
function Panel({ s, onClose }) {
  const p = s.panel;
  const Card = ({ children, highlight }) => (
    <div style={{
      background: highlight ? `${p.accent}10` : 'rgba(255,255,255,0.04)',
      border: `1px solid ${highlight ? p.accent + '30' : 'rgba(255,255,255,0.07)'}`,
      borderRadius: 10, padding: '9px 12px',
    }}>{children}</div>
  );

  return (
    <div data-panel style={{
      position: 'absolute', right: 22, top: '50%',
      transform: 'translateY(-50%)',
      width: 296,
      background: 'rgba(12,10,16,0.92)',
      backdropFilter: 'blur(28px)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 20, overflow: 'hidden',
      boxShadow: `0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)`,
      zIndex: 300,
      animation: 'panelIn 0.24s cubic-bezier(0.34,1.4,0.64,1)',
    }}>
      {/* Header */}
      <div style={{
        padding: '15px 17px 13px',
        background: `linear-gradient(135deg, ${p.accent}18, ${p.accent}08)`,
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 7, overflow: 'hidden', flexShrink: 0,
              border: `1px solid ${p.accent}40`,
            }}>
              <svg width="28" height="28" viewBox={`0 0 ${s.w} ${s.h}`} preserveAspectRatio="xMidYMid meet">
                {s.svg.props.children}
              </svg>
            </div>
            <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>{p.title}</span>
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 7, color: 'rgba(255,255,255,0.4)', fontSize: 13,
            cursor: 'pointer', padding: '2px 8px', lineHeight: 1,
          }}>✕</button>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '10px 12px 14px', display: 'flex', flexDirection: 'column', gap: 5, maxHeight: 370, overflowY: 'auto' }}>

        {p.rows && p.rows.map((r, i) => (
          <Card key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, fontWeight: 500 }}>{r.main}</div>
                <div style={{ color: 'rgba(255,255,255,0.28)', fontSize: 10, marginTop: 2 }}>{r.dim}</div>
              </div>
              <div style={{
                fontSize: 10, padding: '2px 8px', borderRadius: 20, whiteSpace: 'nowrap', marginLeft: 8,
                color: r.tc, border: `1px solid ${r.tc}45`, background: `${r.tc}12`,
              }}>{r.tag}</div>
            </div>
          </Card>
        ))}

        {p.type === 'palettes' && p.palettes.map((pal, i) => (
          <Card key={i}>
            <div style={{ color: 'rgba(255,255,255,0.28)', fontSize: 9, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 7 }}>{pal.name}</div>
            <div style={{ display: 'flex', gap: 4 }}>
              {pal.sw.map((c, j) => (
                <div key={j} style={{
                  flex: 1, height: 20, borderRadius: 4, background: c,
                  border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer',
                  transition: 'transform 0.15s',
                }} title={c}
                  onMouseEnter={e => e.target.style.transform = 'scaleY(1.25)'}
                  onMouseLeave={e => e.target.style.transform = 'scaleY(1)'}
                />
              ))}
            </div>
          </Card>
        ))}

        {p.type === 'stats' && (
          <>
            {p.current && (
              <Card highlight>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>now in</div>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>{p.current}</div>
              </Card>
            )}
            {p.stats.map((s, i) => (
              <Card key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>{s.label}</div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: p.accent, fontSize: 15, fontWeight: 700, fontFamily: '"SF Mono",monospace' }}>{s.value}</div>
                    <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: 9 }}>{s.dim}</div>
                  </div>
                </div>
              </Card>
            ))}
          </>
        )}

        {p.type === 'feedback' && p.feedbacks.map((f, i) => (
          <Card key={i} highlight={f.urgent}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <span style={{ color: p.accent, fontSize: 12, fontWeight: 600 }}>{f.from}</span>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {f.urgent && <span style={{ color: '#F08060', fontSize: 9 }}>urgent</span>}
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 10 }}>{f.age}</span>
              </div>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>{f.on}</div>
          </Card>
        ))}

        {p.type === 'events' && p.events.map((e, i) => (
          <Card key={i} highlight={e.urgent}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ color: e.urgent ? p.accent : 'rgba(255,255,255,0.25)', fontSize: 10, fontFamily: 'monospace', fontWeight: 700, minWidth: 38 }}>{e.date}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>{e.name}</div>
            </div>
          </Card>
        ))}

        {p.type === 'requests' && p.requests.map((r, i) => (
          <Card key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ color: p.accent, fontSize: 12, fontWeight: 600 }}>{r.from}</span>
              <span style={{
                fontSize: 9, padding: '2px 7px', borderRadius: 20,
                color: r.p === 'high' ? '#F08060' : r.p === 'mid' ? '#FBBF24' : '#69D17A',
                background: r.p === 'high' ? 'rgba(240,128,96,0.12)' : r.p === 'mid' ? 'rgba(251,191,36,0.12)' : 'rgba(105,209,122,0.12)',
                border: '1px solid currentColor',
              }}>{r.p}</span>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>{r.ask}</div>
          </Card>
        ))}

        {p.type === 'picks' && p.picks.map((pick, i) => (
          <Card key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.82)', fontSize: 12 }}>{pick.name}</div>
                <div style={{ color: 'rgba(255,255,255,0.28)', fontSize: 10, marginTop: 2 }}>{pick.tag}</div>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.22)', fontSize: 10, fontFamily: 'monospace' }}>{pick.year}</div>
            </div>
          </Card>
        ))}

      </div>
    </div>
  );
}

/* ── Main ────────────────────────────────────────────────────────── */
export default function KaitlynBoard() {
  const [activeId,    setActiveId]    = useState(null);
  const [hoveredId,   setHoveredId]   = useState(null);
  const [draggingId,  setDraggingId]  = useState(null);
  const [positions,   setPositions]   = useState(() =>
    Object.fromEntries(STICKERS.map(s => [s.id, { top: s.top, left: s.left }]))
  );
  const dragRef   = useRef(null);   // { id, offsetX, offsetY, startX, startY, dist }
  const laptopRef = useRef(null);   // MacBook lid div

  useEffect(() => {
    const fn = e => {
      if (!e.target.closest('[data-sticker]') && !e.target.closest('[data-panel]')) setActiveId(null);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const onPointerDown = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = laptopRef.current.getBoundingClientRect();
    const pos  = positions[id];
    dragRef.current = {
      id,
      offsetX: e.clientX - rect.left - pos.left,
      offsetY: e.clientY - rect.top  - pos.top,
      startX:  e.clientX,
      startY:  e.clientY,
      dist:    0,
    };
    setDraggingId(id);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    d.dist = Math.sqrt(dx * dx + dy * dy);
    if (d.dist < 4) return;

    const s    = STICKERS.find(s => s.id === d.id);
    const rect = laptopRef.current.getBoundingClientRect();
    const newLeft = Math.max(-s.w * 0.4, Math.min(580 - s.w * 0.6, e.clientX - rect.left - d.offsetX));
    const newTop  = Math.max(-s.h * 0.4, Math.min(378 - s.h * 0.6, e.clientY - rect.top  - d.offsetY));

    setPositions(prev => ({ ...prev, [d.id]: { top: newTop, left: newLeft } }));
  };

  const onPointerUp = (e, id) => {
    const d = dragRef.current;
    if (!d) return;
    const wasDrag = d.dist > 5;
    dragRef.current = null;
    setDraggingId(null);
    if (!wasDrag) setActiveId(prev => prev === id ? null : id);
  };

  const activeSticker = STICKERS.find(s => s.id === activeId);

  return (
    <div style={{
      width: '100vw', height: '100vh',
      background: 'radial-gradient(ellipse at 35% 40%, #18141e 0%, #0f0c14 50%, #090810 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <style>{`
        @keyframes panelIn {
          from { opacity:0; transform:translateY(-50%) translateX(14px) scale(0.97); }
          to   { opacity:1; transform:translateY(-50%) translateX(0)    scale(1);    }
        }
        @keyframes laptopFloat {
          0%,100% { transform: perspective(1800px) rotateX(5deg) rotateY(-3deg) translateY(0px); }
          50%      { transform: perspective(1800px) rotateX(5deg) rotateY(-3deg) translateY(-6px); }
        }
        @keyframes ambientDrift {
          0%,100% { opacity:0.35; transform:scale(1); }
          50%      { opacity:0.55; transform:scale(1.1); }
        }
      `}</style>

      {/* Ambient background glows */}
      <div style={{ position:'absolute', width:700, height:450, borderRadius:'50%', top:'-5%', left:'5%',
        background:'radial-gradient(ellipse, rgba(100,60,180,0.15) 0%, transparent 70%)',
        animation:'ambientDrift 9s ease-in-out infinite', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', width:500, height:350, borderRadius:'50%', bottom:'0%', right:'5%',
        background:'radial-gradient(ellipse, rgba(180,80,120,0.1) 0%, transparent 70%)',
        animation:'ambientDrift 11s ease-in-out infinite 2s', pointerEvents:'none' }}/>

      {/* Laptop wrapper — 3D perspective tilt */}
      <div style={{ animation: draggingId ? 'none' : 'laptopFloat 7s ease-in-out infinite', position:'relative' }}>

        {/* Cast shadow */}
        <div style={{
          position:'absolute', bottom:-34, left:'15%', right:'15%', height:34,
          background:'radial-gradient(ellipse, rgba(0,0,0,0.7) 0%, transparent 70%)',
          filter:'blur(16px)', borderRadius:'50%',
        }}/>

        {/* ── MacBook lid ── */}
        <div ref={laptopRef} style={{
          width: 580, height: 378,
          borderRadius: 20,
          position: 'relative', overflow: 'visible',
          /* realistic aluminum silver */
          background: `linear-gradient(
            162deg,
            #E4E0DC 0%,
            #D8D4CF 12%,
            #CCCAC6 28%,
            #C6C3BE 45%,
            #CACAC7 62%,
            #D2D0CC 78%,
            #DDDAD6 90%,
            #D0CCC8 100%
          )`,
          boxShadow: `
            inset 0  1px 0 rgba(255,255,255,0.65),
            inset 0 -1px 0 rgba(0,0,0,0.20),
            inset  1px 0 0 rgba(255,255,255,0.35),
            inset -1px 0 0 rgba(0,0,0,0.15),
            0 12px 48px rgba(0,0,0,0.55),
            0  3px 12px rgba(0,0,0,0.30),
            0  0px  2px rgba(0,0,0,0.20)
          `,
        }}>

          {/* Brushed-metal highlight band */}
          <div style={{
            position:'absolute', inset:0, borderRadius:20, pointerEvents:'none',
            background:'repeating-linear-gradient(94deg, transparent, transparent 4px, rgba(255,255,255,0.018) 4px, rgba(255,255,255,0.018) 8px)',
          }}/>

          {/* Edge sheen */}
          <div style={{
            position:'absolute', inset:0, borderRadius:20, pointerEvents:'none',
            background:'linear-gradient(150deg, rgba(255,255,255,0.14) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.06) 100%)',
          }}/>

          {/* Camera notch */}
          <div style={{
            position:'absolute', top:6, left:'50%', transform:'translateX(-50%)',
            width:8, height:8, borderRadius:'50%',
            background:'#1A1818',
            boxShadow:'inset 0 1px 2px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,0,0,0.3)',
          }}/>
          <div style={{
            position:'absolute', top:9, left:'50%', transform:'translateX(-50%)',
            width:2, height:2, borderRadius:'50%', background:'rgba(80,120,200,0.7)',
          }}/>

          {/* Apple logo — etched */}
          <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-54%)', zIndex:2, pointerEvents:'none' }}>
            <svg width="42" height="50" viewBox="0 0 814 1000" style={{ opacity:0.16 }}>
              <path fill="#1A1816" d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663.6 0 541.8 0 309.3 133.4 184.6 264.9 184.6c70 0 128.1 46.4 171.9 46.4 42 0 107.6-49.7 188.7-49.7 30.6 0 108.2 2.6 162.6 92.3zm-234.9-168c31.3-37.9 53.1-89.6 53.1-141.2 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.9 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-69.8z"/>
            </svg>
          </div>

          {/* ── Stickers ── */}
          {STICKERS.map(s => {
            const isActive   = activeId   === s.id;
            const isHovered  = hoveredId  === s.id;
            const isDragging = draggingId === s.id;
            const pos        = positions[s.id];
            return (
              <button
                key={s.id}
                data-sticker
                onPointerDown={e => onPointerDown(e, s.id)}
                onPointerMove={onPointerMove}
                onPointerUp={e => onPointerUp(e, s.id)}
                onMouseEnter={() => !draggingId && setHoveredId(s.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  position:'absolute', top: pos.top, left: pos.left,
                  background:'none', border:'none', padding:0,
                  cursor: isDragging ? 'grabbing' : 'grab',
                  transform: isDragging
                    ? `rotate(${s.rot}deg) scale(1.12) translateY(-6px)`
                    : `rotate(${s.rot}deg) scale(${isActive ? 1.1 : isHovered ? 1.05 : 1}) translateY(${isActive || isHovered ? -4 : 0}px)`,
                  transformOrigin:'center center',
                  transition: isDragging ? 'filter 0.1s' : 'transform 0.22s cubic-bezier(0.34,1.5,0.64,1), filter 0.22s',
                  filter: isDragging
                    ? 'drop-shadow(0 12px 28px rgba(0,0,0,0.55)) drop-shadow(0 4px 8px rgba(0,0,0,0.35))'
                    : isActive
                    ? 'drop-shadow(0 6px 18px rgba(0,0,0,0.45)) drop-shadow(0 2px 6px rgba(0,0,0,0.3))'
                    : isHovered
                    ? 'drop-shadow(0 5px 14px rgba(0,0,0,0.4)) drop-shadow(0 2px 4px rgba(0,0,0,0.25))'
                    : 'drop-shadow(0 2px 6px rgba(0,0,0,0.28)) drop-shadow(0 1px 2px rgba(0,0,0,0.2))',
                  zIndex: isDragging ? 100 : isActive ? 50 : isHovered ? 30 : 10,
                  outline: isActive && !isDragging ? `2px solid rgba(255,255,255,0.5)` : 'none',
                  outlineOffset: 2,
                  touchAction: 'none',
                  userSelect: 'none',
                  borderRadius: s.svg.props.children?.[0]?.type === 'circle' ? '50%' : 6,
                }}
              >
                {s.svg}
              </button>
            );
          })}

        </div>{/* end MacBook lid */}

        {/* Hinge bottom edge — makes it recognizable as a laptop */}
        <div style={{
          height: 9, width: 580,
          background:'linear-gradient(180deg, #B8B4B0 0%, #A8A4A0 40%, #989490 100%)',
          borderRadius:'0 0 8px 8px',
          boxShadow:'0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
        }}/>

      </div>{/* end float wrapper */}

      {/* Label */}
      <div style={{
        position:'absolute', bottom:22, left:'50%', transform:'translateX(-50%)',
        color:'rgba(255,255,255,0.15)', fontSize:10, letterSpacing:'3px',
        textTransform:'uppercase', fontFamily:'system-ui,sans-serif', fontWeight:600,
        pointerEvents:'none',
      }}>Kaitlyn's Board — click a sticker</div>

      {/* Panel */}
      {activeSticker && <Panel s={activeSticker} onClose={() => setActiveId(null)}/>}
    </div>
  );
}
