import { useSyncExternalStore } from 'react';
import { getTokenSnapshot, subscribe } from 'stores/tokenStore';

export function useBridgeToken() {
  return useSyncExternalStore(subscribe, getTokenSnapshot);
}
