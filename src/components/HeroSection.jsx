import { motion } from 'framer-motion';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.5,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight + 1,
      behavior: 'smooth'
    });
  };

  return (
    <section className="flex-center" style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <motion.div 
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ textAlign: 'center', zIndex: 10 }}
      >
        <motion.div variants={itemVariants} style={{ marginBottom: '2rem' }}>
          <div className="animated-border" style={{ width: '60px', height: '1px', margin: '0 auto 1.5rem' }} />
          <p style={{ color: 'var(--color-champagne)', letterSpacing: '0.4em', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 300 }}>
            The Celebration of
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <h1 className="text-gold" style={{ marginBottom: '1.5rem', position: 'relative' }}>
            <span style={{ display: 'block', fontSize: '0.4em', letterSpacing: '0.5em', opacity: 0.8, marginBottom: '0.5rem' }}>MR & MRS</span>
            KABIR <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 200, opacity: 0.5, margin: '0 0.5rem' }}>&</span> DIKSHA
          </h1>
        </motion.div>
        
        <motion.p variants={itemVariants} style={{ fontSize: '1.1rem', marginBottom: '4rem', opacity: 0.7, letterSpacing: '0.2em', fontWeight: 300 }}>
          EST. MAY 2026 • NEW DELHI
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <button onClick={scrollDown} className="btn-primary glass-panel" style={{ padding: '1.5rem 4rem' }}>
            Enter the Experience
          </button>
        </motion.div>
      </motion.div>

      {/* Subtle bottom gradient */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '30vh',
        background: 'linear-gradient(to top, var(--color-soft-black), transparent)',
        pointerEvents: 'none'
      }} />
    </section>
  );
}
