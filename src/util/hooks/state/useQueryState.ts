import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

type Serializer<T> = (v: T) => string | null;
type Parser<T> = (raw: string | null) => T;

export default function useQueryState<T>(key: string, parser: Parser<T>, serializer: Serializer<T>) {
  const [params, setParams] = useSearchParams();

  const value = parser(params.get(key));

  const setValue = useCallback(
    (next: T, opts?: { replace?: boolean }) => {
      const newParams = new URLSearchParams(params);
      const raw = serializer(next);
      if (raw === null) newParams.delete(key);
      else newParams.set(key, raw);
      setParams(newParams, { replace: opts?.replace ?? true });
    },
    [key, params, setParams, serializer],
  );

  return [value, setValue] as const;
}
