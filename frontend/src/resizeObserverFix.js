// Suppress ResizeObserver warnings that don't affect functionality
let ResizeObserverOriginal = window.ResizeObserver;

window.ResizeObserver = class ResizeObserver {
  constructor(callback) {
    let isScheduled = false;
    const wrappedCallback = (...args) => {
      if (isScheduled) return;
      isScheduled = true;
      
      requestAnimationFrame(() => {
        try {
          callback(...args);
        } catch (e) {
          // Silently ignore ResizeObserver errors
          if (!e.toString().includes('ResizeObserver loop')) {
            console.error('ResizeObserver callback error:', e);
          }
        }
        isScheduled = false;
      });
    };
    
    this.observer = new ResizeObserverOriginal(wrappedCallback);
  }

  observe(target) {
    this.observer.observe(target);
  }

  unobserve(target) {
    this.observer.unobserve(target);
  }

  disconnect() {
    this.observer.disconnect();
  }
};

// Suppress console.error for ResizeObserver errors
const originalError = console.error;
const errorQueue = [];
let isProcessing = false;

console.error = function(...args) {
  const errorString = args[0]?.toString?.() || '';
  
  // Only suppress ResizeObserver loop errors
  if (errorString.includes('ResizeObserver loop completed')) {
    return;
  }
  
  // Call original console.error for everything else
  originalError.apply(console, args);
};

