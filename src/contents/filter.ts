export const priceMap = {
  0: { lower: 0, upper: Infinity },
  1: { lower: 0, upper: 50000 },
  2: { lower: 50000, upper: 100000 },
  3: { lower: 100000, upper: 300000 },
  4: { lower: 300000, upper: 1000000 },
  5: { lower: 1000000, upper: Infinity },
};

export const ratingMap = {
  0: 0,
  1: 4.5,
  2: 4,
  3: 3,
};

export type FilterFormData = {
  location: string;
};
