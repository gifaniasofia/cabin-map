import airportIata from '@/mocks/AirportIATA.json';
import { AirportData } from '@/types/airport';

export const getCityFromIata = (code: string): string => {
  return (airportIata as AirportData)[code]?.city ?? '-';
};

export const getAirportName = (code: string): string => {
  return (airportIata as AirportData)[code]?.airport ?? '-';
};
