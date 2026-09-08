import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const revealTransition = { duration: 0.52, ease: [0.22, 1, 0.36, 1] }

export function WordReveal({ children, className = '', delay = 0 }) {
  const prefersReducedMotion = useReducedMotion()
  const words = String(children).split(' ')
  return <motion.span className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={{ hidden: {}, show: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1, delayChildren: delay } } }}>{words.map((word, index) => <motion.span className="reveal-word" key={`${word}-${index}`} variants={{ hidden: prefersReducedMotion ? {} : { opacity: 0, y: 24, filter: 'blur(8px)', scale: 0.96 }, show: { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, transition: { ...revealTransition, duration: 0.75 } } }}>{word}{index < words.length - 1 ? ' ' : ''}</motion.span>)}</motion.span>
}

export function TextScramble({ phrases = ['INITIALIZING', 'ANALYZING', 'DATA READY'], className = '' }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState(phrases[0])
  useEffect(() => {
    const timer = window.setInterval(() => {
      const next = phrases[(index + 1) % phrases.length]
      let step = 0
      const scramble = window.setInterval(() => {
        step += 1
        setText(next.split('').map((character, position) => position < step ? character : '0123456789ABCDEF'[Math.floor(Math.random() * 16)]).join(''))
        if (step >= next.length) window.clearInterval(scramble)
      }, 32)
      setIndex((current) => (current + 1) % phrases.length)
    }, 2600)
    return () => window.clearInterval(timer)
  }, [index, phrases])
  return <span className={className}>[ {text} ]</span>
}

export function CountUp({ value, suffix = '', className = '' }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    const target = Number(value)
    const start = performance.now()
    let frame = 0
    const tick = (now) => { const progress = Math.min((now - start) / 750, 1); setDisplay(Math.round(target * (1 - Math.pow(1 - progress, 3)))); if (progress < 1) frame = requestAnimationFrame(tick) }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value])
  return <span className={className}>{display}{suffix}</span>
}

export function DataNetwork() {
  const nodes = [{ label: 'AI', x: 18, y: 32 }, { label: 'Python', x: 76, y: 22 }, { label: 'SQL', x: 82, y: 68 }, { label: 'ML', x: 48, y: 80 }, { label: 'Analytics', x: 14, y: 70 }]
  return <div className="data-network" aria-hidden="true"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M18 32 L76 22 L82 68 L48 80 L14 70 Z M18 32 L82 68 M76 22 L48 80 M14 70 L76 22" /></svg>{nodes.map((node) => <span className="network-node" style={{ left: `${node.x}%`, top: `${node.y}%` }} key={node.label}>{node.label}</span>)}</div>
}

export function AnalyticsDashboard() {
  return <div className="analytics-dashboard glass" aria-label="Portfolio metrics visualization"><div className="dashboard-label"><span>Portfolio metrics</span><TextScramble /></div><div className="dashboard-grid"><div><strong><CountUp value={18} suffix="+" /></strong><small>projects & builds</small></div><div><strong><CountUp value={12} /></strong><small>tools explored</small></div><div><strong><CountUp value={8} suffix=".5" /></strong><small>current CGPA</small></div></div></div>
}

export function TerminalCard() {
  return <div className="terminal-card glass"><span className="terminal-line"><b>&gt;</b> whoami</span><strong>Ritam Bera</strong><span className="terminal-line"><b>&gt;</b> role</span><strong>Aspiring Data Analyst</strong><span className="terminal-line"><b>&gt;</b> status</span><strong className="terminal-status">OPEN TO OPPORTUNITIES</strong><i className="terminal-cursor" /></div>
}

export function SignaturePipeline() {
  const prefersReducedMotion = useReducedMotion()
  const stages = ['PROBLEM', 'DATA', 'ANALYSIS', 'MODEL', 'INSIGHT']
  return <motion.div className="signature-pipeline" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={{ hidden: {}, show: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.16 } } }}><div className="pipeline-kicker">How I build <span>→</span></div><div className="pipeline-track" aria-label="Problem to insight workflow"><motion.i className="pipeline-line" variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: prefersReducedMotion ? 0.1 : 1.1, ease: [0.22, 1, 0.36, 1] } } }} />{stages.map((stage, index) => <motion.div className="pipeline-stage" key={stage} variants={{ hidden: prefersReducedMotion ? {} : { opacity: 0, y: 20, scale: .94, filter: 'blur(5px)' }, show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: .55, ease: [0.22, 1, 0.36, 1] } } }}><span className="pipeline-node"><b>{String(index + 1).padStart(2, '0')}</b></span><strong>{stage}</strong>{index < stages.length - 1 && <span className="pipeline-arrow">→</span>}</motion.div>)}</div><div className="pipeline-caption"><span>Raw question</span><span>Structured data</span><span>Useful decision</span></div></motion.div>
}

