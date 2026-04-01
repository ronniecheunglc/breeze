import { useState, useEffect, useRef } from 'react';

const KEYFRAMES = `
  @keyframes gradientWallpaper {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes msgIn {
    from { transform: translateY(16px) scale(0.95); opacity: 0; }
    65%  { transform: translateY(-3px) scale(1.01); }
    to   { transform: none; opacity: 1; }
  }
  @keyframes chipIn {
    from { transform: scale(0.7) translateY(10px); opacity: 0; }
    70%  { transform: scale(1.05) translateY(-2px); opacity: 1; }
    to   { transform: scale(1) translateY(0); opacity: 1; }
  }
  @keyframes calIn {
    from { transform: translateY(20px) scale(0.96); opacity: 0; }
    to   { transform: none; opacity: 1; }
  }
  @keyframes barGrow {
    from { width: 0; }
    to   { width: var(--w); }
  }
  @keyframes cardTumble {
    from { transform: translateY(24px) rotate(-2deg) scale(0.93); opacity: 0; }
    65%  { transform: translateY(-4px) rotate(0.5deg) scale(1.02); opacity: 1; }
    to   { transform: none; opacity: 1; }
  }
  @keyframes popBounce {
    from { transform: scale(0.5); opacity: 0; }
    65%  { transform: scale(1.18); }
    to   { transform: scale(1); opacity: 1; }
  }
  @keyframes checkDraw {
    from { stroke-dashoffset: 20; opacity: 0; }
    to   { stroke-dashoffset: 0;  opacity: 1; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-7px); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.45; }
  }
  @keyframes confettiBurst {
    from { transform: translate(0,0) scale(0); opacity: 1; }
    to   { transform: translate(var(--cx), var(--cy)) scale(1); opacity: 0; }
  }
  @keyframes successGlow {
    0%   { box-shadow: 0 0 0 0 rgba(52,211,153,0); }
    50%  { box-shadow: 0 0 0 6px rgba(52,211,153,0.3); }
    100% { box-shadow: 0 0 0 0 rgba(52,211,153,0); }
  }
  @keyframes slideIn {
    from { transform: translateX(8px); opacity: 0; }
    to   { transform: none; opacity: 1; }
  }
  @keyframes sceneSwitch {
    from { opacity: 0; transform: scale(0.97); }
    to   { opacity: 1; transform: scale(1); }
  }
`;

// Pre-computed confetti positions (deterministic — no Math.random in render)
const CONFETTI_PARTICLES = Array.from({ length: 24 }, (_, i) => {
  const angle = (i / 24) * Math.PI * 2;
  const dist = 80 + (i % 4) * 30;
  return {
    cx: `${Math.cos(angle) * dist}px`,
    cy: `${Math.sin(angle) * dist}px`,
    color: ['#C9A84C', '#34D399', '#60A5FA', '#F472B6', '#A78BFA', '#FB923C'][i % 6],
    delay: i * 0.035,
    round: i % 3 !== 0,
  };
});

// ── SCENE 0: iPhone — Breeze Today digest (card-based, not iMessage) ──────────
const DIGEST_CARDS = [
  {
    id: 0,
    category: 'Academic',
    categoryColor: '#6D28D9',
    categoryBg: '#F5F0FF',
    icon: '📚',
    title: 'TA office hours available',
    body: 'Prof. Chen emailed offering Zoom sessions for the recursion section. Thursday 4pm is open on your calendar.',
    primary: { label: 'Schedule Thu 4pm', color: '#6D28D9', doneLabel: 'Scheduled ✓', doneIcon: '📅', doneNote: 'Thu, March 31 · 4–5 PM' },
    secondary: 'Dismiss',
  },
  {
    id: 1,
    category: 'Finance',
    categoryColor: '#B45309',
    categoryBg: '#FEF3C7',
    icon: '💸',
    title: 'Tuition payment due in 3 days',
    body: 'April 3 installment — $2,840. The USC Finance email has been sitting unread for 11 days.',
    primary: { label: 'Open email', color: '#B45309', doneLabel: 'Email opened ✓', doneIcon: '✉️', doneNote: 'Marked as read' },
    secondary: 'Set reminder',
  },
  {
    id: 2,
    category: 'Relationships',
    categoryColor: '#0F766E',
    categoryBg: '#CCFBF1',
    icon: '🤝',
    title: 'Nuria Wolfe is still waiting',
    body: 'Your Marshall career advisor emailed twice about London. She\'s actively trying to help — one reply closes the loop.',
    primary: { label: 'Draft reply', color: '#0F766E', doneLabel: 'Reply drafted ✓', doneIcon: '✍️', doneNote: 'Saved to Drafts' },
    secondary: 'Later',
  },
];

