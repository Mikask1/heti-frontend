import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiFillStar } from 'react-icons/ai';

import Button from '@/components/Button';
import SelectInput from '@/components/form/SelectInput';
import Typography from '@/components/Typography';
import { LOCATION } from '@/constant/location';
import Layout from '@/layouts/Layout';
import clsxm from '@/lib/clsxm';
import SearchBar from '@/pages/homepage/container/SearchBar';
import SearchResult from '@/pages/homepage/container/SearchResult';

const Homepage = () => {
  const [isRecording, setIsRecording] = React.useState(false);

  function record() {
    setIsRecording(!isRecording);
  }

  const [priceFilter, setPriceFilter] = React.useState(0);
  const [ratingFilter, setRatingFilter] = React.useState(0);

  const methods = useForm();

  return (
    <Layout>
      <SearchBar isRecording={isRecording} record={record} />
      <section className='grid grid-cols-[80%_20%] max-w-[80%] mx-auto gap-12 mt-16'>
        <SearchResult />
        <section>
          <div className='w-full shadow-md rounded-lg'>
            <div className='flex flex-col gap-6 p-6'>
              <Typography variant='h6' weight='semibold'>
                Filter
              </Typography>
              <div className='flex flex-col gap-2'>
                <Typography variant='c1' className='font-medium'>
                  Harga
                </Typography>
                <Button
                  variant='primary'
                  className={clsxm('w-full', priceFilter !== 1 && 'bg-white')}
                  textClassName={clsxm(priceFilter !== 1 && 'text-black')}
                  onClick={() => setPriceFilter(priceFilter !== 1 ? 1 : 0)}
                >
                  {'Rp 0rb - Rp 50rb'}
                </Button>
                <Button
                  variant='primary'
                  className={clsxm('w-full', priceFilter !== 2 && 'bg-white')}
                  textClassName={clsxm(priceFilter !== 2 && 'text-black')}
                  onClick={() => setPriceFilter(priceFilter !== 2 ? 2 : 0)}
                >
                  {'Rp 50rb - Rp 100rb'}
                </Button>
                <Button
                  variant='primary'
                  className={clsxm('w-full', priceFilter !== 3 && 'bg-white')}
                  textClassName={clsxm(priceFilter !== 3 && 'text-black')}
                  onClick={() => setPriceFilter(priceFilter !== 3 ? 3 : 0)}
                >
                  {'Rp 100rb - Rp 300rb'}
                </Button>
                <Button
                  variant='primary'
                  className={clsxm('w-full', priceFilter !== 4 && 'bg-white')}
                  textClassName={clsxm(priceFilter !== 4 && 'text-black')}
                  onClick={() => setPriceFilter(priceFilter !== 4 ? 4 : 0)}
                >
                  {'Rp 300rb - Rp 1jt'}
                </Button>
                <Button
                  variant='primary'
                  className={clsxm('w-full', priceFilter !== 5 && 'bg-white')}
                  textClassName={clsxm(priceFilter !== 5 && 'text-black')}
                  onClick={() => setPriceFilter(priceFilter !== 5 ? 5 : 0)}
                >
                  {'> Rp 1jt '}
                </Button>
              </div>
              <div className='flex flex-col gap-2'>
                <Typography variant='c1' weight='medium'>
                  Rating
                </Typography>
                <Button
                  variant='primary'
                  className={clsxm('w-full', ratingFilter !== 1 && 'bg-white')}
                  textClassName={clsxm(ratingFilter !== 1 && 'text-black')}
                  onClick={() => setRatingFilter(ratingFilter !== 1 ? 1 : 0)}
                  leftIcon={AiFillStar}
                  leftIconClassName='text-yellow md:text-[16px]'
                >
                  4.5+
                </Button>
                <Button
                  variant='primary'
                  className={clsxm('w-full', ratingFilter !== 1 && 'bg-white')}
                  textClassName={clsxm(ratingFilter !== 1 && 'text-black')}
                  onClick={() => setRatingFilter(ratingFilter !== 1 ? 1 : 0)}
                  leftIcon={AiFillStar}
                  leftIconClassName='text-yellow md:text-[16px]'
                >
                  4+
                </Button>
                <Button
                  variant='primary'
                  className={clsxm('w-full', ratingFilter !== 1 && 'bg-white')}
                  textClassName={clsxm(ratingFilter !== 1 && 'text-black')}
                  onClick={() => setRatingFilter(ratingFilter !== 1 ? 1 : 0)}
                  leftIcon={AiFillStar}
                  leftIconClassName='text-yellow md:text-[16px]'
                >
                  3+
                </Button>
              </div>
              <div className='flex flex-col gap-2'>
                <Typography variant='c1' className='font-medium'>
                  Lokasi
                </Typography>
                <FormProvider {...methods}>
                  <form>
                    <SelectInput id='location' value={'Surabaya'}>
                      {LOCATION.map((loc, index) => (
                        <option key={index} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </SelectInput>
                    <Button
                      variant='primary'
                      type='submit'
                      className='w-full mt-6'
                    >
                      Apply
                    </Button>
                  </form>
                </FormProvider>
              </div>
            </div>
          </div>
        </section>
      </section>
    </Layout>
  );
};

export default Homepage;
