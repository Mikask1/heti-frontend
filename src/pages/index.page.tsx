import { useRouter } from 'next/router';
import React from 'react';

const HomePage = () => {
  const router = useRouter();

  if (typeof window !== 'undefined') {
    router.push('/coming-soon');
  }

  return <main className='bg-[#092540] h-screen'></main>;
};

export default HomePage;
