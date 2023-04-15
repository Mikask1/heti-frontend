import { format } from 'date-fns';
import * as React from 'react';

import Logo from '@/components/Logo';
import NextImage from '@/components/NextImage';
import Typography from '@/components/typography/Typography';
import Navigation from '@/layouts/dashboard/Navigation';
import UserAction from '@/layouts/dashboard/UserAction';

export default function DesktopNavigation() {
  return (
    <>
      <div className='hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-dashboard lg:pt-8 lg:pb-4'>
        <NextImage
          src={'/dashboard/picture.png'}
          alt={'Picture'}
          width={431}
          height={746}
          className='absolute bottom-0 left-0 w-3/4 z-[-2]'
        />
        <NextImage
          src={'/dashboard/outline.png'}
          alt={'Picture'}
          width={431}
          height={526}
          className='absolute bottom-0 right-0 w-3/4 z-[-3]'
        />
        <div className='flex items-center justify-center'>
          <Logo />
        </div>

        {/* Sidebar component */}
        <div className='mt-6 flex h-0 flex-1 flex-col overflow-y-auto'>
          {/* Navigation */}
          <Navigation className='mt-6' />
        </div>
      </div>
      <div className='hidden lg:fixed right-0 top-0 w-[calc(100%-16rem)] h-16 bg-white shadow-navbar-dashboard lg:flex justify-between z-[99]'>
        <Typography className='my-auto pl-10'>
          {format(new Date(), 'EEEE, dd MMMM yyyy')}
        </Typography>
        <UserAction />
      </div>
    </>
  );
}
