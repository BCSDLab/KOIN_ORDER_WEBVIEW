let currentToken: string | null = null;
const listeners = new Set<() => void>();

export function getTokenSnapshot() {
  return currentToken;
}

export function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function setTokenFromBridge(token: string) {
  currentToken = token;
  listeners.forEach((cb) => cb());
}
