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
  const [updatedPassengerId, setUpdatedPassengerId] = useState<string>(
    filterActivePassengers(passengers, 0)?.[0]?.id
  );

  const segmentSeatMapActive = segmentSeatMaps?.[segmentSeatMapIdxActive];
  const passengerSeatMapActive =
    segmentSeatMapActive?.passengerSeatMaps?.[activePassengerIndex];
  const seatCodes = useMemo(() => {
    return passengers?.map(p => p?.selectedSeat?.code).filter(Boolean);
  }, [passengers]);

  const handleChangeTab = useCallback(
    (tabIdx: number) => {
      setSegmentSeatMapIdxActive(tabIdx);
      setActivePassengerIndex(0);
      setUpdatedPassengerId(
        filterActivePassengers(passengers, tabIdx)?.[0]?.id
      );
    },
    [passengers]
  );

  const handleSelectSeat = useCallback(
    (seat: Seat) => {
      setPassengers(prev =>
        prev.map(passenger => {
          if (passenger.id === updatedPassengerId) {
            return {
              ...passenger,
              selectedSeat: seat,
            };
          }

          return passenger;
        })
      );
    },
    [updatedPassengerId]
  );

  const handleChangePassengerDetail = useCallback(
    (selectedIndex: number, passengerId: string) => {
      setActivePassengerIndex(selectedIndex);
      setUpdatedPassengerId(passengerId);
    },
    []
  );

  const renderFlightDetails = () => {
    return <FlightDetails segment={ segmentSeatMapActive?.segment } />;
  };

  const passengerDetails = useMemo(() => {
    const showedPassengers = filterActivePassengers(
      passengers,
      segmentSeatMapIdxActive
    );

    return (
      <PassengerDetails
        passengers={ showedPassengers }
        activeIndex={ activePassengerIndex }
        onChange={ handleChangePassengerDetail }
      />
    );
  }, [
    passengers,
    segmentSeatMapIdxActive,
    activePassengerIndex,
    handleChangePassengerDetail,
  ]);

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
            { passengerDetails }
          </div>
        </div>
      </div>

      <SummaryBar
        passengers={ passengers }
        accordionContent={
          <>
            { renderFlightDetails() }
            { passengerDetails }
          </>
        }
      />
    </div>
  );
};
