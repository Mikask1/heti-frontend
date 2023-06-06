import Image from 'next/image';
import React from 'react';

import Typography from '@/components/Typography';

const Navbar = () => {
  return (
    <header className='fixed top-0 h-14 shadow-md bg-white w-full z-20'>
      <div className='flex justify-between items-center h-full px-24'>
        <div className='flex items-center gap-2'>
          <Image src='/logo.svg' alt='Logo Heti' width={25} height={24}></Image>
          <Typography variant='t' weight='bold' className='leading-none mt-0.5'>
            Heti
          </Typography>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
