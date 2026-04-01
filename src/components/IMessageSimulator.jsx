import { useState, useEffect, useRef } from 'react';

const MESSAGES = [
  { id: 1, section: 'Day 1', type: 'divider' },
  { id: 2, sender: 'breeze', text: "Hey — I'm Breeze, your second brain. I learn who you are through your apps and through talking with you. Let's start with your calendar." },
  { id: 3, sender: 'breeze', type: 'connect', text: 'Connect Google Calendar ↗' },
  { id: 4, type: 'system', text: 'Ronnie connected Google Calendar' },
  { id: 5, sender: 'breeze', text: 'Got it. Give me a sec...' },
  { id: 6, sender: 'breeze', text: "First thing I see: you're running 5 classes, and POSC 130 alone hits 18 times this month. You have 13 days with 3+ back-to-back events and zero buffer blocked after any of them. That's a setup for things to fall through." },
  { id: 7, sender: 'user', text: 'yeah it has been really bad lately. what can you do about it' },
  { id: 8, sender: 'breeze', text: "I found real gaps — Friday afternoons and Sunday mornings. Protecting those now. I'll also tell you before the brutal days so you're not blindsided." },

  { id: 11, section: 'Day 3', type: 'divider' },
  { id: 12, sender: 'breeze', text: 'Want me to watch your email too? I get a lot smarter with both.' },
  { id: 13, sender: 'breeze', type: 'connect', text: 'Connect Gmail ↗' },
  { id: 14, type: 'system', text: 'Ronnie connected Gmail' },
  { id: 15, sender: 'breeze', text: "74% of your inbox is unread. That's normal for how you operate — you act on urgency, not recency. But right now three things are slipping through that you probably don't know about." },
  { id: 16, sender: 'user', text: "what three things" },
  { id: 17, sender: 'breeze', text: "One: Nuria Wolfe, your Marshall career advisor, emailed you twice this month about your London internship search. Both unread. She's actively trying to help." },
  { id: 175, sender: 'breeze', text: "Two: you have a tuition payment installment due April 3. Three days away. Unread." },
  { id: 176, sender: 'breeze', text: "Three: you emailed Tiger Consulting about the Perplexity competition. It bounced. They never got it and you don't know." },
  { id: 177, sender: 'user', text: "wait what. none of that. how do you know all of this" },
  { id: 178, sender: 'breeze', text: "Your inbox. I read it so you don't have to." },

  { id: 18, section: 'Week 1', type: 'divider' },
  { id: 19, sender: 'breeze', text: "I'm seeing something I need to ask you about. You have Turat sending you MVP demos — Meridian. That's a different project from LavaLab. You're building two products at once, right?" },
  { id: 20, sender: 'user', text: "yeah. LavaLab is the incubator startup. Meridian is a separate thing with Turat, Johnny, and Kaitlyn" },
  { id: 21, sender: 'breeze', text: "Turat emailed you a demo at 10:44pm. You replied at 11:22pm giving him product direction. Then he replied at 11:32pm. That's your real work window — after midnight, both products." },
  { id: 22, sender: 'user', text: "honestly yeah. that's when I can actually think" },
  { id: 225, sender: 'breeze', text: "POSC 130 starts at 8am some days. I'm going to start protecting your mornings after late build nights. You're not going to scale two products on 5 hours of sleep." },

  { id: 23, section: 'Week 2', type: 'divider' },
  { id: 24, sender: 'breeze', text: "Alex Tsai from Perplexity — you've met him 3 times since December, and Ashna gave you access to all the university Slack channels to send announcements. That's not a normal activator relationship." },
  { id: 25, sender: 'user', text: "yeah Alex is kind of a mentor at this point" },
  { id: 26, sender: 'breeze', text: "He sent you the outreach copy on March 20 for the Stock Pitch Competition personally. And you're a Dub.co affiliate for the referral links. You're more embedded at Perplexity than most interns." },
  { id: 27, sender: 'breeze', text: "Two packages from Perplexity Supply shipped to you March 26 via DHL. Campus event merch?", hasReply: true },
  { id: 28, sender: 'user', text: "yeah swag for the competition events. this is kind of crazy that you know all this" },
  { id: 29, sender: 'breeze', text: "I just connected the dots. You should be pitching yourself to Perplexity for a real role." },

  { id: 31, section: 'Week 3', type: 'divider' },
  { id: 32, sender: 'breeze', text: "Something I want to bring up. You were trying to get a London internship. Nuria has been following up about it — 'tougher as an international student, keep at it.' You haven't replied." },
  { id: 33, sender: 'user', text: "I know. I kind of gave up on London. it's hard as an international student and I just pivoted to US stuff" },
  { id: 34, sender: 'breeze', text: "Got it. Nuria doesn't know that. She's still waiting on your update. One email would close the loop — and keep that relationship alive for when you actually need it." },
  { id: 35, sender: 'user', text: "you're right. I'll do it" },
  { id: 36, sender: 'breeze', text: "I'll remind you tomorrow morning before your first class. Also — what's the actual priority: LavaLab, Meridian, or Perplexity?" },
  { id: 37, sender: 'user', text: "Meridian is the real thing I'm most excited about. LavaLab is the official vehicle. Perplexity is relationships." },
  { id: 38, sender: 'breeze', text: "Perfect. I'll optimize around that order." },

  { id: 39, section: 'Week 6', type: 'divider' },
  { id: 40, sender: 'breeze', text: "6 weeks in. Here's what I know that you've probably never said out loud: Meridian is what you actually care about. Alex Tsai is your most important relationship. And you're an international student running harder than almost anyone in your cohort — two products, five classes, a campus role, and a finance track as backup." },
  { id: 41, sender: 'breeze', text: "Want to see your full profile? Everything from 8 apps and our conversations. You own it.", hasReply: true },
  { id: 42, sender: 'user', text: 'send it' },
  { id: 43, sender: 'breeze', type: 'profile', text: 'Ronnie_Cheung_Breeze_Profile ↗' },
  { id: 44, sender: 'breeze', text: "The longer you use Breeze the more complete this gets. That file belongs to you, not us." },
];

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '10px 14px', background: '#2C2C2E', borderRadius: 18, width: 56 }}>
      <div className="dot-1" style={{ width: 8, height: 8, borderRadius: '50%', background: '#8E8E93' }} />
      <div className="dot-2" style={{ width: 8, height: 8, borderRadius: '50%', background: '#8E8E93' }} />
      <div className="dot-3" style={{ width: 8, height: 8, borderRadius: '50%', background: '#8E8E93' }} />
    </div>
  );
}

