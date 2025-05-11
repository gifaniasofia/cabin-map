'use client';

import { useMemo, useState } from 'react';
import { DialogTitle } from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { SeatFillIcon, SeatIcon } from '@/components/icons/seat';
import { AvatarFallback } from '@/components/ui/avatar-fallback';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useIsMobile } from '@/hooks/use-mobile';
import messages from '@/locales/en.json';
import { PassengerDetails, Seat, StorefrontSlotCode } from '@/types/seat-map';
import { cn } from '@/utils/cn';
import { formatPrice } from '@/utils/format-price';

type SeatPlanProps = {
  seat: Seat;
  isSelected: boolean;
  passengger: PassengerDetails;
  onSelectSeat?: (seat: Seat) => void; // eslint-disable-line no-unused-vars
};

const seatCharacteristics: Record<string, string> =
  messages.seat_plan.seat.characteristics;
const seatLimitationsMap: Record<string, string> =
  messages.seat_plan.seat.limitations;
const t = messages.seat_plan.seat;

export const SeatPlan = ({
  seat,
  isSelected,
  passengger,
  onSelectSeat,
}: SeatPlanProps) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [checkedAgreement, setCheckedAgreement] = useState(false);
  const isMobile = useIsMobile();

  const rawSeatCharacteristics = useMemo(
    () =>
      (seat?.rawSeatCharacteristics ?? []).filter(
        (char: string) => seatCharacteristics[char]
      ),
    [seat?.rawSeatCharacteristics]
  );

  const limitations = useMemo(
    () =>
      (seat?.limitations ?? []).filter(
        (lim: string) => seatLimitationsMap[lim]
      ),
    [seat?.limitations]
  );

  const isLegRoom = rawSeatCharacteristics?.includes('L');
  const isAvailable = seat?.available;
  const isPreviouslySelected = seat?.originallySelected;
  const CurrentSeatIcon = isSelected || !isAvailable ? SeatFillIcon : SeatIcon;

  const handleClickSelectSeat = () => {
    setOpenPopup(false);
    setTimeout(() => {
      onSelectSeat?.(seat);
    }, 200);
  };

  const renderSeat = () => (
    <button
      disabled={ !isAvailable }
      className={ cn(
        'text-xs group flex items-center justify-center text-center relative transform transition duration-150 ease-in-out',
        {
          'text-seat-disable': !isAvailable,
          'text-seat-legroom hover:scale-110': isLegRoom,
          'text-seat-previous-selected hover:scale-110': isPreviouslySelected,
          'text-seat-primary cursor-pointer hover:scale-110':
            (isAvailable && !isLegRoom) || isSelected,
        }
      ) }
    >
      <CurrentSeatIcon className='size-10' />
      <span
        className={ cn(
          'absolute-center text-xs font-medium w-7',
          (isSelected || !isAvailable) && 'text-white'
        ) }
      >
        { seat?.code }
      </span>
    </button>
  );

  const renderPopupContent = () => {
    const priceData = seat?.total?.alternatives?.[0]?.[0];
    const price = priceData?.amount ?? 0;
    const currency = priceData?.currency ?? 'USD';

    const name = `${passengger?.firstName ?? ''} ${passengger?.lastName ?? ''}`;

    return (
      <>
        <div className='flex flex-col gap-4 divide-y divide-border/60 pb-4'>
          <div className='pb-4'>
            <h4 className='font-medium text-lg'>{ seat?.code }</h4>
            <p className='text-text-gray'>
              { isLegRoom ? t.types.extra_legroom : t.types.regular }
            </p>
          </div>

          <div className='flex items-center gap-2 pb-4'>
            <AvatarFallback name={ name } />
            <span>{ name }</span>
          </div>

          <div>
            <div className='max-h-60 overflow-y-auto space-y-2.5 custom-scrollbar pb-4 -mx-4 -mt-4 pt-4 px-4 text-sm text-neutral-gray-02'>
              { rawSeatCharacteristics?.length > 0 && (
                <ul className='list-disc list-outside ml-3.5'>
                  { rawSeatCharacteristics.map(char => (
                    <li key={ char }>{ seatCharacteristics[char] }</li>
                  )) }
                </ul>
              ) }
              { limitations?.length > 0 && (
                <div>
                  <p>{ t.labels.restrictions }</p>
                  <ul className='list-disc list-outside ml-3.5'>
                    { limitations.map(lim => (
                      <li key={ lim }>{ seatLimitationsMap[lim] }</li>
                    )) }
                  </ul>
                </div>
              ) }
            </div>
          </div>

          { limitations?.length > 0 && (
            <div className='flex gap-3 pb-4'>
              <div className='flex h-6 shrink-0 items-center'>
                <Checkbox
                  id='agreement'
                  name='agreement'
                  checked={ checkedAgreement }
                  onChange={ () => setCheckedAgreement(prev => !prev) }
                />
              </div>
              <label
                htmlFor='agreement'
                className='text-sm text-neutral-gray-02'
              >
                { t.labels.agreement }
              </label>
            </div>
          ) }

          <div className='flex justify-end font-semibold text-base'>
            { formatPrice(price, { currency }) }
          </div>
        </div>

        { !isSelected && (
          <button
            onClick={ handleClickSelectSeat }
            className='w-full text-white font-medium text-base py-2.5 px-4 bg-primary rounded-full disabled:bg-text-disable/50 disabled:text-white'
            disabled={ limitations?.length > 0 && !checkedAgreement }
          >
            { t.actions.select }
          </button>
        ) }
      </>
    );
  };

  const renderSeatPlan = () => {
    if (seat?.storefrontSlotCode === StorefrontSlotCode.Aisle) {
      return <span className='w-12 h-10' />;
    }

    if (seat?.storefrontSlotCode !== StorefrontSlotCode.Seat) {
      return null;
    }

    if (isMobile) {
      return (
        <Dialog
          open={ openPopup }
          onOpenChange={ setOpenPopup }>
          <DialogTrigger asChild>{ renderSeat() }</DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogTitle className='sr-only'>{ seat?.code }</DialogTitle>
            <DialogDescription className='sr-only'>
              { t.labels.details }
            </DialogDescription>
            { renderPopupContent() }
          </DialogContent>
        </Dialog>
      );
    }

    return (
      <Popover
        open={ openPopup }
        onOpenChange={ setOpenPopup }>
        <PopoverTrigger asChild>{ renderSeat() }</PopoverTrigger>
        <PopoverContent className='w-90 relative focus:outline-none'>
          <button
            className='absolute right-4 top-4'
            onClick={ () => setOpenPopup(false) }
          >
            <X className='text-text-gray hover:opacity-70 size-4' />
          </button>
          { renderPopupContent() }
        </PopoverContent>
      </Popover>
    );
  };

  return renderSeatPlan();
};
