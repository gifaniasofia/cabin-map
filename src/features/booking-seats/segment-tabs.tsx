import { AircraftPath } from '@/components/icons/aircraft-path';
import { Tab } from '@/components/ui/tab';
import { SegmentSeatMap } from '@/types/seat-map';
import { getCityFromIata } from '@/utils/airport-iata';

type TabsProps = {
  segments: SegmentSeatMap[];
  selectedIndex: number;
  onChange: (index: number) => void; // eslint-disable-line no-unused-vars
};

export const SegmentTabs = ({
  segments,
  selectedIndex,
  onChange,
}: TabsProps) => {
  if (!segments?.length) return null;

  return (
    <div className='w-full bg-primary pt-15 pb-31'>
      <div className='max-sm:!px-0 container-page'>
        <div className='flex overflow-x-scroll hidden-scrollbar relative z-40 whitespace-nowrap'>
          { segments.map((segment, index) => (
            <Tab
              key={ `tab-${index}` }
              selected={ selectedIndex === index }
              onClick={ () => onChange(index) }
              classNames={
                segments.length === 1
                  ? {
                    line: 'bg-transparent',
                    button: 'border-b-0 cursor-default',
                  }
                  : {}
              }
            >
              <span className='flex items-center justify-between w-full'>
                <div className='text-left flex flex-1 flex-col'>
                  <h2>{ segment.segment.origin }</h2>
                  <p className='text-2xs text-neutral-gray-07 font-normal'>
                    { getCityFromIata(segment.segment.origin) }
                  </p>
                </div>

                <AircraftPath className='w-auto h-15' />

                <div className='text-right flex flex-1 flex-col'>
                  <h2>{ segment.segment.destination }</h2>
                  <p className='text-2xs text-neutral-gray-07 font-normal'>
                    { getCityFromIata(segment.segment.destination) }
                  </p>
                </div>
              </span>
            </Tab>
          )) }
        </div>
      </div>
    </div>
  );
};
