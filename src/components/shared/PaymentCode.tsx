import * as React from 'react';

import Typography from '@/components/typography/Typography';
import { formatToRupiah } from '@/lib/currency';

export default function PaymentCode({
  code,
  price,
  label,
}: {
  code: string;
  price: string;
  label?: string;
}) {
  const priceCode = formatToRupiah(parseInt(price) + parseInt(code));

  return (
    <>
      <Typography variant='p' className='font-bold text-navy-800'>
        {label}
      </Typography>
      <Typography variant='p' className='font-bold text-typo-primary'>
        {priceCode.substring(0, priceCode.length - 3)}
        <span className='text-success-600'>
          {priceCode.substring(priceCode.length - 3, priceCode.length)}
        </span>
      </Typography>
    </>
  );
}
