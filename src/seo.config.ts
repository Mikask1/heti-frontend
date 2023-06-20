// @SEE https://www.npmjs.com/package/next-seo#default-seo-configuration

import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  openGraph: {
    type: 'website',
    locale: 'in_ID',
    url: 'https://www.itsukmexpo.com',
    siteName: 'Kango.id',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
  titleTemplate: '%s | Kango.id',
  description: 'Kango.id',
  defaultTitle: 'Kango.id',
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon/favicon.ico',
    },
  ],
};

export default config;
