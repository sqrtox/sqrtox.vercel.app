import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import { type FC } from 'react';
import CommonProvider from '~/components/common/CommonProvider';
import { usePageView } from '~/hooks/usePageView';
import defaultSeoProps from '~next-seo.config';

import 'prism-themes/themes/prism-vsc-dark-plus.css';
import '~/sass/blog-entry.scss';
import '~/sass/code-blocks.scss';
import '~/sass/prism.scss';

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
