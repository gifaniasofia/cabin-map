import { format } from 'date-fns';

import { FlightActiveIcon } from '@/components/icons/flight-active';
import { FlightLandingIcon } from '@/components/icons/flight-landing';
import { FlightTakeOffIcon } from '@/components/icons/flight-takeoff';
import { AccordionItem } from '@/components/ui/accordion';
import messages from '@/locales/en.json';
import airportIata from '@/mocks/AirportIATA.json';
import { AirportData } from '@/types/airport';
import { SegmentInfo } from '@/types/seat-map';
import { formatDurationFromDecimal } from '@/utils/format-duration';

import { Card, CardTitle } from './card';

type FlightDetailsProps = {
  segment?: SegmentInfo;
};

export const FlightDetails = ({ segment }: FlightDetailsProps) => {
  if (!segment) return null;

  const t = messages.seat_plan.flight;

  const stops =
    segment?.flight?.stopAirports?.length > 0
      ? `${segment?.flight?.stopAirports.length}x ${t.transit}`
      : t.direct;

  const originCode = segment.origin;
  const destinationCode = segment.destination;
  const originAirport =
    (airportIata as AirportData)[originCode]?.airport ?? '-';
  const destinationAirport =
    (airportIata as AirportData)[destinationCode]?.airport ?? '-';

  const departure = format(
    new Date(segment?.departure),
    'eee dd MMM - hh:mm a'
  );
  const arrival = format(new Date(segment?.arrival), 'eee dd MMM - hh:mm a');

  const renderTitle = () => (
    <div className='flex items-center justify-between w-full py-4'>
      <CardTitle>
        { originCode } - { destinationCode }
      </CardTitle>
      <span className='text-sm max-md:hidden font-medium'>
        { t.show_details }
      </span>
    </div>
  );

  const renderContent = () => (
    <div className='pb-4 space-y-4'>
      <p className='text-sm'>
        ({ formatDurationFromDecimal(segment?.duration ?? 0) } , { stops })
      </p>

      <div className='flex gap-2'>
        <FlightTakeOffIcon className='shrink-0 size-5' />
        <div>
          <p className='text-base font-semibold'>
            { originCode } - { originAirport }
          </p>
          <time className='text-xs text-text-gray'>{ departure }</time>
        </div>
      </div>

      <div className='flex gap-2'>
        <FlightLandingIcon className='shrink-0 size-5' />
        <div>
          <p className='text-base font-semibold'>
            { destinationCode } - { destinationAirport }
          </p>
          <time className='text-xs text-text-gray'>{ arrival }</time>
        </div>
      </div>

      <div className='flex gap-2'>
        <FlightActiveIcon className='shrink-0 size-5' />
        <div className='text-2xs'>
          <p>
            { t.flight_number } { segment?.flight?.airlineCode }
            { segment?.flight?.flightNumber }
          </p>
          <p>BOEING { segment?.equipment }</p>
          <p>
            { segment?.cabinClass } ({ segment?.bookingClass })
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <Card className='px-4'>
      <AccordionItem trigger={ renderTitle() }>{ renderContent() }</AccordionItem>
    </Card>
  );
};
