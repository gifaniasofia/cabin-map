import { SeatColumnCode } from '@/types/seat-map';

type SeatColumnProps = {
  columnName: string;
};

export const SeatColumn = ({ columnName }: SeatColumnProps) => {
  if (columnName === SeatColumnCode.Aisle) return <div className='w-12 h-10' />;

  if (
    columnName === SeatColumnCode.LeftSide ||
    columnName === SeatColumnCode.RightSide
  )
    return null;

  return (
    <div className='w-12 text-center text-sm font-medium'>{ columnName }</div>
  );
};

type SeatColumnsProps = {
  seatColumns: string[];
};

export const SeatColumns = ({ seatColumns }: SeatColumnsProps) => {
  return (
    <div className='sticky top-15 h-12 shadow bg-neutral-white z-50 py-1 rounded flex items-center w-full justify-between'>
      { seatColumns.map(col => (
        <div
          key={ col }
          className='relative flex'>
          <SeatColumn columnName={ col } />
        </div>
      )) }
    </div>
  );
};
