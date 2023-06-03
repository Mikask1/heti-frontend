export function rupiah(number: number) {
  return number.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
}
