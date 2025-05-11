import { cn } from '@/utils/cn';

export const Checkbox = ({
  className,
  ...props
}: React.ComponentProps<'input'>) => {
  return (
    <div className='group grid size-4 grid-cols-1 shrink-0'>
      <input
        type='checkbox'
        className={ cn(
          'col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto',
          className
        ) }
        { ...props }
      />
      <svg
        fill='none'
        viewBox='0 0 14 14'
        className='pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25'
      >
        <path
          d='M3 8L6 11L11 3.5'
          strokeWidth={ 2 }
          strokeLinecap='round'
          strokeLinejoin='round'
          className='opacity-0 group-has-[:checked]:opacity-100'
        />
        <path
          d='M3 7H11'
          strokeWidth={ 2 }
          strokeLinecap='round'
          strokeLinejoin='round'
          className='opacity-0 group-has-[:indeterminate]:opacity-100'
        />
      </svg>
    </div>
  );
};
