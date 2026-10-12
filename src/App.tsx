import { useState } from 'react'
import { ArrowDownRight, ArrowUpRight, ChevronLeft, ChevronRight, Compass, Move3D } from 'lucide-react'
import PortfolioScene from './components/PortfolioScene'
import RoomDetailCard from './components/RoomDetailCard'
import { rooms, type RoomId } from './data'

export default function App() {
  const [activeRoom, setActiveRoom] = useState<RoomId>('overview')
  const [detailRoom, setDetailRoom] = useState<Exclude<RoomId, 'overview'> | null>(null)

  const selected = rooms.find((room) => room.id === activeRoom)
  const selectedIndex = rooms.findIndex((room) => room.id === activeRoom)

  const goNext = () => {
    const nextIndex = selectedIndex < 0 ? 0 : (selectedIndex + 1) % rooms.length
    setActiveRoom(rooms[nextIndex].id)
  }
  const goPrevious = () => {
    const previousIndex = selectedIndex < 0 ? rooms.length - 1 : (selectedIndex - 1 + rooms.length) % rooms.length
    setActiveRoom(rooms[previousIndex].id)
  }

  const handleOpenCard = (room: Exclude<RoomId, 'overview'>) => {
    setActiveRoom(room)
    setDetailRoom(room)
  }

  return (
    <main className="app-shell">
      <div className="scene-wrap">
        <PortfolioScene
          activeRoom={activeRoom}
          isDetailOpen={Boolean(detailRoom)}
          onSelectRoom={setActiveRoom}
          onOpenCard={handleOpenCard}
        />
      </div>

      <header className="topbar">
        <a className="brand" href="#" onClick={(event) => { event.preventDefault(); setActiveRoom('overview') }}>
          <span className="brand-mark">M.</span>
          <span>PORTFOLIO<span className="brand-dot">.</span></span>
        </a>
        <div className="topbar-note"><span className="live-dot" /> INTERACTIVE 3D EXPERIENCE</div>
        <a className="top-contact" href="mailto:hello@example.com">LET’S TALK <ArrowUpRight size={15} /></a>
      </header>

      <section className="hero-copy" aria-live="polite">
        {selected ? (
          <>
            <div className="eyebrow"><span>{selected.number}</span><span className="eyebrow-line" />{selected.eyebrow}</div>
            <h1>{selected.title}</h1>
            <p>{selected.description}</p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => setDetailRoom(selected.id)}>
                View details <ArrowUpRight size={16} />
              </button>
              {activeRoom === 'contact' ? (
                <button className="text-button" onClick={() => setActiveRoom('overview')}>Back to overview</button>
              ) : (
                <button className="text-button" onClick={goNext}>Next room <ArrowDownRight size={16} /></button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="eyebrow"><span>WELCOME</span><span className="eyebrow-line" />A PORTFOLIO IN 3D</div>
            <h1>Explore my<br /><span>world of work.</span></h1>
            <p>Jelajahi ruang-ruang yang menceritakan profil, karya, keahlian, dan pengalaman saya. Klik titik bergelombang pada ruangan untuk melihat detail lengkap.</p>
            <button className="primary-button" onClick={() => setActiveRoom('profile')}>Start exploring <ArrowUpRight size={16} /></button>
          </>
        )}
      </section>

      <nav className="room-nav" aria-label="Portfolio rooms">
        <div className="nav-heading"><Compass size={14} /> EXPLORE SPACES</div>
        {rooms.map((room) => (
          <button
            key={room.id}
            className={`room-link ${activeRoom === room.id ? 'active' : ''}`}
            onClick={() => setActiveRoom(room.id)}
          >
            <span className="room-number">{room.number}</span>
            <span>{room.label}</span>
            <ArrowUpRight className="room-arrow" size={14} />
          </button>
        ))}
      </nav>

      <footer className="bottom-bar">
        <div className="interaction-hint"><Move3D size={15} /> DRAG TO ROTATE <span>·</span> SCROLL TO ZOOM</div>
        <div className="scene-counter">{selected ? `${String(selectedIndex + 1).padStart(2, '0')} / 05` : 'OVERVIEW / 05'}</div>
        <div className="step-buttons">
          <button aria-label="Previous room" onClick={goPrevious}><ChevronLeft size={18} /></button>
          <button aria-label="Next room" onClick={goNext}><ChevronRight size={18} /></button>
        </div>
      </footer>

      {/* Interactive Detail Modal Card from portonew */}
      <RoomDetailCard roomId={detailRoom} onClose={() => setDetailRoom(null)} />
    </main>
  )
}
