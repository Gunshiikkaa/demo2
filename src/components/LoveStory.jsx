import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const milestones = [
  {
    year: "2018",
    title: "First Encounter",
    desc: "A chance meeting over coffee that turned into a four-hour conversation about everything and nothing.",
    img: "/images/love_story_1_1778393713532.png"
  },
  {
    year: "2020",
    title: "A Shared Journey",
    desc: "Moving across the country together, building a home, and realizing this was forever.",
    img: "/images/love_story_2_1778393730478.png"
  },
  {
    year: "2023",
    title: "The Proposal",
    desc: "Under a canopy of stars in the mountains, a simple question and an effortless 'yes'.",
    img: "/images/love_story_3_1778393747314.png"
  }
];

export default function LoveStory() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 1, 1, 0]);

  return (
    <section ref={containerRef} className="section-padding" style={{ position: 'relative', minHeight: '100vh' }}>
      <motion.div 
        className="container"
        style={{ y, opacity }}
      >
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <h2 className="text-gold">Our Journey</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-beige)' }}>
            Every great story begins with a single moment. Ours is a mosaic of countless beautiful memories.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem', position: 'relative' }}>
          {/* Vertical line timeline */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '1px',
            background: 'linear-gradient(to bottom, transparent, var(--color-champagne), transparent)',
            transform: 'translateX(-50%)',
            opacity: 0.3
          }} />

          {milestones.map((item, index) => (
            <motion.div 
              key={item.year}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{
                display: 'flex',
                flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                alignItems: 'center',
                gap: '4rem',
                zIndex: 2
              }}
            >
              <div style={{ flex: 1, textAlign: index % 2 === 0 ? 'right' : 'left' }}>
                <h3 style={{ color: 'var(--color-champagne)', fontSize: '3rem', marginBottom: '0.5rem' }}>{item.year}</h3>
                <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>{item.title}</h4>
                <p style={{ color: 'var(--color-beige)' }}>{item.desc}</p>
              </div>
              
              <div style={{ width: '40px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-champagne)', boxShadow: '0 0 15px var(--color-champagne)' }} />
              </div>

              <div style={{ flex: 1 }}>
                <motion.div 
                  className="glass-card"
                  whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                  style={{ 
                    padding: '1rem', 
                    borderRadius: '12px',
                    overflow: 'hidden'
                  }}
                >
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    style={{ 
                      width: '100%', 
                      height: '300px', 
                      objectFit: 'cover', 
                      borderRadius: '8px',
                      filter: 'sepia(0.2) contrast(1.1) brightness(0.9)'
                    }} 
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
