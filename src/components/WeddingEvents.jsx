import { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

const events = [
  { id: 'haldi', title: 'Haldi', date: 'May 15, 2026', time: '10:00 AM', venue: 'The Heritage Courtyard', desc: 'A vibrant morning of yellow hues, laughter, and blessings.', img: '/src/assets/1.jpg' },
  { id: 'mehendi', title: 'Mehendi', date: 'May 15, 2026', time: '4:00 PM', venue: 'Royal Gardens', desc: 'An evening of intricate henna designs, music, and dance.', img: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1000' },
  { id: 'sangeet', title: 'Sangeet', date: 'May 16, 2026', time: '7:30 PM', venue: 'Grand Ballroom', desc: 'A night of glamorous performances and endless celebrations.', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000' },
  { id: 'wedding', title: 'Wedding', date: 'May 17, 2026', time: '5:00 PM', venue: 'Palace Pavilion', desc: 'The sacred union under the stars.', img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000' },
  { id: 'reception', title: 'Reception', date: 'May 18, 2026', time: '8:00 PM', venue: 'Crystal Hall', desc: 'A luxurious evening to toast the newlyweds.', img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1000' }
];

function EventCard({ event, onClick, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      layoutId={`card-${event.id}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="glass-card"
      whileHover={{ scale: 1.05, zIndex: 10 }}
      style={{
        padding: '2rem',
        borderRadius: '20px',
        cursor: 'pointer',
        minWidth: '280px',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        position: 'relative',
        overflow: 'hidden',
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Background Image with Overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
        <img src={event.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, transition: '0.5s' }} className="card-bg-img" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--color-soft-black) 20%, transparent 80%)' }} />
      </div>

      <div style={{ transform: 'translateZ(50px)' }}>
        <motion.span style={{ color: 'var(--color-champagne)', fontSize: '0.8rem', letterSpacing: '0.2em' }}>
          0{index + 1}
        </motion.span>
        <motion.h3 layoutId={`title-${event.id}`} className="text-gold" style={{ fontSize: '1.8rem', margin: '0.5rem 0' }}>
          {event.title}
        </motion.h3>
        <motion.p layoutId={`date-${event.id}`} style={{ fontSize: '0.9rem', color: 'rgba(253, 251, 247, 0.6)' }}>
          {event.date}
        </motion.p>
      </div>

      <div className="animated-border" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', opacity: 0.5 }} />
    </motion.div>
  );
}

export default function WeddingEvents() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const containerRef = useRef(null);

  return (
    <section className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ color: 'var(--color-champagne)', letterSpacing: '0.4em', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '1rem' }}
          >
            Save the Dates
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold"
          >
            The Celebrations
          </motion.h2>
        </div>

        <div 
          ref={containerRef}
          style={{ 
            display: 'flex', 
            gap: '2.5rem', 
            overflowX: 'auto', 
            padding: '2rem 1rem 4rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {events.map((event, index) => (
            <EventCard 
              key={event.id} 
              event={event} 
              index={index}
              onClick={() => setSelectedEvent(event)} 
            />
          ))}
        </div>

        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-center"
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(10, 10, 10, 0.95)',
                backdropFilter: 'blur(15px)',
                zIndex: 1000,
                padding: '2rem'
              }}
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                layoutId={`card-${selectedEvent.id}`}
                className="glass-panel"
                onClick={e => e.stopPropagation()}
                style={{
                  width: '100%',
                  maxWidth: '1000px',
                  borderRadius: '32px',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'row',
                  minHeight: '60vh'
                }}
              >
                {/* Image Side */}
                <div style={{ flex: 1.2, position: 'relative', overflow: 'hidden' }}>
                  <motion.img 
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    src={selectedEvent.img} 
                    alt={selectedEvent.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent, rgba(15,15,15,0.8))' }} />
                </div>

                {/* Content Side */}
                <div style={{ flex: 1, padding: '4rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <button 
                    onClick={() => setSelectedEvent(null)}
                    style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-glass-border)', color: 'var(--color-champagne)', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', zIndex: 10 }}
                  >
                    ✕
                  </button>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.h3 layoutId={`title-${selectedEvent.id}`} className="text-gold" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
                      {selectedEvent.title}
                    </motion.h3>
                    
                    <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
                      <div>
                        <p style={{ color: 'var(--color-champagne)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>DATE</p>
                        <p style={{ fontSize: '1.1rem' }}>{selectedEvent.date}</p>
                      </div>
                      <div>
                        <p style={{ color: 'var(--color-champagne)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>TIME</p>
                        <p style={{ fontSize: '1.1rem' }}>{selectedEvent.time}</p>
                      </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                      <p style={{ color: 'var(--color-champagne)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>VENUE</p>
                      <p style={{ fontSize: '1.1rem' }}>{selectedEvent.venue}</p>
                    </div>
                    
                    <div style={{ height: '1px', background: 'linear-gradient(to right, var(--color-champagne), transparent)', margin: '2rem 0', opacity: 0.3 }} />
                    
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'rgba(253,251,247,0.8)', fontWeight: 300 }}>
                      {selectedEvent.desc}
                    </p>

                    <button className="btn-primary" style={{ marginTop: '3rem', width: '100%' }}>
                      Add to Calendar
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .card-bg-img {
          transform: scale(1);
        }
        .glass-card:hover .card-bg-img {
          transform: scale(1.1);
          opacity: 0.6 !important;
        }
      `}</style>
    </section>
  );
}
