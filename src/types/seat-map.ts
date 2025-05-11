/* eslint-disable no-unused-vars */

export enum StorefrontSlotCode {
  Seat = 'SEAT',
  Aisle = 'AISLE',
  Blank = 'BLANK',
  Bulkhead = 'BULKHEAD',
}

export enum SeatColumnCode {
  LeftSide = 'LEFT_SIDE',
  A = 'A',
  B = 'B',
  C = 'C',
  Aisle = 'AISLE',
  D = 'D',
  E = 'E',
  F = 'F',
  RightSide = 'RIGHT_SIDE',
}

export type SeatMapResponse = {
  seatsItineraryParts: SeatsItineraryPart[];
};

export type SeatsItineraryPart = {
  segmentSeatMaps: SegmentSeatMap[];
};

export type SegmentSeatMap = {
  segment: SegmentInfo;
  passengerSeatMaps: PassengerSeatMap[];
};

export type SegmentInfo = {
  '@type': string;
  segmentOfferInformation: {
    flightsMiles: number;
    awardFare: boolean;
  };
  flight: {
    flightNumber: number;
    operatingFlightNumber: number;
    airlineCode: string;
    operatingAirlineCode: string;
    stopAirports: string[];
    departureTerminal: string;
    arrivalTerminal: string;
  };
  origin: string; // IATA code
  destination: string; // IATA code
  departure: string; // ISO datetime
  arrival: string; // ISO datetime
  equipment: string; // aircraft type
  cabinClass: string; // e.g., Economy
  bookingClass: string; // e.g., Y
  duration: number;
  layoverDuration: number;
  fareBasis: string;
  subjectToGovernmentApproval: boolean;
  segmentRef: string;
};

export type PassengerSeatMap = {
  seatSelectionEnabledForPax: boolean;
  passenger: Passenger;
  seatMap: SeatMap;
};

export type Passenger = {
  passengerIndex: number;
  passengerNameNumber: string;
  passengerDetails: PassengerDetails;
  passengerInfo: PassengerInfo;
  preferences?: PassengerPreferences;
  documentInfo?: DocumentInfo;
};

export type PassengerState = Pick<
  Passenger,
  'passengerIndex' | 'passengerDetails' | 'passengerInfo'
> & {
  id: string;
  selectedSeat?: Seat;
};

export type PassengerDetails = {
  firstName: string;
  lastName: string;
};

export type PassengerInfo = {
  dateOfBirth: string;
  gender: string;
  type: string;
  emails: string[];
  phones: string[];
  address: PassengerAddress;
};

export type PassengerAddress = {
  street1: string;
  street2?: string;
  postcode: string;
  state: string;
  city: string;
  country: string;
  addressType: string;
};

export type PassengerPreferences = {
  specialPreferences?: {
    mealPreference: string;
    seatPreference: string;
    specialRequests: string[];
    specialServiceRequestRemarks: string[];
  };
  frequentFlyer?: FrequentFlyer[];
};

export type FrequentFlyer = {
  airline: string;
  number: string;
  tierNumber: number;
};

export type DocumentInfo = {
  issuingCountry: string;
  countryOfBirth: string;
  documentType: string;
  nationality: string;
};

export type SeatMap = {
  rowsDisabledCauses: string[];
  aircraft: string;
  cabins: Cabin[];
};

export type Cabin = {
  deck: string;
  seatColumns: string[];
  seatRows: SeatRow[];
};

export type SeatRow = {
  rowNumber: number;
  seatCodes: string[]; // e.g., ["SEAT", "AISLE", "SEAT"]
  seats: Seat[];
};

export type Seat = {
  code?: string; // e.g., "6A"
  storefrontSlotCode: string;
  available: boolean;
  originallySelected: boolean;
  entitled?: boolean;
  feeWaived?: boolean;
  entitledRuleId?: string;
  feeWaivedRuleId?: string;
  refundIndicator?: string;
  limitations?: string[];
  designations?: string[];
  seatCharacteristics?: string[];
  rawSeatCharacteristics?: string[];
  slotCharacteristics?: string[];
  freeOfCharge?: boolean;
  prices?: {
    alternatives: PriceAlternative[][];
  };
  taxes?: {
    alternatives: PriceAlternative[][];
  };
  total?: {
    alternatives: PriceAlternative[][];
  };
};

export type SeatLimitation =
  | 'NEXT_TO_EXIT_DOOR'
  | 'NOT_ALLOWED_FOR_INFANT'
  | 'NOT_ALLOWED_FOR_PASSENGER_WITH_MEDICAL_CONDITION';

export type PriceAlternative = {
  amount: number;
  currency: string;
};
