import { useTokenStore } from '@/stores/auth';

const useTokenState = () => useTokenStore((state) => state.token);

export default useTokenState;
