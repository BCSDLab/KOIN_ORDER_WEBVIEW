import BottomModal from './BottomModal';
import { useBottomModal } from './BottomModal';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';

export { useBottomModal };

export default Object.assign(BottomModal, {
  Header,
  Content,
  Footer,
});
