import { useNavigate } from '@tanstack/react-router';
import { useCallback, useEffect } from 'react';

/**
 * Hook to monitor session health and handle unexpected logouts
 * Periodically checks if session is still valid
 */
export function useSessionMonitor() {
  const navigate = useNavigate();

  // Check session validity
  const validateSession = useCallback(async () => {
    try {
      const response = await fetch('/api/session/validate', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        // Session is invalid, redirect to login
        console.warn('❌ Session validation failed, redirecting to login');
        localStorage.removeItem('lastRoute');
        navigate({ to: '/' });
      }
    } catch (error) {
      console.error('Error validating session:', error);
      // Don't redirect on network error, just log it
    }
  }, [navigate]);

  useEffect(() => {
    // Check session every 5 minutes
    const checkInterval = setInterval(validateSession, 5 * 60 * 1000);

    // Also check on visibility change (when user returns to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // User has returned to the tab, validate session
        validateSession();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Check immediately on mount
    validateSession();

    return () => {
      clearInterval(checkInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [validateSession]);
}

/**
 * Hook to track user activity and keep session alive
 */
export function useActivityTracker() {
  useEffect(() => {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    let activityTimeout: NodeJS.Timeout;

    const handleActivity = () => {
      // Clear existing timeout
      clearTimeout(activityTimeout);

      // Send keep-alive every 10 minutes of activity
      activityTimeout = setTimeout(async () => {
        try {
          await fetch('/api/session/keep-alive', {
            method: 'POST',
            credentials: 'include',
          });
        } catch (error) {
          console.error('Error keeping session alive:', error);
        }
      }, 10 * 60 * 1000);
    };

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Initial activity
    handleActivity();

    return () => {
      clearTimeout(activityTimeout);
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, []);
}
