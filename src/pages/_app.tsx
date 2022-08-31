import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import { type FC } from 'react';
import CommonLayout from '~/components/CommonLayout';
import CommonProvider from '~/components/CommonProvider';
import { usePageView } from '~/hooks/usePageView';
import defaultSeoProps from '~~/next-seo.config';

import 'prism-themes/themes/prism-vsc-dark-plus.css';
import '~/sass/blog-entry.scss';
import '~/sass/code-blocks.scss';
import '~/sass/prism.scss';

const App: FC<AppProps> = props => {
  usePageView();

  return (
    <>
      <DefaultSeo {...defaultSeoProps} />
      <CommonProvider>
        <CommonLayout {...props} />
      </CommonProvider>
    </>
  );
};

export default App;
