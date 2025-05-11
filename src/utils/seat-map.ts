import { PassengerState, SegmentSeatMap } from '@/types/seat-map';

export const mappingPassengers = (segmentSeatMaps: SegmentSeatMap[]) => {
  return (segmentSeatMaps || []).reduce<PassengerState[]>(
    (acc, segment, segmentIdx) => {
      const passengerList = (segment.passengerSeatMaps || []).map(
        (psm, psmIdx) => ({
          id: `${segmentIdx}-${psmIdx}`,
          passengerIndex: psm?.passenger?.passengerIndex,
          passengerDetails: psm?.passenger?.passengerDetails,
          passengerInfo: psm?.passenger?.passengerInfo,
        })
      );
      return acc.concat(passengerList);
    },
    []
  );
};

export const filterActivePassengers = (
  passengers: PassengerState[],
  segmentSeatMapIdxActive: number
) => {
  return passengers.filter(passenger => {
    const [segmentIdx] = passenger.id.split('-');
    return Number(segmentIdx) === segmentSeatMapIdxActive;
  });
};
