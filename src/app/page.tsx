'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

/* ─────────────────────────────────────────────
   Pixel Cursor
───────────────────────────────────────────── */
function PixelCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

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
      <div ref={ringRef} className="cursor-ring" />
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
        <span style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#072ac8' }}>
          ◈ {title}
        </span>
        <a href={url} target="_blank" rel="noopener noreferrer"
          className="pixel-btn" style={{ fontSize: 20, padding: '4px 10px', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
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
  { label: 'ORIGIN', href: '#origin' },
  { label: 'OVERVIEW', href: '#role' },
  { label: 'RESEARCH', href: '#research' },
  { label: 'TASKS', href: '#tasks' },
  { label: 'PROTOTYPE', href: '#prototype' },
  { label: 'AI', href: '#ai' },
  { label: 'INTEGRATION', href: '#integration' },
  { label: 'TESTING', href: '#testing' },
  { label: 'REFLECT', href: '#reflect' },
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
          <span style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#0a0a0a' }}>
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
const HERO_STARS = [
  { top: '8%', left: '6%', size: 35, delay: '0s', dur: '3.2s' },
  { top: '15%', left: '82%', size: 39, delay: '0.6s', dur: '2.8s' },
  { top: '72%', left: '9%', size: 41, delay: '1.1s', dur: '3.6s' },
  { top: '80%', left: '88%', size: 33, delay: '0.3s', dur: '2.5s' },
  { top: '45%', left: '3%', size: 45, delay: '1.8s', dur: '4.0s' },
  { top: '30%', left: '91%', size: 35, delay: '0.9s', dur: '3.0s' },
  { top: '88%', left: '50%', size: 31, delay: '0.4s', dur: '3.8s' },
  { top: '5%', left: '55%', size: 37, delay: '1.4s', dur: '2.6s' },
]

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
      position: 'relative',
    }}>
      {/* Floating stars */}
      {HERO_STARS.map((s, i) => (
        <span key={i} style={{
          position: 'absolute',
          top: s.top,
          left: s.left,
          fontSize: s.size,
          color: '#ffc600',
          pointerEvents: 'none',
          animation: `heroFloat ${s.dur} ${s.delay} ease-in-out infinite`,
          zIndex: 0,
          userSelect: 'none',
        }}>★</span>
      ))}

      <div style={{ textAlign: 'center', width: '100%', padding: '0 32px', position: 'relative', zIndex: 1 }}>

        {/* Line 1 — PROPBANK (70px) */}
        <p style={{
          fontFamily: '"Carter One"',
          fontSize: 70,
          lineHeight: 1,
          margin: 0,
          marginBottom: 8,
        }}>
          <span style={{ color: '#0a0a0a' }}>PROP</span><span style={{ color: '#e63946' }}>BANK</span>
        </p>

        {/* Line 2 — MARKET PLACE */}
        <p style={{
          fontFamily: '"Carter One"',
          fontSize: 'clamp(100px, 18vw, 100px)',
          lineHeight: 1,
          margin: 0,
          color: '#0a0a0a',
          textShadow: '4px 4px 0 #1e96fc',
          whiteSpace: 'nowrap',
        }}>
          MARKET PLACE
        </p>

        {/* CHEN HONGSHAN */}
        <p style={{
          fontFamily: '"Carter One"',
          fontSize: 26,
          color: '#0a0a0a',
          margin: 0,
          marginTop: 28,
          marginBottom: 10,
          position: 'relative',
          zIndex: 1,
          display: 'inline-block',
          background: '#ffc600',
          borderRadius: 12,
          padding: '4px 20px',
        }}>
          CHEN HONGSHAN
        </p>

        {/* A0311136W TUT[06] */}
        <p style={{
          fontFamily: '"Carter One"',
          fontSize: 20,
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
      <div className="section-tag" style={{ display: 'block', width: 'fit-content', marginBottom: 14 }}>{tag}</div>
      <h2 className="section-heading" style={{ fontSize: 22, color: '#0a0a0a', marginBottom: sub ? 12 : 0, background: '#ffc600', borderRadius: 10, padding: '8px 14px', display: 'inline-block' }}>
        {title}
      </h2>
      {sub && <p style={{ fontFamily: '"Carter One"', fontSize: 22, color: '#555', width: '100%', lineHeight: 1.5 }}>{sub}</p>}
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
          title={<>WHERE IT ALL <span style={{ color: '#0a0a0a' }}>STARTED</span></>}
          sub="The entire PropBank concept — its services, ecosystem vision, and core positioning — originated from my individual ideation. My teammates adopted and built on this foundation."
        />
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>

        <Reveal delay={0.2}>
          <div style={{ border: '1.5px solid #e63946', padding: '24px', background: '#ffffff' }}>
            <div className="section-tag">THE PROBLEM I SAW</div>
            <p className="section-heading" style={{ fontSize: 20, color: '#0a0a0a', marginBottom: 12 }}>COSPLAY HAS A COORDINATION CRISIS</p>
            <p style={{ fontFamily: '"Carter One"', fontSize: 20, lineHeight: 1.7, color: '#444', marginBottom: 16 }}>
              Singapore-based ACGN creators — cosplayers, prop makers, fan-film teams, student clubs — lacked a dedicated ecosystem. Their creativity was there. Access and coordination were not.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { t: '✓ Creativity', bg: '#E5F4FE', color: '#072ac8' },
                { t: '✗ Access', bg: '#fff5f5', color: '#e63946' },
                { t: '✗ Coordination', bg: '#fff5f5', color: '#e63946' },
              ].map(c => (
                <span key={c.t} style={{ fontFamily: '"Carter One"', fontSize: 20, background: c.bg, color: c.color, border: `1px solid ${c.color}`, padding: '4px 10px' }}>{c.t}</span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ borderLeft: '3px solid #1e96fc', padding: '24px', border: '1.5px solid #1e96fc', background: '#ffffff' }}>
            <div className="section-tag">ORIGINAL PITCH</div>
            <p className="section-heading" style={{ fontSize: 20, color: '#0a0a0a', marginBottom: 16 }}>THE CORE IDEA</p>
            <ul style={{ fontFamily: '"Carter One"', fontSize: 20, lineHeight: 1.8, color: '#333', listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ paddingBottom: 4, borderBottom: '1px solid #E5F4FE', marginBottom: 4 }}>✦ Gear Library & Marketplace → buy / borrow / swap</li>
              <li style={{ paddingBottom: 4, borderBottom: '1px solid #E5F4FE', marginBottom: 4 }}>✦ PropScan → one picture → buildable parts list</li>
              <li style={{ paddingBottom: 4, borderBottom: '1px solid #E5F4FE', marginBottom: 4 }}>✦ Workshop → unified tutorial directory</li>
              <li>✦ Creator Hub → help requests & collabs</li>
            </ul>
          </div>
        </Reveal>

      </div>

      {/* Pitch slides placeholder */}
      <Reveal delay={0.25}>
        <div style={{ border: '1.5px solid #0a0a0a', padding: '24px', marginBottom: 24 }}>
          <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#888', marginBottom: 12 }}>
            ◈ INITIAL PITCH SLIDES — IDEATION STAGE
          </p>
          <div style={{ background: '#f8f8f8', border: '1.5px solid #ddd', minHeight: 520, overflow: 'hidden' }}>
            <iframe
              src="/chen-hongshan-a0311136w.pdf#page=2&toolbar=0&navpanes=0&scrollbar=0"
              title="Initial Pitch Slides - Page 2"
              width="100%"
              height={520}
              style={{ border: 'none', display: 'block' }}
            />
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.3}>
        <div style={{ background: '#E5F4FE', border: '1.5px solid #a2d6f9', borderLeft: '4px solid #1e96fc', padding: '24px' }}>
          <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#072ac8', marginBottom: 8 }}>
            → FROM ONE IDEA TO A SUPER-APP
          </p>
          <p style={{ fontFamily: '"Carter One"', fontSize: 21, lineHeight: 1.6, color: '#333' }}>
            This initial pitch became the shared foundation that all four group members built their individual services upon.
            My role then evolved into owning <span style={{ color: '#1e96fc', fontWeight: 'bold' }}>Marketplace</span>,
            <span style={{ color: '#ffc600' }}> PropMes</span>, and the
            <span style={{ color: '#e63946' }}> Opening & Landing screens</span>.
          </p>
        </div>
      </Reveal>
    </Section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 2 — OVERVIEW
