import * as React from 'react';

import { TagColor } from '@/components/tag/Tag';
import Typography from '@/components/typography/Typography';
import clsxm from '@/lib/clsxm';
import { PaymentId, PaymentText } from '@/types/entities/pembayaran';

const colors: Record<
  string,
  { color: keyof typeof TagColor; background: string; text: PaymentText }
> = {
  DEFAULT: {
    color: 'DEFAULT',
    background: 'bg-critical-100',
    text: 'Tidak Diketahui',
  },
  'AWAITING PAYMENT': {
    color: 'purple',
    background: 'bg-[#F1EBFB]',
    text: 'Menunggu Pembayaran',
  },
  'AWAITING VERIFICATION': {
    color: 'warning',
    background: 'bg-warning-100',
    text: 'Menunggu Verifikasi',
  },
  REVISI: {
    color: 'skyblue',
    background: 'bg-blue-100',
    text: 'Upload Ulang Bukti Pembayaran',
  },
  GAGAL: {
    color: 'danger',
    background: 'bg-critical-100',
    text: 'Pembayaran Gagal/Dibatalkan',
  },
  SUCCESS: {
    color: 'success',
    background: 'bg-success-100',
    text: 'Pembayaran Berhasil',
  },
};

export default function StatusPembayaranCard({
  status,
}: {
  status: PaymentId;
}) {
  return (
    <div className='space-y-2'>
      <Typography
        as='p'
        variant='caption'
        className='text-typo-icon font-medium'
      >
        Status Pembayaran
      </Typography>
      <div
        className={clsxm(
          'w-full h-11 rounded-lg flex justify-center items-center text-center p-6 sm:p-0',
          colors[status].background
        )}
      >
        <Typography as='p' variant='b1' color={colors[status].color}>
          {colors[status].text}
        </Typography>
      </div>
    </div>
  );
}
