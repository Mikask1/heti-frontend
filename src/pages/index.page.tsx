/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FormEvent } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BsArrowRight } from 'react-icons/bs';

import Button from '@/components/Button';
import SelectInput from '@/components/form/SelectInput';
import SEO from '@/components/SEO';
import Typography from '@/components/Typography';
import { LOCATION_ONGKIR } from '@/constant/location';
import { FilterFormData, priceMap, ratingMap } from '@/contents/filter';
import { Product } from '@/contents/product';
import { LocationFormData, SearchFormData } from '@/contents/search';
import useMediaRecorder from '@/hooks/useMediaRecorder';
import Layout from '@/layouts/Layout';
import api from '@/lib/api';
import { getTop, rupiah } from '@/lib/helper';
import Filter from '@/pages/homepage/container/Filter';
import SearchBar from '@/pages/homepage/container/SearchBar';
import SearchResult from '@/pages/homepage/container/SearchResult';

const Homepage = () => {
  // SEARCH
  const [searchLoading, setSearchLoading] = React.useState(false);
  const [searched, setSearched] = React.useState(false);

  // FILTER
  const [priceFilter, setPriceFilter] = React.useState<0 | 1 | 2 | 3 | 4 | 5>(
    0
  );
  const [ratingFilter, setRatingFilter] = React.useState<0 | 1 | 2 | 3>(0);

  // QUERY DATA
  const [queryData, setQueryData] = React.useState<Product[][]>([]);
  const [shownData, setShownData] = React.useState<Product[]>([]);
  const [error, setError] = React.useState<string>();
  const [productSearch, setProductSearch] = React.useState<string>();

  // RECORD
  const {
    startRecording,
    stopRecording,
    isRecording,
    audioChunks,
    audioReady,
  } = useMediaRecorder();

  async function record() {
    if (!isRecording) {
      // Start Recording
      startRecording();
    } else {
      // Stop Recording
      stopRecording();
      setSearchLoading(true);
      setShownData([]);
      setQueryData([]);
    }
  }

  const methods = useForm<FilterFormData>();
  const searchMethods = useForm<SearchFormData>();
  const ongkirMethods = useForm<LocationFormData>();

  // SEARCH VOICE
  React.useEffect(() => {
    if (audioChunks.length > 0 && audioReady && searchLoading) {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });

      const audioFile = new File([audioBlob], 'recording.webm', {
        type: 'audio/webm',
      });
      const formData = new FormData();

      formData.append('file', audioFile, 'recording.webm');

      api
        .post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((result) => {
          setError('');

          if (result.data.success) {
            setQueryData(result.data.data.products);
            const realData = getTop(result.data.data.products);
            setShownData(realData);
            setProductSearch(result.data.data.message);
          } else {
            setError(result.data.message);
          }

          setSearched(true);
          setSearchLoading(false);
        })
        .catch(() => setError('Terjadi suatu kesalahan, mohon mencoba lagi..'));
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [audioReady]);

  // SEARCH TEXT
  async function sendText(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearchLoading(true);
    setError('');
    setShownData([]);
    setQueryData([]);
    const el = e.target as any;

    const query: string = el.query.value;

    const queryUrlSafe = encodeURIComponent(query);

    try {
      const result = await api.get(`/recommendation?query=${queryUrlSafe}`);
      if (result.data.success) {
        setQueryData(result.data.data.products);
        const realData = getTop(result.data.data.products);
        setShownData(realData);
        setProductSearch(result.data.data.message);
      } else {
        setError(result.data.message);
      }
    } catch (err) {
      setError('Terjadi suatu kesalahan, mohon mencoba lagi..');
    }

    setSearchLoading(false);
    setSearched(true);
  }

  // FILTER
  function applyFilter(data: FilterFormData) {
    const filter = {
      location: data.location,
      price: priceMap[priceFilter],
      rating: ratingMap[ratingFilter],
    };

    const filteredData = [];

    for (const items of queryData) {
      const filtered = items.filter(
        (item) =>
          (filter.location == item.location || filter.location == 'None') &&
          filter.price.lower < item.price &&
          item.price < filter.price.upper &&
          item.rating > filter.rating
      );
      filteredData.push(filtered);
    }

    const realData = getTop(filteredData);

    setShownData(realData);
  }

  const [ongkir, setOngkir] = React.useState(0);
  const [ongkirLoading, setOngkirLoading] = React.useState(false);
  async function fetchOngkir(data: LocationFormData) {
    setOngkirLoading(true);
    try {
      const response = await api.get(
        `/cekongkir?src=${data.src}&dest=${data.dest}`
      );

      setOngkir(response.data.data);
    } catch (error) {
      setOngkirLoading(false);
    }

    setOngkirLoading(false);
  }
  return (
    <Layout>
      <SEO title='Search' description='Search your medical solutions now!' />
      <SearchBar
        isRecording={isRecording}
        record={record}
        searchMethods={searchMethods}
        sendText={sendText}
        isLoading={searchLoading}
        className='max-w-[80%] mx-auto lg:max-w-full'
        value={productSearch}
      />

      <div className='max-w-[80%] mx-auto gap-4 my-7'>
        <FormProvider {...ongkirMethods}>
          <Typography variant='bt'>
            Cari Ongkir{' '}
            <span className='text-sm text-gray-500'>(per 1 kg)</span>
          </Typography>
          <form
            onSubmit={ongkirMethods.handleSubmit((data) => fetchOngkir(data))}
            className='flex items-center md:w-[60%] lg:w-[70%] xl:w-[35%] gap-2'
          >
            <SelectInput id='src'>
              {LOCATION_ONGKIR.map((loc, index) => (
                <option key={index} value={loc.city_id}>
                  {loc.city_name}
                </option>
              ))}
            </SelectInput>
            <BsArrowRight className='text-5xl' />
            <SelectInput id='dest'>
              {LOCATION_ONGKIR.map((loc, index) => (
                <option key={index} value={loc.city_id}>
                  {loc.city_name}
                </option>
              ))}
            </SelectInput>
            <Button
              variant='primary'
              type='submit'
              className='h-full'
              isLoading={ongkirLoading}
            >
              Cari
            </Button>
          </form>
          <Typography variant='c1' className='text-base-secondary'>
            Ongkir: {rupiah(ongkir)}
          </Typography>
        </FormProvider>
      </div>

      {!searched && !searchLoading && (
        <Typography
          variant='bt'
          className='text-base-secondary max-w-[80%] mx-auto mb-5'
        >
          Silahkan mencari lewat search bar atau lewat microphone..
        </Typography>
      )}
      <section className='grid sm:grid-cols-2 md:grid-cols-[70%_30%] lg:grid-cols-[80%_20%] max-w-[80%] mx-auto gap-12'>
        {searchLoading ? (
          <SearchResult data={[]} className='order-2 sm:order-1' />
        ) : error ? (
          <Typography variant='bt' className='text-red-500 order-2 sm:order-1'>
            {error}
          </Typography>
        ) : (
          <SearchResult data={shownData} className='order-2 sm:order-1' />
        )}
        <Filter
          ratingFilter={ratingFilter}
          priceFilter={priceFilter}
          setRatingFilter={setRatingFilter}
          setPriceFilter={setPriceFilter}
          methods={methods}
          applyFilter={applyFilter}
          className='order-1'
        />
      </section>
    </Layout>
  );
};

export default Homepage;