export function Scene0() {
  const [states, setStates] = useState({ 0: 'idle', 1: 'idle', 2: 'idle' }); // idle | done | dismissed
  const scrollRef = useRef(null);

  const act = (id, type) => setStates(s => ({ ...s, [id]: type }));

  const handled = Object.values(states).filter(s => s !== 'idle').length;

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(160deg, #F0E8FF 0%, #FFE8F4 40%, #EEF4FF 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'sceneSwitch 0.35s ease both',
    }}>
      <div style={{ position: 'absolute', top: 28, textAlign: 'center', zIndex: 5, pointerEvents: 'none' }}>
        <div style={{ fontSize: 10, color: '#9080B8', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Day 1 · Morning Digest</div>
      </div>

      <div style={{ position: 'absolute', bottom: 80, right: 40, fontSize: 11, color: 'rgba(0,0,0,0.22)', pointerEvents: 'none' }}>tap actions to handle each card</div>

      {/* Phone */}
      <div style={{
        width: 300, height: 590, borderRadius: 44, border: '7px solid #1A1A2A',
        background: '#F4F4F8', overflow: 'hidden', position: 'relative',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 40px 100px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.08)',
      }}>
        {/* Notch */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 100, height: 26, background: '#1A1A2A', borderRadius: '0 0 18px 18px', zIndex: 30 }} />

        {/* Status bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px 0', fontSize: 11, fontWeight: 700, color: '#1A1228', flexShrink: 0 }}>
          <span>9:41</span><span style={{ fontSize: 10 }}>●●● 5G ▪▪▪</span>
        </div>

        {/* App header */}
        <div style={{ padding: '8px 16px 12px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg, #C9A84C, #6D28D9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#fff' }}>B</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#1A1228', letterSpacing: '-0.02em' }}>Good morning</div>
            <div style={{ fontSize: 10, color: '#9090A8' }}>3 things need your attention</div>
          </div>
          {handled < 3 && (
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#6D28D9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: '#fff', animation: 'popBounce 0.4s ease both' }}>
              {3 - handled}
            </div>
          )}
          {handled === 3 && (
            <div style={{ fontSize: 16, animation: 'popBounce 0.4s ease both' }}>✓</div>
          )}
        </div>

        {/* Cards */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '4px 12px 12px', display: 'flex', flexDirection: 'column', gap: 10, scrollbarWidth: 'none' }}>
          {DIGEST_CARDS.map((card, idx) => {
            const state = states[card.id];
            const done = state === 'done';
            const dismissed = state === 'dismissed';

            return (
              <div key={card.id} style={{
                background: done ? card.primary.doneIcon ? card.categoryBg : '#fff' : dismissed ? '#F0F0F4' : '#fff',
                borderRadius: 18,
                border: `1.5px solid ${done ? card.categoryColor + '30' : dismissed ? '#E0E0E8' : '#E8E8F0'}`,
                padding: '13px 14px',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                opacity: dismissed ? 0.35 : 1,
                transform: dismissed ? 'scale(0.97)' : 'scale(1)',
                animation: `cardTumble 0.45s cubic-bezier(0.22,1,0.36,1) ${idx * 0.1}s both`,
                boxShadow: done ? `0 4px 20px ${card.categoryColor}18` : '0 2px 8px rgba(0,0,0,0.05)',
              }}>
                {/* Card header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
                  <div style={{ fontSize: 14 }}>{card.icon}</div>
                  <div style={{ padding: '2px 8px', background: card.categoryBg, borderRadius: 8, fontSize: 8.5, fontWeight: 700, color: card.categoryColor, letterSpacing: '0.06em' }}>
                    {card.category}
                  </div>
                  {done && (
                    <div style={{ marginLeft: 'auto', fontSize: 9, color: card.categoryColor, fontWeight: 700, animation: 'slideIn 0.3s ease both' }}>
                      {card.primary.doneLabel}
                    </div>
                  )}
                </div>

                {/* Card content */}
                <div style={{ fontSize: 12, fontWeight: 700, color: dismissed ? '#A0A0B0' : '#1A1228', marginBottom: 5, lineHeight: 1.3 }}>{card.title}</div>
                <div style={{ fontSize: 10.5, color: dismissed ? '#C0C0D0' : '#6B6880', lineHeight: 1.5, marginBottom: done || dismissed ? 0 : 11 }}>{card.body}</div>

                {/* Done state */}
                {done && (
                  <div style={{ marginTop: 8, padding: '7px 10px', background: card.categoryColor + '12', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 6, animation: 'calIn 0.4s ease both' }}>
                    <span style={{ fontSize: 14 }}>{card.primary.doneIcon}</span>
                    <span style={{ fontSize: 10, color: card.categoryColor, fontWeight: 700 }}>{card.primary.doneNote}</span>
                  </div>
                )}

                {/* Action buttons */}
                {!done && !dismissed && (
                  <div style={{ display: 'flex', gap: 7 }}>
                    <button onClick={(e) => { e.stopPropagation(); act(card.id, 'done'); }} style={{
                      flex: 1, padding: '8px 0', background: card.primary.color,
                      border: 'none', borderRadius: 12, color: '#fff',
                      fontSize: 11, fontWeight: 700, cursor: 'pointer',
                      transition: 'opacity 0.15s',
                    }}>{card.primary.label}</button>
                    <button onClick={(e) => { e.stopPropagation(); act(card.id, 'dismissed'); }} style={{
                      padding: '8px 12px', background: '#F0F0F8',
                      border: 'none', borderRadius: 12, color: '#8080A0',
                      fontSize: 11, fontWeight: 600, cursor: 'pointer',
                    }}>{card.secondary}</button>
                  </div>
                )}
              </div>
            );
          })}

          {/* All done */}
          {handled === 3 && (
            <div style={{ textAlign: 'center', padding: '8px 0', animation: 'popBounce 0.5s ease both' }}>
              <div style={{ fontSize: 11, color: '#34D399', fontWeight: 700 }}>All handled — Breeze is on it ✓</div>
            </div>
          )}
        </div>

        {/* Home bar */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '0 0 14px', flexShrink: 0 }}>
          <div style={{ width: 70, height: 3, borderRadius: 2, background: 'rgba(0,0,0,0.15)' }} />
        </div>
      </div>
    </div>
  );
}

