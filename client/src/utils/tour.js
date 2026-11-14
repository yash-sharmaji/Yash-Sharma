import { driver } from 'driver.js';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';

let activeDriver = null;

export const startTour = (onComplete) => {
  if (activeDriver) {
    try {
      activeDriver.destroy();
    } catch {
      // ignore
    }
  }

  const driverObj = driver({
    showProgress: true,
    progressText: '{{current}} of {{total}}',
    nextBtnText: 'Next →',
    prevBtnText: '← Back',
    doneBtnText: 'Finish Tour 🎉',
    popoverClass: 'cc-tour',
    stagePadding: 8,
    stageRadius: 10,
    animate: true,
    smoothScroll: true,
    allowClose: true,
    steps: portfolioData.tourSteps,
    onDestroyed: () => {
      activeDriver = null;
    },
    onDestroyStarted: () => {
      // If user finished all steps
      const currentIdx = driverObj.getActiveIndex();
      if (currentIdx === portfolioData.tourSteps.length - 1) {
        triggerConfettiCelebration();
        fetch('/api/tour/complete', { method: 'POST' }).catch(() => {});
        if (onComplete) onComplete();
      }
      driverObj.destroy();
    }
  });

  activeDriver = driverObj;
  driverObj.drive();
};

export const triggerConfettiCelebration = () => {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#183d2d', '#c0392b', '#f59e0b', '#245741']
    });
  } catch {
    // fallback if canvas not available
  }
};

