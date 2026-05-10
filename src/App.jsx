import { useState, useEffect, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import HeroSection from './components/HeroSection';
import LoveStory from './components/LoveStory';
import WeddingEvents from './components/WeddingEvents';
import CountdownSection from './components/CountdownSection';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import FinalScene from './components/FinalScene';
import Background3D from './components/Background3D';
import CustomCursor from './components/CustomCursor';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    // Simulate asset loading
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 800);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const toggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);
    // Real implementation would interact with an audio element
    const audioEl = document.getElementById('bg-music');
    if (audioEl) {
      if (isAudioPlaying) {
        audioEl.pause();
      } else {
        audioEl.play().catch(e => console.log('Audio play failed:', e));
      }
    }
  };

  return (
    <>
      <CustomCursor />
      <audio id="bg-music" loop>
        {/* Placeholder for real audio */}
      </audio>

      <AnimatePresence>
        {loading && (
          <motion.div 
            className="loader-container"
            exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
          >
            <div className="loader-text">K & D</div>
            <div className="loader-bar">
              <div className="loader-progress" style={{ width: `${progress}%` }}></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="canvas-container">
        <Suspense fallback={null}>
          <Background3D />
        </Suspense>
      </div>

      <button 
        onClick={toggleAudio}
        className="fixed bottom-8 right-8 z-50 glass-card p-4 rounded-full text-champagne hover:text-white transition-all duration-300"
        style={{ color: 'var(--color-champagne)', background: 'var(--color-glass-bg)', backdropFilter: 'blur(10px)', border: '1px solid var(--color-glass-border)', borderRadius: '50%', padding: '15px', position: 'fixed', bottom: '30px', right: '30px', cursor: 'pointer', zIndex: 100 }}
      >
        {isAudioPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      {!loading && (
        <motion.main>
          <HeroSection />
          <LoveStory />
          <WeddingEvents />
          <CountdownSection />
          <Gallery />
          <RSVP />
          <FinalScene />
        </motion.main>
      )}
    </>
  );
}

export default App;
