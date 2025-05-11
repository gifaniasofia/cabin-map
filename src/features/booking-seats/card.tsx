import React from 'react';

import { cn } from '@/utils/cn';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={ cn(
        'bg-white rounded-md stroke-1 stroke-stroke-disable',
        className
      ) }
    >
      { children }
    </div>
  );
};

type CardTitleProps = {
  children?: React.ReactNode;
  title?: string;
};

export const CardTitle = ({ children, title }: CardTitleProps) => {
  return <h3 className='text-base font-semibold'>{ title ?? children }</h3>;
};
