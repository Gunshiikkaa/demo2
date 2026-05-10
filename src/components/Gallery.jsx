import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';

const photos = [
  "/images/gallery_1_1778393773498.png",
  "/images/gallery_2_1778393788953.png",
  "/images/gallery_3_1778393806855.png",
  "/images/gallery_4_1778393830941.png",
  "/images/gallery_5_1778393847969.png"
];

export default function Gallery() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section ref={containerRef} className="section-padding" style={{ overflow: 'hidden' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <h2 className="text-gold">Moments Caught in Time</h2>
          <p style={{ color: 'var(--color-beige)' }}>A glimpse into our cherished memories.</p>
        </div>

        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', height: '800px' }}>
          
          <motion.div style={{ y: y1, display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '50px' }}>
            <GalleryItem src={photos[0]} />
            <GalleryItem src={photos[3]} />
          </motion.div>

          <motion.div style={{ y: y2, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <GalleryItem src={photos[1]} large />
          </motion.div>

          <motion.div style={{ y: y3, display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '100px' }}>
            <GalleryItem src={photos[2]} />
            <GalleryItem src={photos[4]} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function GalleryItem({ src, large = false }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

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
      className="glass-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02, zIndex: 10 }}
      style={{
        padding: '12px',
        paddingBottom: '50px',
        background: 'rgba(253, 251, 247, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '8px',
        border: '1px solid rgba(225, 198, 153, 0.2)',
        width: large ? '400px' : '300px',
        cursor: 'pointer',
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <div style={{ overflow: 'hidden', width: '100%', height: large ? '500px' : '350px', transform: 'translateZ(20px)' }}>
        <motion.img 
          src={src} 
          alt="Memory"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.8 }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(0.2) contrast(1.1)' }} 
        />
      </div>
      <div style={{ position: 'absolute', bottom: '15px', left: '0', right: '0', textAlign: 'center', color: 'var(--color-champagne)', fontSize: '0.8rem', letterSpacing: '0.2em', opacity: 0.6, transform: 'translateZ(30px)' }}>
        MEMOIRE • 2025
      </div>
    </motion.div>
  );
}
