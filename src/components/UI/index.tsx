import { Provider as SpProvider } from '@react-spectrum/provider';
import { theme } from '@react-spectrum/theme-default';
import './serok.css';

export function SerokProvider(props: React.ComponentProps<typeof SpProvider>) {
  return <SpProvider UNSAFE_className="serok-provider" theme={theme} scale="large" {...props} />;
}
