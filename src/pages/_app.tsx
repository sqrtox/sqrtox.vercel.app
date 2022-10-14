import { DefaultSeo } from 'next-seo';
import { type AppProps } from 'next/app';
import { type FC } from 'react';
import CommonProvider from '~/components/CommonProvider';
import { usePageView } from '~/hooks/usePageView';
import defaultSeoProps from '~next-seo.config';

import '~/sass/nprogress.scss';
import '~/sass/global.scss';
import 'prism-themes/themes/prism-vsc-dark-plus.css';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  usePageView();

  return (
    <>
      <DefaultSeo {...defaultSeoProps} />
      <CommonProvider>
        <Component {...pageProps} />
      </CommonProvider>
    </>
  );
};

export default App;