// ── SCENE 1: MacBook — Breeze agent approval ──────────────────────────────────
const ACTIONS = [
  { id: 0, icon: '🎵', title: 'Queue LoFi mix in Spotify', sub: 'Based on your late-night pattern', color: '#6D28D9', bg: '#F5F0FF', bgApproved: '#EDE9FE' },
  { id: 1, icon: '🍕', title: 'Order Pad Thai via DoorDash', sub: '35 min · your usual order · $14.80', color: '#C2410C', bg: '#FFF4F0', bgApproved: '#FEE2E2' },
  { id: 2, icon: '🗓', title: 'Block "decompress" · 9–11 PM', sub: '3 eps The Office · no rescheduling', color: '#1D4ED8', bg: '#F0F4FF', bgApproved: '#DBEAFE' },
];
const SIGNALS = [
  { label: 'Instagram', pct: 0.83, color: '#E11D7A', note: '2:47 AM · 4 nights in a row' },
  { label: 'Alarms',    pct: 0.67, color: '#EA580C', note: 'dismissed 3× · avg wake 10:34' },
  { label: 'Calendar',  pct: 0.52, color: '#2563EB', note: '6 events rescheduled this week' },
];

function ActionCard({ action, state, onApprove, onSkip }) {
  const approved = state === 'approved';
  const skipped  = state === 'skipped';

  return (
    <div style={{
      background: approved ? action.bgApproved : skipped ? '#F8F8F8' : action.bg,
      border: `1.5px solid ${approved ? action.color + '50' : skipped ? '#E0E0E0' : action.color + '25'}`,
      borderRadius: 14, padding: '11px 14px',
      display: 'flex', alignItems: 'center', gap: 11,
      transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
      opacity: skipped ? 0.35 : 1,
      transform: skipped ? 'scale(0.97)' : 'scale(1)',
      animation: `cardTumble 0.45s cubic-bezier(0.22,1,0.36,1) ${action.id * 0.09}s both`,
      animation: approved ? `successGlow 0.6s ease both, cardTumble 0.45s cubic-bezier(0.22,1,0.36,1) ${action.id * 0.09}s both` : `cardTumble 0.45s cubic-bezier(0.22,1,0.36,1) ${action.id * 0.09}s both`,
    }}>
      <div style={{ fontSize: 20, flexShrink: 0, filter: skipped ? 'grayscale(1)' : 'none', transition: 'filter 0.3s' }}>{action.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, color: approved ? action.color : skipped ? '#A0A0A0' : '#1A1228', transition: 'color 0.3s', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{action.title}</div>
        <div style={{ fontSize: 9, color: approved ? action.color + '99' : '#9090A8', marginTop: 2 }}>{action.sub}</div>
      </div>
      {approved ? (
        <div style={{
          width: 26, height: 26, borderRadius: '50%', background: action.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          animation: 'popBounce 0.4s cubic-bezier(0.22,1,0.36,1) both',
        }}>
          <svg width={13} height={13} viewBox="0 0 13 13" fill="none">
            <path d="M2 6.5L5 9.5L11 3.5" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
              style={{ strokeDasharray: 20, strokeDashoffset: 0, animation: 'checkDraw 0.35s ease 0.1s both' }} />
          </svg>
        </div>
      ) : !skipped ? (
        <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
          <button onClick={(e) => { e.stopPropagation(); onSkip(); }} style={{
            padding: '5px 11px', background: 'rgba(0,0,0,0.05)', border: 'none',
            borderRadius: 10, fontSize: 10, color: '#8080A0', cursor: 'pointer', fontWeight: 600,
          }}>Skip</button>
          <button onClick={(e) => { e.stopPropagation(); onApprove(); }} style={{
            padding: '5px 11px', background: action.color, border: 'none',
            borderRadius: 10, fontSize: 10, color: '#fff', cursor: 'pointer', fontWeight: 700,
          }}>Do it</button>
        </div>
      ) : null}
    </div>
  );
}

export function Scene1() {
  const [cardStates, setCardStates] = useState({ 0: 'idle', 1: 'idle', 2: 'idle' });

  const approve = (id) => setCardStates(s => ({ ...s, [id]: 'approved' }));
  const skip    = (id) => setCardStates(s => ({ ...s, [id]: 'skipped' }));

  const approvedCount = Object.values(cardStates).filter(s => s === 'approved').length;
  const allHandled    = Object.values(cardStates).every(s => s !== 'idle');

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(160deg, #EEF0FF 0%, #FFF0F8 50%, #F0FFF4 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'sceneSwitch 0.35s ease both',
    }}>
      <div style={{ position: 'absolute', top: 28, textAlign: 'center', zIndex: 5, pointerEvents: 'none' }}>
        <div style={{ fontSize: 10, color: '#8070B0', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Week 1 · MacBook · 11 PM</div>
      </div>

      <div style={{ position: 'absolute', bottom: 80, right: 40, fontSize: 11, color: 'rgba(0,0,0,0.2)', pointerEvents: 'none' }}>approve or skip each action</div>

      {/* MacBook */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Lid */}
        <div style={{ width: 560, background: '#1C1C2E', borderRadius: '14px 14px 0 0', padding: '10px 10px 0', boxShadow: '0 -4px 20px rgba(0,0,0,0.12)' }}>
          {/* Screen bezel */}
          <div style={{ background: '#0A0A14', borderRadius: '8px 8px 0 0', overflow: 'hidden', height: 340, position: 'relative' }}>
            {/* macOS */}
            <div style={{ width: '100%', height: '100%', background: '#FAFAFA', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {/* Menu bar */}
              <div style={{ height: 22, background: 'rgba(248,248,252,0.97)', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', paddingLeft: 10, gap: 5, flexShrink: 0 }}>
                {['#FF5F57', '#FEBC2E', '#28C840'].map((c, i) => (
                  <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
                ))}
                <span style={{ marginLeft: 10, fontSize: 9, color: '#8080A0', fontWeight: 700 }}>Breeze</span>
              </div>

              {/* Content */}
              <div style={{ flex: 1, padding: '14px 20px 12px', overflowY: 'auto', scrollbarWidth: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* Insight */}
                <div>
                  <div style={{ fontSize: 7.5, color: '#9090A8', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>Breeze caught something</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1228', lineHeight: 1.5 }}>
                    Your signals say you've been{' '}
                    <span style={{ background: 'linear-gradient(90deg,#E11D7A,#EA580C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 900 }}>
                      sleeping late and stressed.
                    </span>
                  </div>
                </div>

                {/* Signal bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {SIGNALS.map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, animation: `cardTumble 0.4s ease ${i * 0.07}s both` }}>
                      <div style={{ width: 54, fontSize: 7.5, color: '#9090A8', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'right', flexShrink: 0 }}>{s.label}</div>
                      <div style={{ flex: 1, height: 4.5, background: '#EDE8F8', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ height: '100%', borderRadius: 3, background: s.color, '--w': `${s.pct * 100}%`, animation: `barGrow 0.8s ease ${0.3 + i * 0.08}s both` }} />
                      </div>
                      <div style={{ fontSize: 8.5, color: '#8080A0', width: 130, flexShrink: 0, lineHeight: 1.3 }}>{s.note}</div>
                    </div>
                  ))}
                </div>

                {/* Agent actions */}
                <div>
                  <div style={{
                    fontSize: 7.5, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8,
                    color: allHandled ? (approvedCount > 0 ? '#34D399' : '#9090A8') : '#C9A84C',
                    transition: 'color 0.5s',
                    animation: 'slideIn 0.4s ease 0.1s both',
                  }}>
                    {allHandled
                      ? (approvedCount > 0 ? `${approvedCount} action${approvedCount > 1 ? 's' : ''} approved ✓` : 'All skipped')
                      : 'Breeze wants to take care of it — you decide'}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {ACTIONS.map(a => (
                      <ActionCard key={a.id} action={a} state={cardStates[a.id]} onApprove={() => approve(a.id)} onSkip={() => skip(a.id)} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Base + hinge */}
        <div style={{ width: 560, height: 12, background: 'linear-gradient(180deg,#1C1C2E,#2A2A3E)', borderRadius: '0 0 4px 4px', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }} />
        <div style={{ width: 620, height: 9, background: 'linear-gradient(180deg,#2C2C40,#3A3A50)', borderRadius: '0 0 10px 10px', margin: '0 -30px', boxShadow: '0 8px 30px rgba(0,0,0,0.18)' }} />
      </div>
    </div>
  );
}

// ── SCENE 2: iPhone — interactive food streak tracker ────────────────────────
const MEALS = [
  { emoji: '🥗', label: 'Sweetgreen', bg: '#D1FAE5', fg: '#065F46' },
  { emoji: '🍳', label: 'Eggs & avo', bg: '#FEF3C7', fg: '#92400E' },
  { emoji: '🫐', label: 'Açaí bowl',  bg: '#EDE9FE', fg: '#5B21B6' },
  { emoji: '🥑', label: 'Chipotle',   bg: '#D1FAE5', fg: '#065F46' },
  { emoji: '🍗', label: 'Grilled',    bg: '#FEE2E2', fg: '#991B1B' },
  { emoji: '🥤', label: 'Shake',      bg: '#DBEAFE', fg: '#1E3A8A' },
];

export function Scene2() {
  const [logged, setLogged] = useState(new Set());
  const [burst, setBurst] = useState(false);

  const toggle = (i) => {
    setLogged(prev => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
        setBurst(false);
      } else {
        next.add(i);
        if (next.size === 6) setTimeout(() => setBurst(true), 300);
      }
      return next;
    });
  };

  const R = 30, CIRCUM = 2 * Math.PI * R;
  const progress = logged.size / 6;
  const offset = CIRCUM * (1 - progress);

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(160deg, #F0FFF4 0%, #FFFBF0 50%, #F0F8FF 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'sceneSwitch 0.35s ease both',
    }}>
      <div style={{ position: 'absolute', top: 28, textAlign: 'center', zIndex: 5, pointerEvents: 'none' }}>
        <div style={{ fontSize: 10, color: '#307050', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Next morning · Food Log</div>
      </div>

      <div style={{ position: 'absolute', bottom: 80, right: 40, fontSize: 11, color: 'rgba(0,0,0,0.2)', pointerEvents: 'none' }}>tap meals to log them</div>

      {/* Confetti burst */}
      {burst && CONFETTI_PARTICLES.map((p, i) => (
        <div key={i} style={{
          position: 'absolute', top: '45%', left: '50%',
          width: 8, height: 8, borderRadius: p.round ? '50%' : 2,
          background: p.color,
          '--cx': p.cx, '--cy': p.cy,
          animation: `confettiBurst 1s cubic-bezier(0.22,1,0.36,1) ${p.delay}s both`,
          zIndex: 50, pointerEvents: 'none',
        }} />
      ))}

      {/* Phone */}
      <div style={{
        width: 300, height: 590, borderRadius: 44, border: '7px solid #1A1A2A',
        background: '#fff', overflow: 'hidden', position: 'relative',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 40px 100px rgba(0,0,0,0.25)',
      }}>
        {/* Notch */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 90, height: 22, background: '#1A1A2A', borderRadius: '0 0 16px 16px', zIndex: 30 }} />

        {/* Status */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 18px 0', fontSize: 10, fontWeight: 700, color: '#1A1228', flexShrink: 0 }}>
          <span>9:41</span><span style={{ fontSize: 9 }}>●●● 5G ▪▪▪</span>
        </div>

        {/* Header */}
        <div style={{ padding: '6px 14px 10px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #F0F0F8', flexShrink: 0 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #C9A84C, #6D28D9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#fff' }}>B</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1228' }}>Breeze · Food Log</div>
            <div style={{ fontSize: 9, color: '#9090A8' }}>tap meals to log them</div>
          </div>
          {/* Live ring */}
          <svg width={46} height={46} style={{ flexShrink: 0 }}>
            <circle cx={23} cy={23} r={R} fill="none" stroke="#F0EAD8" strokeWidth={5} />
            <circle cx={23} cy={23} r={R} fill="none" stroke="#C9A84C" strokeWidth={5}
              strokeLinecap="round" strokeDasharray={CIRCUM} strokeDashoffset={offset}
              transform="rotate(-90 23 23)"
              style={{ transition: 'stroke-dashoffset 0.55s cubic-bezier(0.22,1,0.36,1)' }}
            />
            <text x={23} y={27} textAnchor="middle" fontSize={12} fontWeight={800} fill="#C9A84C">{logged.size}</text>
          </svg>
        </div>

        {/* Meal grid */}
        <div style={{ flex: 1, padding: '12px 12px 6px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {MEALS.map((m, i) => {
              const isLogged = logged.has(i);
              return (
                <div key={i} onClick={(e) => { e.stopPropagation(); toggle(i); }} style={{
                  aspectRatio: '1', borderRadius: 16,
                  background: isLogged ? m.bg : '#F4F4F8',
                  border: `1.5px solid ${isLogged ? m.fg + '35' : '#E4E4EC'}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
                  cursor: 'pointer', position: 'relative', overflow: 'hidden',
                  transition: 'all 0.28s cubic-bezier(0.22,1,0.36,1)',
                  transform: isLogged ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: isLogged ? `0 4px 14px ${m.fg}28` : 'none',
                }}>
                  <span style={{ fontSize: 24, filter: isLogged ? 'none' : 'grayscale(0.5)', transition: 'filter 0.3s' }}>{m.emoji}</span>
                  <span style={{ fontSize: 8, color: isLogged ? m.fg : '#A0A0B4', fontWeight: 700, transition: 'color 0.3s' }}>{m.label}</span>
                  {isLogged && (
                    <div style={{
                      position: 'absolute', top: 6, right: 6,
                      width: 15, height: 15, borderRadius: '50%', background: m.fg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      animation: 'popBounce 0.35s cubic-bezier(0.22,1,0.36,1) both',
                    }}>
                      <svg width={8} height={8} viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3 5.5L6.5 2.5" stroke="white" strokeWidth={1.5} strokeLinecap="round" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Status message */}
          <div style={{ textAlign: 'center', padding: '4px 0' }}>
            {logged.size === 0 && (
              <div style={{ fontSize: 11, color: '#C0C0D0' }}>Tap what you've eaten today</div>
            )}
            {logged.size > 0 && logged.size < 6 && (
              <div style={{ fontSize: 11, color: '#7070A0', animation: 'slideIn 0.3s ease both' }}>
                {logged.size}/6 meals ·{' '}
                <span style={{ color: '#C9A84C', fontWeight: 700 }}>{6 - logged.size} more for your streak</span>
              </div>
            )}
            {logged.size === 6 && (
              <div style={{ animation: 'popBounce 0.5s cubic-bezier(0.22,1,0.36,1) both', fontSize: 14, color: '#1A1228', fontWeight: 800 }}>
                Perfect week! 🔥
              </div>
            )}
          </div>

          {/* Breeze note - shows at 3+ */}
          {logged.size >= 3 && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(109,40,217,0.08))',
              border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: 14, padding: '10px 12px',
              animation: 'calIn 0.45s cubic-bezier(0.22,1,0.36,1) both',
            }}>
              <div style={{ fontSize: 9, color: '#C9A84C', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Breeze · {logged.size === 6 ? 'Longest streak this semester 🏆' : `Day ${logged.size} of 7`}</div>
              <div style={{ fontSize: 11, color: '#5A4A7A', lineHeight: 1.5 }}>
                {logged.size === 6
                  ? "I've added this week to your health report. You've also been sleeping better — 7.2h avg this week vs 5.8h last."
                  : "You're on a roll. Keep going and you'll hit your first 7-day streak."}
              </div>
            </div>
          )}
        </div>

        {/* Home bar */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '0 0 14px', flexShrink: 0 }}>
          <div style={{ width: 70, height: 3, borderRadius: 2, background: 'rgba(0,0,0,0.15)' }} />
        </div>
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
const TABS = [
  { id: 0, label: '📱 Day 1',    sub: 'iMessage' },
  { id: 1, label: '💻 Week 1',  sub: 'MacBook'  },
  { id: 2, label: '📱 Morning', sub: 'Food log' },
];

export default function MomentsDemos() {
  const [scene, setScene] = useState(0);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
      <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', userSelect: 'none' }}>
        {scene === 0 && <Scene0 key="s0" />}
        {scene === 1 && <Scene1 key="s1" />}
        {scene === 2 && <Scene2 key="s2" />}

        {/* Scene tab switcher */}
        <div style={{
          position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 4, zIndex: 300,
          background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(20px)',
          borderRadius: 26, padding: '5px 5px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)',
        }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setScene(t.id)} style={{
              background: scene === t.id ? 'rgba(30,20,60,0.09)' : 'transparent',
              border: 'none', borderRadius: 20, padding: '7px 20px',
              cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.22,1,0.36,1)',
              transform: scene === t.id ? 'scale(1.03)' : 'scale(1)',
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: scene === t.id ? '#1A1228' : '#8080A0', transition: 'color 0.2s', whiteSpace: 'nowrap' }}>{t.label}</div>
              <div style={{ fontSize: 9, color: scene === t.id ? '#9080B0' : '#C0C0D0', transition: 'color 0.2s', marginTop: 1 }}>{t.sub}</div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
