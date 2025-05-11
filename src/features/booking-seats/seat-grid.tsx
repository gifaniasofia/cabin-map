import { Cabin, PassengerDetails, Seat, SeatRow } from '@/types/seat-map';

import { ExitIndicator } from './exit-indicator';
import { SeatPlan } from './seat';
import { SeatColumns } from './seat-columns';

type SeatGridProps = {
  cabins: Cabin[];
  selectedSeatCodes?: (string | undefined)[];
  passenger: PassengerDetails;
  onSelect: (seat: Seat) => void; // eslint-disable-line no-unused-vars
};

export const SeatGrid = ({
  cabins,
  selectedSeatCodes,
  passenger,
  onSelect,
}: SeatGridProps) => {
  if (!cabins?.length) return null;

  return (
    <>
      { cabins.map((cabin, cabinIdx) => (
        <div
          key={ `cabin-${cabinIdx}` }
          className='space-y-4 py-3 px-6 rounded-lg w-full flex flex-col items-center'
        >
          <SeatColumns seatColumns={ cabin.seatColumns } />

          { cabin.seatRows.map((row: SeatRow, rowIdx: number) => (
            <div
              key={ `row-${row.rowNumber}-${rowIdx}` }
              className='flex w-full justify-between items-center'
            >
              { row.seats.map((seat: Seat, seatIdx: number) => {
                const showExitLeft =
                  seat.slotCharacteristics?.includes('EXIT') &&
                  seat.slotCharacteristics?.includes('LEFT_SIDE');
                const showExitRight =
                  seat.slotCharacteristics?.includes('EXIT') &&
                  seat.slotCharacteristics?.includes('RIGHT_SIDE');
                const isSelected = selectedSeatCodes?.includes(
                  seat?.code ?? ''
                );

                return (
                  <div
                    key={ `seat-${seat.code}-${seatIdx}` }
                    className='relative flex'
                  >
                    { showExitLeft && <ExitIndicator side='LEFT' /> }
                    { showExitRight && <ExitIndicator side='RIGHT' /> }

                    <SeatPlan
                      seat={ seat }
                      isSelected={ !!isSelected }
                      passengger={ passenger }
                      onSelectSeat={ onSelect }
                    />
                  </div>
                );
              }) }
            </div>
          )) }
        </div>
      )) }
    </>
  );
};
