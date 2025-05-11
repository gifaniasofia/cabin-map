import { HeaderBack } from '@/components/layout/header-back';
import locales from '@/locales/en.json';

export default function SeatSelectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = locales.seat_plan.header;

  return (
    <div className='relative'>
      <HeaderBack title={ t.title } />

      <main>{ children }</main>
    </div>
  );
}
