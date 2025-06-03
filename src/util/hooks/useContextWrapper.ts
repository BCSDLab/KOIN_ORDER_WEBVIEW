import { Context, useContext } from 'react';

export default function useContextWrapper<T>(
  context: Context<T | null>,
  contextName: string,
  componentName: string,
): T {
  const contextValue = useContext(context);
  if (contextValue === null) {
    throw new Error(`${contextName}은(는) ${componentName} 컴포넌트 내에서만 사용할 수 있습니다.`);
  }
  return contextValue;
}
