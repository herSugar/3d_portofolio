import { useState, useRef } from 'react'
import {
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Send,
  Mail,
  User,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Award,
  Globe,
  Sparkles,
} from 'lucide-react'
import type { RoomId } from '../data'

interface RoomDetailCardProps {
  roomId: RoomId | null
  onClose: () => void
}

// 1. PROFILE CONTENT
function ProfileDetail() {
  const socials = [
    { label: 'GitHub', href: 'https://github.com/herSugar', icon: '💻' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/restu-jaya-113667360', icon: '🔗' },
    { label: 'Instagram', href: 'https://www.instagram.com/gr1mriper?igsh=cndhM2pndGtoYmtu', icon: '📸' },
    { label: 'YouTube', href: 'https://www.youtube.com/@gerip69', icon: '▶️' },
  ]

  return (
    <div className="card-profile-body">
      <div className="card-avatar-wrap">
        <div className="avatar-ring-outer" />
        <div className="avatar-ring-inner">
          <img
            src="/images/fotoDiri.webp"
            alt="I Made Restu Jaya Putra"
            className="card-avatar-img"
            onError={(e) => {
              // fallback if image fails
              ;(e.target as HTMLElement).style.display = 'none'
            }}
          />
        </div>
      </div>

      <h3 className="card-title-lg">Restu Jaya</h3>
      <p className="card-role-badge">Web Developer</p>

      <p className="card-bio-text">
        Fresh Graduate in Software Engineering passionate about building functional, user focused digital experiences.
        Hands on with web development, network configuration, and hardware & software troubleshooting.
      </p>

      <div className="card-divider" />

      <div className="card-socials-row">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="card-social-pill"
          >
            <span>{s.icon}</span>
            <span>{s.label}</span>
            <ExternalLink size={12} className="social-pill-arrow" />
          </a>
        ))}
      </div>
    </div>
  )
}

// 2. PROJECTS CONTENT
interface ProjectItem {
  title: string
  description: string
  tags: string[]
  image?: string
  link: string
  useIframe?: boolean
}

