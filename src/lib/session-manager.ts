import { parse } from 'cookie';

export interface SessionData {
  userId: number;
  email: string;
  name: string;
  role: string;
  isAdmin: boolean;
  permissions: any;
  labId: number | null;
  hasCompletedSetup: boolean;
  createdAt: number;
  lastActivity: number;
}

// CRITICAL: Session storage with better lifecycle management
const sessions = new Map<string, SessionData>();

// Session configuration
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes of inactivity
const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours absolute max

// Cleanup interval - every 5 minutes
const cleanupInterval = setInterval(() => {
  const now = Date.now();
  let cleaned = 0;
  
  for (const [sessionId, session] of sessions.entries()) {
    // Remove if inactive for too long
    if (now - session.lastActivity > SESSION_TIMEOUT_MS) {
      sessions.delete(sessionId);
      cleaned++;
      continue;
    }
    
    // Remove if absolute max age reached
    if (now - session.createdAt > SESSION_MAX_AGE_MS) {
      sessions.delete(sessionId);
      cleaned++;
    }
  }
  
  if (cleaned > 0) {
    console.log(`Ì∑π Cleaned up ${cleaned} expired sessions`);
  }
}, 5 * 60 * 1000);

// Prevent memory leaks
if (typeof process !== 'undefined') {
  process.on('exit', () => clearInterval(cleanupInterval));
}

export const generateSessionId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
};

export const createSession = (userData: Omit<SessionData, 'createdAt' | 'lastActivity'>): string => {
  const sessionId = generateSessionId();
  const now = Date.now();
  
  sessions.set(sessionId, {
    ...userData,
    createdAt: now,
    lastActivity: now,
  });
  
  console.log('‚úÖ Session created:', sessionId, 'for user:', userData.email);
  return sessionId;
};

export const getSession = (sessionId: string): SessionData | null => {
  const session = sessions.get(sessionId);
  
  if (!session) {
    console.log('‚ùå Session not found:', sessionId);
    return null;
  }

  const now = Date.now();
  
  // Check inactivity timeout
  if (now - session.lastActivity > SESSION_TIMEOUT_MS) {
    console.log('‚ùå Session inactive timeout:', sessionId);
    sessions.delete(sessionId);
    return null;
  }
  
  // Check absolute max age
  if (now - session.createdAt > SESSION_MAX_AGE_MS) {
    console.log('‚ùå Session max age exceeded:', sessionId);
    sessions.delete(sessionId);
    return null;
  }

  // Update last activity
  session.lastActivity = now;
  
  console.log('‚úÖ Session valid:', sessionId);
  return session;
};

export const updateSession = (sessionId: string, updates: Partial<SessionData>): boolean => {
  const session = sessions.get(sessionId);
  
  if (!session) {
    return false;
  }
  
  const now = Date.now();
  sessions.set(sessionId, {
    ...session,
    ...updates,
    lastActivity: now, // Always update activity on any session access
  });
  
  console.log('‚úÖ Session updated:', sessionId);
  return true;
};

export const deleteSession = (sessionId: string): void => {
  sessions.delete(sessionId);
  console.log('‚úÖ Session deleted:', sessionId);
};

export const getSessionFromRequest = (request: Request): string | null => {
  const cookieHeader = request.headers.get('cookie');
  
  if (!cookieHeader) {
    console.log('‚ùå No cookie header found');
    return null;
  }

  try {
    const cookies = parse(cookieHeader);
    const sessionId = cookies.sessionId || null;
    
    if (sessionId) {
      console.log('Ì¥ç Session ID from cookie:', sessionId);
    }
    
    return sessionId;
  } catch (error) {
    console.error('‚ùå Error parsing cookies:', error);
    return null;
  }
};

// Session validation endpoint
export const validateSession = (sessionId: string): { valid: boolean; remaining: number } => {
  const session = getSession(sessionId);
  
  if (!session) {
    return { valid: false, remaining: 0 };
  }
  
  const remaining = SESSION_TIMEOUT_MS - (Date.now() - session.lastActivity);
  return { valid: true, remaining: Math.max(0, remaining) };
};

// Get all active sessions count (for monitoring)
export const getActiveSessionCount = (): number => {
  return sessions.size;
};
