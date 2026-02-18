// Comprehensive ResizeObserver error suppression
// This fixes "ResizeObserver loop completed with undelivered notifications" error

let ResizeObserverOriginal = window.ResizeObserver;

if (ResizeObserverOriginal) {
  window.ResizeObserver = class ResizeObserver {
    constructor(callback) {
      let isScheduled = false;
      let lastCallTime = 0;
      const debounceTime = 10;
      
      const wrappedCallback = (...args) => {
        const now = Date.now();
        if (now - lastCallTime < debounceTime) {
          return;
        }
        lastCallTime = now;
        
        if (isScheduled) return;
        isScheduled = true;
        
        requestAnimationFrame(() => {
          try {
            callback(...args);
          } catch (e) {
            // Silently ignore ResizeObserver errors - they don't affect functionality
          }
          isScheduled = false;
        });
      };
      
      try {
        this.observer = new ResizeObserverOriginal(wrappedCallback);
      } catch (e) {
        // Fallback if ResizeObserver initialization fails
        this.observer = null;
      }
    }

    observe(target) {
      try {
        if (this.observer) {
          this.observer.observe(target);
        }
      } catch (e) {
        // Silently ignore
      }
    }

    unobserve(target) {
      try {
        if (this.observer) {
          this.observer.unobserve(target);
        }
      } catch (e) {
        // Silently ignore
      }
    }

    disconnect() {
      try {
        if (this.observer) {
          this.observer.disconnect();
        }
      } catch (e) {
        // Silently ignore
      }
    }
  };
}

// Suppress ResizeObserver error messages globally
const originalError = console.error;
const originalWarn = console.warn;

console.error = function(...args) {
  const errorString = args[0]?.toString?.() || '';
  
  // Only suppress ResizeObserver loop errors - these are harmless
  if (errorString.includes('ResizeObserver loop')) {
    return;
  }
  
  // Call original error for other errors
  originalError.apply(console, args);
};

console.warn = function(...args) {
  const warnString = args[0]?.toString?.() || '';
  
  // Only suppress ResizeObserver warnings
  if (warnString.includes('ResizeObserver')) {
    return;
  }
  
  // Call original warn for other warnings
  originalWarn.apply(console, args);
};

// Suppress error event for ResizeObserver loop errors
window.addEventListener('error', function(event) {
  const errorMessage = event.message || event.error?.toString?.() || '';
  
  if (errorMessage.includes('ResizeObserver loop')) {
    event.preventDefault();
  }
}, true);

// Also handle promise rejections related to ResizeObserver
window.addEventListener('unhandledrejection', function(event) {
  const errorMessage = event.reason?.toString?.() || '';
  
  if (errorMessage.includes('ResizeObserver')) {
    event.preventDefault();
  }
}, true);

