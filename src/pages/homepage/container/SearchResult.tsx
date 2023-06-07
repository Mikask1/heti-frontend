import React from 'react';

import { Product } from '@/contents/product';
import clsxm from '@/lib/clsxm';
import Item from '@/pages/homepage/components/Item';
import ItemSkeleton from '@/pages/homepage/components/ItemSkeleton';

const random = [5, 10, 2, 8, 3, 9, 7, 1, 4, 6, 12, 11];

const SearchResult = ({
  data,
  className,
}: {
  data: Product[];
  className?: string;
}) => {
  return (
    <section
      className={clsxm(
        'grid md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-4',
        className
      )}
    >
      {data.length
        ? data?.map((item, index) => (
            <Item
              key={index}
              src={item.image_url}
              name={item.name}
              location={item.location}
              price={item.price}
              rating={item.rating}
              href={item.url}
            />
          ))
        : random.map((value, index) => (
            <>
              <ItemSkeleton value={index} key={index} />
            </>
          ))}
    </section>
  );
};

export default SearchResult;
