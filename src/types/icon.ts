import { LucideProps } from 'lucide-react';

// eslint-disable-next-line no-unused-vars
export type IconType = React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>> | ((props?: React.SVGProps<SVGSVGElement>) => React.JSX.Element)