function MessageBubble({ msg, visible }) {
  if (!visible) return null;

  if (msg.type === 'divider') {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center', margin: '12px 0', color: '#8E8E93', fontSize: 12, fontWeight: 600, letterSpacing: '0.5px' }}>
        — {msg.section} —
      </div>
    );
  }

  if (msg.type === 'system') {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center', margin: '6px 0', color: '#8E8E93', fontSize: 12 }}>
        {msg.text}
      </div>
    );
  }

  const isUser = msg.sender === 'user';
  const isConnect = msg.type === 'connect';
  const isProfile = msg.type === 'profile';
  const isMeal = msg.type === 'meal';

  return (
    <div className="animate-fade-in" style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: 4 }}>
      <div style={{
        maxWidth: '75%',
        padding: isMeal ? '10px 14px' : '9px 14px',
        borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        background: isUser ? '#0A84FF' : isConnect || isProfile ? 'rgba(201,168,76,0.15)' : '#2C2C2E',
        color: isConnect || isProfile ? '#C9A84C' : '#fff',
        fontSize: 15,
        lineHeight: 1.4,
        border: isConnect || isProfile ? '1px solid rgba(201,168,76,0.3)' : 'none',
        cursor: isConnect || isProfile ? 'pointer' : 'default',
        whiteSpace: isMeal ? 'pre-line' : 'normal',
        fontWeight: isConnect || isProfile ? 600 : 400,
      }}>
        {msg.text}
      </div>
    </div>
  );
}

