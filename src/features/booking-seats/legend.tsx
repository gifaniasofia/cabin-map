import { Info, StepBack } from 'lucide-react';

import { SeatFillIcon, SeatIcon } from '@/components/icons/seat';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import messages from '@/locales/en.json';

type LegendKey = keyof typeof messages.seat_plan.legend;

const legendItems: { key: LegendKey; icon: React.ReactNode }[] = [
  {
    key: 'extra_legroom',
    icon: <SeatIcon className='size-6 text-seat-legroom' />,
  },
  {
    key: 'regular',
    icon: <SeatIcon className='size-6 text-seat-primary' />,
  },
  {
    key: 'unavailable',
    icon: <SeatFillIcon className='size-6 text-seat-disable' />,
  },
  {
    key: 'selected',
    icon: <SeatFillIcon className='size-6 text-seat-primary' />,
  },
  {
    key: 'previously_selected',
    icon: <SeatFillIcon className='size-6 text-seat-previous-selected' />,
  },
  {
    key: 'exit',
    icon: (
      <StepBack className='fill-cabin-facilities text-cabinfill-cabin-facilities size-4.5 rotate-180' />
    ),
  },
];

export const Legend = () => {
  const t = messages.seat_plan.legend;

  return (
    <div className='w-full max-md:shadow bg-white md:bg-gray-100'>
      <div className='max-md:!px-0 container-page overflow-hidden'>
        <div className='flex flex-nowrap overflow-x-auto custom-scrollbar pt-0 pb-4 md:py-2.5 whitespace-nowrap gap-3 md:gap-4 max-md:first:pl-4 max-md:last:pr-4 -mx-4'>
          { legendItems.map(item => (
            <div
              key={ item.key }
              className='flex flex-none'>
              <div className='flex group items-center gap-3 md:gap-4 text-sm font-medium bg-white border border-border py-2.5 px-3 md:px-4 rounded-md'>
                <span className='flex items-center gap-2.5'>
                  { item.icon }
                  { t[item.key].title }
                </span>
                <span className='max-md:hidden'>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className='size-4 text-text-gray' />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{ t[item.key].description }</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </span>
              </div>
            </div>
          )) }
        </div>
      </div>
    </div>
  );
};
