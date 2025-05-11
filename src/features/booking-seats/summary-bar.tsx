'use client';

import { useMemo, useState } from 'react';

import { AccordionItem } from '@/components/ui/accordion';
import { useIsMobile } from '@/hooks/use-mobile';
import messages from '@/locales/en.json';
import { PassengerState } from '@/types/seat-map';
import { formatPrice } from '@/utils/format-price';

import { CardTitle } from './card';
import { Legend } from './legend';

type SummaryBarProps = {
  passengers: PassengerState[];
  accordionContent?: React.ReactNode;
};

export const SummaryBar = ({
  passengers,
  accordionContent,
}: SummaryBarProps) => {
  const [openSummaryDetail, setOpenSummaryDetail] = useState(false);
  const isMobile = useIsMobile();

  const t = messages.seat_plan.summary;

  const summaries = useMemo(() => {
    const totalPrice = passengers?.reduce(
      (acc, passenger) => {
        const alt = passenger?.selectedSeat?.total?.alternatives?.[0]?.[0];
        if (!alt) return acc;
        return {
          amount: acc.amount + (alt.amount ?? 0),
          currency: alt.currency ?? acc.currency,
        };
      },
      { amount: 0, currency: '' }
    );

    const seatCodes = passengers
      ?.map(p => p?.selectedSeat?.code)
      ?.filter(Boolean);

    return [
      {
        label: t.passenger,
        value: `${passengers?.length} ${t.passenger_label}`,
      },
      {
        label: t.seat,
        value: seatCodes?.length > 0 ? seatCodes.join(', ') : '--',
      },
      {
        label: t.total,
        value: totalPrice.currency
          ? formatPrice(totalPrice.amount, { currency: totalPrice.currency })
          : '--',
      },
    ];
  }, [passengers, t]);

  const renderSummaryInfo = () => (
    <div className='flex items-center max-md:justify-between gap-4.5 md:gap-10 text-left max-md:py-4'>
      { summaries.map(summary => (
        <div
          key={ summary.label }
          className='space-y-0.5'>
          <p className='text-text-main text-xs whitespace-nowrap'>
            { summary.label }
          </p>
          <p className='text-black text-sm font-medium'>{ summary.value }</p>
        </div>
      )) }
    </div>
  );

  const renderMobileAccordion = () => (
    <div className='max-md:bg-white flex flex-col max-md:rounded-lg max-md:shadow-sm max-md:w-full max-md:px-4'>
      <AccordionItem
        open={ openSummaryDetail }
        onOpenChange={ setOpenSummaryDetail }
        trigger={ renderSummaryInfo() }
      >
        <div className='-mx-4 divide-y divide-border/60 border-t border-border max-h-[calc(100dvh-156px)] overflow-y-auto'>
          { accordionContent }
          <div className='px-4'>
            <AccordionItem
              trigger={
                <div className='py-4'>
                  <CardTitle>{ t.legend }</CardTitle>
                </div>
              }
            >
              <Legend />
            </AccordionItem>
          </div>
        </div>
      </AccordionItem>
    </div>
  );

  return (
    <>
      { openSummaryDetail && (
        <div
          className='fixed inset-0 bg-black/50 z-50'
          onClick={ () => setOpenSummaryDetail(false) }
        />
      ) }

      <div className='fixed inset-x-0 bottom-0 z-[90] md:shadow-sm flex flex-col gap-3 md:gap-0 md:h-35'>
        <div className='max-md:hidden'>
          <Legend />
        </div>
        <div className='md:border-t md:border-t-border max-md:pt-0 py-4 md:bg-white'>
          <div className='container-page flex gap-3 max-md:flex-col items-center md:justify-between'>
            { isMobile ? renderMobileAccordion() : renderSummaryInfo() }

            <button className='max-md:w-full text-white font-medium text-sm sm:text-base py-2.5 px-6 bg-primary rounded-lg'>
              { t.button }
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
