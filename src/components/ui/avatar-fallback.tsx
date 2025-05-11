import { cn } from '@/utils/cn';

type AvatarFallbackProps = {
  name: string;
  className?: string;
};

export const AvatarFallback = ({ name, className }: AvatarFallbackProps) => {
  const nameParts = name.split(' ');
  const firstNameInitial = (nameParts?.[0]?.[0] ?? '').toUpperCase();
  const lastNameInitial = (nameParts?.[1]?.[0] ?? '').toUpperCase();

  return (
    <span
      className={ cn(
        'rounded-full relative bg-primary-tint-05 text-primary size-8 shrink-0',
        className
      ) }
    >
      <span className='absolute-center'>
        { firstNameInitial }
        { lastNameInitial }
      </span>
    </span>
  );
};
