import Image from 'next/image';
import React from 'react';

import Typography from '@/components/Typography';

const Navbar = () => {
  return (
    <header className='fixed top-0 h-14 shadow-md bg-violet w-full z-20'>
      <div className='flex justify-between items-center h-full max-w-[80%] mx-auto'>
        <div className='flex items-center gap-2'>
          <Image
            src='/logo_white.svg'
            alt='Logo Kango.id'
            width={25}
            height={24}
          ></Image>
          <Typography
            variant='t'
            weight='bold'
            className='leading-none mt-0.5 text-white'
          >
            Kango.id
          </Typography>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
