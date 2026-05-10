import { motion } from 'framer-motion';
import FloatingRing from './FloatingRing';

export default function RSVP() {
  return (
    <section className="section-padding flex-center" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(225,198,153,0.15) 0%, transparent 60%)', filter: 'blur(40px)', zIndex: 0 }} />

      <motion.div 
        className="glass-card"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{
          width: '100%',
          maxWidth: '800px',
          padding: '5rem 3rem',
          borderRadius: '24px',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center'
        }}
      >
        <FloatingRing />
        <h2 className="text-gold" style={{ marginBottom: '1rem' }}>Be Our Guest</h2>
        <p style={{ color: 'var(--color-beige)', marginBottom: '3rem' }}>Please grace us with your presence</p>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '500px', margin: '0 auto', textAlign: 'left' }}>
          
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-champagne)', fontSize: '0.9rem', letterSpacing: '0.1em' }}>FIRST NAME</label>
              <input 
                type="text" 
                style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: 'none', borderBottom: '1px solid rgba(225,198,153,0.3)', color: 'var(--color-ivory)', outline: 'none', fontFamily: 'var(--font-sans)', transition: 'border-color 0.3s' }} 
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-champagne)', fontSize: '0.9rem', letterSpacing: '0.1em' }}>LAST NAME</label>
              <input 
                type="text" 
                style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: 'none', borderBottom: '1px solid rgba(225,198,153,0.3)', color: 'var(--color-ivory)', outline: 'none', fontFamily: 'var(--font-sans)', transition: 'border-color 0.3s' }} 
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-champagne)', fontSize: '0.9rem', letterSpacing: '0.1em' }}>ATTENDANCE</label>
            <select style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: 'none', borderBottom: '1px solid rgba(225,198,153,0.3)', color: 'var(--color-ivory)', outline: 'none', fontFamily: 'var(--font-sans)', appearance: 'none', cursor: 'pointer' }}>
              <option value="yes" style={{ background: 'var(--color-soft-black)' }}>Joyfully Accept</option>
              <option value="no" style={{ background: 'var(--color-soft-black)' }}>Regretfully Decline</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-champagne)', fontSize: '0.9rem', letterSpacing: '0.1em' }}>DIETARY REQUIREMENTS</label>
            <input 
              type="text" 
              placeholder="Any allergies or restrictions?"
              style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: 'none', borderBottom: '1px solid rgba(225,198,153,0.3)', color: 'var(--color-ivory)', outline: 'none', fontFamily: 'var(--font-sans)' }} 
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="btn-primary"
            style={{ marginTop: '2rem', width: '100%', background: 'rgba(225, 198, 153, 0.1)' }}
          >
            Send RSVP
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}
