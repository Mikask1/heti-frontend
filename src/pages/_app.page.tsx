import '@/styles/globals.css';
import '@/styles/nprogress.css';
import 'aos/dist/aos.css';

import {
  QueryClient,
  QueryClientProvider,
  QueryOptions,
} from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import { DefaultSeo } from 'next-seo';
import nProgress from 'nprogress';

import api from '@/lib/api';
import clsxm from '@/lib/clsxm';
import { inter } from '@/lib/font';
import SEO from '@/seo.config';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

const defaultQueryFn = async ({ queryKey }: QueryOptions) => {
  const { data } = await api.get(`${queryKey?.[0]}`);
  return data;
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <DefaultSeo {...SEO} />
      <div className={clsxm(inter.variable)}>
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}
