import { BookingSeats } from '@/features/booking-seats';
import seatMapResponse from '@/mocks/SeatMapResponse.json';
import { SegmentSeatMap } from '@/types/seat-map';

export default function SeatSelectionPage() {
  const segmentSeatMaps: SegmentSeatMap[] =
    seatMapResponse.seatsItineraryParts[0]?.segmentSeatMaps || [];

  return <BookingSeats segmentSeatMaps={ segmentSeatMaps } />;
}
