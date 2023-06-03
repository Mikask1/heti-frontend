import Image from 'next/image';
import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { IoLocationOutline } from 'react-icons/io5';

import Typography from '@/components/Typography';
import { rupiah } from '@/lib/helper';

type ItemProps = {
  src: string;
  name: string;
  location: string;
  price: number;
  rating: number;
};
const Item = ({ src, name, location, price, rating }: ItemProps) => {
  return (
    <div className='h-[350px] w-full shadow-md relative rounded-lg'>
      <div className='w-full h-[230px] bg-base-surface'>
        <Image
          loader={() => src}
          src={src}
          width={200}
          height={200}
          alt='product name'
          className='object-contain w-full h-full'
        />
      </div>
      <div className='h-[120px] absolute bottom-0 px-4 flex flex-col justify-center'>
        <div className='flex flex-col gap-0.5'>
          <Typography variant='bt'>{name}</Typography>
          <Typography variant='bt' weight='bold'>
            {rupiah(price)}
          </Typography>
          <Typography variant='c2'>
            <span className='flex gap-1 items-center'>
              <IoLocationOutline className='text-[16px]' />{' '}
              <span className='mt-0.5'>{location}</span>
            </span>
          </Typography>
          <Typography variant='c2'>
            <span className='flex gap-1 items-center'>
              <AiFillStar className='text-[16px] text-yellow' />{' '}
              <span className='mt-0.5'>{rating}</span>
            </span>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Item;