export default function IMessageSimulator() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const bottomRef = useRef(null);
  const timerRef = useRef(null);

  const advance = () => {
    if (visibleCount >= MESSAGES.length) return;

    const next = MESSAGES[visibleCount];
    const isBreeze = next.sender === 'breeze';

    if (isBreeze && visibleCount > 0) {
      setShowTyping(true);
      timerRef.current = setTimeout(() => {
        setShowTyping(false);
        setVisibleCount(c => c + 1);
      }, 900);
    } else {
      setVisibleCount(c => c + 1);
    }
  };

  useEffect(() => {
    if (visibleCount === 0) {
      setTimeout(() => setVisibleCount(1), 300);
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleCount, showTyping]);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setVisibleCount(c => {
        if (c >= MESSAGES.length) { setAutoPlay(false); return c; }
        const next = MESSAGES[c];
        if (next?.sender === 'breeze') {
          setShowTyping(true);
          setTimeout(() => { setShowTyping(false); setVisibleCount(cc => cc + 1); }, 900);
          return c;
        }
        return c + 1;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const isDone = visibleCount >= MESSAGES.length;

  return (
    <div
      style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#08080F', cursor: isDone ? 'default' : 'pointer' }}
      onClick={!autoPlay && !isDone ? advance : undefined}
    >
      {/* Phone frame */}
      <div style={{
        width: 390,
        height: 720,
        background: '#000',
        borderRadius: 50,
        border: '8px solid #1C1C1E',
        boxShadow: '0 0 0 1px #333, 0 40px 80px rgba(0,0,0,0.8), inset 0 0 0 1px #222',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Notch */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 120, height: 30, background: '#000', borderRadius: '0 0 20px 20px', zIndex: 10 }} />

        {/* Status bar */}
        <div style={{ padding: '10px 24px 0', display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, color: '#fff', paddingTop: 14 }}>
          <span>9:41</span>
          <span style={{ fontSize: 11 }}>●●● 5G ■■■</span>
        </div>

        {/* Header */}
        <div style={{ padding: '6px 16px 10px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #1C1C1E' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #C9A84C, #3C3489)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>B</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>Breeze</div>
            <div style={{ fontSize: 11, color: '#8E8E93' }}>your second brain</div>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 2, scrollbarWidth: 'none' }}>
          {MESSAGES.slice(0, visibleCount).map(msg => (
            <MessageBubble key={msg.id} msg={msg} visible={true} />
          ))}
          {showTyping && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 4 }}>
              <TypingIndicator />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Bottom bar */}
        <div style={{ padding: '8px 16px 20px', borderTop: '1px solid #1C1C1E', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, background: '#1C1C1E', borderRadius: 20, padding: '8px 14px', fontSize: 14, color: '#636366' }}>
            {isDone ? 'Demo complete' : 'tap to advance →'}
          </div>
        </div>
      </div>

      {/* Auto-play button */}
      <div style={{ position: 'absolute', bottom: 40, right: 40 }}>
        <button
          onClick={e => { e.stopPropagation(); setAutoPlay(a => !a); }}
          style={{
            background: autoPlay ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${autoPlay ? '#C9A84C' : 'rgba(255,255,255,0.1)'}`,
            color: autoPlay ? '#C9A84C' : '#888',
            padding: '8px 18px',
            borderRadius: 20,
            fontSize: 13,
            cursor: 'pointer',
            fontWeight: 600,
            letterSpacing: '0.3px',
          }}
        >
          {autoPlay ? '⏸ Pause' : '▶ Auto-play'}
        </button>
      </div>

      {/* Progress */}
      <div style={{ position: 'absolute', bottom: 40, left: 40, color: '#444', fontSize: 12 }}>
        {Math.min(visibleCount, MESSAGES.length)} / {MESSAGES.length} messages
      </div>
    </div>
  );
}
