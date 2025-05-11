'use client';

import { LazyMotion, m } from 'framer-motion';
import dynamic from 'next/dynamic';

type MotionLazyProps = {
  children: React.ReactNode;
};

const loadFeaturesAsync = async() =>
  import('./feature').then(res => res.default);

const MotionLazy = ({ children }: MotionLazyProps) => {
  return (
    <LazyMotion
      strict
      features={ loadFeaturesAsync }>
      <m.div>{ children }</m.div>
    </LazyMotion>
  );
};

export default dynamic(() => Promise.resolve(MotionLazy), { ssr: false });
