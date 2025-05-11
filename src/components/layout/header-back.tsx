import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

type HeaderBackProps = {
  title?: string;
};

export const HeaderBack = ({ title }: HeaderBackProps) => {
  return (
    <header className='relative inset-x-0 top-0 isolate z-40 bg-primary'>
      <nav className='fixed inset-x-0 top-0 bg-primary'>
        <div className='w-full h-15 container-page'>
          <div className='flex items-center gap-2 h-full text-white'>
            <ArrowLeft className='size-6' />
            <h1 className='text-xl sm:text-1.75xl/tight font-semibold'>
              { title }
            </h1>
          </div>
        </div>
      </nav>
      <div className='h-70 absolute top-0 inset-x-0'>
        <div className='relative overflow-hidden h-[220px] aspect-[360/280] w-full max-w-xl mx-auto'>
          <Image
            src='/images/world-vector.webp'
            alt='vector'
            className='size-full object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            priority
            fill
          />
        </div>
      </div>
    </header>
  );
};
