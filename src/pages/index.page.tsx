/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FormEvent } from 'react';
import { useForm } from 'react-hook-form';

import SEO from '@/components/SEO';
import Typography from '@/components/Typography';
import { FilterFormData, priceMap, ratingMap } from '@/contents/filter';
import { Product } from '@/contents/product';
import { SearchFormData } from '@/contents/search';
import useMediaRecorder from '@/hooks/useMediaRecorder';
import Layout from '@/layouts/Layout';
import api from '@/lib/api';
import { getTop } from '@/lib/helper';
import Filter from '@/pages/homepage/container/Filter';
import SearchBar from '@/pages/homepage/container/SearchBar';
import SearchResult from '@/pages/homepage/container/SearchResult';

const Homepage = () => {
  const [searchLoading, setSearchLoading] = React.useState(false);
  const [searched, setSearched] = React.useState(false);

  const [priceFilter, setPriceFilter] = React.useState<0 | 1 | 2 | 3 | 4 | 5>(
    0
  );
  const [ratingFilter, setRatingFilter] = React.useState<0 | 1 | 2 | 3>(0);

  const [queryData, setQueryData] = React.useState<Product[][]>([]);
  const [shownData, setShownData] = React.useState<Product[]>([]);
  const [isError, setIsError] = React.useState(false);

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
          setIsError(false);

          if (result.data.data) {
            setQueryData(result.data.data);
            const realData = getTop(result.data.data);
            setShownData(realData);
          } else {
            setIsError(true);
          }

          setSearched(true);
          setSearchLoading(false);
        })
        .catch(() => setIsError(true));
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [audioReady]);

  async function sendText(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearchLoading(true);
    setIsError(false);
    setShownData([]);
    setQueryData([]);
    const el = e.target as any;

    const query: string = el.query.value;

    const queryUrlSafe = encodeURIComponent(query);

    try {
      const result = await api.get(`/recommendation?query=${queryUrlSafe}`);
      if (result.data.data) {
        setQueryData(result.data.data);
        const realData = getTop(result.data.data);
        setShownData(realData);
      } else {
        setIsError(true);
      }
    } catch (err) {
      setIsError(true);
    }

    setSearchLoading(false);
    setSearched(true);
  }

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

  return (
    <Layout>
      <SEO title='Search' description='Heti' />
      <SearchBar
        isRecording={isRecording}
        record={record}
        searchMethods={searchMethods}
        sendText={sendText}
        isLoading={searchLoading}
        className='max-w-[80%] mx-auto lg:max-w-full'
      />
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
        ) : isError ? (
          <Typography
            variant='p'
            className='text-base-secondary order-2 sm:order-1'
          >
            Terjadi suatu kesalahan, mohon mencoba lagi..
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
