import type { ReactNode } from 'react';
import { useId } from 'react';
import clsx from 'clsx';
import CollapsedEvent from './CollapsedEvent';
import ExpandedEvent from './ExpandedEvent';
import type { Events } from '@/api/shop/entity';
import useBooleanState from '@/util/hooks/useBooleanState';

interface AnimatedSlotProps {
  id?: string;
  isVisible: boolean;
  offsetDirection: 'up' | 'down';
  children: ReactNode;
  'aria-hidden': boolean;
}

function AnimatedSlot({ id, isVisible, offsetDirection, children, 'aria-hidden': ariaHidden }: AnimatedSlotProps) {
  const hiddenTranslate = offsetDirection === 'up' ? '-translate-y-1' : 'translate-y-1';

  return (
    <div
      id={id}
      aria-hidden={ariaHidden}
      className={clsx(
        'grid min-h-0 transition-[grid-template-rows,opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
        isVisible ? 'translate-y-0 grid-rows-[1fr] opacity-100' : clsx('grid-rows-[0fr] opacity-0', hiddenTranslate),
      )}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

export default function ShopEvent({ event }: { event: Events }) {
  const [isOpen, , , toggleIsOpen] = useBooleanState(false);
  const contentId = useId();

  const toggleEventDetail = () => {
    toggleIsOpen();
  };

  return (
    <article className="w-full overflow-hidden border-b-[0.5px] border-neutral-400 bg-white">
      <AnimatedSlot isVisible={!isOpen} offsetDirection="up" aria-hidden={isOpen}>
        <CollapsedEvent event={event} onToggleOpen={toggleEventDetail} contentId={contentId} isOpen={isOpen} />
      </AnimatedSlot>
      <AnimatedSlot id={contentId} isVisible={isOpen} offsetDirection="down" aria-hidden={!isOpen}>
        <ExpandedEvent event={event} onToggleOpen={toggleEventDetail} contentId={contentId} isOpen={isOpen} />
      </AnimatedSlot>
    </article>
  );
}
