import { AircraftHead } from '@/components/icons/aircraft-head';
import { AircraftTail } from '@/components/icons/aircraft-tail';

type MainAircraftProps = {
  cabinClass: string;
  children: React.ReactNode;
};

export const MainAircraft = ({ cabinClass, children }: MainAircraftProps) => {
  return (
    <div className='relative w-full md:w-1/2 md:left-1/2 z-30'>
      <div className='relative -top-20 flex flex-col items-center drop-shadow-aircraft'>
        <div className='relative w-full'>
          <AircraftHead className='w-full' />
          <div
            id='CABIN_DECK'
            className='absolute bottom-4 md:bottom-6 inset-x-0 flex flex-col gap-6'
          >
            <p className='font-medium text-base text-center text-primary'>
              { cabinClass } Class
            </p>
          </div>
        </div>
        <div className='bg-neutral-white w-full min-h-[624px]'>
          <div className='flex flex-col gap-y-4 items-center w-full'>
            { children }
          </div>
        </div>
        <AircraftTail className='w-full' />
      </div>
    </div>
  );
};
