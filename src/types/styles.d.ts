import { CSSProperties } from 'react';

type CSSWithCustomProperties = CSSProperties & {
  [key: `--${string}`]: string | number;
};
