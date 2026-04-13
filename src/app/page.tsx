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
        cursorRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`
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
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
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
    <div className="figma-wrap">
      <div className="figma-bar">
        <span style={{ fontFamily: '"Carter One"', fontSize: 7, color: '#072ac8' }}>
          ◈ {title}
        </span>
        <a href={url} target="_blank" rel="noopener noreferrer"
          className="pixel-btn" style={{ fontSize: 6, padding: '4px 10px' }}>
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
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
      borderBottom: scrolled ? '1px solid rgba(10,10,10,0.1)' : 'none',
      backdropFilter: scrolled ? 'blur(8px)' : 'none',
      transition: 'all 0.3s',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Image src="/logo_new.png" alt="PropBank" width={28} height={28} style={{ imageRendering: 'pixelated' }} />
          <span style={{ fontFamily: '"Carter One"', fontSize: 9, color: '#0a0a0a' }}>
            PROP<span style={{ color: '#e63946' }}>BANK</span>
          </span>
        </a>
        <div className="hidden md:flex" style={{ gap: 24 }}>
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
  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ffffff',
      paddingTop: 80,
      overflow: 'hidden',
    }}>
      <div style={{ textAlign: 'center', width: '100%', maxWidth: 1000, padding: '0 32px' }}>

        {/* Line 1 — PROPBANK (35px) */}
        <p style={{
          fontFamily: '"Carter One"',
          fontSize: 35,
          lineHeight: 1.3,
          margin: 0,
          marginBottom: 20,
          position: 'relative',
          zIndex: 1,
        }}>
          <span style={{ color: '#0a0a0a' }}>PROP</span><span style={{ color: '#e63946' }}>BANK</span>
        </p>

        {/* Line 2 — GEAR LIBRARY & MARKET PLACE (45px) */}
        <p style={{
          fontFamily: '"Carter One"',
          fontSize: 45,
          lineHeight: 1.35,
          margin: 0,
          color: '#0a0a0a',
          position: 'relative',
          zIndex: 1,
        }}>
          GEAR LIBRARY &amp;<br />MARKET PLACE
        </p>

        {/* Logo — front layer, overlaps lines 2 and 3 */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          marginTop: -130,
          marginBottom: -130,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <Image
            src="/logo_new.png"
            alt="PropBank Logo"
            width={380}
            height={380}
            style={{ imageRendering: 'pixelated', width: 380, height: 380, mixBlendMode: 'multiply' }}
          />
        </div>

        {/* Line 3 — CHEN HONGSHAN (15px) */}
        <p style={{
          fontFamily: '"Carter One"',
          fontSize: 15,
          color: '#0a0a0a',
          margin: 0,
          marginBottom: 18,
          position: 'relative',
          zIndex: 1,
        }}>
          CHEN HONGSHAN
        </p>

        {/* Line 4 — A0311136W TUT[06] (10px) */}
        <p style={{
          fontFamily: '"Carter One"',
          fontSize: 10,
          color: '#888',
          margin: 0,
          position: 'relative',
          zIndex: 1,
        }}>
          A0311136W &nbsp;&nbsp; TUT[06]
        </p>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SECTION WRAPPER — consistent padding + max-width
───────────────────────────────────────────── */
function Section({ id, children, bg = '#ffffff' }: { id: string; children: React.ReactNode; bg?: string }) {
  return (
    <section id={id} style={{ background: bg, padding: '80px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        {children}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SECTION HEADER — consistent heading block
───────────────────────────────────────────── */
function SectionHeader({ tag, title, sub }: { tag: string; title: React.ReactNode; sub?: string }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div className="section-tag">{tag}</div>
      <h2 className="section-heading" style={{ fontSize: 22, color: '#0a0a0a', marginBottom: sub ? 12 : 0 }}>
        {title}
      </h2>
      {sub && <p style={{ fontFamily: '"Carter One"', fontSize: 22, color: '#555', maxWidth: 580, lineHeight: 1.5 }}>{sub}</p>}
    </div>
  )
}

/* ─────────────────────────────────────────────
   SECTION 1 — WHERE IT ALL STARTED
───────────────────────────────────────────── */
function Origin() {
  return (
    <Section id="origin">
      <Reveal>
        <SectionHeader
          tag="01 · ORIGIN STORY"
          title={<>WHERE IT ALL <span style={{ color: '#e63946' }}>STARTED</span></>}
          sub="The entire PropBank concept — its services, ecosystem vision, and core positioning — originated from my individual ideation. My teammates adopted and built on this foundation."
        />
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        <Reveal delay={0.1}>
          <div style={{ borderLeft: '3px solid #1e96fc', padding: '24px', border: '1.5px solid #1e96fc', background: '#ffffff' }}>
            <div className="section-tag">ORIGINAL PITCH</div>
            <p className="section-heading" style={{ fontSize: 10, color: '#0a0a0a', marginBottom: 16 }}>THE CORE IDEA</p>
            <ul style={{ fontFamily: '"Carter One"', fontSize: 20, lineHeight: 1.8, color: '#333', listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ paddingBottom: 4, borderBottom: '1px solid #E5F4FE', marginBottom: 4 }}>✦ Gear Library & Marketplace → buy / borrow / swap</li>
              <li style={{ paddingBottom: 4, borderBottom: '1px solid #E5F4FE', marginBottom: 4 }}>✦ PropScan → one picture → buildable parts list</li>
              <li style={{ paddingBottom: 4, borderBottom: '1px solid #E5F4FE', marginBottom: 4 }}>✦ Workshop → unified tutorial directory</li>
              <li>✦ Creator Hub → help requests & collabs</li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div style={{ border: '1.5px solid #e63946', padding: '24px', background: '#ffffff' }}>
            <div className="section-tag">THE PROBLEM I SAW</div>
            <p className="section-heading" style={{ fontSize: 10, color: '#0a0a0a', marginBottom: 12 }}>COSPLAY HAS A COORDINATION CRISIS</p>
            <p style={{ fontFamily: '"Carter One"', fontSize: 20, lineHeight: 1.7, color: '#444', marginBottom: 16 }}>
              Singapore-based ACGN creators — cosplayers, prop makers, fan-film teams, student clubs — lacked a dedicated ecosystem. Their creativity was there. Access and coordination were not.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { t: '✓ Creativity', bg: '#E5F4FE', color: '#072ac8' },
                { t: '✗ Access', bg: '#fff5f5', color: '#e63946' },
                { t: '✗ Coordination', bg: '#fff5f5', color: '#e63946' },
              ].map(c => (
                <span key={c.t} style={{ fontFamily: '"Carter One"', fontSize: 7, background: c.bg, color: c.color, border: `1px solid ${c.color}`, padding: '4px 10px' }}>{c.t}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Pitch slides placeholder */}
      <Reveal delay={0.25}>
        <div style={{ border: '1.5px solid #0a0a0a', padding: '24px', marginBottom: 24 }}>
          <p style={{ fontFamily: '"Carter One"', fontSize: 7, color: '#888', marginBottom: 12 }}>
            ◈ INITIAL PITCH SLIDES — IDEATION STAGE
          </p>
          <div style={{ background: '#f8f8f8', border: '1.5px dashed #ddd', minHeight: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#bbb', textAlign: 'center' }}>
              [ add ideation pitch slides screenshot here ]
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.3}>
        <div style={{ background: '#E5F4FE', border: '1.5px solid #a2d6f9', borderLeft: '4px solid #1e96fc', padding: '24px' }}>
          <p style={{ fontFamily: '"Carter One"', fontSize: 8, color: '#072ac8', marginBottom: 8 }}>
            → FROM ONE IDEA TO A SUPER-APP
          </p>
          <p style={{ fontFamily: '"Carter One"', fontSize: 21, lineHeight: 1.6, color: '#333' }}>
            This initial pitch became the shared foundation that all four group members built their individual services upon.
            My role then evolved into owning <span style={{ color: '#1e96fc', fontWeight: 'bold' }}>Gear Library & Marketplace</span>,
            <span style={{ color: '#0a0a0a' }}> PropMes</span>, and the
            <span style={{ color: '#e63946' }}> Opening + Landing screens</span>.
          </p>
        </div>
      </Reveal>
    </Section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 2 — MY ROLE IN THE ECOSYSTEM
───────────────────────────────────────────── */
function Role() {
  const services = [
    { name: 'Gear Library\n& Marketplace', owner: 'ME', highlight: true },
    { name: 'CoNews',        owner: 'Xiao Ao', highlight: false },
    { name: 'PropScan',      owner: 'Shared',  highlight: false },
    { name: 'Workshop',      owner: 'Yuhao',   highlight: false },
    { name: 'Creator Hub',   owner: 'Jae',     highlight: false },
  ]

  return (
    <Section id="role" bg="#E5F4FE">
      <Reveal>
        <SectionHeader
          tag="02 · ECOSYSTEM ROLE"
          title={<>MY ROLE IN THE <span style={{ color: '#1e96fc' }}>ECOSYSTEM</span></>}
          sub="PropBank is a super-app with five distinct services. I owned the Marketplace — the economic core of the ecosystem — plus the shared entry experience."
        />
      </Reveal>

      {/* Service grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 32 }}>
        {services.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.08}>
            <div style={{
              border: s.highlight ? '2px solid #1e96fc' : '1.5px solid #0a0a0a',
              background: s.highlight ? '#1e96fc' : '#ffffff',
              padding: '16px 12px',
              textAlign: 'center',
              boxShadow: s.highlight ? '4px 4px 0 #072ac8' : 'none',
            }}>
              <p style={{ fontFamily: '"Carter One"', fontSize: 8, color: s.highlight ? '#ffffff' : '#0a0a0a', whiteSpace: 'pre-line', marginBottom: 10, lineHeight: 1.8 }}>
                {s.name}
              </p>
              <span style={{
                fontFamily: '"Carter One"', fontSize: 7,
                background: s.highlight ? '#ffc600' : '#E5F4FE',
                color: '#0a0a0a',
                border: '1px solid #0a0a0a',
                padding: '4px 8px',
                display: 'inline-block',
              }}>
                {s.owner}
              </span>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Group contributions */}
      <Reveal delay={0.3}>
        <div style={{ border: '1.5px solid #0a0a0a', background: '#ffffff', padding: '28px' }}>
          <div className="section-tag">MY GROUP-LEVEL CONTRIBUTIONS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginTop: 16 }}>
            {[
              { title: 'Key Insights Analysis', desc: 'Led synthesis of all 3 interview transcripts into 5 actionable design findings, framing the MVP priorities for the whole team.' },
              { title: 'Group-Level Persona & Journey Map', desc: 'Created Shin Ip Seng — the cross-service persona — and mapped his end-to-end journey across all 5 services.' },
              { title: 'Marketplace Persona & Journey Map', desc: 'Designed Chloe Tan persona and full user journey map for the Gear Library & Marketplace service.' },
              { title: 'Hi-Fi Prototype Screens', desc: 'Designed and built the Opening Screen, Landing Screen, and PropMes screens as part of the hi-fi prototype.' },
            ].map((c, i) => (
              <div key={i} style={{ borderTop: '2px solid #1e96fc', paddingTop: 14 }}>
                <p style={{ fontFamily: '"Carter One"', fontSize: 8, color: '#1e96fc', marginBottom: 8, lineHeight: 1.7 }}>{c.title}</p>
                <p style={{ fontFamily: '"Carter One"', fontSize: 18, lineHeight: 1.5, color: '#555' }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Navigation workflow embed */}
      <Reveal delay={0.4} className="mt-8">
        <div style={{ marginTop: 32 }}>
          <FigmaEmbed
            url="https://www.figma.com/board/dlTpTF55FrQKmTATqDJw5O/CS3240-overall-navigation-workflow?node-id=0-1&p=f&t=10PYZBdx5EDaWDl7-0"
            title="OVERALL NAVIGATION WORKFLOW"
            height={460}
          />
        </div>
      </Reveal>
    </Section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 3 — PROBLEM FRAMING
───────────────────────────────────────────── */
function Problem() {
  const insights = [
    {
      num: '01',
      title: 'Trust & Coordination Crisis',
      body: 'Cosplay sourcing is not just a browsing problem — it\'s a trust and coordination problem. Users want reviews, seller location, chat, reservation, and item condition info.'
    },
    {
      num: '02',
      title: 'Fragmented Discovery',
      body: 'Event discovery relies on Instagram algorithms and word-of-mouth. Marketplace items are scattered across Carousell, Telegram, and random shops. No cosplay-specific search exists.'
    },
    {
      num: '03',
      title: 'The "Can I Do It?" Problem',
      body: '"Costumes these days add too many things." Users need to evaluate whether to make or buy, how long it takes, and if a guide is credible — before committing.'
    },
  ]

  return (
    <Section id="problem">
      <Reveal>
        <SectionHeader
          tag="03 · PROBLEM FRAMING"
          title={<>THE REAL <span style={{ color: '#e63946' }}>PROBLEM</span> WE FOUND</>}
          sub={`Three semi-structured interviews with cosplayers and convention-goers revealed that the core challenge isn't "finding items" — it's building enough trust to act.`}
        />
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 32 }}>
        {insights.map((ins, i) => (
          <Reveal key={ins.num} delay={i * 0.12}>
            <div style={{ border: '1.5px solid #0a0a0a', padding: '28px', height: '100%' }}>
              <p style={{ fontFamily: '"Carter One"', fontSize: 32, color: '#E5F4FE', marginBottom: 2 }}>{ins.num}</p>
              <div style={{ width: 24, height: 2, background: '#e63946', marginBottom: 12 }} />
              <p style={{ fontFamily: '"Carter One"', fontSize: 9, color: '#0a0a0a', marginBottom: 12, lineHeight: 1.8 }}>
                {ins.title}
              </p>
              <p style={{ fontFamily: '"Carter One"', fontSize: 20, lineHeight: 1.6, color: '#555' }}>
                {ins.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.4}>
        <div style={{ background: '#E5F4FE', border: '1.5px solid #a2d6f9', borderLeft: '4px solid #0a0a0a', padding: '24px 28px' }}>
          <p style={{ fontFamily: '"Carter One"', fontSize: 10, color: '#0a0a0a', marginBottom: 10 }}>★ DESIGN DIRECTION</p>
          <p style={{ fontFamily: '"Carter One"', fontSize: 22, lineHeight: 1.5, color: '#333' }}>
            PropBank Marketplace should not look like a generic e-commerce feed. It must be built around{' '}
            <strong style={{ color: '#1e96fc' }}>trust signals</strong>,{' '}
            <strong style={{ color: '#1e96fc' }}>cosplay-specific filters</strong>, and{' '}
            <strong style={{ color: '#1e96fc' }}>coordination tools</strong>{' '}
            — from first browse to successful handoff.
          </p>
        </div>
      </Reveal>
    </Section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 4 — USER RESEARCH & PERSONA
───────────────────────────────────────────── */
function Research() {
  return (
    <Section id="research" bg="#f7fbff">
      <Reveal>
        <SectionHeader
          tag="04 · USER RESEARCH & PERSONA"
          title={<>KNOWING THE <span style={{ color: '#1e96fc' }}>USER</span></>}
        />
      </Reveal>

      {/* Affinity Diagram */}
      <Reveal className="mb-10">
        <div style={{ marginBottom: 32 }}>
          <FigmaEmbed
            url="https://www.figma.com/board/6KajuIH2XFhA2Ro5eLeb6P/hs---affinity-diagram?node-id=0-3&t=VN8eBxJlXW2eZo0I-1"
            title="AFFINITY DIAGRAM"
            height={460}
          />
        </div>
      </Reveal>

      {/* Research methods + quote */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}>
        <Reveal delay={0.1}>
          <div style={{ border: '1.5px solid #1e96fc', padding: '24px', background: '#ffffff' }}>
            <p style={{ fontFamily: '"Carter One"', fontSize: 9, color: '#1e96fc', marginBottom: 14 }}>RESEARCH METHODS</p>
            <div>
              {[
                '✦ Semi-structured interviews (3 participants)',
                '✦ Purposive sampling: cosplayers + ACGN fans',
                '✦ Affinity diagramming (individual + cross-team)',
                '✦ User journey mapping in FigJam',
              ].map(m => (
                <p key={m} style={{ fontFamily: '"Carter One"', fontSize: 20, lineHeight: 1.7, color: '#444', borderBottom: '1px solid #E5F4FE', paddingBottom: 6, marginBottom: 6 }}>{m}</p>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{ border: '1.5px solid #0a0a0a', padding: '28px', background: '#ffffff', borderLeft: '4px solid #e63946' }}>
            <p style={{ fontFamily: '"Carter One"', fontSize: 9, color: '#0a0a0a', marginBottom: 14 }}>KEY QUOTE</p>
            <p style={{ fontFamily: '"Carter One"', fontSize: 26, lineHeight: 1.4, fontStyle: 'italic', color: '#333', marginBottom: 12 }}>
              "Preferred locations of the seller matter because running around Singapore is annoying."
            </p>
            <p style={{ fontFamily: '"Carter One"', fontSize: 7, color: '#999' }}>
              — User S, Interview 1
            </p>
          </div>
        </Reveal>
      </div>

      {/* ── Persona + Journey Map pairs ── */}
      {[
        {
          tag: 'MARKETPLACE PERSONA',
          tagColor: '#1e96fc',
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
          tagColor: '#ffc600',
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
      ].map((persona) => (
        <div key={persona.name} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40, alignItems: 'start' }}>
          <Reveal delay={0.1}>
            <div style={{ border: '1.5px solid #0a0a0a', padding: '24px', background: '#ffffff', height: '100%' }}>
              {/* Persona header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, background: '#E5F4FE', border: '1.5px solid #a2d6f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 22 }}>👤</span>
                </div>
                <div>
                  <p style={{ fontFamily: '"Carter One"', fontSize: 9, color: '#1e96fc', marginBottom: 4 }}>{persona.name}</p>
                  <p style={{ fontFamily: '"Carter One"', fontSize: 17, color: '#999' }}>{persona.sub}</p>
                </div>
              </div>
              <span style={{
                fontFamily: '"Carter One"', fontSize: 7,
                background: persona.tagColor === '#ffc600' ? '#ffc600' : persona.tagColor === '#1e96fc' ? '#E5F4FE' : '#E5F4FE',
                color: persona.tagColor === '#ffc600' ? '#0a0a0a' : '#072ac8',
                border: `1px solid ${persona.tagColor}`,
                padding: '3px 8px',
                display: 'inline-block',
                marginBottom: 16,
              }}>{persona.tag}</span>
              <div>
                {persona.rows.map(row => (
                  <div key={row.label} className="info-row">
                    <span className="info-label">{row.label}</span>
                    <p style={{ fontFamily: '"Carter One"', fontSize: 19, lineHeight: 1.5, color: '#444' }}>{row.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <FigmaEmbed url={persona.journeyUrl} title={persona.journeyTitle} height={480} />
          </Reveal>
        </div>
      ))}
    </Section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 5 — DESIGN PROCESS
───────────────────────────────────────────── */
function Process() {
  const tasks = [
    { id: 'T1', label: 'Buy & Borrow' },
    { id: 'T2', label: 'Sell & Rent' },
    { id: 'T3', label: 'Swap' },
    { id: 'T4', label: 'PropMes Chat' },
  ]

  return (
    <Section id="process">
      <Reveal>
        <SectionHeader
          tag="05 · DESIGN PROCESS"
          title={<>FROM SKETCH TO <span style={{ color: '#1e96fc' }}>PROTOTYPE</span></>}
          sub="The marketplace went through structured iteration: task workflow → lo-fi paper sketches → mid-fi digital wireframes."
        />
      </Reveal>

      {/* Process steps */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
        {[
          { phase: 'LO-FI', label: 'Paper Sketches', desc: 'Task flows for Buy, Borrow, Sell, Swap drawn on paper. Focus on information hierarchy and trust signals.' },
          { phase: 'MID-FI', label: 'Digital Wireframes', desc: 'Translated to Figma. Defined card components, filter patterns, seller profile structure.' },
        ].map((p, i) => (
          <Reveal key={p.phase} delay={i * 0.1}>
            <div style={{ display: 'flex', gap: 16, border: '1.5px solid #0a0a0a', padding: '20px 24px', alignItems: 'flex-start' }}>
              <div className="num-badge" style={{ flexShrink: 0 }}>{i + 1}</div>
              <div>
                <p style={{ fontFamily: '"Carter One"', fontSize: 9, color: '#1e96fc', marginBottom: 4 }}>{p.phase}</p>
                <p style={{ fontFamily: '"Carter One"', fontSize: 7, color: '#0a0a0a', marginBottom: 8 }}>{p.label}</p>
                <p style={{ fontFamily: '"Carter One"', fontSize: 18, color: '#555', lineHeight: 1.5 }}>{p.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* 1. Task workflow embed */}
      <Reveal delay={0.1}>
        <p style={{ fontFamily: '"Carter One"', fontSize: 9, color: '#1e96fc', marginBottom: 14 }}>
          STEP 1 · TASK WORKFLOW & USER TASKS
        </p>
        <div style={{ marginBottom: 32 }}>
          <FigmaEmbed
            url="https://www.figma.com/board/Aq90xFScMUubyW4aWzY4wc/hs---task-workflow?node-id=0-1&t=PBeRriCBMjXUIx61-1"
            title="TASK WORKFLOW DIAGRAM — MARKETPLACE"
            height={500}
          />
        </div>
      </Reveal>

      {/* User tasks coverage */}
      <Reveal delay={0.15}>
        <div style={{ background: '#E5F4FE', border: '1.5px solid #a2d6f9', padding: '20px 24px', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <p style={{ fontFamily: '"Carter One"', fontSize: 8, color: '#072ac8', flexShrink: 0 }}>USER TASKS DESIGNED</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {tasks.map((t) => (
              <div key={t.id} style={{
                background: '#ffffff',
                border: '1.5px solid #1e96fc',
                padding: '8px 14px',
              }}>
                <span style={{ fontFamily: '"Carter One"', fontSize: 7, color: '#072ac8' }}>
                  {t.id} · {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Design decisions */}
      <Reveal delay={0.2}>
        <p style={{ fontFamily: '"Carter One"', fontSize: 9, color: '#1e96fc', marginBottom: 20 }}>KEY DESIGN DECISIONS</p>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
        {[
          { decision: 'Trust Badge System', rationale: 'Users cited reviews and seller credibility as the #1 factor. Designed a visible trust score combining marketplace rating + guide reproducibility rating + transaction count — portable across services.' },
          { decision: 'Cosplay-Specific Filters', rationale: 'Generic filters (price, date) are insufficient. Added fandom, character, item type, size, and condition filters — mapping directly to what users said they needed.' },
          { decision: 'Seller Location Field', rationale: '"Running around Singapore is annoying" (User S). Made seller location a mandatory, prominently-displayed field on every listing.' },
          { decision: 'PropMes as Coordination Layer', rationale: 'Chat, offer-making, reservation requests, and meetup coordination all happen within PropMes — keeping the full transaction lifecycle inside PropBank.' },
        ].map((d, i) => (
          <Reveal key={d.decision} delay={i * 0.08}>
            <div style={{
              border: '1.5px solid #0a0a0a',
              borderTop: '3px solid #1e96fc',
              padding: '20px',
              background: '#ffffff',
              height: '100%',
            }}>
              <p style={{ fontFamily: '"Carter One"', fontSize: 7, color: '#999', marginBottom: 6 }}>DESIGN DECISION</p>
              <p style={{ fontFamily: '"Carter One"', fontSize: 9, color: '#0a0a0a', marginBottom: 10, lineHeight: 1.7 }}>{d.decision}</p>
              <p style={{ fontFamily: '"Carter One"', fontSize: 19, lineHeight: 1.5, color: '#555' }}>{d.rationale}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* 2. Lo-fi sketches */}
      <Reveal delay={0.2}>
        <p style={{ fontFamily: '"Carter One"', fontSize: 9, color: '#1e96fc', marginBottom: 14 }}>STEP 2 · LO-FI PAPER SKETCHES</p>
        <div style={{ border: '1.5px solid #0a0a0a', padding: '24px', marginBottom: 32 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: 'Task 1.1: Buy a Cosplay Item' },
              { label: 'Task 2.1: Sell a Cosplay Item' },
              { label: 'Task 3.1: Swap Cosplay Props' },
              { label: 'Seller Profile Page' },
            ].map((sketch, i) => (
              <div key={i} style={{ border: '1.5px solid #ddd', padding: '14px' }}>
                <p style={{ fontFamily: '"Carter One"', fontSize: 7, color: '#888', marginBottom: 10 }}>{sketch.label}</p>
                <div style={{ height: 120, background: '#f8f8f8', border: '1.5px dashed #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p style={{ fontFamily: '"Carter One"', fontSize: 17, color: '#bbb' }}>[ add lo-fi screenshot here ]</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 3. Mid-fi */}
      <Reveal delay={0.2}>
        <p style={{ fontFamily: '"Carter One"', fontSize: 9, color: '#1e96fc', marginBottom: 14 }}>STEP 3 · MID-FI DIGITAL WIREFRAMES</p>
        <div style={{ background: '#E5F4FE', border: '1.5px solid #a2d6f9', padding: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: 'Marketplace Home' },
              { label: 'Browse & Filter' },
              { label: 'Item Detail & Seller Profile' },
              { label: 'Publish Listing Flow' },
            ].map((w, i) => (
              <div key={i} style={{ background: '#ffffff', border: '1.5px solid #ddd', padding: '14px' }}>
                <p style={{ fontFamily: '"Carter One"', fontSize: 7, color: '#888', marginBottom: 10 }}>{w.label}</p>
                <div style={{ height: 120, background: '#f8f8f8', border: '1.5px dashed #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p style={{ fontFamily: '"Carter One"', fontSize: 17, color: '#bbb' }}>[ add mid-fi screenshot here ]</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 6 — PROTOTYPE SHOWCASE
───────────────────────────────────────────── */
function Prototype() {
  return (
    <Section id="prototype" bg="#f7fbff">
      <Reveal>
        <SectionHeader
          tag="06 · HI-FI PROTOTYPE"
          title={<>THE <span style={{ color: '#1e96fc' }}>PROTOTYPE</span></>}
          sub="Full interactive prototype built in Figma — covering the end-to-end marketplace experience including Opening Screen, Landing Page, Marketplace, and PropMes."
        />
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
          <a href="https://www.figma.com/design/Eam86lpBHu6QkFFpe1IK1o/hs---high-fi-prototype?node-id=0-1&t=OSjcV6uuGgeiJMKo-1"
            target="_blank" rel="noopener noreferrer"
            className="pixel-btn" style={{ background: '#1e96fc', color: '#ffffff', borderColor: '#1e96fc' }}>
            OPEN FIGMA FILE ↗
          </a>
          <a href="https://www.figma.com/proto/Eam86lpBHu6QkFFpe1IK1o/hs---high-fi-prototype?node-id=2-4192&p=f&viewport=32%2C28%2C0.09&t=vS9orOujYH8i2UTq-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2%3A4192&page-id=0%3A1&show-proto-sidebar=1"
            target="_blank" rel="noopener noreferrer"
            className="pixel-btn">
            PLAY PROTOTYPE ▶
          </a>
        </div>
      </Reveal>

      {/* Interactive prototype embed */}
      <Reveal delay={0.1}>
        <div style={{ marginBottom: 28 }}>
          <FigmaEmbed
            url="https://www.figma.com/proto/Eam86lpBHu6QkFFpe1IK1o/hs---high-fi-prototype?node-id=2-4192&p=f&viewport=32%2C28%2C0.09&t=vS9orOujYH8i2UTq-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2%3A4192&page-id=0%3A1&show-proto-sidebar=1"
            title="INTERACTIVE PROTOTYPE — CLICK TO PLAY"
            height={680}
          />
        </div>
      </Reveal>

      {/* Design file embed */}
      <Reveal delay={0.15}>
        <div style={{ marginBottom: 28 }}>
          <FigmaEmbed
            url="https://www.figma.com/design/Eam86lpBHu6QkFFpe1IK1o/hs---high-fi-prototype?node-id=0-1&t=OSjcV6uuGgeiJMKo-1"
            title="HI-FI DESIGN FILE — ALL SCREENS"
            height={600}
          />
        </div>
      </Reveal>

      {/* Screen descriptions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {[
          { label: 'Opening Screen',   desc: 'Pixel mascot, PropBank branding, Log In / Create Account.' },
          { label: 'Landing Page',     desc: 'Interactive star nav — each star leads to a different service.' },
          { label: 'Marketplace Home', desc: 'Buy / Borrow / Sell / Rent / Swap action bubbles.' },
          { label: 'Browse & Buy',     desc: 'Search + cosplay-specific filters, trust badge, seller info.' },
          { label: 'Sell / Rent',      desc: 'Publish flow with AI tag suggestions + transparent override.' },
          { label: 'Swap',             desc: 'Publish item → send swap request → approval/pending status.' },
          { label: 'PropMes',          desc: 'In-app chat for reservation, offers, meetup coordination.' },
        ].map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05}>
            <div style={{ border: '1.5px solid #0a0a0a', borderTop: i < 4 ? '2px solid #1e96fc' : '2px solid #e63946', padding: '16px', background: '#ffffff' }}>
              <p style={{ fontFamily: '"Carter One"', fontSize: 8, color: '#0a0a0a', marginBottom: 8, lineHeight: 1.7 }}>{s.label}</p>
              <p style={{ fontFamily: '"Carter One"', fontSize: 18, color: '#666', lineHeight: 1.5 }}>{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 7 — AI FEATURE
───────────────────────────────────────────── */
function AIFeature() {
  return (
    <Section id="ai">
      <Reveal>
        <SectionHeader
          tag="07 · AI FEATURE"
          title={<>AI-ASSISTED TAG <span style={{ color: '#1e96fc' }}>GENERATION</span></>}
          sub="When a seller uploads a photo of their item, AI automatically generates relevant tags. Critically, the user stays in full control."
        />
      </Reveal>

      {/* Steps */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 32 }}>
        {[
          { step: '01', icon: '📸', label: 'Upload Photo', desc: 'Seller uploads an image of their cosplay item when creating a listing.' },
          { step: '02', icon: '🤖', label: 'AI Generates Tags', desc: 'Computer vision identifies the item and suggests relevant tags (character, fandom, item type, materials).' },
          { step: '03', icon: '✋', label: 'User Decides', desc: 'Clear UI label: "These tags are AI-generated." User can dismiss any tag (×) and add their own manually.' },
        ].map((s, i) => (
          <Reveal key={s.step} delay={i * 0.12}>
            <div style={{ border: '1.5px solid #0a0a0a', padding: '28px', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <span style={{ fontSize: 28 }}>{s.icon}</span>
                <div className="num-badge">{s.step}</div>
              </div>
              <p style={{ fontFamily: '"Carter One"', fontSize: 9, color: '#0a0a0a', marginBottom: 10, lineHeight: 1.8 }}>
                {s.label}
              </p>
              <p style={{ fontFamily: '"Carter One"', fontSize: 20, lineHeight: 1.5, color: '#555' }}>{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Design principles */}
      <Reveal delay={0.3}>
        <div style={{ border: '1.5px solid #1e96fc', background: '#E5F4FE', padding: '28px' }}>
          <p style={{ fontFamily: '"Carter One"', fontSize: 9, color: '#072ac8', marginBottom: 20 }}>WHY THIS DESIGN?</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { principle: 'Transparency', body: 'The UI explicitly labels tags as AI-generated. Users are never deceived about the source of suggestions — they can evaluate and override.', icon: '👁️' },
              { principle: 'Human Override', body: 'Every AI tag has a visible × button. Sellers who disagree with the AI\'s categorization can remove tags individually and type their own.', icon: '🎮' },
              { principle: 'Reduces Friction', body: 'Sellers often don\'t know how to categorize niche items. AI suggestions lower the barrier to publishing a good listing without forcing compliance.', icon: '⚡' },
              { principle: 'Non-Intrusive', body: 'AI operates at one specific moment: item upload. It doesn\'t persistently recommend, rerank, or alter the experience in hidden ways.', icon: '🤫' },
            ].map((p) => (
              <div key={p.principle} style={{ border: '1.5px solid #a2d6f9', background: '#ffffff', padding: '18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 20 }}>{p.icon}</span>
                  <p style={{ fontFamily: '"Carter One"', fontSize: 8, color: '#1e96fc' }}>{p.principle}</p>
                </div>
                <p style={{ fontFamily: '"Carter One"', fontSize: 19, color: '#555', lineHeight: 1.5 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 8 — USABILITY TESTING
───────────────────────────────────────────── */
function Testing() {
  return (
    <Section id="testing" bg="#f7fbff">
      <Reveal>
        <SectionHeader
          tag="08 · USABILITY TESTING"
          title={<>TESTING WITH <span style={{ color: '#e63946' }}>REAL USERS</span></>}
          sub="Usability tests conducted via Maze. Results informed the final round of iteration before submission."
        />
        <a href="https://t.maze.co/520978199" target="_blank" rel="noopener noreferrer"
          className="pixel-btn" style={{ display: 'inline-block', marginBottom: 36, background: '#1e96fc', color: '#ffffff', borderColor: '#1e96fc' }}>
          VIEW MAZE REPORT ↗
        </a>
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { metric: '—', label: 'Task Completion Rate', note: 'Add from Maze report' },
          { metric: '—', label: 'Avg. Time on Task',    note: 'Add from Maze report' },
          { metric: '—', label: 'Misclick Rate',        note: 'Add from Maze report' },
        ].map((m, i) => (
          <Reveal key={m.label} delay={i * 0.1}>
            <div style={{ border: '1.5px solid #0a0a0a', background: '#ffffff', padding: '24px', textAlign: 'center' }}>
              <p style={{ fontFamily: '"Carter One"', fontSize: 32, color: '#1e96fc', marginBottom: 8 }}>{m.metric}</p>
              <p style={{ fontFamily: '"Carter One"', fontSize: 7, color: '#444', marginBottom: 6 }}>{m.label}</p>
              <p style={{ fontFamily: '"Carter One"', fontSize: 17, color: '#999' }}>{m.note}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div style={{ border: '1.5px solid #0a0a0a', padding: '28px', background: '#ffffff' }}>
          <p style={{ fontFamily: '"Carter One"', fontSize: 9, color: '#1e96fc', marginBottom: 20 }}>KEY FINDINGS & ITERATIONS</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { finding: 'Finding 1', action: 'Add your key usability finding here', iteration: 'Describe what you changed in response', accent: '#1e96fc' },
              { finding: 'Finding 2', action: 'Add your key usability finding here', iteration: 'Describe what you changed in response', accent: '#1e96fc' },
              { finding: 'Finding 3', action: 'Add your key usability finding here', iteration: 'Describe what you changed in response', accent: '#e63946' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1.5px solid #eee' }}>
                <div style={{ padding: '16px 20px', borderRight: '1px solid #eee' }}>
                  <span style={{ fontFamily: '"Carter One"', fontSize: 7, background: f.accent, color: '#ffffff', padding: '3px 8px', display: 'inline-block', marginBottom: 8 }}>{f.finding}</span>
                  <p style={{ fontFamily: '"Carter One"', fontSize: 19, color: '#444', marginTop: 4 }}>{f.action}</p>
                </div>
                <div style={{ padding: '16px 20px' }}>
                  <span style={{ fontFamily: '"Carter One"', fontSize: 7, background: '#E5F4FE', color: '#072ac8', border: '1px solid #a2d6f9', padding: '3px 8px', display: 'inline-block', marginBottom: 8 }}>ITERATION</span>
                  <p style={{ fontFamily: '"Carter One"', fontSize: 19, color: '#444', marginTop: 4 }}>{f.iteration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 9 — REFLECTION
───────────────────────────────────────────── */
function Reflect() {
  return (
    <Section id="reflect" bg="#E5F4FE">
      <Reveal>
        <SectionHeader
          tag="09 · REFLECTION"
          title={<>WHAT I <span style={{ color: '#e63946' }}>LEARNED</span></>}
        />
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
        {[
          {
            title: 'Trade-offs',
            accent: '#1e96fc',
            body: 'Balancing feature richness with interface simplicity was the core tension. The marketplace could have 20 filters — but users needed the 5 most relevant ones front-and-center, not buried in an overflow menu.'
          },
          {
            title: 'Ecosystem Integration',
            accent: '#ffc600',
            body: 'The marketplace doesn\'t stand alone. PropScan feeds into it (scan → find similar listing). Workshop links out to it (guide → buy materials). Designing these entry/exit flows required constant alignment with teammates.'
          },
          {
            title: 'AI Limitations',
            accent: '#1e96fc',
            body: 'AI tag generation works well for common cosplay items but may misidentify niche or handmade props. The override mechanism wasn\'t just a nice-to-have — it was essential to maintain listing accuracy.'
          },
          {
            title: 'Process Reflection',
            accent: '#e63946',
            body: 'Starting from user interviews rather than assumptions changed the design significantly. The seller location field and trust badge system would not have existed without the interview data.'
          },
        ].map((r) => (
          <Reveal key={r.title} delay={0.1}>
            <div style={{ border: '1.5px solid #0a0a0a', borderTop: `3px solid ${r.accent}`, padding: '24px', background: '#ffffff', height: '100%' }}>
              <p style={{ fontFamily: '"Carter One"', fontSize: 9, color: '#0a0a0a', marginBottom: 12, lineHeight: 1.8 }}>{r.title}</p>
              <p style={{ fontFamily: '"Carter One"', fontSize: 20, lineHeight: 1.6, color: '#555' }}>{r.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Final card */}
      <Reveal delay={0.4}>
        <div style={{ border: '1.5px solid #0a0a0a', background: '#ffffff', padding: '40px', textAlign: 'center' }}>
          <div className="mascot-float" style={{ marginBottom: 20 }}>
            <Image src="/mascot.png" alt="mascot" width={72} height={72}
              style={{ imageRendering: 'pixelated', margin: '0 auto' }} />
          </div>
          <div style={{ width: 32, height: 2, background: '#e63946', margin: '0 auto 16px' }} />
          <p style={{ fontFamily: '"Carter One"', fontSize: 12, color: '#0a0a0a', marginBottom: 6 }}>CHEN HONGSHAN</p>
          <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#999', marginBottom: 20 }}>A0311136W · CS3240 · TUT[06]</p>
          <p style={{ fontFamily: '"Carter One"', fontSize: 22, color: '#555', maxWidth: 520, margin: '0 auto 28px', lineHeight: 1.5 }}>
            From one ideation slide to a full super-app ecosystem — this project taught me that good UX design begins with listening, not sketching.
          </p>
          <a href="https://www.figma.com/design/Rb3NBiOCgCPaXdcylqQa3L/Propbank-playground?node-id=125-467"
            target="_blank" rel="noopener noreferrer"
            className="pixel-btn" style={{ background: '#1e96fc', color: '#ffffff', borderColor: '#1e96fc' }}>
            VIEW FULL PROTOTYPE ↗
          </a>
        </div>
      </Reveal>
    </Section>
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

      <footer style={{ borderTop: '1px solid rgba(10,10,10,0.08)', padding: '24px', textAlign: 'center', background: '#ffffff' }}>
        <p style={{ fontFamily: '"Carter One"', fontSize: 7, color: '#bbb' }}>
          © 2025 CHEN HONGSHAN · CS3240 IDP · PROPBANK
        </p>
      </footer>
    </>
  )
}