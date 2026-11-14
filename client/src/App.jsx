import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { Projects } from './components/Projects';
import { OpenSource } from './components/OpenSource';
import { TechStack } from './components/TechStack';
import { GithubStats } from './components/GithubStats';
import { VibingCorner } from './components/VibingCorner';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TourToast } from './components/TourToast';
import { ThemedResumeModal } from './components/ThemedResumeModal';
import { startTour } from './utils/tour';

export function App() {
  const [isThemedResumeOpen, setIsThemedResumeOpen] = useState(false);

  const handleStartTour = useCallback(() => {
    startTour(() => {
      console.log('Tour completed successfully!');
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1d1d1b] flex flex-col font-sans selection:bg-[#183d2d] selection:text-[#f5f0e8]">
      {/* Main Sticky Header */}
      <Header 
        onStartTour={handleStartTour} 
        onOpenThemedResume={() => setIsThemedResumeOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero 
          onStartTour={handleStartTour} 
          onOpenThemedResume={() => setIsThemedResumeOpen(true)}
        />
        <InteractiveTerminal />
        <Projects />
        <OpenSource />
        <TechStack />
        <GithubStats />
        <VibingCorner />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Welcome Tour Toast for First-Time Visitors */}
      <TourToast onStartTour={handleStartTour} />

      {/* Clean Themed Resume Sheet Modal */}
      <ThemedResumeModal 
        isOpen={isThemedResumeOpen} 
        onClose={() => setIsThemedResumeOpen(false)} 
      />
    </div>
  );
}

export default App;