function ProjectsDetail() {
  const projects: ProjectItem[] = [
    {
      title: '7ani Travel',
      description: 'Travel booking platform',
      tags: ['Web', 'Travel', 'Booking', 'NextJS', 'Supabase', 'Tailwind'],
      link: 'https://7ani-travel.vercel.app/',
      useIframe: true,
    },
    {
      title: 'StyleMeUp Shop',
      description: 'eCommerce Web for StyleMeUp Shop with cart',
      tags: ['Web', 'E-Commerce', 'Shop', 'NextJS', 'Supabase', 'Tailwind'],
      link: 'https://stylemeup-shop.vercel.app/',
      useIframe: true,
    },
    {
      title: 'Fix Indonesia',
      description: 'News and information platform for Fix Indonesia Event Planner',
      tags: ['Web', 'News', 'Company Profile', 'Wordpress'],
      link: 'https://fixindonesia.co.id',
      image: '/images/projects/FixIndonesia.webp',
    },
    {
      title: 'Checkloc',
      description: 'Location checking and verification platform',
      tags: ['Web', 'Location', 'Company Profile', 'Wordpress', 'Property Listing'],
      link: 'https://checkloc.id',
      image: '/images/projects/Checkloc.webp',
    },
    {
      title: 'Jendela Wisata',
      description: 'Full-featured Vacation Web with cart and payment integration',
      tags: ['CodeIgniter', 'Tailwind', 'MySQL'],
      link: 'https://pariwisata.lab-trpl.id/',
      image: '/images/projects/JW.webp',
    },
    {
      title: 'FurQon-shop',
      description: 'Modern Shop Web with cart',
      tags: ['PHP', 'CSS', 'Bootstrap', 'MySQL'],
      link: 'https://github.com/herSugar/furqon-shop.git',
    },
    {
      title: 'Frontend-Toko',
      description: 'Website Optik for customer to buy glasses',
      tags: ['PHP', 'CSS', 'Bootstrap', 'MySQL'],
      link: 'https://github.com/herSugar/frontend-toko.git',
    },
  ]

  const [current, setCurrent] = useState(0)
  const total = projects.length

  const goNext = () => setCurrent((prev) => (prev + 1) % total)
  const goPrev = () => setCurrent((prev) => (prev - 1 + total) % total)

  const activeProject = projects[current]

  return (
    <div className="card-projects-body">
      <div className="projects-top-meta">
        <span className="meta-counter">
          {current + 1} / {total} — SELECTED WORK
        </span>
        <div className="projects-nav-btns">
          <button onClick={goPrev} aria-label="Previous project">
            <ChevronLeft size={16} />
          </button>
          <button onClick={goNext} aria-label="Next project">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="project-display-box">
        {/* Project Thumbnail Preview */}
        <div className="project-thumb-frame">
          {activeProject.image ? (
            <img
              src={activeProject.image}
              alt={activeProject.title}
              className="project-thumb-img"
              onError={(e) => {
                ;(e.target as HTMLElement).style.display = 'none'
              }}
            />
          ) : (
            <div className="project-thumb-fallback">
              <span className="fallback-icon">🖥️</span>
              <span className="fallback-text">{activeProject.title}</span>
            </div>
          )}
          <span className="project-live-indicator">LIVE PREVIEW</span>
        </div>

        {/* Project Info */}
        <div className="project-info-area">
          <h4 className="project-name">{activeProject.title}</h4>
          <p className="project-desc">{activeProject.description}</p>

          <div className="project-tags-wrap">
            {activeProject.tags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>

          <a
            href={activeProject.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-view-btn"
          >
            <span>View Project</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="projects-dots-row">
        {projects.map((_, idx) => (
          <button
            key={idx}
            className={`proj-dot ${idx === current ? 'active' : ''}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to project ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// 3. SKILLS CONTENT
function SkillsDetail() {
  const technicalSkills = [
    { name: 'React', color: '#61dafb' },
    { name: 'TypeScript', color: '#3178c6' },
    { name: 'Tailwind', color: '#38bdf8' },
    { name: 'Node.js', color: '#4ade80' },
    { name: 'Git', color: '#f97316' },
    { name: 'Laravel', color: '#ef4444' },
    { name: 'CodeIgniter', color: '#a855f7' },
    { name: 'MySQL', color: '#3b82f6' },
    { name: 'Mikrotik', color: '#e2e8f0' },
    { name: 'TP-Link', color: '#06b6d4' },
    { name: 'Wordpress', color: '#2563eb' },
  ]

  const softSkills = ['Task & Time Management', 'Team Work']
  const languages = [
    { name: 'Indonesian', level: 'Native' },
    { name: 'English', level: 'Intermediate' },
  ]
  const achievements = [{ title: '3rd Place in ECO English Quiz', year: '2023' }]

  return (
    <div className="card-skills-body">
      <div className="skills-section">
        <h4 className="skills-group-title">
          <Sparkles size={14} /> Technical Stack
        </h4>
        <div className="skills-grid-pills">
          {technicalSkills.map((sk) => (
            <div key={sk.name} className="tech-badge-item">
              <span className="tech-badge-dot" style={{ background: sk.color }} />
              <span className="tech-badge-name">{sk.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="skills-section">
        <h4 className="skills-group-title">
          <Briefcase size={14} /> Soft Skills
        </h4>
        <div className="skills-row-pills">
          {softSkills.map((s) => (
            <span key={s} className="soft-pill">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="skills-two-col">
        <div className="skills-section">
          <h4 className="skills-group-title">
            <Globe size={14} /> Languages
          </h4>
          <div className="skills-col-list">
            {languages.map((l) => (
              <div key={l.name} className="lang-item">
                <span className="lang-name">{l.name}</span>
                <span className="lang-level">— {l.level}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="skills-section">
          <h4 className="skills-group-title">
            <Award size={14} /> Achievements
          </h4>
          <div className="skills-col-list">
            {achievements.map((a) => (
              <div key={a.title} className="achieve-item">
                <span className="achieve-bullet" />
                <span>
                  {a.title} <span className="achieve-yr">({a.year})</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// 4. EXPERIENCE CONTENT
function ExperienceDetail() {
  const experiences = [
    {
      company: 'Fix Indonesia',
      location: 'Denpasar, Bali',
      role: 'Internship',
      period: 'Jul 2025 - Jan 2026',
      description:
        'FIX Indonesia is a company that operates in the event planning and event organizing industry, handling the planning, coordination, and execution of various events such as corporate events, festivals, seminars, and community activities, with a focus on creative concepts and professional event management.',
      points: [
        'Developing company website fixindonesia.co.id using WordPress',
        'Developing company website checkloc.id using WordPress',
        'Assisted in on-site event coordination and execution',
      ],
    },
    {
      company: 'Mastedata Bali',
      location: 'Denpasar, Bali',
      role: 'Internship',
      period: 'Oct 2021 - Dec 2021',
      description:
        'Mastedata Bali is a trusted IT and electronics solution provider established in 2010, committed to delivering high-quality technology for various business sectors in Indonesia, including hospitality, healthcare, banking, corporations, and SMEs.',
      points: [
        'Troubleshooting client laptop hardware and assembling PCs according to client specification',
      ],
    },
  ]

  return (
    <div className="card-experience-body">
      <div className="exp-timeline-list">
        {experiences.map((exp) => (
          <div key={exp.company} className="exp-card-item">
            <div className="exp-header-row">
              <div>
                <h4 className="exp-company-name">
                  {exp.company} <span className="exp-location">— {exp.location}</span>
                </h4>
                <p className="exp-role-title">{exp.role}</p>
              </div>
              <span className="exp-period-pill">{exp.period}</span>
            </div>

            <p className="exp-desc-paragraph">{exp.description}</p>

            <ul className="exp-bullet-list">
              {exp.points.map((pt, i) => (
                <li key={i}>
                  <span className="bullet-point-dot" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

// 5. CONTACT CONTENT
function ContactDetail() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const formData = new FormData(e.currentTarget)
    formData.append('access_key', '432e185b-49f4-4670-9df0-879c764e9d6e')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (data.success) {
        setStatus('success')
        formRef.current?.reset()
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setErrorMessage(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Network error. Please try again later.')
    }
  }

  return (
    <div className="card-contact-body">
      <form ref={formRef} onSubmit={handleSubmit} className="contact-form-inner">
        <div className="form-field-group">
          <label htmlFor="modal-name">Name</label>
          <div className="input-with-icon">
            <User size={16} className="input-icon" />
            <input
              type="text"
              id="modal-name"
              name="name"
              placeholder="Your name"
              required
              disabled={status === 'submitting'}
            />
          </div>
        </div>

        <div className="form-field-group">
          <label htmlFor="modal-email">Email</label>
          <div className="input-with-icon">
            <Mail size={16} className="input-icon" />
            <input
              type="email"
              id="modal-email"
              name="email"
              placeholder="your@email.com"
              required
              disabled={status === 'submitting'}
            />
          </div>
        </div>

        <div className="form-field-group">
          <label htmlFor="modal-msg">Message</label>
          <textarea
            id="modal-msg"
            name="message"
            rows={4}
            placeholder="Your message..."
            required
            disabled={status === 'submitting'}
          />
        </div>

        {status === 'error' && (
          <div className="form-alert error">
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {status === 'success' && (
          <div className="form-alert success">
            <CheckCircle2 size={16} />
            <span>Message sent successfully! I will get back to you soon.</span>
          </div>
        )}

        <button type="submit" disabled={status === 'submitting'} className="form-submit-btn">
          <span>{status === 'submitting' ? 'Sending…' : 'Send Message'}</span>
          <Send size={15} />
        </button>
      </form>
    </div>
  )
}

export default function RoomDetailCard({ roomId, onClose }: RoomDetailCardProps) {
  if (!roomId || roomId === 'overview') return null

  const titles: Record<Exclude<RoomId, 'overview'>, { num: string; title: string; subtitle: string }> = {
    profile: {
      num: '01',
      title: 'Profile & About',
      subtitle: 'The person behind the pixels',
    },
    projects: {
      num: '02',
      title: 'Selected Projects',
      subtitle: 'Ideas turned into functional interfaces',
    },
    skills: {
      num: '03',
      title: 'Skills & Toolkit',
      subtitle: 'Technologies, tools, and capabilities',
    },
    experience: {
      num: '04',
      title: 'Experience & Background',
      subtitle: 'Internships, learnings, and practical work',
    },
    contact: {
      num: '05',
      title: 'Contact & Inquiry',
      subtitle: "Let's connect and build something together",
    },
  }

  const meta = titles[roomId]

  return (
    <div className="detail-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="detail-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="detail-modal-header">
          <div>
            <div className="modal-eyebrow">
              <span>{meta.num}</span>
              <span className="eyebrow-divider" />
              <span>ROOM DETAILS</span>
            </div>
            <h2 className="modal-title">{meta.title}</h2>
            <p className="modal-subtitle">{meta.subtitle}</p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="detail-modal-scroll">
          {roomId === 'profile' && <ProfileDetail />}
          {roomId === 'projects' && <ProjectsDetail />}
          {roomId === 'skills' && <SkillsDetail />}
          {roomId === 'experience' && <ExperienceDetail />}
          {roomId === 'contact' && <ContactDetail />}
        </div>
      </div>
    </div>
  )
}
