import * as React from 'react';

import Typography from '@/components/typography/Typography';
import useCountdown from '@/hooks/useCountdown';
import clsxm from '@/lib/clsxm';

export default function Countdown({
  closeDate,
  // eslint-disable-next-line unused-imports/no-unused-vars
  startDate,
}: {
  closeDate: Date;
  startDate: Date;
} & React.ComponentPropsWithoutRef<'div'>) {
  const [days, hours, minutes] = useCountdown(new Date(closeDate));

  return (
    <div className='w-full flex items-center gap-2'>
      <div
        className={clsxm(
          'w-full md:w-20 flex flex-col items-center p-3',
          'rounded-md bg-typo-surface'
        )}
      >
        <Typography as='h5' variant='h5' className='font-bold'>
          {days}
        </Typography>
        <Typography variant='c' color='secondary' className='font-semibold'>
          Hari
        </Typography>
      </div>

      <Typography as='p' variant='p' className='text-typo-icon'>
        :
      </Typography>

      <div className='w-full md:w-20 flex flex-col items-center p-3 rounded-md bg-typo-surface'>
        <Typography as='h5' variant='h5' className='font-bold'>
          {hours}
        </Typography>
        <Typography variant='c' color='secondary' className='font-semibold'>
          Jam
        </Typography>
      </div>

      <Typography as='p' variant='p' className='text-typo-icon'>
        :
      </Typography>

      <div className='w-full md:w-20 flex flex-col items-center p-3 rounded-md bg-typo-surface'>
        <Typography as='h5' variant='h5' className='font-bold'>
          {minutes}
        </Typography>
        <Typography variant='c' color='secondary' className='font-semibold'>
          Menit
        </Typography>
      </div>
    </div>
  );
}
