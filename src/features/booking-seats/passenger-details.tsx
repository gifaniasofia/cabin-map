import { AvatarFallback } from '@/components/ui/avatar-fallback';
import messages from '@/locales/en.json';
import { PassengerState } from '@/types/seat-map';
import { cn } from '@/utils/cn';

import { Card, CardTitle } from './card';

type PassengerDetailsProps = {
  passengers: PassengerState[];
  activeIndex: number;
  onChange: (selectedIndex: number, passengerId: string) => void; // eslint-disable-line no-unused-vars
};

export const PassengerDetails = ({
  passengers,
  activeIndex,
  onChange,
}: PassengerDetailsProps) => {
  const t = messages.seat_plan.passenger;

  return (
    <Card className='p-4'>
      <CardTitle>{ t.title }</CardTitle>

      <div className='space-y-2 mt-4'>
        { passengers?.map((passenger, passengerIdx) => {
          const fullName = `${passenger.passengerDetails?.firstName ?? ''} ${
            passenger.passengerDetails?.lastName ?? ''
          }`;
          const isActive = activeIndex === passengerIdx;
          const selectedCode = passenger?.selectedSeat?.code;

          return (
            <div
              key={ passengerIdx }
              onClick={ () => onChange(passengerIdx, passenger.id) }
              className={ cn(
                'rounded-lg cursor-pointer shadow relative px-4 py-2.5 overflow-hidden border flex items-center justify-between',
                isActive ? 'border-primary-shade-2' : 'border-text-disable/30'
              ) }
            >
              <div
                className={ cn(
                  'absolute left-0 inset-y-0 w-2',
                  isActive ? 'bg-primary-shade-02' : 'bg-text-disable/30'
                ) }
              />
              <div className='flex flex-1 pl-2 items-center gap-2'>
                <AvatarFallback name={ fullName } />
                <span className='text-base font-semibold text-text-main'>
                  { fullName }
                </span>
              </div>
              { selectedCode ? (
                <span className='text-xs text-white shrink-0 font-medium rounded-md size-9 relative bg-primary'>
                  <span className='absolute-center'>
                    { selectedCode ?? '--' }
                  </span>
                </span>
              ) : (
                <span className='text-xs text-text-gray h-9 inline-flex items-center'>
                  { t.choosing_seat }
                </span>
              ) }
            </div>
          );
        }) }
      </div>
    </Card>
  );
};
