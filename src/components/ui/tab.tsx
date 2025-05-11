'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { cn } from '@/utils/cn';

type TabProps = {
  selected: boolean;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  classNames?: {
    button?: string;
    line?: string;
  };
};

export const Tab = ({ selected, children, classNames, onClick }: TabProps) => {
  return (
    <div className='relative w-full'>
      <button
        onClick={ onClick }
        className={ cn(
          'relative z-0 flex w-full border-b-4 border-primary-tint-05/20 group hover:border-primary-tint-05/50 flex-row items-center justify-center gap-4 px-4 pb-4 transition-colors md:flex-col',
          classNames?.button
        ) }
      >
        <span
          className={ cn(
            'w-full font-semibold text-start text-1.75xl transition-opacity md:text-center',
            selected ? 'text-white' : 'text-neutral-gray-07'
          ) }
        >
          { children }
        </span>
      </button>
      { selected && (
        <motion.span
          layoutId='tabs-features-underline'
          className={ cn(
            'absolute bottom-0 left-0 right-0 z-10 h-1 bg-primary-tint-05',
            classNames?.line
          ) }
        />
      ) }
    </div>
  );
};
