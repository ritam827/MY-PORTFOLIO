import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, GraduationCap, Mail, MapPin, Menu, Phone, Send, Sparkles, Trophy, X } from 'lucide-react'
import { certifications, education, experience, hackathons, profile, projects, skillGroups, techStack } from './data/portfolioData'
import ThreeBackground from './components/ThreeBackground'
import { AnalyticsDashboard, CursorGlow, DataNetwork, PageLoader, ScrollProgress, SignaturePipeline, TerminalCard, WordReveal } from './components/AnimationEffects'
import profileImage from './assets/profile.jpg'
import resumeFile from './assets/resume/RITAM_BERA_BWU_BTA_23_247 (2).pdf'
import './App.css'

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.65 } } }

function SectionHeading({ eyebrow, title, intro }) {
  return <motion.div className="section-heading" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}><span className="eyebrow">{eyebrow}</span>{eyebrow.startsWith('04 /') && <SignaturePipeline />}<h2><WordReveal>{title}</WordReveal></h2>{intro && <p>{intro}</p>}</motion.div>
}

function GithubMark({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.1c-3.2.7-3.88-1.36-3.88-1.36-.53-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.07.78 2.16v3.2c0 .3.21.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" /></svg>
}

function LinkedinMark({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M4.98 3.5A2.49 2.49 0 1 1 5 8.48a2.49 2.49 0 0 1-.02-4.98ZM3 9.75h4v11.75H3V9.75Zm6.5 0h3.83v1.6h.05c.53-1 1.84-2.05 3.79-2.05 4.06 0 4.83 2.67 4.83 6.14v6.06h-4v-5.37c0-1.28-.02-2.93-1.79-2.93-1.8 0-2.08 1.4-2.08 2.84v5.46h-4V9.75Z" /></svg>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [openProject, setOpenProject] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [visibleSchool, setVisibleSchool] = useState(null)

  useEffect(() => {
    const sections = document.querySelectorAll('main section[id]')
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: '-35% 0px -55% 0px' })
    const onScroll = () => setScrolled(window.scrollY > 24)
    sections.forEach((section) => observer.observe(section))
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [])

  const links = ['about', 'skills', 'projects', 'experience', 'certifications', 'contact']
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }
  const handleContact = (event) => { event.preventDefault(); const data = new FormData(event.currentTarget); window.location.href = `mailto:${profile.email}?subject=Portfolio contact from ${data.get('name')}&body=${data.get('message')}%0A%0AReply to: ${data.get('email')}` }

  return <div className="site-shell">
    <ThreeBackground />
    <PageLoader />
    <ScrollProgress />
    <CursorGlow />
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <header className={`nav-wrap ${scrolled ? 'is-scrolled' : ''}`}><nav className="nav container" aria-label="Primary navigation"><button className="brand" onClick={() => scrollTo('home')} aria-label="Go to home"><span>RB</span><strong>RITAM BERA</strong></button><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button><div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>{links.map((link) => <button key={link} className={active === link ? 'active' : ''} onClick={() => scrollTo(link)}>{link}</button>)}</div></nav></header>
    <main><DataNetwork /><div className="enhancement-dock"><AnalyticsDashboard /><TerminalCard /></div>
      <section id="home" className="hero container"><div className="hero-copy"><span className="hero-index">01 / DATA INTELLIGENCE</span><div className="status"><span /> Open to opportunities</div><p className="kicker">Analytics · AI · Machine Learning</p><h1 className="hero-title"><span>Transforming Data</span><span>Into <em>Intelligence.</em></span></h1><p className="hero-intro">Building data-driven solutions using analytics, machine learning, Python, SQL and business intelligence.</p><div className="hero-actions"><button className="button button-primary" onClick={() => scrollTo('projects')}>Explore projects <ArrowUpRight size={17} /></button><a className="button button-quiet" href={resumeFile} download="Ritam_Bera_Resume.pdf">View resume <ArrowUpRight size={17} /></a></div><div className="hero-signature"><span>Ritam Bera</span><i /><span>Data / AI Portfolio</span></div></div><motion.div className="hero-card glass photo-card" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.55, duration: 1, ease: [0.22, 1, 0.36, 1] }}><img className="hero-profile-photo" src={profileImage} alt="Ritam Bera" /></motion.div></section>

      <section id="about" className="section container about-section"><SectionHeading eyebrow="01 / Career objective" title="Curious about the signal inside the noise." /><div className="about-grid"><motion.div className="objective-card glass" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}><Sparkles className="card-icon" size={22} /><p>{profile.objective}</p><div className="card-foot"><span>Focused on</span><b>Analytics · AI · Decisions</b></div></motion.div><div className="about-aside"><div className="data-mark"><span>DATA</span><i /><span>INSIGHT</span><i /><span>ACTION</span></div><p>Building a foundation where technical curiosity becomes useful, explainable work.</p></div></div></section>

      <section id="education" className="section container"><SectionHeading eyebrow="02 / Education" title="Learning the craft, one layer at a time." /><div className="timeline">{education.map((item, index) => <motion.article className="timeline-item" key={item.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: index * 0.1 }}><div className="timeline-dot">0{index + 1}</div><div className="timeline-content"><span className="period">{item.period}</span><h3>{item.title}</h3>{item.detail && <strong>{item.detail}</strong>}<button className="school-toggle" onClick={() => setVisibleSchool(visibleSchool === index ? null : index)} aria-expanded={visibleSchool === index}>{visibleSchool === index ? 'Hide school' : 'View school'} <ArrowUpRight size={14} /></button>{visibleSchool === index && <motion.p className="school-detail" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 'auto' }}>{item.school}</motion.p>}</div></motion.article>)}</div></section>

      <section id="skills" className="section container"><SectionHeading eyebrow="03 / Toolkit" title="A practical analytics toolkit." intro="Tools I use to explore, structure, and communicate ideas with data." /><div className="skill-grid">{skillGroups.map((group, index) => <motion.article className="skill-card glass" key={group.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: index * 0.06 }}><div className="skill-card-head"><span>0{index + 1}</span><span className="skill-level">{group.level}</span></div><h3>{group.title}</h3><div className="skill-tags">{group.skills.map((skill) => <span key={skill}><Check size={12} />{skill}</span>)}</div></motion.article>)}</div></section>

      <section id="projects" className="section container"><SectionHeading eyebrow="04 / Selected work" title="Projects with a point of view." intro="A mix of implemented work and carefully scoped ideas for what comes next." /><div className="project-list">{projects.map((project, index) => <motion.article className={`project-card ${project.planned ? 'planned' : ''}`} key={project.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}><div className="project-top"><span className="project-number">{project.number}</span><span className="project-type">{project.type}</span></div><div className="project-main"><div><h3>{project.title}</h3><p>{project.description}</p></div><button className="expand-button" onClick={() => setOpenProject(openProject === index ? null : index)} aria-expanded={openProject === index}>{openProject === index ? <X size={18} /> : <ArrowUpRight size={18} />}</button></div><AnimatePresence>{openProject === index && <motion.div className="project-details" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}><div><span>Problem</span><p>{project.problem}</p></div><div><span>Solution</span><p>{project.solution}</p></div><div><span>Key features</span><ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div></motion.div>}</AnimatePresence><div className="project-bottom"><div className="tech-tags">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>{project.live || project.github ? <div className="project-links">{project.live && <a href={project.live} target="_blank" rel="noreferrer" className="text-link">Live demo <ArrowUpRight size={14} /></a>}{project.github && <a href={project.github} target="_blank" rel="noreferrer" className="text-link">GitHub <ArrowUpRight size={14} /></a>}</div> : <span className="text-link muted">Link pending</span>}</div></motion.article>)}</div></section>

      <section id="experience" className="section container split-section"><div><SectionHeading eyebrow="05 / Experience" title="Experience that keeps me close to the problem." /></div><div className="experience-list">{experience.map((item, index) => <motion.article key={item.title} className="experience-item" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}><div className="experience-index">0{index + 1}</div><div><span className="period">{item.period}</span><h3>{item.title}</h3><b>{item.org}</b><p>{item.description}</p></div></motion.article>)}</div></section>

      <section id="hackathons" className="section container"><SectionHeading eyebrow="06 / Hackathons & workshops" title="Learning by building in public." /><div className="achievement-grid">{hackathons.map((item) => <motion.article className="achievement-card glass" key={item.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}><div className="achievement-top"><Trophy size={19} /><span>{item.number}</span></div><h3>{item.title}</h3><p>{item.description}</p><span className="badge">Team build</span></motion.article>)}</div></section>

      <section id="certifications" className="section container"><SectionHeading eyebrow="07 / Certifications" title="Proof of consistent curiosity." /><div className="cert-grid">{certifications.map(([title, org], index) => <motion.article className="cert-card glass" key={title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}><div className="cert-card-top"><span className="cert-badge">cert</span><span className="cert-index">0{index + 1}</span></div><div className="cert-icon"><GraduationCap size={19} /></div><h3>{title}</h3><p>{org}</p><div className="cert-meta"><span>Verified</span><button className="text-link muted" disabled>View <ArrowUpRight size={14} /></button></div></motion.article>)}</div><p className="note">Certificate files can be linked automatically from <code>public/certificates/</code> when added.</p></section>

      <section className="data-journey"><div className="container"><SectionHeading eyebrow="08 / My process" title="How I think with data." /><div className="journey-flow">{['Data', 'Clean', 'Analyze', 'Insight', 'Decision'].map((step, index) => <motion.div className="journey-step" key={step} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: index * 0.1 }}><span>0{index + 1}</span><strong>{step}</strong>{index < 4 && <i />}</motion.div>)}</div><p className="journey-caption">Raw business data <span>→</span> data cleaning <span>→</span> exploratory analysis <span>→</span> visualization <span>→</span> AI/ML insights</p></div></section>

      <section className="stack-strip"><div className="container"><div className="stack-label">Working across the stack <span>↗</span></div><div className="marquee"><div className="marquee-track">{[...techStack, ...techStack].map((tech, index) => <span key={`${tech.name}-${index}`} className="marquee-item"><em className="stack-icon" data-tone={tech.tone}>{tech.icon}</em>{tech.name}</span>)}</div></div></div></section>

      <section id="contact" className="section container contact-section"><div className="contact-copy"><SectionHeading eyebrow="09 / Contact" title="Let's build something intelligent." intro="Interested in data analytics, AI, or building technology-driven solutions? Let's connect." /><div className="contact-details"><a href={`mailto:${profile.email}`}><Mail size={18} />{profile.email}</a><a href={`tel:${profile.phone.replaceAll(' ', '')}`}><Phone size={18} />{profile.phone}</a><span><MapPin size={18} />{profile.location}</span></div></div><motion.form className="contact-form glass" onSubmit={handleContact} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><label>Name<input name="name" required placeholder="Your name" /></label><label>Email<input type="email" name="email" required placeholder="you@company.com" /></label><label>Message<textarea name="message" required rows="4" placeholder="Tell me what you're working on..." /></label><button className="button button-primary" type="submit">Send message <Send size={16} /></button><small>This opens your email client with a prepared message.</small></motion.form></section>
    </main>
    <footer className="footer"><div className="container footer-inner"><div><button className="brand" onClick={() => scrollTo('home')}><span>RB</span><strong>RITAM BERA</strong></button><p>Aspiring Data Analyst · AI & ML Student</p></div><div className="footer-links"><a href={profile.github} target="_blank" rel="noreferrer"><GithubMark size={17} /> GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><LinkedinMark size={17} /> LinkedIn</a><a href={`mailto:${profile.email}`}><Mail size={17} /> Email</a></div></div><div className="container footer-bottom"><span>© 2026 Ritam Bera. All rights reserved.</span><span>Turning data into insights and ideas into intelligent solutions.</span></div></footer>
  </div>
}

export default App
