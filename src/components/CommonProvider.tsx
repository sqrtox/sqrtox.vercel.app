import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { type FC, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import ThemeModeProvider from '~/components/ThemeModeProvider';
import { store } from '~/store';

type CommonProviderProps = Readonly<{
  children?: ReactNode
}>;

const NONCE = process.env.NEXT_PUBLIC_NONCE;

const CommonProvider: FC<CommonProviderProps> = ({ children }) => {
  const cache = createCache({
    key: 'css',
    nonce: NONCE
  });

  return (
    <CacheProvider value={cache}>
      <Provider store={store}>
        <ThemeModeProvider>
          <CssBaseline />
          {children}
        </ThemeModeProvider>
      </Provider>
    </CacheProvider>
  );
};

export default CommonProvider;
export { type CommonProviderProps };
