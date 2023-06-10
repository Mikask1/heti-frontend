import { Product } from '@/contents/product';

export function rupiah(number: number) {
  return number.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function getTop(data: Product[][]) {
  const realData = [];

  function shuffleArray(array: Product[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array;
  }

  for (const items of data) {
    for (let index = 0; index < 4; index++) {
      if (items[index]) {
        realData.push(items[index]);
      }
    }
  }

  return shuffleArray(realData);
}
