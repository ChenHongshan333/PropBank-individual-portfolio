'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

/* ─────────────────────────────────────────────
   Pixel Cursor
───────────────────────────────────────────── */
function PixelCursor() {
  const cursorRef  = useRef<HTMLDivElement>(null)
  const ringRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current)
        cursorRef.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef}   className="cursor-ring" />
    </>
  )
}

/* ─────────────────────────────────────────────
   Scroll Reveal wrapper
───────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Figma Embed
───────────────────────────────────────────── */
function FigmaEmbed({ url, title, height = 500 }: { url: string; title: string; height?: number }) {
  const embedUrl = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`
  return (
    <div className="pixel-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2" style={{ background: '#072ac8', borderBottom: '2px solid #0a0a0a' }}>
        <span style={{ fontFamily: '"Press Start 2P"', fontSize: 7, color: '#ffc600' }}>
          ◈ {title}
        </span>
        <a href={url} target="_blank" rel="noopener noreferrer"
          className="pixel-btn" style={{ fontSize: 6, background: '#ffffff', padding: '4px 8px' }}>
          OPEN IN FIGMA ↗
        </a>
      </div>
      <iframe
        src={embedUrl}
        width="100%"
        height={height}
        style={{ border: 'none', display: 'block' }}
        allowFullScreen
        title={title}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────
   Pixel Star SVG
───────────────────────────────────────────── */
function PixelStar({ color = '#fcf300', size = 32 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
      <path d="M16 2 L19 12 L30 12 L21 18 L24 28 L16 22 L8 28 L11 18 L2 12 L13 12 Z"
        fill={color} stroke="#0a0a0a" strokeWidth="2" />
    </svg>
  )
}

/* ─────────────────────────────────────────────
   Nav
───────────────────────────────────────────── */
const navItems = [
  { label: 'ORIGIN',    href: '#origin' },
  { label: 'ROLE',      href: '#role' },
  { label: 'PROBLEM',   href: '#problem' },
  { label: 'RESEARCH',  href: '#research' },
  { label: 'PROCESS',   href: '#process' },
  { label: 'PROTOTYPE', href: '#prototype' },
  { label: 'AI',        href: '#ai' },
  { label: 'TESTING',   href: '#testing' },
  { label: 'REFLECT',   href: '#reflect' },
]

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white border-b-2 border-black' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2">
          <Image src="/logo.png" alt="PropBank" width={36} height={36} style={{ imageRendering: 'pixelated' }} />
          <span style={{ fontFamily: '"Press Start 2P"', fontSize: 9, color: '#0a0a0a' }}>
            PROP<span style={{ color: '#e63946' }}>BANK</span>
          </span>
        </a>
        <div className="hidden md:flex gap-6">
          {navItems.map(n => (
            <a key={n.href} href={n.href} className="nav-link">{n.label}</a>
          ))}
        </div>
      </div>
    </nav>
  )
}

/* ─────────────────────────────────────────────
   SECTION 0 — HERO
───────────────────────────────────────────── */
function Hero() {
  const [typed, setTyped] = useState('')
  const full = 'Gear Library & Marketplace'
  useEffect(() => {
    let i = 0
    const t = setInterval(() => {
      setTyped(full.slice(0, ++i))
      if (i >= full.length) clearInterval(t)
    }, 60)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden pt-20"
      style={{ background: '#E5F4FE' }}>

      {/* Subtle pixel grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(10,10,10,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      {/* Floating stars — yellow only, sparse */}
      {[
        { top: '15%', left: '6%',   size: 36, delay: 0 },
        { top: '70%', left: '4%',   size: 20, delay: 1 },
        { top: '25%', right: '8%',  size: 24, delay: 0.5 },
        { top: '65%', right: '5%',  size: 40, delay: 0.8 },
      ].map((s, i) => (
        <div key={i} className="absolute star-deco pointer-events-none"
          style={{ top: s.top, left: (s as any).left, right: (s as any).right, animationDelay: `${s.delay}s` }}>
          <svg width={s.size} height={s.size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
            <path d="M16 2 L19 12 L30 12 L21 18 L24 28 L16 22 L8 28 L11 18 L2 12 L13 12 Z"
              fill="#ffc600" stroke="#0a0a0a" strokeWidth="2" />
          </svg>
        </div>
      ))}

      <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center w-full">

        {/* Left — Logo as hero */}
        <div className="flex flex-col items-center md:items-start w-full">
          <div className="mascot-float w-full">
            <Image src="/logo.png" alt="PropBank Logo" width={600} height={600}
              style={{ imageRendering: 'pixelated', width: '100%', height: 'auto', mixBlendMode: 'multiply' }} />
          </div>
        </div>

        {/* Right — info */}
        <div>
          <div className="section-tag mb-6">CS3240 · IDP INDIVIDUAL PORTFOLIO</div>

          <h1 className="section-heading mb-2" style={{ fontSize: 18, color: '#0a0a0a' }}>
            CHEN HONG<span style={{ color: '#e63946' }}>SHAN</span>
          </h1>
          <p style={{ fontFamily: '"Press Start 2P"', fontSize: 8, color: '#aaa', marginBottom: 28 }}>
            A0311136W · TUT[06]
          </p>

          <div className="pixel-card p-5 mb-6">
            <p style={{ fontFamily: '"Press Start 2P"', fontSize: 7, color: '#aaa', marginBottom: 8 }}>
              SERVICE OWNED
            </p>
            <p className="section-heading" style={{ fontSize: 11, color: '#1e96fc' }}>
              {typed}<span className="blink" style={{ color: '#0a0a0a' }}>█</span>
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {['+ PropMes', '+ Opening Screen', '+ Landing Page'].map(t => (
                <span key={t} className="pixel-btn" style={{ fontSize: 7, background: '#ffffff', borderColor: '#a2d6f9', boxShadow: '3px 3px 0 #a2d6f9' }}>{t}</span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <a href="#process" className="pixel-btn" style={{ background: '#0a0a0a', color: '#ffc600' }}>
              VIEW PROCESS ↓
            </a>
            <a href="#prototype" className="pixel-btn" style={{ background: '#ffffff' }}>
              SEE PROTOTYPE ↓
            </a>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <p style={{ fontFamily: '"Press Start 2P"', fontSize: 6, color: '#ccc' }}>SCROLL</p>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.2 }}>
          <span style={{ fontSize: 20, color: '#aaa' }}>▼</span>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 1 — WHERE IT ALL STARTED
───────────────────────────────────────────── */
function Origin() {
  return (
    <section id="origin" className="py-24 px-6" style={{ background: '#ffffff' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="section-tag">01 · ORIGIN STORY</div>
          <h2 className="section-heading text-xl md:text-2xl mb-4" style={{ color: '#0a0a0a' }}>
            WHERE IT ALL<br />STARTED
          </h2>
          <p style={{ fontFamily: '"VT323"', fontSize: 22, color: '#444', maxWidth: 600, marginBottom: 32 }}>
            The entire PropBank concept — its services, ecosystem vision, and core positioning — originated from my individual ideation. My teammates adopted and built on this foundation.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          <Reveal delay={0.1}>
            <div className="pixel-card p-6" style={{ background: '#ffffff' }}>
              <p className="section-tag" style={{ background: '#ffffff' }}>ORIGINAL PITCH</p>
              <p className="section-heading" style={{ fontSize: 11, color: '#1e96fc', marginBottom: 12 }}>
                THE CORE IDEA
              </p>
              <ul style={{ fontFamily: '"VT323"', fontSize: 20, lineHeight: 1.7, color: '#333' }}>
                <li>✦ Gear Library & Marketplace → buy / borrow / swap</li>
                <li>✦ PropScan → one picture → buildable parts list</li>
                <li>✦ Workshop → unified tutorial directory</li>
                <li>✦ Creator Hub → help requests & collabs</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="pixel-card p-6" style={{ background: '#ffffff' }}>
              <p className="section-tag">THE PROBLEM I SAW</p>
              <p className="section-heading" style={{ fontSize: 11, color: '#1e96fc', marginBottom: 12 }}>
                COSPLAY HAS A<br />COORDINATION CRISIS
              </p>
              <p style={{ fontFamily: '"VT323"', fontSize: 20, lineHeight: 1.7 }}>
                Singapore-based ACGN creators — cosplayers, prop makers, fan-film teams, student clubs — lacked a dedicated ecosystem. Their creativity was there. Access and coordination were not.
              </p>
              <div className="mt-4 flex gap-2 flex-wrap">
                {['✓ Creativity', '✗ Access', '✗ Coordination'].map(t => (
                  <span key={t} className="pixel-btn bg-white" style={{ fontSize: 7 }}>{t}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <div className="pixel-card p-6 mt-8" style={{ background: '#072ac8' }}>
            <p style={{ fontFamily: '"Press Start 2P"', fontSize: 8, color: '#ffc600', marginBottom: 8 }}>
              → FROM ONE IDEA TO A SUPER-APP
            </p>
            <p style={{ fontFamily: '"VT323"', fontSize: 22, lineHeight: 1.6, color: 'white' }}>
              This initial pitch became the shared foundation that all four group members built their individual services upon.
              My role then evolved into owning <span style={{ color: '#a2d6f9' }}>Gear Library & Marketplace</span>,
              <span style={{ color: '#E5F4FE' }}> PropMes</span>, and the
              <span style={{ color: '#ffc600' }}> Opening + Landing screens</span>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 2 — MY ROLE IN THE ECOSYSTEM
───────────────────────────────────────────── */
function Role() {
  const services = [
    { name: 'Gear Library\n& Marketplace', owner: 'ME', color: '#1e96fc', textColor: 'white', highlight: true },
    { name: 'CoNews',        owner: 'Xiao Ao', color: '#E5F4FE', textColor: '#072ac8', highlight: false },
    { name: 'PropScan',      owner: 'Shared',  color: '#a2d6f9', textColor: '#072ac8', highlight: false },
    { name: 'Workshop',      owner: 'Yuhao',   color: '#E5F4FE', textColor: '#072ac8', highlight: false },
    { name: 'Creator Hub',   owner: 'Jae',     color: '#E5F4FE', textColor: '#072ac8', highlight: false },
  ]

  return (
    <section id="role" className="py-24 px-6" style={{ background: '#a2d6f9' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="section-tag">02 · ECOSYSTEM ROLE</div>
          <h2 className="section-heading text-xl md:text-2xl mb-4" style={{ color: '#0a0a0a' }}>
            MY ROLE IN THE<br />ECOSYSTEM
          </h2>
          <p style={{ fontFamily: '"VT323"', fontSize: 22, color: '#444', maxWidth: 600, marginBottom: 32 }}>
            PropBank is a super-app with five distinct services. I owned the Marketplace — the economic core of the ecosystem — plus the shared entry experience.
          </p>
        </Reveal>

        {/* Service grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.1}>
              <div className={`pixel-card p-4 text-center ${s.highlight ? 'ring-4 ring-offset-2 ring-pb-yellow' : ''}`}
                style={{ background: s.color }}>
                <p className="section-heading" style={{ fontSize: 9, color: s.textColor, whiteSpace: 'pre-line', marginBottom: 8 }}>
                  {s.name}
                </p>
                <span className="pixel-btn" style={{
                  fontSize: 7,
                  background: s.highlight ? '#fcf300' : 'white',
                  color: '#0a0a0a',
                  padding: '4px 8px'
                }}>
                  {s.owner}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Group contributions */}
        <Reveal delay={0.3}>
          <div className="pixel-card p-6" style={{ background: 'white' }}>
            <p className="section-tag">MY GROUP-LEVEL CONTRIBUTIONS</p>
            <div className="grid md:grid-cols-3 gap-6 mt-4">
              {[
                { icon: '🔍', title: 'Key Insights Analysis', desc: 'Led synthesis of all 3 interview transcripts into 5 actionable design findings, framing the MVP priorities for the whole team.' },
                { icon: '👤', title: 'Group-Level Persona', desc: 'Created Shin Ip Seng — the cross-service persona — and mapped his end-to-end journey across all 5 services.' },
                { icon: '🗺️', title: 'Marketplace Persona\n& Journey Map', desc: 'Designed Chloe Tan persona and full user journey map for the Gear Library & Marketplace service.' },
              ].map((c, i) => (
                <div key={i} className="pixel-card p-4" style={{ background: '#ffffff' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
                  <p className="section-heading" style={{ fontSize: 9, color: '#1e96fc', whiteSpace: 'pre-line', marginBottom: 6 }}>{c.title}</p>
                  <p style={{ fontFamily: '"VT323"', fontSize: 18, lineHeight: 1.5, color: '#444' }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        {/* Navigation workflow embed */}
        <Reveal delay={0.4} className="mt-8">
          <FigmaEmbed
            url="https://www.figma.com/board/dlTpTF55FrQKmTATqDJw5O/CS3240-overall-navigation-workflow?node-id=0-1&p=f&t=10PYZBdx5EDaWDl7-0"
            title="OVERALL NAVIGATION WORKFLOW"
            height={460}
          />
        </Reveal>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 3 — PROBLEM FRAMING
───────────────────────────────────────────── */
function Problem() {
  const insights = [
    {
      num: '01', color: '#1e96fc',
      title: 'Trust & Coordination Crisis',
      body: 'Cosplay sourcing is not just a browsing problem — it\'s a trust and coordination problem. Users want reviews, seller location, chat, reservation, and item condition info.'
    },
    {
      num: '02', color: '#1e96fc',
      title: 'Fragmented Discovery',
      body: 'Event discovery relies on Instagram algorithms and word-of-mouth. Marketplace items are scattered across Carousell, Telegram, and random shops. No cosplay-specific search exists.'
    },
    {
      num: '03', color: '#e63946',
      title: 'The "Can I Do It?" Problem',
      body: '"Costumes these days add too many things." Users need to evaluate whether to make or buy, how long it takes, and if a guide is credible — before committing.'
    },
  ]

  return (
    <section id="problem" className="py-24 px-6" style={{ background: 'white' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="section-tag">03 · PROBLEM FRAMING</div>
          <h2 className="section-heading text-xl md:text-2xl mb-4" style={{ color: '#0a0a0a' }}>
            THE REAL PROBLEM<br />WE FOUND
          </h2>
          <p style={{ fontFamily: '"VT323"', fontSize: 22, color: '#444', maxWidth: 600, marginBottom: 32 }}>
            Three semi-structured interviews with cosplayers and convention-goers revealed that the core challenge isn't "finding items" — it's building enough trust to act.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {insights.map((ins, i) => (
            <Reveal key={ins.num} delay={i * 0.15}>
              <div className="pixel-card p-6 h-full" style={{ borderColor: ins.color }}>
                <p className="section-heading" style={{ fontSize: 28, color: ins.color, marginBottom: 8 }}>
                  {ins.num}
                </p>
                <p className="section-heading" style={{ fontSize: 10, color: '#0a0a0a', marginBottom: 10 }}>
                  {ins.title}
                </p>
                <p style={{ fontFamily: '"VT323"', fontSize: 20, lineHeight: 1.6, color: '#444' }}>
                  {ins.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="pixel-card p-6 mt-8" style={{ background: '#ffffff' }}>
            <p className="section-heading" style={{ fontSize: 12, color: '#0a0a0a', marginBottom: 8 }}>
              ★ DESIGN DIRECTION
            </p>
            <p style={{ fontFamily: '"VT323"', fontSize: 24, lineHeight: 1.5 }}>
              PropBank Marketplace should not look like a generic e-commerce feed. It must be built around 
              <strong> trust signals</strong>, <strong>cosplay-specific filters</strong>, and 
              <strong> coordination tools</strong> — from first browse to successful handoff.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 4 — USER RESEARCH & PERSONA
───────────────────────────────────────────── */
function Research() {
  return (
    <section id="research" className="py-24 px-6" style={{ background: '#E5F4FE' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="section-tag">04 · USER RESEARCH & PERSONA</div>
          <h2 className="section-heading text-xl md:text-2xl mb-4" style={{ color: '#0a0a0a' }}>
            KNOWING THE<br />USER
          </h2>
        </Reveal>

        {/* Affinity Diagram */}
        <Reveal className="mb-10">
          <FigmaEmbed
            url="https://www.figma.com/board/6KajuIH2XFhA2Ro5eLeb6P/hs---affinity-diagram?node-id=0-3&t=VN8eBxJlXW2eZo0I-1"
            title="AFFINITY DIAGRAM"
            height={460}
          />
        </Reveal>

        {/* Research methods + quote */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <Reveal delay={0.1}>
            <div className="pixel-card p-6" style={{ background: '#072ac8', color: 'white' }}>
              <p className="section-heading" style={{ fontSize: 10, color: '#fcf300', marginBottom: 10 }}>
                RESEARCH METHODS
              </p>
              <div className="space-y-2">
                {[
                  '✦ Semi-structured interviews (3 participants)',
                  '✦ Purposive sampling: cosplayers + ACGN fans',
                  '✦ Affinity diagramming (individual + cross-team)',
                  '✦ User journey mapping in FigJam',
                ].map(m => (
                  <p key={m} style={{ fontFamily: '"VT323"', fontSize: 20, lineHeight: 1.5 }}>{m}</p>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="pixel-card p-6" style={{ background: '#ffffff' }}>
              <p className="section-heading" style={{ fontSize: 10, marginBottom: 10 }}>KEY QUOTE</p>
              <p style={{ fontFamily: '"VT323"', fontSize: 26, lineHeight: 1.4, fontStyle: 'italic' }}>
                "Preferred locations of the seller matter because running around Singapore is annoying."
              </p>
              <p style={{ fontFamily: '"Press Start 2P"', fontSize: 7, color: '#555', marginTop: 8 }}>
                — User S, Interview 1
              </p>
            </div>
          </Reveal>
        </div>

        {/* ── Persona + Journey Map pairs ── */}
        {[
          {
            tag: 'MARKETPLACE PERSONA',
            tagColor: '#a2d6f9',
            name: 'CHLOE TAN',
            sub: 'Age 21 · University Student · Singapore',
            rows: [
              { label: 'ATTENDS',  value: '3–5 conventions/year, needs costumes fast' },
              { label: 'GOAL',     value: 'Buy/borrow/swap cosplay gear without wasting time on untrustworthy listings' },
              { label: 'PAIN',     value: 'Items scattered across Carousell, Telegram, and shops. Hard to verify trust.' },
              { label: 'NEEDS',    value: 'Reviews, seller location, condition info, chat, reservation, cosplay-specific filters' },
            ],
            journeyTitle: 'MARKETPLACE USER JOURNEY MAP',
            journeyUrl: 'https://www.figma.com/board/wHeMeAwvD9rtvsmIXV4Z1f/hs---user-journey-map?node-id=8-344&t=N6icqzUmCcexXJlS-1',
          },
          {
            tag: 'GROUP PERSONA',
            tagColor: '#fcf300',
            name: 'SHIN IP SENG',
            sub: 'Age 20 · University Student · Active ACGN Participant',
            rows: [
              { label: 'BACKGROUND', value: 'Already familiar with ACGN culture. Challenge: journey is inefficient across fragmented platforms.' },
              { label: 'GOAL',       value: 'Move smoothly between event discovery, sourcing, learning, and community sharing.' },
              { label: 'PAIN',       value: 'Has to restart the search process every time he switches tasks across platforms.' },
              { label: 'NEEDS',      value: 'A connected ecosystem where PropScan, Marketplace, Workshop, and CoNews work together.' },
            ],
            journeyTitle: 'GROUP PERSONA JOURNEY MAP',
            journeyUrl: 'https://www.figma.com/board/wHeMeAwvD9rtvsmIXV4Z1f/hs---user-journey-map?node-id=0-1&t=N6icqzUmCcexXJlS-1',
          },
          {
            tag: 'PROPSCAN PERSONA',
            tagColor: '#a2d6f9',
            name: 'AARON LIM',
            sub: 'Age 22 · University Student · Casual ACGN Fan',
            rows: [
              { label: 'BACKGROUND', value: 'Casual fan who encounters cool props online but doesn\'t know the character or franchise.' },
              { label: 'GOAL',       value: 'Go from "this looks cool" to "now I know what it is" with low friction.' },
              { label: 'PAIN',       value: 'Reverse-searching manually across Google, Reddit, TikTok is inefficient and inaccurate.' },
              { label: 'NEEDS',      value: 'Upload image → identify prop → find guides, marketplace items, and community content.' },
            ],
            journeyTitle: 'PROPSCAN USER JOURNEY MAP',
            journeyUrl: 'https://www.figma.com/board/wHeMeAwvD9rtvsmIXV4Z1f/hs---user-journey-map?node-id=8-722&t=N6icqzUmCcexXJlS-1',
          },
        ].map((persona, idx) => (
          <div key={persona.name} className="grid md:grid-cols-2 gap-6 mb-10 items-start">
            <Reveal delay={0.1}>
              <div className="pixel-card p-6 h-full" style={{ background: 'white' }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="pixel-card p-3" style={{ background: '#072ac8', width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 24 }}>👤</span>
                  </div>
                  <div>
                    <p className="section-heading" style={{ fontSize: 10, color: '#1e96fc' }}>{persona.name}</p>
                    <p style={{ fontFamily: '"VT323"', fontSize: 17, color: '#888' }}>{persona.sub}</p>
                  </div>
                </div>
                <p className="section-tag" style={{ background: persona.tagColor }}>{persona.tag}</p>
                <div className="mt-3 space-y-3">
                  {persona.rows.map(row => (
                    <div key={row.label} className="pixel-card p-3" style={{ background: '#ffffff' }}>
                      <p style={{ fontFamily: '"Press Start 2P"', fontSize: 7, color: '#888', marginBottom: 3 }}>{row.label}</p>
                      <p style={{ fontFamily: '"VT323"', fontSize: 18, lineHeight: 1.4 }}>{row.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <FigmaEmbed
                url={persona.journeyUrl}
                title={persona.journeyTitle}
                height={480}
              />
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 5 — DESIGN PROCESS
───────────────────────────────────────────── */
function Process() {
  const tasks = [
    { id: 'T1', label: 'Browse & Buy',   color: '#1e96fc', text: 'white' },
    { id: 'T2', label: 'Borrow',         color: '#1e96fc', text: 'white' },
    { id: 'T3', label: 'Sell / Rent',    color: '#ffc600', text: '#0a0a0a' },
    { id: 'T4', label: 'Swap',           color: '#fcf300', text: '#0a0a0a' },
    { id: 'T5', label: 'PropMes Chat',   color: '#a2d6f9', text: '#0a0a0a' },
  ]

  return (
    <section id="process" className="py-24 px-6" style={{ background: 'white' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="section-tag">05 · DESIGN PROCESS</div>
          <h2 className="section-heading text-xl md:text-2xl mb-4" style={{ color: '#0a0a0a' }}>
            FROM SKETCH<br />TO PROTOTYPE
          </h2>
          <p style={{ fontFamily: '"VT323"', fontSize: 22, color: '#444', maxWidth: 600, marginBottom: 32 }}>
            The marketplace went through structured iteration: task workflow → lo-fi paper sketches → mid-fi digital wireframes.
          </p>
        </Reveal>

        {/* Process timeline — 2 steps only */}
        <div className="relative mb-12">
          <div className="absolute top-8 left-0 right-0 h-1" style={{ background: '#0a0a0a' }} />
          <div className="grid grid-cols-2 gap-4 relative">
            {[
              { phase: 'LO-FI', label: 'Paper Sketches', desc: 'Task flows for Buy, Borrow, Sell, Swap drawn on paper. Focus on information hierarchy and trust signals.', color: '#E5F4FE' },
              { phase: 'MID-FI', label: 'Digital Wireframes', desc: 'Translated to Figma. Defined card components, filter patterns, seller profile structure.', color: '#a2d6f9' },
            ].map((p, i) => (
              <Reveal key={p.phase} delay={i * 0.15}>
                <div className="pt-16">
                  <div className="pixel-card p-4" style={{ background: p.color }}>
                    <p className="section-heading" style={{ fontSize: 9, color: '#1e96fc', marginBottom: 4 }}>{p.phase}</p>
                    <p style={{ fontFamily: '"Press Start 2P"', fontSize: 7, marginBottom: 8 }}>{p.label}</p>
                    <p style={{ fontFamily: '"VT323"', fontSize: 18, lineHeight: 1.5, opacity: 0.85 }}>{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 1. Task workflow embed */}
        <Reveal delay={0.1} className="mb-8">
          <p className="section-heading mb-4" style={{ fontSize: 10, color: '#1e96fc' }}>
            STEP 1 · TASK WORKFLOW & USER TASKS
          </p>
          <FigmaEmbed
            url="https://www.figma.com/board/Aq90xFScMUubyW4aWzY4wc/hs---task-workflow?node-id=0-1&t=PBeRriCBMjXUIx61-1"
            title="TASK WORKFLOW DIAGRAM — MARKETPLACE"
            height={500}
          />
        </Reveal>

        {/* User tasks coverage */}
        <Reveal delay={0.15}>
          <div className="pixel-card p-6 mb-8" style={{ background: '#1e96fc' }}>
            <p className="section-heading" style={{ fontSize: 10, color: '#ffc600', marginBottom: 12 }}>
              USER TASKS DESIGNED
            </p>
            <div className="flex flex-wrap gap-3">
              {tasks.map(t => (
                <div key={t.id} className="pixel-card px-4 py-3" style={{ background: t.color }}>
                  <span style={{ fontFamily: '"Press Start 2P"', fontSize: 8, color: t.text }}>
                    {t.id} · {t.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Design decisions */}
        <Reveal delay={0.2}>
          <p className="section-heading mb-6" style={{ fontSize: 10, color: '#1e96fc' }}>
            KEY DESIGN DECISIONS
          </p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {[
            { decision: 'Trust Badge System', rationale: 'Users cited reviews and seller credibility as the #1 factor. Designed a visible trust score combining marketplace rating + guide reproducibility rating + transaction count — portable across services.', color: '#1e96fc', text: 'white' },
            { decision: 'Cosplay-Specific Filters', rationale: 'Generic filters (price, date) are insufficient. Added fandom, character, item type, size, and condition filters — mapping directly to what users said they needed.', color: '#fcf300', text: '#0a0a0a' },
            { decision: 'Seller Location Field', rationale: '"Running around Singapore is annoying" (User S). Made seller location a mandatory, prominently-displayed field on every listing.', color: '#1e96fc', text: 'white' },
            { decision: 'PropMes as Coordination Layer', rationale: 'Chat, offer-making, reservation requests, and meetup coordination all happen within PropMes — keeping the full transaction lifecycle inside PropBank.', color: '#ffc600', text: '#0a0a0a' },
          ].map((d, i) => (
            <Reveal key={d.decision} delay={i * 0.1}>
              <div className="pixel-card p-5 h-full" style={{ background: d.color }}>
                <p style={{ fontFamily: '"Press Start 2P"', fontSize: 7, opacity: 0.7, marginBottom: 6, color: d.text }}>DESIGN DECISION</p>
                <p className="section-heading" style={{ fontSize: 10, color: d.text, marginBottom: 8 }}>{d.decision}</p>
                <p style={{ fontFamily: '"VT323"', fontSize: 19, lineHeight: 1.5, color: d.text, opacity: 0.9 }}>{d.rationale}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 2. Lo-fi sketches */}
        <Reveal delay={0.2}>
          <p className="section-heading mb-4" style={{ fontSize: 10, color: '#1e96fc' }}>
            STEP 2 · LO-FI PAPER SKETCHES
          </p>
          <div className="pixel-card p-6" style={{ background: '#ffffff' }}>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: 'Task 1.1: Buy a Cosplay Item' },
                { label: 'Task 2.1: Sell a Cosplay Item' },
                { label: 'Task 3.1: Swap Cosplay Props' },
                { label: 'Seller Profile Page' },
              ].map((sketch, i) => (
                <div key={i} className="pixel-card p-4" style={{ background: 'white', minHeight: 160 }}>
                  <p style={{ fontFamily: '"Press Start 2P"', fontSize: 7, color: '#888', marginBottom: 8 }}>{sketch.label}</p>
                  <div className="flex items-center justify-center" style={{ height: 100, background: '#f5f5f5', border: '2px dashed #ccc' }}>
                    <p style={{ fontFamily: '"VT323"', fontSize: 18, color: '#aaa' }}>[ add lo-fi screenshot here ]</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* 3. Mid-fi */}
        <Reveal delay={0.2} className="mt-8">
          <p className="section-heading mb-4" style={{ fontSize: 10, color: '#1e96fc' }}>
            STEP 3 · MID-FI DIGITAL WIREFRAMES
          </p>
          <div className="pixel-card p-6" style={{ background: '#a2d6f9' }}>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: 'Marketplace Home' },
                { label: 'Browse & Filter' },
                { label: 'Item Detail & Seller Profile' },
                { label: 'Publish Listing Flow' },
              ].map((w, i) => (
                <div key={i} className="pixel-card p-4" style={{ background: 'white', minHeight: 160 }}>
                  <p style={{ fontFamily: '"Press Start 2P"', fontSize: 7, color: '#888', marginBottom: 8 }}>{w.label}</p>
                  <div className="flex items-center justify-center" style={{ height: 100, background: '#f5f5f5', border: '2px dashed #ccc' }}>
                    <p style={{ fontFamily: '"VT323"', fontSize: 18, color: '#aaa' }}>[ add mid-fi screenshot here ]</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}


/* ─────────────────────────────────────────────
   SECTION 6 — PROTOTYPE SHOWCASE
───────────────────────────────────────────── */
function Prototype() {
  return (
    <section id="prototype" className="py-24 px-6" style={{ background: '#E5F4FE' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="section-tag">06 · HI-FI PROTOTYPE</div>
          <h2 className="section-heading text-xl md:text-2xl mb-4" style={{ color: '#0a0a0a' }}>
            THE PROTOTYPE
          </h2>
          <p style={{ fontFamily: '"VT323"', fontSize: 22, color: '#444', maxWidth: 600, marginBottom: 20 }}>
            Full interactive prototype built in Figma — covering the end-to-end marketplace experience including Opening Screen, Landing Page, Marketplace, and PropMes.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <a href="https://www.figma.com/design/Eam86lpBHu6QkFFpe1IK1o/hs---high-fi-prototype?node-id=0-1&t=OSjcV6uuGgeiJMKo-1"
              target="_blank" rel="noopener noreferrer"
              className="pixel-btn" style={{ background: '#072ac8', color: '#fcf300' }}>
              OPEN FIGMA FILE ↗
            </a>
            <a href="https://www.figma.com/proto/Eam86lpBHu6QkFFpe1IK1o/hs---high-fi-prototype?node-id=2-4192&p=f&viewport=32%2C28%2C0.09&t=vS9orOujYH8i2UTq-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2%3A4192&page-id=0%3A1&show-proto-sidebar=1"
              target="_blank" rel="noopener noreferrer"
              className="pixel-btn" style={{ background: '#ffffff' }}>
              PLAY PROTOTYPE ▶
            </a>
          </div>
        </Reveal>

        {/* Interactive prototype embed */}
        <Reveal delay={0.1} className="mb-8">
          <FigmaEmbed
            url="https://www.figma.com/proto/Eam86lpBHu6QkFFpe1IK1o/hs---high-fi-prototype?node-id=2-4192&p=f&viewport=32%2C28%2C0.09&t=vS9orOujYH8i2UTq-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2%3A4192&page-id=0%3A1&show-proto-sidebar=1"
            title="INTERACTIVE PROTOTYPE — CLICK TO PLAY"
            height={680}
          />
        </Reveal>

        {/* Design file embed */}
        <Reveal delay={0.15} className="mb-8">
          <FigmaEmbed
            url="https://www.figma.com/design/Eam86lpBHu6QkFFpe1IK1o/hs---high-fi-prototype?node-id=0-1&t=OSjcV6uuGgeiJMKo-1"
            title="HI-FI DESIGN FILE — ALL SCREENS"
            height={600}
          />
        </Reveal>

        {/* Screen descriptions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {[
            { label: 'Opening Screen',   desc: 'Pixel mascot, PropBank branding, Log In / Create Account.' },
            { label: 'Landing Page',     desc: 'Interactive star nav — each star leads to a different service.' },
            { label: 'Marketplace Home', desc: 'Buy / Borrow / Sell / Rent / Swap action bubbles.' },
            { label: 'Browse & Buy',     desc: 'Search + cosplay-specific filters, trust badge, seller info.' },
            { label: 'Sell / Rent',      desc: 'Publish flow with AI tag suggestions + transparent override.' },
            { label: 'Swap',             desc: 'Publish item → send swap request → approval/pending status.' },
            { label: 'PropMes',          desc: 'In-app chat for reservation, offers, meetup coordination.' },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="pixel-card p-4 h-full" style={{ background: 'white' }}>
                <p className="section-heading" style={{ fontSize: 8, color: '#1e96fc', marginBottom: 6 }}>{s.label}</p>
                <p style={{ fontFamily: '"VT323"', fontSize: 18, color: '#555', lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 7 — AI FEATURE
───────────────────────────────────────────── */
function AIFeature() {
  return (
    <section id="ai" className="py-24 px-6" style={{ background: '#a2d6f9' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="section-tag">07 · AI FEATURE</div>
          <h2 className="section-heading text-xl md:text-2xl mb-4" style={{ color: '#0a0a0a' }}>
            AI-ASSISTED<br />TAG GENERATION
          </h2>
          <p style={{ fontFamily: '"VT323"', fontSize: 22, color: '#072ac8', maxWidth: 600, marginBottom: 32 }}>
            When a seller uploads a photo of their item, AI automatically generates relevant tags. Critically, the user stays in full control.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            { step: '01', icon: '📸', label: 'Upload Photo', desc: 'Seller uploads an image of their cosplay item when creating a listing.', color: '#1e96fc' },
            { step: '02', icon: '🤖', label: 'AI Generates Tags', desc: 'Computer vision identifies the item and suggests relevant tags (character, fandom, item type, materials).', color: '#ffc600' },
            { step: '03', icon: '✋', label: 'User Decides', desc: 'Clear UI label: "These tags are AI-generated." User can dismiss any tag (×) and add their own manually.', color: '#fcf300' },
          ].map((s, i) => (
            <Reveal key={s.step} delay={i * 0.15}>
              <div className="pixel-card p-5 h-full" style={{ background: s.color }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
                <p className="section-heading" style={{ fontSize: 9, color: '#0a0a0a', marginBottom: 6 }}>
                  STEP {s.step} · {s.label}
                </p>
                <p style={{ fontFamily: '"VT323"', fontSize: 20, lineHeight: 1.5, color: '#0a0a0a' }}>
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Design principles for this AI feature */}
        <Reveal delay={0.3}>
          <div className="pixel-card p-6" style={{ background: '#1e96fc' }}>
            <p className="section-heading" style={{ fontSize: 10, color: '#ffc600', marginBottom: 12 }}>
              WHY THIS DESIGN?
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { principle: 'Transparency', body: 'The UI explicitly labels tags as AI-generated. Users are never deceived about the source of suggestions — they can evaluate and override.', icon: '👁️' },
                { principle: 'Human Override', body: 'Every AI tag has a visible × button. Sellers who disagree with the AI\'s categorization can remove tags individually and type their own.', icon: '🎮' },
                { principle: 'Reduces Friction', body: 'Sellers often don\'t know how to categorize niche items. AI suggestions lower the barrier to publishing a good listing without forcing compliance.', icon: '⚡' },
                { principle: 'Non-Intrusive', body: 'AI operates at one specific moment: item upload. It doesn\'t persistently recommend, rerank, or alter the experience in hidden ways.', icon: '🤫' },
              ].map((p, i) => (
                <div key={p.principle} className="pixel-card p-4" style={{ background: '#072ac8' }}>
                  <p style={{ fontSize: 24, marginBottom: 6 }}>{p.icon}</p>
                  <p className="section-heading" style={{ fontSize: 8, color: '#ffc600', marginBottom: 6 }}>{p.principle}</p>
                  <p style={{ fontFamily: '"VT323"', fontSize: 19, color: '#E5F4FE', lineHeight: 1.5 }}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 8 — USABILITY TESTING
───────────────────────────────────────────── */
function Testing() {
  return (
    <section id="testing" className="py-24 px-6" style={{ background: 'white' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="section-tag">08 · USABILITY TESTING</div>
          <h2 className="section-heading text-xl md:text-2xl mb-4" style={{ color: '#0a0a0a' }}>
            TESTING WITH<br />REAL USERS
          </h2>
          <p style={{ fontFamily: '"VT323"', fontSize: 22, color: '#444', maxWidth: 600, marginBottom: 12 }}>
            Usability tests conducted via Maze. Results informed the final round of iteration before submission.
          </p>
          <a href="https://t.maze.co/520978199" target="_blank" rel="noopener noreferrer"
            className="pixel-btn inline-block mb-10" style={{ background: '#072ac8', color: '#fcf300' }}>
            VIEW MAZE REPORT ↗
          </a>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { metric: '—', label: 'Task Completion Rate', note: 'Add from Maze report', color: '#E5F4FE' },
            { metric: '—', label: 'Avg. Time on Task',    note: 'Add from Maze report', color: '#E5F4FE' },
            { metric: '—', label: 'Misclick Rate',        note: 'Add from Maze report', color: '#E5F4FE' },
          ].map((m, i) => (
            <Reveal key={m.label} delay={i * 0.1}>
              <div className="pixel-card p-6 text-center" style={{ background: m.color }}>
                <p className="section-heading" style={{ fontSize: 28, color: '#1e96fc', marginBottom: 4 }}>{m.metric}</p>
                <p style={{ fontFamily: '"Press Start 2P"', fontSize: 7, color: '#444', marginBottom: 4 }}>{m.label}</p>
                <p style={{ fontFamily: '"VT323"', fontSize: 16, color: '#888' }}>{m.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="pixel-card p-6" style={{ background: '#ffffff' }}>
            <p className="section-heading" style={{ fontSize: 10, color: '#1e96fc', marginBottom: 12 }}>
              KEY FINDINGS & ITERATIONS
            </p>
            <div className="space-y-4">
              {[
                { finding: 'Finding 1', action: 'Add your key usability finding here', iteration: 'Describe what you changed in response', color: '#1e96fc' },
                { finding: 'Finding 2', action: 'Add your key usability finding here', iteration: 'Describe what you changed in response', color: '#1e96fc' },
                { finding: 'Finding 3', action: 'Add your key usability finding here', iteration: 'Describe what you changed in response', color: '#ffc600' },
              ].map((f, i) => (
                <div key={i} className="pixel-card p-4 grid md:grid-cols-2 gap-4" style={{ background: 'white' }}>
                  <div>
                    <span className="pixel-btn" style={{ fontSize: 7, background: f.color, color: 'white' }}>{f.finding}</span>
                    <p style={{ fontFamily: '"VT323"', fontSize: 19, color: '#444', marginTop: 6 }}>{f.action}</p>
                  </div>
                  <div>
                    <span className="pixel-btn" style={{ fontSize: 7, background: '#ffc600' }}>ITERATION</span>
                    <p style={{ fontFamily: '"VT323"', fontSize: 19, color: '#444', marginTop: 6 }}>{f.iteration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 9 — REFLECTION
───────────────────────────────────────────── */
function Reflect() {
  return (
    <section id="reflect" className="py-24 px-6" style={{ background: '#E5F4FE' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="section-tag">09 · REFLECTION</div>
          <h2 className="section-heading text-xl md:text-2xl mb-4" style={{ color: '#0a0a0a' }}>
            WHAT I<br />LEARNED
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {[
            {
              title: 'Trade-offs',
              color: '#1e96fc', text: 'white',
              body: 'Balancing feature richness with interface simplicity was the core tension. The marketplace could have 20 filters — but users needed the 5 most relevant ones front-and-center, not buried in an overflow menu.'
            },
            {
              title: 'Ecosystem Integration',
              color: '#fcf300', text: '#0a0a0a',
              body: 'The marketplace doesn\'t stand alone. PropScan feeds into it (scan → find similar listing). Workshop links out to it (guide → buy materials). Designing these entry/exit flows required constant alignment with teammates.'
            },
            {
              title: 'AI Limitations',
              color: '#1e96fc', text: 'white',
              body: 'AI tag generation works well for common cosplay items but may misidentify niche or handmade props. The override mechanism wasn\'t just a nice-to-have — it was essential to maintain listing accuracy.'
            },
            {
              title: 'Process Reflection',
              color: '#ffc600', text: '#0a0a0a',
              body: 'Starting from user interviews rather than assumptions changed the design significantly. The seller location field and trust badge system would not have existed without the interview data.'
            },
          ].map((r, i) => (
            <Reveal key={r.title} delay={i * 0.1}>
              <div className="pixel-card p-6 h-full" style={{ background: r.color }}>
                <p className="section-heading" style={{ fontSize: 10, color: r.text, marginBottom: 10 }}>{r.title}</p>
                <p style={{ fontFamily: '"VT323"', fontSize: 20, lineHeight: 1.6, color: r.text, opacity: 0.9 }}>{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Final card */}
        <Reveal delay={0.4}>
          <div className="pixel-card p-8 text-center" style={{ background: '#072ac8' }}>
            <div className="mascot-float mb-6">
              <Image src="/mascot.png" alt="mascot" width={80} height={80}
                style={{ imageRendering: 'pixelated', margin: '0 auto' }} />
            </div>
            <p className="section-heading" style={{ fontSize: 14, color: '#ffc600', marginBottom: 8 }}>
              CHEN HONGSHAN
            </p>
            <p style={{ fontFamily: '"VT323"', fontSize: 22, color: '#a2d6f9', marginBottom: 16 }}>
              A0311136W · CS3240 · TUT[06]
            </p>
            <p style={{ fontFamily: '"VT323"', fontSize: 22, color: '#E5F4FE', maxWidth: 500, margin: '0 auto 24px' }}>
              From one ideation slide to a full super-app ecosystem — this project taught me that good UX design begins with listening, not sketching.
            </p>
            <a href="https://www.figma.com/design/Rb3NBiOCgCPaXdcylqQa3L/Propbank-playground?node-id=125-467"
              target="_blank" rel="noopener noreferrer"
              className="pixel-btn" style={{ background: '#ffffff' }}>
              VIEW FULL PROTOTYPE ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   ROOT PAGE
───────────────────────────────────────────── */
export default function Page() {
  return (
    <>
      <PixelCursor />
      <Nav />
      <main>
        <Hero />
        <div className="section-divider" />
        <Origin />
        <div className="section-divider" />
        <Role />
        <div className="section-divider" />
        <Problem />
        <div className="section-divider" />
        <Research />
        <div className="section-divider" />
        <Process />
        <div className="section-divider" />
        <Prototype />
        <div className="section-divider" />
        <AIFeature />
        <div className="section-divider" />
        <Testing />
        <div className="section-divider" />
        <Reflect />
      </main>

      <footer className="border-t-2 border-black py-6 text-center" style={{ background: '#ffffff' }}>
        <p style={{ fontFamily: '"Press Start 2P"', fontSize: 7, color: '#aaa' }}>
          © 2025 CHEN HONGSHAN · CS3240 IDP · PROPBANK
        </p>
      </footer>
    </>
  )
}