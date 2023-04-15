const PAYMENT_ID = [
  'AWAITING PAYMENT',
  'REVISI',
  'AWAITING VERIFICATION',
  'GAGAL',
  'SUCCESS',
];

const PAYMENT_TEXT = [
  'Menunggu Pembayaran',
  'Menunggu Revisi',
  'Menunggu Verifikasi',
  'Pembayaran Gagal/Dibatalkan',
  'Berhasil',
];

export type PaymentId = (typeof PAYMENT_ID)[number];
export type PaymentText = (typeof PAYMENT_TEXT)[number];

export interface PaymentTagProps {
  id: PaymentId;
  name: PaymentText;
}
