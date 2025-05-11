'use client';

import React, { useState } from 'react';
import useMeasure from 'react-use-measure';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

import { cn } from '@/utils/cn';

type AccordionItemProps = {
  trigger: string | React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void; // eslint-disable-line no-unused-vars
  classNames?: {
    button?: string;
  };
};

export const AccordionItem = ({
  trigger,
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  classNames,
}: AccordionItemProps) => {
  const [ref, { height }] = useMeasure();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const toggleOpen = () => {
    const newOpen = !open;
    if (isControlled) {
      onOpenChange?.(newOpen);
    } else {
      setUncontrolledOpen(newOpen);
    }
  };

  return (
    <motion.div animate={ open ? 'open' : 'closed' }>
      <button
        onClick={ toggleOpen }
        className={ cn(
          'flex w-full text-left items-center justify-between gap-4',
          classNames?.button
        ) }
      >
        { trigger }

        <motion.span
          variants={ {
            open: { rotate: '-90deg' },
            closed: { rotate: '0deg' },
          } }
        >
          <ChevronRight className='text-2xl text-text-main' />
        </motion.span>
      </button>
      <motion.div
        initial={ false }
        animate={ { height: open ? height : '0px' } }
        className='overflow-hidden'
      >
        <div ref={ ref }>{ children }</div>
      </motion.div>
    </motion.div>
  );
};
