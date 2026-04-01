import { useState, useEffect, useRef } from 'react';
import { userData } from '../data/userData';

const TABS = ['Claude', 'AI Agent', 'Job Application'];

// --- SCENE A: Claude ---
const CLAUDE_RESPONSE = `Here's what I see based on your Breeze profile:

Alex Tsai at Perplexity is your most valuable relationship right now — you've met 3 times since December and you're their official Campus Activator. That relationship is worth more than any internship application. I'd make sure nothing ever pushes that meeting.

Your real priority is LavaLab, not your 5 classes. Your Notion shows 6 weeks of traction reports, customer interviews, and an MVP in progress — that's where your best thinking goes. The classes are a background process.

You're running two career tracks in parallel: startup via LavaLab, and finance via JPMorgan, Morgan Stanley, and Apple recruiting. The Apple Resume Book is due April 3 — it's currently unread. You'll miss it if you don't act today.

Structurally: your dense Tues/Thu class stack (CSCI + ECON + TAC) is the same days your inbox goes darkest. You're doing your real work after 11pm. The pattern is late nights → rough mornings → classes on autopilot → LavaLab in the evening. That's sustainable for a sprint, not a semester.`;

function SceneClaude() {
  const [phase, setPhase] = useState('idle'); // idle | connecting | connected | typing | done
  const [typedText, setTypedText] = useState('');
  const [showUserMsg, setShowUserMsg] = useState(false);
  const typingRef = useRef(null);

  const handleConnect = () => {
    setPhase('connecting');
    setTimeout(() => {
      setPhase('connected');
      setTimeout(() => {
        setShowUserMsg(true);
        setTimeout(() => setPhase('typing'), 600);
      }, 800);
    }, 1200);
  };

  useEffect(() => {
    if (phase !== 'typing') return;
    let i = 0;
    typingRef.current = setInterval(() => {
      i++;
      setTypedText(CLAUDE_RESPONSE.slice(0, i));
      if (i >= CLAUDE_RESPONSE.length) {
        clearInterval(typingRef.current);
        setPhase('done');
      }
    }, 12);
    return () => clearInterval(typingRef.current);
  }, [phase]);

  return (
    <div style={{ display: 'flex', gap: 24, height: '100%', alignItems: 'flex-start', padding: '0 0 20px' }}>
      {/* Claude chat */}
      <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #cc785c, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#fff', fontWeight: 700 }}>C</div>
          <span style={{ fontWeight: 600, fontSize: 14, color: '#fff' }}>Claude</span>
          {(phase === 'connected' || phase === 'typing' || phase === 'done') && (
            <div className="animate-fade-in" style={{ marginLeft: 'auto', background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 20, padding: '4px 12px', fontSize: 11, color: '#C9A84C', fontWeight: 600 }}>
              ✓ Breeze profile connected — {userData.name}, {userData.weeks_on_breeze} weeks of context
            </div>
          )}
        </div>

        {/* Messages area */}
        <div style={{ flex: 1, padding: 20, overflowY: 'auto', scrollbarWidth: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {phase === 'idle' && (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', color: '#555' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
                <div style={{ fontSize: 14 }}>Connect your Breeze profile to get started</div>
              </div>
            </div>
          )}

          {phase === 'connecting' && (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', color: '#C9A84C' }}>
                <div style={{ fontSize: 14, marginBottom: 8 }}>Importing profile data...</div>
                <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                  <div className="dot-1" style={{ width: 8, height: 8, borderRadius: '50%', background: '#C9A84C' }} />
                  <div className="dot-2" style={{ width: 8, height: 8, borderRadius: '50%', background: '#C9A84C' }} />
                  <div className="dot-3" style={{ width: 8, height: 8, borderRadius: '50%', background: '#C9A84C' }} />
                </div>
              </div>
            </div>
          )}

          {(phase === 'connected' || phase === 'typing' || phase === 'done') && (
            <>
              {showUserMsg && (
                <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ background: '#3C3489', borderRadius: '16px 16px 4px 16px', padding: '10px 16px', maxWidth: '70%', fontSize: 14, color: '#fff' }}>
                    Help me plan my week
                  </div>
                </div>
              )}
              {(phase === 'typing' || phase === 'done') && (
                <div className="animate-fade-in" style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg, #cc785c, #a855f7)', flexShrink: 0, marginTop: 2 }} />
                  <div style={{ fontSize: 14, color: '#ddd', lineHeight: 1.7, whiteSpace: 'pre-line', flex: 1 }}>
                    {typedText}
                    {phase === 'typing' && <span style={{ display: 'inline-block', width: 2, height: 14, background: '#C9A84C', animation: 'bounce-dot 0.8s infinite', marginLeft: 2, verticalAlign: 'middle' }} />}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Input bar */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '10px 14px', fontSize: 13, color: '#555' }}>
            Message Claude...
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {phase === 'idle' ? (
          <button
            onClick={handleConnect}
            style={{
              background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(60,52,137,0.2))',
              border: '1px solid rgba(201,168,76,0.4)',
              borderRadius: 12, padding: '14px 20px', cursor: 'pointer', width: '100%',
              animation: 'pulse-border 2s infinite',
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 6 }}>🔗</div>
            <div style={{ color: '#C9A84C', fontWeight: 700, fontSize: 14 }}>Connect Breeze Profile</div>
            <div style={{ color: '#888', fontSize: 11, marginTop: 4 }}>Click to import {userData.weeks_on_breeze} weeks of context</div>
          </button>
        ) : (
          <div className="animate-fade-in" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 16 }}>
            <div style={{ color: '#888', fontSize: 11, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Breeze Profile</div>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 2 }}>{userData.name}</div>
            <div style={{ color: '#888', fontSize: 11, marginBottom: 12 }}>{userData.role}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                ['10', 'entities tracked'],
                ['3', 'behavior patterns'],
                ['47', 'nudges sent'],
                ['4', 'direct disclosures'],
              ].map(([n, l]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#888', fontSize: 11 }}>{l}</span>
                  <span style={{ color: '#C9A84C', fontWeight: 700, fontSize: 11 }}>{n}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {(phase === 'done') && (
          <div className="animate-fade-in" style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 12, color: '#C9A84C', lineHeight: 1.5 }}>
              Claude knew all of this because of your Breeze profile — including things {userData.name.split(' ')[0]} shared in conversation, not just app data. No explaining. It just knew.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- SCENE B: AI Agent ---
const AGENT_FIELDS = [
  { key: 'schedule', label: 'Your typical schedule', value: 'Dense Tue/Thu: CSCI + ECON + TAC stack. POSC 130 is most frequent (18x/month). Late nights on LavaLab work — Notion edits past 11pm are common.' },
  { key: 'communication', label: 'Communication style', value: '74% inbox unread rate — reactive, not proactive. Responds to urgent deadlines. Most likely to act on something flagged directly, not buried in inbox.' },
  { key: 'priorities', label: 'Priorities', value: "LavaLab startup (told Breeze directly — this is what he actually cares about). Classes are necessary, not motivating. Career search is active but deadline-driven." },
  { key: 'avoid', label: 'Things to avoid', value: "Don't stack anything after 3+ class blocks — inbox and focus both drop. Don't assume he's seen an email. Surface Brightspace deadlines proactively on dense days." },
  { key: 'personal', label: 'Personal context', value: "Running 5 classes + LavaLab + Perplexity Stock Pitch Competition simultaneously. High ambition, high load. Uses Granola + Perplexity — early AI adopter. Responds well to direct, specific nudges." },
];

function SceneAgent() {
  const [phase, setPhase] = useState('idle'); // idle | filling | done
  const [filledFields, setFilledFields] = useState({});
  const [counter, setCounter] = useState(0);

  const handleImport = () => {
    setPhase('filling');
    AGENT_FIELDS.forEach((field, i) => {
      setTimeout(() => {
        setFilledFields(prev => ({ ...prev, [field.key]: field.value }));
        if (i === AGENT_FIELDS.length - 1) {
          setTimeout(() => setPhase('done'), 400);
        }
      }, i * 500 + 200);
    });

    // Counter animation
    let c = 0;
    const target = 42;
    const interval = setInterval(() => {
      c += 2;
      setCounter(Math.min(c, target));
      if (c >= target) clearInterval(interval);
    }, 60);
  };

  return (
    <div style={{ height: '100%', display: 'flex', gap: 24, alignItems: 'flex-start', paddingBottom: 20 }}>
      <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>Configure your personal agent</div>
            <div style={{ color: '#888', fontSize: 12, marginTop: 2 }}>Tell the agent about yourself</div>
          </div>
          {phase === 'idle' && (
            <button onClick={handleImport} style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(60,52,137,0.3))', border: '1px solid rgba(201,168,76,0.4)', borderRadius: 10, padding: '8px 16px', color: '#C9A84C', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
              Import from Breeze
            </button>
          )}
          {(phase === 'filling' || phase === 'done') && (
            <div className="animate-fade-in" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 10, padding: '8px 16px', fontSize: 12, color: '#C9A84C', fontWeight: 600 }}>
              {counter} / 42 data points imported
            </div>
          )}
        </div>

        <div style={{ flex: 1, padding: 20, overflowY: 'auto', scrollbarWidth: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {AGENT_FIELDS.map(field => (
            <div key={field.key}>
              <div style={{ color: '#888', fontSize: 12, marginBottom: 6, fontWeight: 500 }}>{field.label}</div>
              <div style={{
                background: filledFields[field.key] ? 'rgba(201,168,76,0.04)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${filledFields[field.key] ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 10, padding: '12px 14px', minHeight: 48,
                fontSize: 13, color: filledFields[field.key] ? '#ddd' : '#444',
                transition: 'all 0.4s ease',
              }}>
                {filledFields[field.key] || <span style={{ fontStyle: 'italic' }}>Empty — fill in manually</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ width: 240, flexShrink: 0 }}>
        {phase === 'done' && (
          <div className="animate-fade-in" style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 12, color: '#C9A84C', lineHeight: 1.6 }}>
              This agent knows you better than any assistant you've ever configured. Half of this came from things you said, not things you clicked. And you didn't fill out a single form.
            </div>
          </div>
        )}
        {phase === 'idle' && (
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 16 }}>
            <div style={{ color: '#888', fontSize: 12, lineHeight: 1.6 }}>
              Normally you'd fill all of these in manually. With Breeze, it imports {userData.weeks_on_breeze} weeks of real behavioral data — including things you've told Breeze in conversation.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- SCENE C: Job Application ---
function SceneJob() {
  const [phase, setPhase] = useState('idle'); // idle | expanded

  return (
    <div style={{ height: '100%', display: 'flex', gap: 24, alignItems: 'flex-start', paddingBottom: 20 }}>
      {/* Job form */}
      <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>Job Application</div>
          <div style={{ color: '#888', fontSize: 12, marginTop: 2 }}>Software Engineering Internship — Acme Corp</div>
        </div>
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { label: 'Full name', value: userData.name },
            { label: 'Email', value: 'ronniec@usc.edu' },
            { label: 'School', value: 'USC Marshall · USC Viterbi' },
            { label: 'Program', value: 'AI for Business (BUAI)' },
          ].map(f => (
            <div key={f.label}>
              <div style={{ color: '#888', fontSize: 12, marginBottom: 6 }}>{f.label}</div>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#ccc' }}>{f.value}</div>
            </div>
          ))}
          <div>
            <div style={{ color: '#888', fontSize: 12, marginBottom: 6 }}>Resume</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#555' }}>Upload PDF...</div>
              <button
                onClick={() => setPhase(p => p === 'idle' ? 'expanded' : 'idle')}
                style={{
                  background: phase === 'expanded' ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${phase === 'expanded' ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 8, padding: '10px 14px', fontSize: 12, color: phase === 'expanded' ? '#C9A84C' : '#888', cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: 600,
                }}
              >
                Or: Share Breeze Profile
              </button>
            </div>
          </div>
          <div>
            <div style={{ color: '#888', fontSize: 12, marginBottom: 6 }}>Cover letter</div>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#555', minHeight: 80 }}>Upload or paste...</div>
          </div>
        </div>
      </div>

      {/* Breeze profile expansion */}
      {phase === 'expanded' && (
        <div className="animate-slide-right" style={{ width: 360, flexShrink: 0, background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(201,168,76,0.2)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(201,168,76,0.1)', background: 'rgba(201,168,76,0.04)' }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#C9A84C' }}>{userData.name} — Breeze Profile</div>
            <div style={{ color: '#888', fontSize: 12, marginTop: 2 }}>6 weeks of verified behavioral data</div>
          </div>
          <div style={{ padding: 20, overflowY: 'auto', scrollbarWidth: 'none', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              {
                title: 'HOW RONNIE WORKS', items: [
                  'Peak focus: late night — LavaLab Notion edited past 11pm regularly',
                  'Dense class days (Tue/Thu) leave no bandwidth for deep work',
                  'Uses AI tools daily: Perplexity, Granola, now Breeze',
                  'Runs 5 classes + startup + investing simultaneously',
                ]
              },
              {
                title: 'HOW RONNIE COMMUNICATES', items: [
                  '74% inbox unread — reactive email style, acts on urgent flags',
                  'Brightspace assignment alerts buried on heavy class days',
                  'Career emails responded to only near deadlines',
                  'Direct and specific nudges get action; passive reminders don\'t',
                ]
              },
              {
                title: 'HOW RONNIE HANDLES PRESSURE', items: [
                  'LavaLab work bleeds into late nights before big class days',
                  'Catches career deadlines last-minute (PCA app due tomorrow, unread)',
                  'High ambition load — manages it with AI tools, not by cutting scope',
                  'Self-aware about overload (told Breeze directly)',
                ]
              },
              {
                title: 'HOW RONNIE BUILDS', items: [
                  'LavaLab startup: 6 weeks of traction reports, customer interviews, pitch deck',
                  'Weekly 1:1 with Alex (co-founder or mentor)',
                  'Enrolled in USC AI for Business program — deliberate AI bet',
                  'Perplexity Stock Pitch Competition — investor mindset alongside operator mindset',
                ]
              },
            ].map(section => (
              <div key={section.title}>
                <div style={{ color: '#C9A84C', fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', marginBottom: 8 }}>{section.title}</div>
                {section.items.map(item => (
                  <div key={item} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                    <span style={{ color: '#C9A84C', flexShrink: 0, marginTop: 2 }}>•</span>
                    <span style={{ color: '#ccc', fontSize: 12, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Side-by-side comparison */}
      {phase === 'expanded' && (
        <div className="animate-fade-in" style={{ width: 260, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 14 }}>
            <div style={{ color: '#888', fontSize: 11, fontWeight: 600, letterSpacing: '0.5px', marginBottom: 10 }}>WHAT A RESUME TELLS YOU</div>
            {['School name', 'GPA', 'Club titles', 'Job titles', 'Skills list (self-reported)'].map(i => (
              <div key={i} style={{ color: '#555', fontSize: 12, padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>• {i}</div>
            ))}
          </div>
          <div style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 12, padding: 14 }}>
            <div style={{ color: '#C9A84C', fontSize: 11, fontWeight: 600, letterSpacing: '0.5px', marginBottom: 10 }}>WHAT A BREEZE PROFILE TELLS YOU</div>
            {['How they actually work', 'How they communicate', 'How they handle pressure', 'What they care about', 'Verified by 6 weeks of real data'].map(i => (
              <div key={i} style={{ color: '#ccc', fontSize: 12, padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>• {i}</div>
            ))}
          </div>
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: 12 }}>
            <div style={{ fontSize: 11, color: '#888', lineHeight: 1.5 }}>
              Behavioral data from 6 weeks of real patterns and honest conversations. Not self-reported. Not aspirational. How {userData.name.split(' ')[0]} actually operates.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Main ImportDemos ---
export default function ImportDemos() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#08080F', padding: '24px 32px 0' }}>
      {/* Banner */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ display: 'inline-block', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 20, padding: '6px 18px', fontSize: 12, color: '#C9A84C', fontWeight: 600 }}>
          Your Breeze profile. Your data. Take it anywhere.
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, justifyContent: 'center' }}>
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            style={{
              background: activeTab === i ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${activeTab === i ? 'rgba(201,168,76,0.35)' : 'rgba(255,255,255,0.08)'}`,
              color: activeTab === i ? '#C9A84C' : '#888',
              borderRadius: 10, padding: '8px 20px', cursor: 'pointer', fontSize: 13, fontWeight: activeTab === i ? 700 : 400,
              transition: 'all 0.2s ease',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Scene */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {activeTab === 0 && <SceneClaude key="claude" />}
        {activeTab === 1 && <SceneAgent key="agent" />}
        {activeTab === 2 && <SceneJob key="job" />}
      </div>
    </div>
  );
}
