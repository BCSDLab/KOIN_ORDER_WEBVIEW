import CheckboxFalse from '@/assets/Shop/checkbox-false.svg';
import CheckboxTrue from '@/assets/Shop/checkbox-true.svg';
import RadioFalse from '@/assets/Shop/radio-false.svg';
import RadioTrue from '@/assets/Shop/radio-true.svg';

interface TypeIconProps {
  isSingle: boolean;
  checked: boolean;
}

export default function TypeIcon({ isSingle, checked }: TypeIconProps) {
  return isSingle ? checked ? <RadioTrue /> : <RadioFalse /> : checked ? <CheckboxTrue /> : <CheckboxFalse />;
}