───────────────────────────────────────────── */
function Role() {
  const services = [
    { name: 'Gear Library\n& Marketplace', owner: 'ME', highlight: true },
    { name: 'CoNews', owner: 'Xiao Ao', highlight: false },
    { name: 'PropScan', owner: 'Shared', highlight: false },
    { name: 'Workshop', owner: 'Yuhao', highlight: false },
    { name: 'Creator Hub', owner: 'Jae', highlight: false },
  ]

  return (
    <Section id="role" bg="#E5F4FE">
      <Reveal>
        <SectionHeader
          tag="02 · OVERVIEW"
          title={<>ECOSYSTEM <span style={{ color: '#0a0a0a' }}>OVERVIEW</span></>}
          sub="PropBank is a super-app built for Singapore's ACGN and cosplay community — a one-stop platform bridging creation, coordination, and community."
        />
      </Reveal>

      {/* 1. What is PropBank */}
      <Reveal delay={0.05}>
        <div style={{ border: '1.5px solid #e63946', background: '#ffffff', padding: '24px 28px', marginBottom: 24 }}>
          <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#e63946', marginBottom: 12 }}>WHAT IS PROPBANK?</p>
          <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#333', lineHeight: 1.7 }}>
            PropBank is a super-app for Singapore&apos;s ACGN (Anime, Comics, Games, Novels) and cosplay community.
            It consolidates fragmented creator workflows — gear sourcing, skill-building, news discovery, and collaboration — into a single, cosplay-first platform.
            The ultimate goal is to remove friction from creation and make the community more self-sufficient, connected, and trusted.
          </p>
        </div>
      </Reveal>

      {/* 2. What services does PropBank feature */}
      <Reveal delay={0.08}>
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#072ac8', marginBottom: 10 }}>WHAT SERVICES DOES PROPBANK FEATURE?</p>
          <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#555', lineHeight: 1.6, marginBottom: 16 }}>
            PropBank is built as a super-app with 5 distinct services, each owned and designed by a different team member:
          </p>
        </div>
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
              <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: s.highlight ? '#ffffff' : '#0a0a0a', whiteSpace: 'pre-line', marginBottom: 10, lineHeight: 1.8 }}>
                {s.name}
              </p>
              <span style={{
                fontFamily: '"Carter One"', fontSize: 20,
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

      {/* 3. Service boundary
      <Reveal delay={0.1}>
        <div style={{ border: '1.5px solid #1e96fc', background: '#ffffff', padding: '18px 22px', marginBottom: 24 }}>
          <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#1e96fc', marginBottom: 8 }}>SERVICE BOUNDARY (INDIVIDUAL OWNERSHIP)</p>
          <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#444', lineHeight: 1.6, marginBottom: 12 }}>
            Owned scope: Gear Library & Marketplace end-to-end flows (Buy & Borrow, Sell & Rent, Swap, and PropMes coordination). Shared contribution: Opening and Landing entry screens.
            Integrated touchpoints with CoNews, Workshop, PropScan, and Creator Hub are intentionally connected but not claimed as my owned service scope.
          </p>
          <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#072ac8', lineHeight: 1.6 }}>
            → My primary focus: <strong>Marketplace</strong> — the economic and coordination core of the PropBank ecosystem.
          </p>
        </div>
      </Reveal> */}

      {/* 4. What is Marketplace */}
      <Reveal delay={0.15}>
        <div style={{ border: '1.5px solid #0a0a0a', background: '#ffffff', padding: '24px 28px', marginBottom: 32, boxShadow: '4px 4px 0 #1e96fc' }}>
          <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#0a0a0a', marginBottom: 14 }}>WHAT IS MARKETPLACE?</p>
          <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#333', lineHeight: 1.7, marginBottom: 20 }}>
            The Gear Library & Marketplace is PropBank&apos;s economic core — a cosplay-first platform where users can{' '}
            <strong style={{ color: '#1e96fc' }}>buy</strong>,{' '}
            <strong style={{ color: '#1e96fc' }}>borrow</strong>,{' '}
            <strong style={{ color: '#1e96fc' }}>sell</strong>,{' '}
            <strong style={{ color: '#1e96fc' }}>rent</strong>, and{' '}
            <strong style={{ color: '#1e96fc' }}>swap</strong>{' '}
            cosplay props, costumes, and tools.
            Unlike generic secondhand platforms (Carousell, eBay), Marketplace is built around trust signals specific to the cosplay community: item condition, seller reviews, sizing details, and in-app coordination via PropMes.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {[
              { label: 'BUY & BORROW', desc: 'Browse listed items, message sellers, place orders', color: '#1e96fc' },
              { label: 'SELL & RENT', desc: 'List gear with size, condition, and tag details', color: '#e63946' },
              { label: 'SWAP', desc: 'Propose gear trades with cosplay-specific matching', color: '#072ac8' },
              { label: 'PROPMES', desc: 'In-app chat and coordination across all flows', color: '#ffc600' },
            ].map((item) => (
              <div key={item.label} style={{ borderTop: `2px solid ${item.color}`, paddingTop: 12 }}>
                <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: item.color, marginBottom: 6 }}>{item.label}</p>
                <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#555', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 5. Overall navigation workflow */}
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
   SECTION 3 — RESEARCH
───────────────────────────────────────────── */
function Research() {
  const [expandedPersonas, setExpandedPersonas] = useState<Record<string, boolean>>({})
  const collapsedPersonaHeight = 517

  return (
    <Section id="research" bg="#f7fbff">
      <Reveal>
        <SectionHeader
          tag="03 · RESEARCH"
          title={<>KNOWING THE <span style={{ color: '#0a0a0a' }}>USER</span></>}
          sub="Three semi-structured interviews with cosplayers and convention-goers — synthesised through affinity diagramming — shaped every design decision in Marketplace."
        />
      </Reveal>

      {/* ── PART 1: USER INTERVIEW ── */}
      <Reveal delay={0.05}>
        <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#ffc600', marginBottom: 20, borderBottom: '2px solid #ffc600', paddingBottom: 8 }}>
          01 · USER INTERVIEW
        </p>
      </Reveal>

      {/* Research methods + participants */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        <Reveal delay={0.1}>
          <div style={{ border: '1.5px solid #1e96fc', padding: '24px', background: '#ffffff' }}>
            <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#1e96fc', marginBottom: 14 }}>RESEARCH METHODS</p>
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
          <div style={{ border: '1.5px solid #0a0a0a', padding: '24px', background: '#ffffff', borderLeft: '4px solid #e63946' }}>
            <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#0a0a0a', marginBottom: 14 }}>ABOUT THE PARTICIPANTS</p>
            <div>
              {[
                { label: 'User S', desc: 'Experienced cosplayer, frequent convention-goer, heavy Carousell/Telegram user' },
                { label: 'User C', desc: 'Mid-level cosplayer, buys and sells props, frustrated by lack of cosplay-specific filters' },
                { label: 'User A', desc: 'Casual ACGN fan, uses prop images for identification, relies on reverse image search' },
              ].map(p => (
                <div key={p.label} style={{ borderBottom: '1px solid #E5F4FE', paddingBottom: 8, marginBottom: 8 }}>
                  <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#1e96fc', marginBottom: 2 }}>{p.label}</p>
                  <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#555', lineHeight: 1.5 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

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

      {/* Key Findings */}
      <Reveal delay={0.05}>
        <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#072ac8', marginBottom: 16 }}>KEY FINDINGS</p>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 32 }}>
        {[
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
        ].map((ins, i) => (
          <Reveal key={ins.num} delay={i * 0.12}>
            <div style={{ border: '1.5px solid #0a0a0a', padding: '28px', height: '100%' }}>
              <p style={{ fontFamily: '"Carter One"', fontSize: 32, color: '#1e96fc', marginBottom: 2 }}>{ins.num}</p>
              <div style={{ width: 24, height: 2, background: '#e63946', marginBottom: 12 }} />
              <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#0a0a0a', marginBottom: 12, lineHeight: 1.8 }}>
                {ins.title}
              </p>
              <p style={{ fontFamily: '"Carter One"', fontSize: 20, lineHeight: 1.6, color: '#555' }}>
                {ins.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Key Quotes — Marketplace relevant */}
      <Reveal delay={0.05}>
        <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#072ac8', marginBottom: 16 }}>KEY QUOTES (MARKETPLACE RELEVANT)</p>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 32 }}>
        {[
          {
            quote: '"I need reviews, sizing info, and seller location before I decide to buy. Otherwise, I don\'t trust the listing."',
            user: '— User S, Interview 1',
            implication: 'Trust signals and location fields are non-negotiable for Marketplace listings.'
          },
          {
            quote: '"Running around Singapore to meet a seller is annoying. I want to know where they are before I even message them."',
            user: '— User S, Interview 1',
            implication: 'Seller location must be a mandatory, upfront field — not buried in chat.'
          },
          {
            quote: '"There\'s no platform that knows what cosplay sizing means. S on Carousell could mean anything."',
            user: '— User C, Interview 2',
            implication: 'Cosplay-specific fields (character accuracy, costume size, condition) are needed beyond generic filters.'
          },
        ].map((q, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div style={{ border: '1.5px solid #0a0a0a', padding: '24px', background: '#ffffff', borderLeft: '4px solid #e63946', height: '100%' }}>
              <p style={{ fontFamily: '"Carter One"', fontSize: 20, lineHeight: 1.6, fontStyle: 'italic', color: '#333', marginBottom: 12 }}>
                {q.quote}
              </p>
              <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#999', marginBottom: 12 }}>
                {q.user}
              </p>
              <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#1e96fc', lineHeight: 1.5 }}>
                → {q.implication}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Design Direction */}
      <Reveal delay={0.3}>
        <div style={{ background: '#E5F4FE', border: '1.5px solid #a2d6f9', borderLeft: '4px solid #0a0a0a', padding: '24px 28px', marginBottom: 56 }}>
          <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#0a0a0a', marginBottom: 10 }}>★ DESIGN DIRECTION FOR MARKETPLACE</p>
          <p style={{ fontFamily: '"Carter One"', fontSize: 22, lineHeight: 1.5, color: '#333' }}>
            PropBank Marketplace should not look like a generic e-commerce feed. It must be built around{' '}
            <strong style={{ color: '#1e96fc' }}>trust signals</strong>,{' '}
            <strong style={{ color: '#1e96fc' }}>cosplay-specific filters</strong>, and{' '}
            <strong style={{ color: '#1e96fc' }}>coordination tools</strong>{' '}
            — from first browse to successful handoff.
          </p>
        </div>
      </Reveal>



      {/* ── PART 3: USER PERSONA & JOURNEY MAP ── */}
      <Reveal delay={0.05}>
        <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#ffc600', marginBottom: 20, borderBottom: '2px solid #ffc600', paddingBottom: 8 }}>
          02 · USER PERSONA & USER JOURNEY MAP
        </p>
      </Reveal>

      {/* Context note */}
      <Reveal delay={0.08}>
        <div style={{ background: '#E5F4FE', border: '1.5px solid #a2d6f9', borderLeft: '4px solid #1e96fc', padding: '20px 24px', marginBottom: 32 }}>
          <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#072ac8', lineHeight: 1.6 }}>
            Although my primary service is <strong>Marketplace</strong>, I also created the <strong>Group-Level Persona</strong> (Shin Ip Seng) and the <strong>PropScan Persona</strong> (Aaron Lim) to contribute to cross-service alignment across the team — which is why these personas appear in my portfolio even though PropScan is not my owned service.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#0a0a0a', marginBottom: 24 }}>
          Here are the user personas and their corresponding user journey maps that I created.
        </p>
      </Reveal>

      {/* ── Persona + Journey Map pairs ── */}
      {[
        {
          tag: 'GROUP PERSONA',
          tagColor: '#1e96fc',
          name: 'SHIN IP SENG',
          sub: 'Age 20 · University Student · Active ACGN Participant',
          rows: [
            { label: 'BACKGROUND', value: 'Shin is already immersed in ACGN culture and attends community activities regularly, but he currently relies on disconnected platforms like Instagram, Telegram, Carousell, TikTok, and Reddit for different tasks.' },
            { label: 'GOAL', value: 'Track conventions efficiently, identify characters/props quickly, and move from discovery to sourcing to learning without repeating the same search workflow.' },
            { label: 'PAIN', value: 'Information and actions are fragmented: event updates are easy to miss, prop identification does not naturally lead to guides/listings, and every context switch causes friction.' },
            { label: 'NEEDS', value: 'A centralized cross-service flow linking CoNews, PropScan, Marketplace, Workshop, and community content so he can act immediately after discovery.' },
          ],
          journeyTitle: 'GROUP PERSONA JOURNEY MAP',
          journeyUrl: 'https://www.figma.com/board/wHeMeAwvD9rtvsmIXV4Z1f/hs---user-journey-map?node-id=0-1&t=N6icqzUmCcexXJlS-1',
        },
        {
          tag: 'MARKETPLACE PERSONA',
          tagColor: '#1e96fc',
          name: 'CHLOE TAN',
          sub: 'Age 21 · University Student · Singapore',
          rows: [
            { label: 'BACKGROUND', value: 'Experienced cosplayer who attends about 3–5 conventions yearly; often prepares character-accurate looks with wigs, props, and accessories under budget/time pressure.' },
            { label: 'GOAL', value: 'Quickly source trustworthy cosplay items via buy/rent/borrow/exchange, compare options clearly, and resell unused items after events to recover costs.' },
            { label: 'PAIN', value: 'Relevant listings are spread across many channels, and generic platforms lack cosplay-specific details (accuracy, size, completeness, cleanliness), making trust and coordination difficult.' },
            { label: 'NEEDS', value: 'Strong trust signals (ratings/history), transparent listing fields, cosplay-specific filters, seller location/meetup clarity, and built-in chat/notification/reservation/offer tools.' },
          ],
          journeyTitle: 'MARKETPLACE USER JOURNEY MAP',
          journeyUrl: 'https://www.figma.com/board/wHeMeAwvD9rtvsmIXV4Z1f/hs---user-journey-map?node-id=8-344&t=N6icqzUmCcexXJlS-1',
        },
        {
          tag: 'PROPSCAN PERSONA',
          tagColor: '#a2d6f9',
          name: 'AARON LIM',
          sub: 'Age 22 · University Student · Casual ACGN Fan',
          rows: [
            { label: 'BACKGROUND', value: 'Aaron frequently sees attractive cosplay props and designs online or at events, but often does not know the exact character name, franchise, or searchable terminology.' },
            { label: 'GOAL', value: 'Move from visual curiosity to clear understanding fast: identify what he is seeing and discover whether it can be bought, learned, or recreated.' },
            { label: 'PAIN', value: 'Text-based lookup fails when he only has an image; manual reverse-search across multiple apps is slow, noisy, and often returns broad or irrelevant results.' },
            { label: 'NEEDS', value: 'An image-first assistant that identifies props/characters and immediately surfaces relevant guides, marketplace listings, and related community references in one flow.' },
          ],
          journeyTitle: 'PROPSCAN USER JOURNEY MAP',
          journeyUrl: 'https://www.figma.com/board/wHeMeAwvD9rtvsmIXV4Z1f/hs---user-journey-map?node-id=8-722&t=N6icqzUmCcexXJlS-1',
        },
      ].map((persona) => {
        const isExpanded = Boolean(expandedPersonas[persona.name])
        return (
          <div key={persona.name} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40, alignItems: 'start' }}>
            <Reveal delay={0.1}>
              <div style={{ border: '1.5px solid #0a0a0a', padding: '24px', background: '#ffffff', height: isExpanded ? 'auto' : collapsedPersonaHeight, display: 'flex', flexDirection: 'column' }}>
                {/* Persona header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 44, height: 44, background: '#E5F4FE', border: '1.5px solid #a2d6f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 22 }}>👤</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#1e96fc', marginBottom: 4 }}>{persona.name}</p>
                    <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#999' }}>{persona.sub}</p>
                  </div>
                </div>
                <span style={{
                  fontFamily: '"Carter One"', fontSize: 20,
                  background: persona.tagColor === '#ffc600' ? '#ffc600' : persona.tagColor === '#1e96fc' ? '#E5F4FE' : '#E5F4FE',
                  color: persona.tagColor === '#ffc600' ? '#0a0a0a' : '#072ac8',
                  border: `1px solid ${persona.tagColor}`,
                  padding: '3px 8px',
                  display: 'inline-block',
                  marginBottom: 16,
                }}>{persona.tag}</span>
                <div style={{ overflow: 'hidden', flex: isExpanded ? 'unset' : 1 }}>
                  {persona.rows.map(row => (
                    <div key={row.label} className="info-row">
                      <span className="info-label">
                        {row.label === 'BACKGROUND' ? <>BACK-<br />GROUND</> : row.label}
                      </span>
                      <p style={{ fontFamily: '"Carter One"', fontSize: 20, lineHeight: 1.5, color: '#444' }}>{row.value}</p>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setExpandedPersonas(prev => ({ ...prev, [persona.name]: !prev[persona.name] }))}
                  className="pixel-btn"
                  style={{ marginTop: 12, alignSelf: 'flex-end', fontSize: 20, padding: '6px 10px' }}
                  aria-label={isExpanded ? `Collapse ${persona.name} persona` : `Expand ${persona.name} persona`}
                >
                  {isExpanded ? '▴ COLLAPSE' : '▾ EXPAND'}
                </button>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <FigmaEmbed url={persona.journeyUrl} title={persona.journeyTitle} height={450} />
            </Reveal>
          </div>
        )
      })}

      {/* ── PART 2: HOW MIGHT WE ── */}
      <Reveal delay={0.05}>
        <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#ffc600', marginBottom: 20, borderBottom: '2px solid #ffc600', paddingBottom: 8 }}>
          03 · HOW MIGHT WE
        </p>
      </Reveal>

      {/* HMW table — header */}
      <Reveal delay={0.08}>
        <div style={{ border: '1.5px solid #0a0a0a', marginBottom: 32, overflow: 'hidden' }}>
          {/* Column headers */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: '#ffffff', borderBottom: '1.5px solid #0a0a0a' }}>
            {[
              { label: 'PAIN POINTS', color: '#e63946' },
              { label: 'HOW MIGHT WE…?', color: '#1e96fc' },
              { label: 'DESIGN DECISIONS', color: '#ffc600' },
            ].map((col, i) => (
              <div key={col.label} style={{
                padding: '12px 16px',
                borderRight: i < 2 ? '1px solid #333' : 'none',
              }}>
                <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: col.color, margin: 0 }}>{col.label}</p>
              </div>
            ))}
          </div>

          {/* Rows */}
          {[
            {
              pain: 'Users cannot verify whether a seller or listing is trustworthy before committing to a transaction.',
              hmw: 'HMW surface trust signals that help buyers confidently assess a seller before reaching out?',
              decision: 'Seller profile pages aggregate star rating and review count. Listing cards surface a condensed trust badge so buyers can screen before opening a full listing.',
              highlight: 'star rating, review count',
            },
            {
              pain: 'Coordinating a purchase or exchange is slow and inconvenient — meetup logistics and slow replies cause friction.',
              hmw: 'HMW reduce the coordination overhead between buyer and seller so a deal can be reached faster?',
              decision: 'In-app chat is accessible directly from any listing page. Seller profiles display preferred meetup location. Reservation and "make an offer" interactions are built into the listing flow, reducing the need for negotiation outside the app.',
              highlight: 'In-app chat',
            },
            {
              pain: 'Searching general marketplaces (e.g. Carousell) by fandom, character, or prop type is inefficient — relevant items are hard to surface.',
              hmw: 'HMW make it easy for users to find exactly what they need using cosplay-specific search and filter criteria?',
              decision: 'Search and filter are built around cosplay-relevant dimensions: item type, size, price range, and transaction mode (buy / borrow / swap / rent). PropScan provides an additional visual entry point — uploading a prop image surfaces related listings without any keyword input.',
              highlight: 'Search and filter',
            },
            {
              pain: 'Users with limited budgets struggle to participate in cosplay — buying everything outright is expensive, and idle props go to waste.',
              hmw: 'HMW lower the barrier to cosplay participation while keeping props in circulation within the community?',
              decision: 'The marketplace is structured around three main tasks — Buy & Borrow (buyer-side), Sell & Rent (seller-side), and Swap — so users can choose the mode that fits their budget and intent. This supports PropBank\'s goal of a sustainable shared-resource ecosystem.',
              highlight: 'Buy & Borrow, Sell & Rent, Swap',
            },
          ].map((row, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              borderTop: '1.5px solid #e0e0e0',
              background: i % 2 === 0 ? '#ffffff' : '#fafafa',
            }}>
              <div style={{ padding: '16px', borderRight: '1px solid #e0e0e0' }}>
                <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#333', lineHeight: 1.6, margin: 0 }}>{row.pain}</p>
              </div>
              <div style={{ padding: '16px', borderRight: '1px solid #e0e0e0', background: '#f0f7ff' }}>
                <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#072ac8', lineHeight: 1.6, margin: 0 }}>{row.hmw}</p>
              </div>
              <div style={{ padding: '16px' }}>
                <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#333', lineHeight: 1.6, margin: 0 }}>{row.decision}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

    </Section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 4 — TASKS
───────────────────────────────────────────── */
function Tasks() {
  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>({})
  const collapsedTaskHeight = 450

  const taskPills = [
    { id: 'T1', label: 'Buy' },
    { id: 'T2', label: 'Borrow' },
    { id: 'T3', label: 'Sell' },
    { id: 'T4', label: 'Rent' },
    { id: 'T5', label: 'Swap' },
  ]

  const taskFlows = [
    {
      id: 'T1',
      label: 'BUY',
      tagColor: '#1e96fc',
      role: 'Buyer',
      goal: 'Find a trustworthy cosplay item to purchase and complete a transaction.',
      steps: [
        { step: 'Entry', desc: 'Opens Marketplace from Landing/Home screen.' },
        { step: 'Browse & Filter', desc: 'Searches by character, fandom, item type, size, or condition. Views trust badge and seller rating on listing cards.' },
        { step: 'Item Detail', desc: 'Reviews full item info — photos, condition, seller location, trust score, and reviews.' },
        { step: 'Add to Cart', desc: 'Adds selected item to cart for checkout.' },
        { step: 'Contact Seller', desc: 'Opens PropMes to negotiate or confirm logistics before payment.' },
        { step: 'Checkout & Pay', desc: 'Completes payment within the app.' },
        { step: 'Exit', desc: 'Views order confirmation and returns to Marketplace or My Orders.' },
      ],
      figmaUrl: 'https://www.figma.com/board/Aq90xFScMUubyW4aWzY4wc/hs---task-workflow?node-id=114-535&t=gcnzIxy31Thrdn0h-1',
    },
    {
      id: 'T2',
      label: 'BORROW',
      tagColor: '#072ac8',
      role: 'Borrower',
      goal: 'Source a cosplay item on a short-term loan without committing to a full purchase.',
      steps: [
        { step: 'Entry', desc: 'Opens Marketplace and filters by transaction mode: Borrow.' },
        { step: 'Browse Listings', desc: 'Views borrowable items with borrow duration, condition, and seller rating.' },
        { step: 'Item Detail', desc: 'Reviews borrow terms, duration range, and seller availability.' },
        { step: 'Add Borrow Details', desc: 'Fills in desired borrow period and submits request.' },
        { step: 'Awaits Confirmation', desc: 'Seller reviews and approves or declines the borrow request.' },
        { step: 'Exit', desc: 'Borrow request confirmed — returns to listings or PropMes chat thread.' },
      ],
      figmaUrl: 'https://www.figma.com/board/Aq90xFScMUubyW4aWzY4wc/hs---task-workflow?node-id=114-657&t=gcnzIxy31Thrdn0h-1',
    },
    {
      id: 'T3',
      label: 'SELL',
      tagColor: '#e63946',
      role: 'Seller',
      goal: 'List a cosplay item for sale and complete a transaction with a buyer.',
      steps: [
        { step: 'Entry', desc: 'Taps Sell from Marketplace Home action bubbles.' },
        { step: 'Upload Image', desc: 'Photographs and uploads the item.' },
        { step: 'Fill Listing Details', desc: 'Adds title, size, colour, and condition. Reviews AI-generated tags, edits or accepts.' },
        { step: 'Add Description & Publish', desc: 'Writes a description and publishes the listing live.' },
        { step: 'Manage Listing', desc: 'Views published items, tracks interest, receives buyer messages in PropMes.' },
        { step: 'Arrange Delivery', desc: 'Coordinates delivery or meetup with buyer.' },
        { step: 'Exit', desc: 'Transaction marked complete — views in My Orders.' },
      ],
      figmaUrl: 'https://www.figma.com/board/Aq90xFScMUubyW4aWzY4wc/hs---task-workflow?node-id=114-803&t=gcnzIxy31Thrdn0h-1',
    },
    {
      id: 'T4',
      label: 'RENT',
      tagColor: '#e63946',
      role: 'Lender',
      goal: 'List a cosplay item for rent, reach interested borrowers, and complete a rental transaction.',
      steps: [
        { step: 'Entry', desc: 'Taps Rent from Marketplace Home action bubbles.' },
        { step: 'Upload & Fill Details', desc: 'Uploads image, sets item name, colour, size, and AI-reviewed tags.' },
        { step: 'Set Rental Terms', desc: 'Specifies availability window, rental price, and any conditions.' },
        { step: 'Publish Listing', desc: 'Listing goes live with view count and contact interest visible.' },
        { step: 'Receive Inquiries', desc: 'Responds to rental requests through PropMes.' },
        { step: 'Confirm & Arrange', desc: 'Confirms shipment or meetup details with the renter.' },
        { step: 'Exit', desc: 'Rental transaction completed — tracked in My Orders.' },
      ],
      figmaUrl: 'https://www.figma.com/board/Aq90xFScMUubyW4aWzY4wc/hs---task-workflow?node-id=114-950&t=gcnzIxy31Thrdn0h-1',
    },
    {
      id: 'T5',
      label: 'SWAP',
      tagColor: '#ffc600',
      role: 'Swapper',
      goal: 'Exchange an owned cosplay item for another listed item without monetary payment.',
      steps: [
        { step: 'Entry', desc: 'Opens Marketplace and switches to Swap mode.' },
        { step: 'Browse Swappable Items', desc: 'Views items others have listed as available for swap.' },
        { step: 'Item Detail', desc: 'Reviews item details and confirms swap eligibility.' },
        { step: 'Fill Swap Request', desc: 'Writes a swap proposal and specifies what they are offering in return.' },
        { step: 'Select Own Swap Item', desc: 'Picks one of their own published items as the offer.' },
        { step: 'Send Request', desc: 'Submits swap request — status shows as Pending.' },
        { step: 'Exit', desc: 'Request accepted → coordinate exchange via PropMes; or declined → return to swap list.' },
      ],
      figmaUrl: 'https://www.figma.com/board/Aq90xFScMUubyW4aWzY4wc/hs---task-workflow?node-id=114-1121&t=gcnzIxy31Thrdn0h-1',
    },
  ]

  return (
    <Section id="tasks">
      <Reveal>
        <SectionHeader
          tag="04 · TASKS"
          title={<>TASK WORKFLOW & <span style={{ color: '#0a0a0a' }}>DESIGN DECISIONS</span></>}
          sub="Five end-to-end task flows designed for the Marketplace — each mapped from entry to exit with cosplay-specific interaction patterns."
        />
      </Reveal>

      {/* User tasks designed — pills at the top */}
      <Reveal delay={0.05}>
        <div style={{ background: '#E5F4FE', border: '1.5px solid #a2d6f9', padding: '20px 24px', marginBottom: 40 }}>
          {/* Label row */}
          <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#072ac8', marginBottom: 14 }}>USER TASKS DESIGNED</p>
          {/* Pills + button row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {taskPills.map((t) => (
                <div key={t.id} style={{ background: '#ffffff', border: '1.5px solid #1e96fc', padding: '8px 14px' }}>
                  <span style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#072ac8' }}>
                    {t.id} · {t.label}
                  </span>
                </div>
              ))}
            </div>
            <a href="#hifi-workflow" className="pixel-btn" style={{ fontSize: 20, padding: '8px 14px', whiteSpace: 'nowrap' }}>
              VIEW HI-FI WORKFLOW ↓
            </a>
          </div>
        </div>
      </Reveal>

      {/* Task flows — left text / right Figma embed */}
      {taskFlows.map((task, i) => {
        const isExpanded = Boolean(expandedTasks[task.id])
        return (
          <div key={task.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40, alignItems: 'start' }}>
            <Reveal delay={0.1}>
              <div style={{ border: '1.5px solid #0a0a0a', padding: '24px', background: '#ffffff', height: isExpanded ? 'auto' : collapsedTaskHeight, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexShrink: 0 }}>
                  <span style={{
                    fontFamily: '"Carter One"', fontSize: 20,
                    background: task.tagColor === '#ffc600' ? '#ffc600' : '#E5F4FE',
                    color: task.tagColor === '#ffc600' ? '#0a0a0a' : task.tagColor,
                    border: `1.5px solid ${task.tagColor}`,
                    padding: '3px 10px',
                    display: 'inline-block',
                  }}>{task.id}</span>
                  <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: task.tagColor, margin: 0 }}>{task.label}</p>
                </div>
                {/* Role & Goal */}
                <div style={{ borderBottom: '1px solid #E5F4FE', paddingBottom: 12, marginBottom: 14, flexShrink: 0 }}>
                  <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#999', marginBottom: 2 }}>ROLE</p>
                  <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#0a0a0a' }}>{task.role}</p>
                </div>
                <div style={{ borderBottom: '1px solid #E5F4FE', paddingBottom: 12, marginBottom: 14, flexShrink: 0 }}>
                  <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#999', marginBottom: 2 }}>GOAL</p>
                  <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#333', lineHeight: 1.6 }}>{task.goal}</p>
                </div>
                {/* Steps */}
                <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#999', marginBottom: 10, flexShrink: 0 }}>STEPS</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, overflow: 'hidden', flex: isExpanded ? 'unset' : 1 }}>
                  {task.steps.map((s, si) => (
                    <div key={si} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: '"Carter One"', fontSize: 20, color: task.tagColor, flexShrink: 0, minWidth: 20 }}>{si + 1}.</span>
                      <div>
                        <span style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#0a0a0a' }}>{s.step} — </span>
                        <span style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#555', lineHeight: 1.5 }}>{s.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setExpandedTasks(prev => ({ ...prev, [task.id]: !prev[task.id] }))}
                  className="pixel-btn"
                  style={{ marginTop: 12, alignSelf: 'flex-end', fontSize: 20, padding: '6px 10px', flexShrink: 0 }}
                  aria-label={isExpanded ? `Collapse ${task.label} task` : `Expand ${task.label} task`}
                >
                  {isExpanded ? '▴ COLLAPSE' : '▾ EXPAND'}
                </button>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <FigmaEmbed url={task.figmaUrl} title={`${task.label} TASK WORKFLOW`} height={393} />
            </Reveal>
          </div>
        )
      })}

      {/* Key Design Decisions */}
      <Reveal delay={0.2}>
        <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#1e96fc', marginBottom: 20 }}>KEY DESIGN DECISIONS</p>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 0 }}>
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
              <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#999', marginBottom: 6 }}>DESIGN DECISION</p>
              <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#0a0a0a', marginBottom: 10, lineHeight: 1.7 }}>{d.decision}</p>
              <p style={{ fontFamily: '"Carter One"', fontSize: 20, lineHeight: 1.5, color: '#555' }}>{d.rationale}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 5 — PROTOTYPE
───────────────────────────────────────────── */
function Prototype() {
  return (
    <Section id="prototype" bg="#f7fbff">
      <Reveal>
        <SectionHeader
          tag="05 · PROTOTYPE"
          title={<>FROM SKETCH TO <span style={{ color: '#0a0a0a' }}>PROTOTYPE</span></>}
          sub="The marketplace went through three rounds of iteration: lo-fi paper sketches → mid-fi digital wireframes → hi-fi interactive prototype."
        />
      </Reveal>

      {/* ── 1. LO-FI ── */}
      <Reveal delay={0.1}>
        <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#ffc600', marginBottom: 14, borderBottom: '2px solid #ffc600', paddingBottom: 8 }}>01 · LO-FI PAPER SKETCHES</p>
        <div style={{ border: '1.5px solid #0a0a0a', padding: '20px 24px', marginBottom: 20, width: '100%' }}>
          <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#0a0a0a', marginBottom: 8 }}>Paper Sketches</p>
          <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#555', lineHeight: 1.5 }}>Task flows for Buy, Borrow, Sell, Swap drawn on paper. Focus on information hierarchy and trust signals.</p>
        </div>
        <div style={{ border: '1.5px solid #0a0a0a', padding: '24px', marginBottom: 40 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: 'Buy & Borrow', src: '/lo_buy_borrow.jpg' },
              { label: 'Sell & Rent', src: '/lo_sell_rent.jpg' },
              { label: 'Swap', src: '/lo_swap.jpg' },
            ].map((sketch, i) => (
              <div key={i} style={{ border: '1.5px solid #ddd', padding: '14px' }}>
                <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#888', marginBottom: 10 }}>{sketch.label}</p>
                <Image
                  src={sketch.src}
                  alt={`${sketch.label} lo-fi sketch`}
                  width={1200}
                  height={675}
                  style={{ width: '100%', height: 'auto', objectFit: 'contain', border: '1.5px solid #e0e0e0', display: 'block', background: '#ffffff' }}
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── 2. MID-FI ── */}
      <Reveal delay={0.1}>
        <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#ffc600', marginBottom: 14, borderBottom: '2px solid #ffc600', paddingBottom: 8 }}>02 · MID-FI DIGITAL WIREFRAMES</p>
        <div style={{ border: '1.5px solid #0a0a0a', padding: '20px 24px', marginBottom: 20, width: '100%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#0a0a0a', marginBottom: 8 }}>Digital Wireframes</p>
            <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#555', lineHeight: 1.5 }}>Translated to Figma. Defined card components, filter patterns, seller profile structure.</p>
          </div>
          <a
            href="https://www.figma.com/design/niKTkgo0Os7xrRoC5cmn4p/HS---mid-fi-prototype?node-id=0-1&t=sJf1zGNIth89CXFq-1"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flexShrink: 0,
              fontFamily: '"Carter One"',
              fontSize: 16,
              color: '#0a0a0a',
              background: '#ffc600',
              border: '2px solid #0a0a0a',
              padding: '10px 22px',
              textDecoration: 'none',
              letterSpacing: 1,
              whiteSpace: 'nowrap',
            }}
          >
            OPEN IN FIGMA →
          </a>
        </div>
        <div style={{ background: '#E5F4FE', border: '1.5px solid #a2d6f9', padding: '24px', marginBottom: 40 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { label: 'Landing & Search Page', src: '/mid_landing_search.png' },
              { label: 'Buy', src: '/mid_buy.png' },
              { label: 'Borrow', src: '/mid_borrow.png' },
              { label: 'Sell & Rent', src: '/mid_sell_rent.png' },
              { label: 'Swap', src: '/mid_swap.png' },
              { label: 'Seller Profile, Contacts & Chat', src: '/mid_seller_profile_chat.png' },
            ].map((w, i) => (
              <div key={i} style={{ background: '#ffffff', border: '1.5px solid #ddd', padding: '14px' }}>
                <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#888', marginBottom: 10 }}>{w.label}</p>
                <Image
                  src={w.src}
                  alt={`${w.label} mid-fi wireframe`}
                  width={1200}
                  height={675}
                  style={{ width: '100%', height: 'auto', objectFit: 'contain', border: '1.5px solid #e0e0e0', display: 'block', background: '#ffffff' }}
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── 3. HI-FI ── */}
      <Reveal delay={0.1}>
        <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#ffc600', marginBottom: 20, borderBottom: '2px solid #ffc600', paddingBottom: 8 }}>03 · HI-FI PROTOTYPE</p>
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
          { label: 'Opening Screen', desc: 'Pixel mascot, PropBank branding, Log In / Create Account.' },
          { label: 'Landing Page', desc: 'Interactive star nav — each star leads to a different service.' },
          { label: 'Marketplace Home', desc: 'Buy / Borrow / Sell / Rent / Swap action bubbles.' },
          { label: 'PropMes', desc: 'In-app chat for reservation, offers, meetup coordination.' },
          { label: 'Buy & Borrow', desc: 'Search & filter by cosplay-specific filters, trust badge, seller info.' },
          { label: 'Sell & Rent', desc: 'Publish flow with AI tag suggestions & transparent override.' },
          { label: 'Swap', desc: 'Publish item → send swap request → approval/pending status.' },
        ].map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05}>
            <div style={{ border: '1.5px solid #0a0a0a', borderTop: i < 4 ? '2px solid #1e96fc' : '2px solid #e63946', padding: '16px', background: '#ffffff' }}>
              <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#0a0a0a', marginBottom: 8, lineHeight: 1.7 }}>{s.label}</p>
              <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#666', lineHeight: 1.5 }}>{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div id="hifi-workflow" style={{ border: '1.5px solid #0a0a0a', background: '#ffffff', padding: '20px 24px', marginTop: 24 }}>
          <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#1e96fc', marginBottom: 14 }}>END-TO-END WORKFLOW</p>
          {[
            {
              group: 'Buy',
              steps: [
                { label: 'Marketplace Home', src: '/b_marketplace_home.png', desc: 'Enter marketplace homepage.' },
                { label: 'Search & Browse', src: '/b_search_browse.png', desc: 'Search and filter relevant items.' },
                { label: 'Item Details', src: '/b_item_detail.png', desc: 'Review details, condition, and trust signals.' },
                { label: 'Add to Cart', src: '/b_add_to_cart.png', desc: 'Add selected item for checkout.' },
                { label: 'View Cart', src: '/b_view_cart.png', desc: 'Confirm selected item(s) before payment.' },
                { label: 'Contact Seller', src: '/b_contact_seller.png', desc: 'Open seller contact options.' },
                { label: 'Chat with Seller', src: '/b_chat_seller.png', desc: 'Negotiate and confirm logistics.' },
                { label: 'Payment Success', src: '/b_payment_success.png', desc: 'Complete payment successfully.' },
                { label: 'View Your Order', src: '/b_view_order.png', desc: 'Check final order status.' },
              ],
            },
            {
              group: 'Borrow',
              steps: [
                { label: 'Home Page', src: '/br_home%20page.png', desc: 'Start from marketplace homepage.' },
                { label: 'Search & Browse', src: '/br_search%20%26%20browse%20for%20items.png', desc: 'Search and browse items available to borrow.' },
                { label: 'View Item Details', src: '/br_view%20the%20details%20of%20item%20to%20borrow.png', desc: 'Review borrow terms, duration, and condition.' },
                { label: 'Add Borrow Details', src: '/br_add%20borrow%20details.png', desc: 'Specify borrow period and submit request.' },
                { label: 'Borrow Request Sent', src: '/br_borrow%20request%20sent.png', desc: 'Borrow request sent and awaiting confirmation.' },
              ],
            },
            {
              group: 'Sell',
              steps: [
                { label: 'Home Page', src: '/s_home_page.png', desc: 'Start from marketplace homepage.' },
                { label: 'Publish an Item', src: '/s_publish_item.png', desc: 'Open the publish listing flow.' },
                { label: 'Add Title, Details & Tags', src: '/s_add_title_size_color_tags.png', desc: 'Fill title, size, color, and AI-suggested tags.' },
                { label: 'Add Description & Publish', src: '/s_add_description_publish.png', desc: 'Complete details and submit listing.' },
                { label: 'Publish Successful', src: '/s_publish_successful.png', desc: 'Listing is published successfully.' },
                { label: 'View Published Items', src: '/s_view_published_items.png', desc: 'Check all active published listings.' },
                { label: 'Delivery', src: '/s_delivery.png', desc: 'Arrange delivery for confirmed order.' },
                { label: 'View My Orders', src: '/s_view_orders.png', desc: 'Track order records and statuses.' },
                { label: 'Selling Successful', src: '/s_selling_successful.png', desc: 'Transaction is completed successfully.' },
              ],
            },
            {
              group: 'Rent',
              steps: [
                { label: 'Home Page', src: '/r_home%20page.png', desc: 'Start from marketplace homepage.' },
                { label: 'Upload Item Image', src: '/r_upload%20the%20image%20of%20the%20item%20to%20rent%20out.png', desc: 'Upload a photo of the item to rent out.' },
                { label: 'Add Name, Color, Size & Tags', src: '/r_add%20the%20name%2C%20color%2C%20size%2C%20and%20ai-generated%20tags.png', desc: 'Fill in details and review AI-generated tags.' },
                { label: 'Finalize & Publish', src: '/r_finalize%20the%20uploading%20and%20publish%20the%20item.png', desc: 'Review listing and publish to marketplace.' },
                { label: 'View Published Item', src: '/r_detailed%20info%20of%20the%20item%20you%20published%2C%20with%20viewing%20number%20and%20the%20number%20of%20people%20contacting%20you%20seen.png', desc: 'See view count and contact interest on your listing.' },
                { label: 'Seller Profile', src: '/r_seller%20view%20of%20your%20profile.png', desc: 'View your seller profile and active listings.' },
                { label: 'Your Cart', src: '/r_your%20cart.png', desc: 'Review cart before confirming the rental order.' },
                { label: 'Confirm Shipment', src: '/r_confirming%20shipment%20details.png', desc: 'Confirm shipment details and dispatch item.' },
              ],
            },
            {
              group: 'Swap',
              steps: [
                { label: 'Home Page', src: '/p_home_page.png', desc: 'Start from marketplace homepage.' },
                { label: 'View Swappable Items', src: '/p_view_swappable_items.png', desc: 'Browse all available swap listings.' },
                { label: 'Item Details', src: '/p_item_detail.png', desc: 'Review item details before requesting swap.' },
                { label: 'Fill Swap Request', src: '/p_fill_swap_request.png', desc: 'Fill in swap request details.' },
                { label: 'List My Swap Item', src: '/p_list_swap_item_send_request.png', desc: 'Select your swap item and submit request.' },
                { label: 'Swap Request Sent', src: '/p_swap_request_sent.png', desc: 'Request is sent successfully.' },
              ],
            },
          ].map((flow) => (
            <div key={flow.group} style={{ border: '1.5px dashed #ddd', background: '#f8f8f8', padding: '14px', marginBottom: 14 }}>
              <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#0a0a0a', marginBottom: 10 }}>{flow.group}</p>
              <div style={{ display: 'flex', alignItems: 'stretch', gap: 8, overflowX: 'auto' }}>
                {flow.steps.map((step, i) => (
                  <div key={step.label + i} style={{ display: 'flex', alignItems: 'stretch', gap: 8, flexShrink: 0 }}>
                    <div style={{ width: 200, minHeight: 340, border: '1.5px solid #ddd', background: '#ffffff', padding: 8, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ height: 230, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 6 }}>
                        {'src' in step ? (
                          <Image
                            src={step.src}
                            alt={`${flow.group} - ${step.label}`}
                            width={1200}
                            height={675}
                            style={{ width: '100%', height: '100%', objectFit: 'contain', border: '1.5px solid #e0e0e0', display: 'block', background: '#ffffff' }}
                          />
                        ) : (
                          <div style={{ width: '100%', height: '100%', background: '#f3f3f3', border: '1.5px dashed #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#aaa', textAlign: 'center' }}>[ image ]</p>
                          </div>
                        )}
                      </div>
                      <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#666', textAlign: 'center', lineHeight: 1.4 }}>{step.desc}</p>
                    </div>
                    {i < flow.steps.length - 1 && <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#1e96fc' }}>→</span></div>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
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
          tag="06 · AI FEATURE"
          title={<>AI-ASSISTED TAG <span style={{ color: '#0a0a0a' }}>GENERATION</span></>}
          sub="When a seller uploads a photo of their item, AI automatically generates relevant tags. Critically, the user stays in full control."
        />
      </Reveal>

      {/* Prototype placeholder + steps */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32, alignItems: 'stretch' }}>
        <Reveal delay={0.1}>
          <div style={{ border: '1.5px solid #0a0a0a', padding: '24px', background: '#ffffff', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#1e96fc', marginBottom: 12 }}>PROTOTYPE DEMO</p>
            <div style={{ flex: 1, minHeight: 440, background: '#f8f8f8', border: '1.5px solid #ddd', overflow: 'hidden' }}>
              <iframe
                src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FvAEg2zIbIhDsEMkDlkP04c%2FAI---tag-for-uploading-an-item%3Fnode-id%3D1-228%26p%3Df%26viewport%3D379%252C46%252C0.75%26t%3DBxoIjo7BrEqumcPe-1%26scaling%3Dscale-down%26content-scaling%3Dfixed%26page-id%3D0%253A1"
                title="AI Tag Prototype Demo"
                width="100%"
                height="100%"
                style={{ border: 'none', display: 'block' }}
                allowFullScreen
              />
            </div>
          </div>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { step: '01', label: 'Upload Photo', desc: 'Seller uploads an image of their cosplay item when creating a listing.' },
            { step: '02', label: 'AI Generates Tags', desc: 'Computer vision identifies the item and suggests relevant tags (character, fandom, item type, materials).' },
            { step: '03', label: 'User Decides', desc: 'Clear UI label: "These tags are AI-generated." User can dismiss any tag (×) and add their own manually.' },
          ].map((s, i) => (
            <Reveal key={s.step} delay={i * 0.12}>
              <div style={{ border: '1.5px solid #0a0a0a', padding: '28px', background: '#ffffff' }}>
                <div style={{ marginBottom: 14 }}>
                  <div className="num-badge">{s.step}</div>
                </div>
                <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#0a0a0a', marginBottom: 10, lineHeight: 1.8 }}>
                  {s.label}
                </p>
                <p style={{ fontFamily: '"Carter One"', fontSize: 20, lineHeight: 1.5, color: '#555' }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Design principles */}
      <Reveal delay={0.3}>
        <div style={{ border: '1.5px solid #1e96fc', background: '#E5F4FE', padding: '28px' }}>
          <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#072ac8', marginBottom: 20 }}>WHY THIS DESIGN?</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { principle: 'Transparency', body: 'The UI explicitly labels tags as AI-generated. Users are never deceived about the source of suggestions — they can evaluate and override.' },
              { principle: 'Human Override', body: 'Every AI tag has a visible × button. Sellers who disagree with the AI\'s categorization can remove tags individually and type their own.' },
              { principle: 'Reduces Friction', body: 'Sellers often don\'t know how to categorize niche items. AI suggestions lower the barrier to publishing a good listing without forcing compliance.' },
              { principle: 'Non-Intrusive', body: 'AI operates at one specific moment: item upload. It doesn\'t persistently recommend, rerank, or alter the experience in hidden ways.' },
            ].map((p) => (
              <div key={p.principle} style={{ border: '1.5px solid #a2d6f9', background: '#ffffff', padding: '18px 20px' }}>
                <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#1e96fc', marginBottom: 8 }}>{p.principle}</p>
                <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#555', lineHeight: 1.5 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.35}>
        <div style={{ border: '1.5px solid #0a0a0a', background: '#ffffff', padding: '24px' }}>
          <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#1e96fc', marginBottom: 10 }}>AI IN DESIGN PROCESS (MY DOCUMENTED USAGE)</p>
          <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#555', lineHeight: 1.6 }}>
            I used AI tools during design to draft alternative tag taxonomies and interaction copy variants for upload flow prompts. I accepted suggestions that improved clarity and consistency with user language.
          </p>
          <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#555', lineHeight: 1.6 }}>
            I rejected suggestions that were too automation-heavy (e.g., auto-applying tags without confirmation). Final decision was human-controlled: users must explicitly review, remove, or override AI-generated tags before publishing.
          </p>
        </div>
      </Reveal>
    </Section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 7 — SERVICE INTEGRATION
───────────────────────────────────────────── */
function Integration() {
  return (
    <Section id="integration">
      <Reveal>
        <SectionHeader
          tag="07 · SERVICE INTEGRATION"
          title={<>CONNECTED <span style={{ color: '#0a0a0a' }}>SERVICES</span></>}
          sub="Marketplace doesn't operate in isolation — it integrates with every service in the PropBank ecosystem to create a seamless, cross-service user experience."
        />
      </Reveal>

      {/* ── 1. Marketplace & Workshop ── */}
      <Reveal delay={0.05}>
        <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#ffc600', marginBottom: 20, borderBottom: '2px solid #ffc600', paddingBottom: 8 }}>
          01 · MARKETPLACE × WORKSHOP
        </p>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 48 }}>
        <Reveal delay={0.1}>
          <div style={{ border: '1.5px solid #0a0a0a', padding: '24px', background: '#ffffff' }}>
            <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#1e96fc', marginBottom: 14 }}>COSPLAY PLAN — BUY VS. MAKE</p>
            <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#333', lineHeight: 1.7, marginBottom: 16 }}>
              On any item's detail page in Marketplace, users see a <strong style={{ color: '#1e96fc' }}>＋ button</strong> that lets them add the item to a <strong>Cosplay Plan</strong> — a personal collection for planning a full cosplay look.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Add to Plan', desc: 'Tap ＋ on any listing to add it into an existing or new Cosplay Plan.' },
                { label: 'Compare Options', desc: 'Within the plan, each item shows its Marketplace listing alongside a matching Workshop tutorial — same prop, two routes.' },
                { label: 'Time vs. Cost', desc: 'Users can weigh buying ready-made (Marketplace) against making it themselves with a guide (Workshop), factoring in price, effort, and deadline.' },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', borderBottom: '1px solid #E5F4FE', paddingBottom: 10 }}>
                  <span style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#1e96fc', flexShrink: 0 }}>{i + 1}.</span>
                  <div>
                    <span style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#0a0a0a' }}>{row.label} — </span>
                    <span style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#555', lineHeight: 1.5 }}>{row.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, background: '#E5F4FE', border: '1.5px solid #a2d6f9', padding: '12px 16px' }}>
              <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#072ac8', lineHeight: 1.6 }}>
                → Integration point: Cosplay Plan bridges Marketplace listings and Workshop tutorials in a single decision view.
              </p>
            </div>
          </div>
        </Reveal>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, border: '1.5px solid #0a0a0a', padding: '20px', background: '#ffffff', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#888', flexShrink: 0 }}>SCREENSHOTS</p>
            {[
              { label: 'Add to a Plan', src: '/w_add to a plan.png' },
              { label: 'Pop-up Message', src: '/w_pop up msg.png' },
              { label: 'Choose an Existing Plan', src: '/w_choose an existing plan to add.png' },
              { label: 'Add to an Existing Plan', src: '/w_add to an existing plan.png' },
            ].map((item, i) => (
              <div key={i} style={{ border: '1.5px solid #ddd', background: '#f8f8f8', padding: '12px', flexShrink: 0 }}>
                <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#888', marginBottom: 8 }}>{item.label}</p>
                <Image
                  src={item.src}
                  alt={item.label}
                  width={1200}
                  height={675}
                  style={{ width: '100%', height: 'auto', objectFit: 'contain', border: '1.5px solid #e0e0e0', display: 'block', background: '#ffffff' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 2. Marketplace & PropScan ── */}
      <Reveal delay={0.05}>
        <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#ffc600', marginBottom: 20, borderBottom: '2px solid #ffc600', paddingBottom: 8 }}>
          02 · MARKETPLACE × PROPSCAN
        </p>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 48 }}>
        <Reveal delay={0.1}>
          <div style={{ border: '1.5px solid #0a0a0a', padding: '24px', background: '#ffffff' }}>
            <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#1e96fc', marginBottom: 14 }}>SCAN → FIND → BUY</p>
            <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#333', lineHeight: 1.7, marginBottom: 16 }}>
              After a user uploads an image and PropScan's AI identifies the character and props, the results page automatically surfaces <strong style={{ color: '#1e96fc' }}>matching Marketplace listings</strong> — items currently for sale or rent that match the identified prop.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Upload Image', desc: 'User uploads a photo of a cosplay prop or costume they saw online or at an event.' },
                { label: 'AI Recognition', desc: 'PropScan identifies the character, franchise, and prop details from the image.' },
                { label: 'Marketplace Recommendations', desc: 'Matched Marketplace listings (buy or rent) appear directly in the PropScan results — no separate search needed.' },
                { label: 'One-Tap Jump', desc: 'User taps any item card to land directly on that item\'s Marketplace detail page.' },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', borderBottom: '1px solid #E5F4FE', paddingBottom: 10 }}>
                  <span style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#1e96fc', flexShrink: 0 }}>{i + 1}.</span>
                  <div>
                    <span style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#0a0a0a' }}>{row.label} — </span>
                    <span style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#555', lineHeight: 1.5 }}>{row.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, background: '#E5F4FE', border: '1.5px solid #a2d6f9', padding: '12px 16px' }}>
              <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#072ac8', lineHeight: 1.6 }}>
                → Integration point: PropScan turns visual discovery directly into a purchase opportunity without leaving the app.
              </p>
            </div>
          </div>
        </Reveal>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, border: '1.5px solid #0a0a0a', padding: '20px', background: '#ffffff', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#888', flexShrink: 0 }}>SCREENSHOTS</p>
            {[
              { label: 'Home Page', src: '/p_home_page.png' },
              { label: 'View Swappable Items', src: '/p_view_swappable_items.png' },
              { label: 'Item Details', src: '/p_item_detail.png' },
              { label: 'Fill Swap Request', src: '/p_fill_swap_request.png' },
              { label: 'List My Swap Item', src: '/p_list_swap_item_send_request.png' },
              { label: 'Swap Request Sent', src: '/p_swap_request_sent.png' },
            ].map((item, i) => (
              <div key={i} style={{ border: '1.5px solid #ddd', background: '#f8f8f8', padding: '12px', flexShrink: 0 }}>
                <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#888', marginBottom: 8 }}>{item.label}</p>
                <Image
                  src={item.src}
                  alt={item.label}
                  width={1200}
                  height={675}
                  style={{ width: '100%', height: 'auto', objectFit: 'contain', border: '1.5px solid #e0e0e0', display: 'block', background: '#ffffff' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. Marketplace & Creator Hub ── */}
      <Reveal delay={0.05}>
        <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#ffc600', marginBottom: 20, borderBottom: '2px solid #ffc600', paddingBottom: 8 }}>
          03 · MARKETPLACE × CREATOR HUB
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <div style={{ border: '1.5px solid #0a0a0a', padding: '24px', background: '#ffffff', marginBottom: 48 }}>
          <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#1e96fc', marginBottom: 14 }}>TAG ITEMS IN COMMUNITY POSTS</p>
          <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#333', lineHeight: 1.7, marginBottom: 16 }}>
            Within Creator Hub — PropBank's community space for posts, project showcases, and help requests — users can <strong style={{ color: '#1e96fc' }}>tag Marketplace listings directly inside their posts</strong>. This turns community content into a discovery channel for the Marketplace.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {[
              { title: 'For Creators', desc: 'Share the exact props used in a cosplay post — readers can tap the tag to view or purchase the item directly in Marketplace.' },
              { title: 'For Buyers', desc: 'Discover items organically through community content rather than just browsing search results.' },
              { title: 'For Sellers', desc: 'Community engagement drives organic visibility to Marketplace listings without paid promotion.' },
            ].map((c, i) => (
              <div key={i} style={{ borderTop: '2px solid #1e96fc', paddingTop: 12 }}>
                <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#1e96fc', marginBottom: 6 }}>{c.title}</p>
                <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#555', lineHeight: 1.5 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── 4. Cross-Service Navigation ── */}
      <Reveal delay={0.05}>
        <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#ffc600', marginBottom: 20, borderBottom: '2px solid #ffc600', paddingBottom: 8 }}>
          04 · CROSS-SERVICE NAVIGATION
        </p>
      </Reveal>

      {/* 4.1 Bottom Nav Bar */}
      <Reveal delay={0.1}>
        <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#072ac8', marginBottom: 14 }}>4.1 BOTTOM NAVIGATION BAR</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32, alignItems: 'start' }}>
          <div style={{ border: '1.5px solid #0a0a0a', padding: '24px', background: '#ffffff', boxShadow: '4px 4px 0 #1e96fc' }}>
            <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#1e96fc', marginBottom: 14 }}>PERSISTENT SERVICE ACCESS</p>
            <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#333', lineHeight: 1.7 }}>
              The bottom navigation bar provides persistent access to PropBank&apos;s five main services — CoNews, PropScan, Marketplace, Workshop, and Creator Hub. Users tap an icon to jump between services at any point in their workflow.
            </p>
          </div>
          <div style={{ border: '1.5px solid #ddd', background: '#f8f8f8', padding: '12px' }}>
            <Image
              src="/bottom_navi_bar.png"
              alt="Bottom Navigation Bar"
              width={1200}
              height={675}
              style={{ width: '100%', height: 'auto', objectFit: 'contain', border: '1.5px solid #e0e0e0', display: 'block', background: '#ffffff' }}
            />
          </div>
        </div>
      </Reveal>

      {/* 4.2 Side Bar */}
      <Reveal delay={0.1}>
        <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#072ac8', marginBottom: 14 }}>4.2 SIDE BAR — UTILITY SERVICES</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32, alignItems: 'start' }}>
          <div style={{ border: '1.5px solid #0a0a0a', padding: '24px', background: '#ffffff', boxShadow: '4px 4px 0 #1e96fc' }}>
            <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#1e96fc', marginBottom: 14 }}>CROSS-SERVICE UTILITIES</p>
            <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#333', lineHeight: 1.7 }}>
              Separate from the bottom nav, the side bar houses utility services that span across all five main services: <strong style={{ color: '#0a0a0a' }}>Schedule</strong>, <strong style={{ color: '#0a0a0a' }}>PropMes</strong>, <strong style={{ color: '#0a0a0a' }}>Cosplay Plans</strong>, <strong style={{ color: '#0a0a0a' }}>Inbox</strong>, and <strong style={{ color: '#0a0a0a' }}>Settings</strong>. These are accessible from anywhere in the app.
            </p>
          </div>
          <div style={{
            border: '1.5px solid #ddd',
            background: '#f8f8f8',
            padding: '12px',
            maxHeight: '400px',
            overflow: 'hidden',
            display: 'flex',           // ← 加这个
            alignItems: 'center',      // ← 垂直居中
            justifyContent: 'center'   // ← 水平居中
          }}>
            <Image
              src="/side_bar.png"
              alt="Side Bar"
              width={1200}
              height={675}
              style={{
                width: 'auto',         // ← 改为 auto
                height: '100%',        // ← 高度撑满容器
                maxHeight: '376px',    // ← 400px - 24px padding
                objectFit: 'contain',  // ← 保持比例
                border: '1.5px solid #e0e0e0',
                display: 'block',
                background: '#ffffff'
              }}
            />
          </div>
        </div>
      </Reveal>

      {/* 4.3 PropMes */}
      <Reveal delay={0.1}>
        <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#072ac8', marginBottom: 14 }}>4.3 PROPMES — IN-APP CHAT</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
          <div style={{ border: '1.5px solid #0a0a0a', padding: '24px', background: '#ffffff', boxShadow: '4px 4px 0 #1e96fc' }}>
            <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#1e96fc', marginBottom: 14 }}>THE COORDINATION LAYER</p>
            <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#333', lineHeight: 1.7, marginBottom: 16 }}>
              PropMes is PropBank's built-in chat system — and a service I designed end-to-end. Every transaction, collaboration, or coordination across the app routes through PropMes, keeping users inside the ecosystem rather than jumping to WhatsApp or Telegram.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Marketplace', desc: 'Buyers message sellers, confirm meetup details, make offers, and request reservations — all within PropMes.' },
                { label: 'Workshop', desc: 'Learners can reach out to tutorial uploaders with questions or collaboration requests.' },
                { label: 'Creator Hub', desc: 'Community members DM each other from posts, building connections through content.' },
                { label: 'Cross-Service', desc: 'PropMes threads are unified — one inbox regardless of which service initiated the conversation.' },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', borderBottom: '1px solid #E5F4FE', paddingBottom: 10 }}>
                  <span style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#1e96fc', flexShrink: 0 }}>✦</span>
                  <div>
                    <span style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#0a0a0a' }}>{row.label} — </span>
                    <span style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#555', lineHeight: 1.5 }}>{row.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ border: '1.5px solid #ddd', background: '#f8f8f8', padding: '12px' }}>
            <Image
              src="/propMes.png"
              alt="PropMes In-App Chat"
              width={1200}
              height={675}
              style={{ width: '100%', height: 'auto', objectFit: 'contain', border: '1.5px solid #e0e0e0', display: 'block', background: '#ffffff' }}
            />
          </div>
        </div>
      </Reveal>

      {/* ── 5. Entry & Exit Point Summary ── */}
      <Reveal delay={0.05}>
        <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#ffc600', marginBottom: 20, borderBottom: '2px solid #ffc600', paddingBottom: 8, marginTop: 48 }}>
          05 · ENTRY &amp; EXIT POINT SUMMARY
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#555', lineHeight: 1.6, marginBottom: 28 }}>
          Marketplace is the commercial core of PropBank — but it never operates as a closed silo. Other services actively feed users into it, and it actively hands users off to services that continue their journey beyond the transaction.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 48 }}>

          {/* ENTRY */}
          <div style={{ border: '2px solid #0a0a0a', background: '#ffffff', padding: '24px', boxShadow: '5px 5px 0 #1e96fc' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <span style={{ fontFamily: '"Carter One"', fontSize: 22, background: '#1e96fc', color: '#ffffff', padding: '4px 14px', letterSpacing: 1 }}>ENTRY</span>
              <span style={{ fontFamily: '"Carter One"', fontSize: 18, color: '#888' }}>→ into Marketplace</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                {
                  num: '1',
                  title: 'Workshop',
                  desc: 'When browsing a tutorial or guide in Workshop, users encounter props and materials they may not want to make themselves. A direct link surfaces matching Marketplace listings — same prop, ready-made — so the user can switch from maker mode to buyer mode in one tap.',
                },
                {
                  num: '2',
                  title: 'PropScan',
                  desc: 'After PropScan AI identifies a prop from an uploaded image, matching Marketplace listings (buy or rent) are surfaced automatically in the results page. Visual discovery becomes a purchase funnel with zero additional search effort.',
                },
                {
                  num: '3',
                  title: 'Creator Hub',
                  desc: 'Community posts in Creator Hub can embed tagged Marketplace listings. Readers who discover an item through a post, showcase, or help thread are one tap away from its full Marketplace listing — turning organic content into a discovery channel.',
                },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', borderBottom: '1px solid #E5F4FE', paddingBottom: 14 }}>
                  <span style={{ fontFamily: '"Carter One"', fontSize: 22, color: '#1e96fc', flexShrink: 0, minWidth: 24 }}>{row.num}.</span>
                  <div>
                    <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#0a0a0a', marginBottom: 4 }}>{row.title}</p>
                    <p style={{ fontFamily: '"Carter One"', fontSize: 18, color: '#555', lineHeight: 1.55 }}>{row.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, background: '#E5F4FE', border: '1.5px solid #a2d6f9', padding: '12px 16px' }}>
              <p style={{ fontFamily: '"Carter One"', fontSize: 18, color: '#072ac8', lineHeight: 1.6 }}>
                → All three entry points reduce friction by delivering users to the right listing at the right moment, without requiring them to open Marketplace separately.
              </p>
            </div>
          </div>

          {/* EXIT */}
          <div style={{ border: '2px solid #0a0a0a', background: '#ffffff', padding: '24px', boxShadow: '5px 5px 0 #ffc600' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <span style={{ fontFamily: '"Carter One"', fontSize: 22, background: '#ffc600', color: '#0a0a0a', padding: '4px 14px', letterSpacing: 1 }}>EXIT</span>
              <span style={{ fontFamily: '"Carter One"', fontSize: 18, color: '#888' }}>← out of Marketplace</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                {
                  num: '1',
                  title: 'Workshop — Add to Cosplay Plan',
                  desc: 'On any item detail page, users can tap ＋ to add the listing to a Cosplay Plan. Inside the plan, each item surfaces a paired Workshop tutorial for the same prop — letting users pivot from buying to learning without leaving their plan. The decision to buy, make, or do both stays in one place.',
                },
                {
                  num: '2',
                  title: 'PropMes — Direct Seller Chat',
                  desc: 'Whenever a user wants to ask a question, negotiate a price, or confirm a meetup, they are routed into PropMes — PropBank\u2019s unified in-app chat. This keeps all transaction communication inside the ecosystem, avoiding the friction of external messaging apps and keeping conversation history tied to the listing context.',
                },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', borderBottom: '1px solid #fff8e1', paddingBottom: 14 }}>
                  <span style={{ fontFamily: '"Carter One"', fontSize: 22, color: '#ffc600', flexShrink: 0, minWidth: 24 }}>{row.num}.</span>
                  <div>
                    <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#0a0a0a', marginBottom: 4 }}>{row.title}</p>
                    <p style={{ fontFamily: '"Carter One"', fontSize: 18, color: '#555', lineHeight: 1.55 }}>{row.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, background: '#fff8e1', border: '1.5px solid #ffc600', padding: '12px 16px' }}>
              <p style={{ fontFamily: '"Carter One"', fontSize: 18, color: '#7a5c00', lineHeight: 1.6 }}>
                → Exit points are designed to deepen engagement, not end it — every handoff continues the user's goal in the most appropriate service.
              </p>
            </div>
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
          title={<>TESTING WITH <span style={{ color: '#0a0a0a' }}>REAL USERS</span></>}
          sub="Maze-based task testing and short follow-up interviews were used to evaluate flow clarity, interaction responsiveness, and onboarding guidance in the Marketplace prototype."
        />
        {/* <a href="https://app.maze.co/report/CS3240-MarketPlace-Usability-Test/pciqs7mnwp0t6j" target="_blank" rel="noopener noreferrer"
          className="pixel-btn" style={{ display: 'inline-block', marginBottom: 36, background: '#1e96fc', color: '#ffffff', borderColor: '#1e96fc' }}>
          VIEW MAZE REPORT ↗
        </a> */}
      </Reveal>

      {/* Maze embed */}
      <Reveal delay={0.05}>
        <div style={{ marginBottom: 32 }}>
          <div className="figma-wrap">
            <div className="figma-bar">
              <span style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#072ac8' }}>
                ◈ MAZE USABILITY TEST RESULTS
              </span>
              <a href="https://app.maze.co/report/CS3240-MarketPlace-Usability-Test/pciqs7mnwp0t6j" target="_blank" rel="noopener noreferrer"
                className="pixel-btn" style={{ fontSize: 20, padding: '4px 10px', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                OPEN IN MAZE ↗
              </a>
            </div>
            <iframe
              src="https://app.maze.co/report/CS3240-MarketPlace-Usability-Test/pciqs7mnwp0t6j/intro/embed"
              width="100%"
              height={600}
              style={{ border: 'none', display: 'block' }}
              allowFullScreen
              title="Maze Usability Test Results"
            />
          </div>
        </div>
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { metric: '01', label: 'Visual Clarity Is Good Overall', note: 'Participants described the interface as clean and easy to read at first glance.' },
          { metric: '02', label: 'Swap Task Guidance Needs Improvement', note: 'Maze flow feedback showed that swap task created more hesitation and navigation uncertainty.' },
          { metric: '03', label: 'Interaction Feedback Must Be Stronger', note: 'Users reported uncertainty when taps seemed unresponsive or when multiple hints flashed at once.' },
        ].map((m, i) => (
          <Reveal key={m.label} delay={i * 0.1}>
            <div style={{ border: '1.5px solid #0a0a0a', background: '#ffffff', padding: '24px', textAlign: 'center', height: '100%' }}>
              <p style={{ fontFamily: '"Carter One"', fontSize: 32, color: '#1e96fc', marginBottom: 8 }}>{m.metric}</p>
              <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#444', marginBottom: 6 }}>{m.label}</p>
              <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#999' }}>{m.note}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15}>
        <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#777', marginBottom: 20 }}>
          Testing scope note: insights are directional (Maze task testing + short interviews), used to guide iteration priorities rather than claim statistical significance.
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <div style={{ border: '1.5px solid #0a0a0a', padding: '28px', background: '#ffffff' }}>
          <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#1e96fc', marginBottom: 20 }}>KEY FINDINGS & ITERATIONS</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              {
                finding: 'Finding 1 · Information Density',
                action: 'Interview feedback (CJY): "The UI is clean and straightforward, but some pages feel text-heavy and lack clear color and font-size separation between sections."',
                iteration: 'Provide clearer section grouping with stronger typographic hierarchy and color separation between functional blocks.',
                accent: '#e63946'
              },
              {
                finding: 'Finding 2 · Guidance Ambiguity in Later Tasks',
                action: 'Maze & interview feedback (CJY): the last two tasks were harder because multiple blue-highlight prompts appeared simultaneously, making the next action unclear.',
                iteration: 'Provide one primary next-action cue with clearer visual priority over secondary clickable elements.',
                accent: '#e63946'
              },
              {
                finding: 'Finding 3 · Click Responsiveness & Affordance',
                action: 'Interview feedback (WJT): some buttons felt unresponsive and required repeated taps; on the product list page, users were unsure which items were actually clickable.',
                iteration: 'Provide stronger tap feedback (press/loading), clearer tappable boundaries, and explicit instructional cues for guided actions.',
                accent: '#e63946'
              },
            ].map((f, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1.5px solid #eee' }}>
                <div style={{ padding: '16px 20px', borderRight: '1px solid #eee' }}>
                  <span style={{ fontFamily: '"Carter One"', fontSize: 20, background: f.accent, color: '#ffffff', padding: '3px 8px', display: 'inline-block', marginBottom: 8 }}>{f.finding}</span>
                  <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#444', marginTop: 4 }}>{f.action}</p>
                </div>
                <div style={{ padding: '16px 20px' }}>
                  <span style={{ fontFamily: '"Carter One"', fontSize: 20, background: '#E5F4FE', color: '#072ac8', border: '1px solid #a2d6f9', padding: '3px 8px', display: 'inline-block', marginBottom: 8 }}>ITERATION (TO BE IMPLEMENTED)</span>
                  <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#444', marginTop: 4 }}>{f.iteration}</p>
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
          title={<>WHAT I <span style={{ color: '#0a0a0a' }}>LEARNED</span></>}
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
            title: 'Conflict Resolved',
            accent: '#ffc600',
            body: 'A repeated team-level conflict was scope vs clarity: how much listing detail should appear immediately versus progressively. We resolved this by keeping trust-critical information (reviews, condition, location) visible upfront while moving secondary details into structured sections to reduce cognitive load.'
          },
          {
            title: 'Process Reflection',
            accent: '#e63946',
            body: 'Starting from user interviews rather than assumptions changed the design significantly. The seller location field and trust badge system would not have existed without the interview data.'
          },
        ].map((r) => (
          <Reveal key={r.title} delay={0.1}>
            <div style={{ border: '1.5px solid #0a0a0a', borderTop: `3px solid ${r.accent}`, padding: '24px', background: '#ffffff', height: '100%' }}>
              <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#0a0a0a', marginBottom: 12, lineHeight: 1.8 }}>{r.title}</p>
              <p style={{ fontFamily: '"Carter One"', fontSize: 20, lineHeight: 1.6, color: '#555' }}>{r.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Final card */}
      <Reveal delay={0.4}>
        <div style={{ border: '1.5px solid #0a0a0a', background: '#ffffff', padding: '40px', textAlign: 'center' }}>
          <div className="mascot-float" style={{ marginBottom: 20 }}>
            <Image src="/mascot_new.png" alt="mascot" width={72} height={72}
              style={{ imageRendering: 'pixelated', margin: '0 auto' }} />
          </div>
          <div style={{ width: 32, height: 2, background: '#e63946', margin: '0 auto 16px' }} />
          <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#0a0a0a', marginBottom: 6 }}>CHEN HONGSHAN</p>
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
   GLOBAL FLOATING STARS
───────────────────────────────────────────── */
const GLOBAL_STARS = [
  { top: '5%', left: '4%', size: 20, delay: '0s', dur: '3.4s' },
  { top: '12%', left: '93%', size: 22, delay: '0.7s', dur: '2.9s' },
  { top: '28%', left: '2%', size: 20, delay: '1.3s', dur: '4.1s' },
  { top: '38%', left: '96%', size: 20, delay: '0.4s', dur: '3.6s' },
  { top: '52%', left: '5%', size: 26, delay: '1.9s', dur: '2.7s' },
  { top: '60%', left: '91%', size: 20, delay: '0.2s', dur: '3.9s' },
  { top: '74%', left: '3%', size: 20, delay: '1.1s', dur: '3.2s' },
  { top: '82%', left: '94%', size: 28, delay: '0.6s', dur: '2.5s' },
  { top: '90%', left: '8%', size: 20, delay: '1.6s', dur: '4.3s' },
  { top: '95%', left: '88%', size: 20, delay: '0.9s', dur: '3.7s' },
]

function GlobalStars() {
  return (
    <>
      {GLOBAL_STARS.map((s, i) => (
        <span key={i} style={{
          position: 'fixed',
          top: s.top,
          left: s.left,
          fontSize: s.size,
          color: '#ffc600',
          pointerEvents: 'none',
          animation: `heroFloat ${s.dur} ${s.delay} ease-in-out infinite`,
          zIndex: 0,
          userSelect: 'none',
        }}>★</span>
      ))}
    </>
  )
}

/* ─────────────────────────────────────────────
   ROOT PAGE
───────────────────────────────────────────── */
export default function Page() {
  return (
    <>
      <PixelCursor />
      <GlobalStars />
      <Nav />
      <main>
        <Hero />
        <div className="section-divider" />
        <Origin />
        <div className="section-divider" />
        <Role />
        <div className="section-divider" />
        <Research />
        <div className="section-divider" />
        <Tasks />
        <div className="section-divider" />
        <Prototype />
        <div className="section-divider" />
        <AIFeature />
        <div className="section-divider" />
        <Integration />
        <div className="section-divider" />
        <Testing />
        <div className="section-divider" />
        <Reflect />
      </main>

      <footer style={{ borderTop: '1px solid rgba(10,10,10,0.08)', padding: '24px', textAlign: 'center', background: '#ffffff' }}>
        <p style={{ fontFamily: '"Carter One"', fontSize: 20, color: '#bbb' }}>
          © 2025 CHEN HONGSHAN · CS3240 IDP · PROPBANK
        </p>
      </footer>
    </>
  )
}