export function Reveal({ children, className = '', delay = 0 }) {
  const prefersReducedMotion = useReducedMotion()
  return <motion.div className={className} initial={prefersReducedMotion ? false : { opacity: 0, y: 45, filter: 'blur(6px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, amount: 0.15 }} transition={prefersReducedMotion ? { duration: 0.12 } : { ...revealTransition, delay }}>{children}</motion.div>
}

export function TiltCard({ children, className = '' }) {
  const prefersReducedMotion = useReducedMotion()
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const handlePointerMove = (event) => {
    if (prefersReducedMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    setRotation({ x: (((event.clientY - bounds.top) / bounds.height) - 0.5) * -6, y: (((event.clientX - bounds.left) / bounds.width) - 0.5) * 6 })
  }
  return <motion.div className={className} onPointerMove={handlePointerMove} onPointerLeave={() => setRotation({ x: 0, y: 0 })} animate={{ rotateX: rotation.x, rotateY: rotation.y }} transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.7 }} style={{ transformStyle: 'preserve-3d' }}>{children}</motion.div>
}

export function AnimatedButton({ children, className = '', ...props }) {
  return <motion.a className={className} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }} {...props}>{children}</motion.a>
}

export function PageLoader() {
  const [visible, setVisible] = useState(true)
  const [exiting, setExiting] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  useEffect(() => {
    const exitTimer = window.setTimeout(() => setExiting(true), prefersReducedMotion ? 150 : 900)
    const removeTimer = window.setTimeout(() => setVisible(false), prefersReducedMotion ? 180 : 1300)
    return () => { window.clearTimeout(exitTimer); window.clearTimeout(removeTimer) }
  }, [prefersReducedMotion])
  if (!visible) return null
  return <motion.div className={`page-loader ${exiting ? 'is-exiting' : ''}`} role="status" aria-live="polite" initial={{ opacity: 1 }} animate={{ opacity: exiting ? 0 : 1 }} transition={{ duration: 0.4 }}><motion.div className="loader-mark" animate={prefersReducedMotion ? {} : { rotate: [0, 360], scale: [1, 1.08, 1] }} transition={{ rotate: { duration: 2, repeat: Infinity, ease: 'linear' }, scale: { duration: 1.2, repeat: Infinity } }}>R</motion.div><strong>Ritam Bera</strong><span>Loading portfolio...</span><div className="loader-track" aria-hidden="true"><motion.span initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 1, ease: 'easeInOut' }} /></div></motion.div>
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    let frame = 0
    const update = () => { const height = document.documentElement.scrollHeight - window.innerHeight; setProgress(height > 0 ? (window.scrollY / height) * 100 : 0); frame = 0 }
    const handle = () => { if (!frame) frame = window.requestAnimationFrame(update) }
    update(); window.addEventListener('scroll', handle, { passive: true }); window.addEventListener('resize', handle)
    return () => { window.removeEventListener('scroll', handle); window.removeEventListener('resize', handle); if (frame) window.cancelAnimationFrame(frame) }
  }, [])
  return <motion.div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }} aria-hidden="true" />
}

export function CursorGlow() {
  const prefersReducedMotion = useReducedMotion()
  const [position, setPosition] = useState({ x: -200, y: -200 })
  const nextPosition = useRef({ x: -200, y: -200 })
  useEffect(() => {
    if (prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches) return undefined
    let frame = 0
    const handle = (event) => { nextPosition.current = { x: event.clientX, y: event.clientY }; if (!frame) frame = window.requestAnimationFrame(() => { setPosition(nextPosition.current); frame = 0 }) }
    window.addEventListener('pointermove', handle, { passive: true })
    return () => { window.removeEventListener('pointermove', handle); if (frame) window.cancelAnimationFrame(frame) }
  }, [prefersReducedMotion])
  if (prefersReducedMotion) return null
  return <motion.div className="cursor-glow" animate={{ left: position.x, top: position.y }} transition={{ type: 'spring', stiffness: 120, damping: 25, mass: 0.5 }} aria-hidden="true" />
}
