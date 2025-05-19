'use client';

import { useCallback, useMemo, useState } from 'react';

import { PassengerState, Seat, SegmentSeatMap } from '@/types/seat-map';
import { filterActivePassengers, mappingPassengers } from '@/utils/seat-map';

import { FlightDetails } from './flight-details';
import { MainAircraft } from './main-aircraft';
import { PassengerDetails } from './passenger-details';
import { SeatGrid } from './seat-grid';
import { SegmentTabs } from './segment-tabs';
import { SummaryBar } from './summary-bar';

type BookingSeatsProps = {
  segmentSeatMaps: SegmentSeatMap[];
};

export const BookingSeats = ({ segmentSeatMaps }: BookingSeatsProps) => {
  const [segmentSeatMapIdxActive, setSegmentSeatMapIdxActive] =
    useState<number>(0);
  const [passengers, setPassengers] = useState<PassengerState[]>(
    mappingPassengers(segmentSeatMaps)
  );
  const [activePassengerIndex, setActivePassengerIndex] = useState<number>(0);

  const segmentSeatMapActive = segmentSeatMaps?.[segmentSeatMapIdxActive];
  const passengerSeatMapActive =
    segmentSeatMapActive?.passengerSeatMaps?.[activePassengerIndex];

  const showedPassengers = useMemo(() => {
    return filterActivePassengers(passengers, segmentSeatMapIdxActive);
  }, [passengers, segmentSeatMapIdxActive]);
  const seatCodes = useMemo(() => {
    return showedPassengers
      ?.map(passenger => passenger?.selectedSeat?.code)
      .filter(Boolean);
  }, [showedPassengers]);

  const handleChangeTab = useCallback((tabIdx: number) => {
    setSegmentSeatMapIdxActive(tabIdx);
    setActivePassengerIndex(0);
  }, []);

  const handleSelectSeat = useCallback(
    (seat: Seat) => {
      setPassengers(prev =>
        prev.map(passenger => {
          const [segmentIdx, passengerIdx] = passenger.id.split('-');

          if (
            + passengerIdx === activePassengerIndex &&
            + segmentIdx === segmentSeatMapIdxActive
          ) {
            return {
              ...passenger,
              selectedSeat: seat,
            };
          }

          return passenger;
        })
      );
    },
    [activePassengerIndex, segmentSeatMapIdxActive]
  );

  const handleChangePassengerDetail = useCallback((selectedIndex: number) => {
    setActivePassengerIndex(selectedIndex);
  }, []);

  const renderFlightDetails = () => {
    return <FlightDetails segment={ segmentSeatMapActive?.segment } />;
  };

  const renderPassengerDetails = () => {
    return (
      <PassengerDetails
        passengers={ showedPassengers }
        activeIndex={ activePassengerIndex }
        onChange={ handleChangePassengerDetail }
      />
    );
  };

  return (
    <div className='relative'>
      <SegmentTabs
        segments={ segmentSeatMaps }
        selectedIndex={ segmentSeatMapIdxActive }
        onChange={ handleChangeTab }
      />

      <div className='bg-background-gray-08 size-full rounded-t-2xl -mt-10 pb-20 relative'>
        <div className='max-md:!px-0 container-page flex'>
          <MainAircraft cabinClass={ segmentSeatMapActive?.segment?.cabinClass }>
            <SeatGrid
              cabins={ passengerSeatMapActive?.seatMap?.cabins || [] }
              selectedSeatCodes={ seatCodes }
              passenger={ passengerSeatMapActive?.passenger?.passengerDetails }
              onSelect={ handleSelectSeat }
            />
          </MainAircraft>

          <div className='max-md:hidden sticky top-10 h-[calc(100vh-180px)] custom-scrollbar overflow-y-auto w-1/2 right-1/2 pr-10 pt-10 z-30 space-y-4'>
            { renderFlightDetails() }
            { renderPassengerDetails() }
          </div>
        </div>
      </div>

      <SummaryBar
        passengers={ passengers }
        accordionContent={
          <>
            { renderFlightDetails() }
            { renderPassengerDetails() }
          </>
        }
      />
    </div>
  );
};
