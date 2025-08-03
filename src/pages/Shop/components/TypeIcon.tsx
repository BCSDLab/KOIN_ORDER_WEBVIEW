import CheckboxFalse from '@/assets/Shop/checkbox-false.svg';
import CheckboxTrue from '@/assets/Shop/checkbox-true.svg';
import RadioFalse from '@/assets/Shop/radio-false.svg';
import RadioTrue from '@/assets/Shop/radio-true.svg';

export default function TypeIcon({ isSingle, checked }: { isSingle: boolean; checked: boolean }) {
  return isSingle ? checked ? <RadioTrue /> : <RadioFalse /> : checked ? <CheckboxTrue /> : <CheckboxFalse />;
}
