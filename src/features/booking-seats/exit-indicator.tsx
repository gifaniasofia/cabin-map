import { StepBack } from 'lucide-react';

import { cn } from '@/utils/cn';

type ExitIndicatorProps = {
  side: 'LEFT' | 'RIGHT';
};

export const ExitIndicator = ({ side }: ExitIndicatorProps) => {
  return (
    <div
      className={ cn(
        'absolute top-1/2 -translate-y-1/2 z-10',
        side === 'LEFT' ? '-left-4' : '-right-4 rotate-180'
      ) }
    >
      <StepBack className='fill-cabin-facilities text-cabin-facilities size-4.5' />
    </div>
  );
};
