import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

export default function FinalScene() {
  return (
    <section style={{ height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      
      {/* Local 3D Canvas for Stars */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Canvas>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        viewport={{ once: true }}
        style={{ zIndex: 1, textAlign: 'center' }}
      >
        <h2 className="text-gold" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
          Can't wait to celebrate with you.
        </h2>
        <p style={{ color: 'var(--color-champagne)', fontSize: '1.2rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Kabir & Diksha
        </p>
      </motion.div>

      {/* Fade out to bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '20vh', background: 'linear-gradient(to bottom, transparent, #000)', zIndex: 0 }} />

    </section>
  );
}
