import useCart from './Payment/hooks/useCart';

export default function TestPage() {
  const { data } = useCart('TAKE_OUT');

  return <div>{JSON.stringify(data)}</div>;
}
