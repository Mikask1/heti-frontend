import * as React from 'react';

import Tag, { TagColor } from '@/components/tag/Tag';
import { PaymentId, PaymentText } from '@/types/entities/pembayaran';

const colors: Record<
  string,
  { color: keyof typeof TagColor; text: PaymentText }
> = {
  DEFAULT: {
    color: 'DEFAULT',
    text: 'Tidak Diketahui',
  },
  'AWAITING PAYMENT': {
    color: 'purple',
    text: 'Menunggu Pembayaran',
  },
  'AWAITING VERIFICATION': {
    color: 'warning',
    text: 'Menunggu Verifikasi',
  },
  REVISI: {
    color: 'skyblue',
    text: 'Menunggu Revisi',
  },
  GAGAL: {
    color: 'danger',
    text: 'Pembayaran Gagal',
  },
  SUCCESS: {
    color: 'success',
    text: 'Pembayaran Berhasil',
  },
};

const PaymentTag = React.forwardRef<HTMLDivElement, { color: PaymentId }>(
  ({ color, ...rest }, ref) => {
    return (
      <Tag
        ref={ref}
        {...rest}
        color={color ? colors[color].color : 'DEFAULT'}
        size='small'
        className='!text-base'
      >
        {color ? colors[color].text : 'Tidak Diketahui'}
      </Tag>
    );
  }
);

export default PaymentTag;
