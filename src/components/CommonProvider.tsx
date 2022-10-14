import CssBaseline from '@mui/material/CssBaseline';
import { type FC, type ReactNode } from 'react';
import { Provider as ReactReduxProvider } from 'react-redux';
import GoogleAnalytics from '~/components/GoogleAnalytics';
import RouteChangeProgress from '~/components/RouteChangeProgress';
import ThemeColorProvider from '~/components/ThemeColorProvider';
import { store } from '~/slices';

const PRIMARY_MAIN_COLOR = process.env.NEXT_PUBLIC_PRIMARY_MAIN_COLOR;

type CommonProviderProps = Readonly<Partial<{
  children: ReactNode
}>>;

const CommonProvider: FC<CommonProviderProps> = ({ children }) => (
  <ReactReduxProvider store={store}>
    <ThemeColorProvider>
      <GoogleAnalytics />
      <CssBaseline />
      <RouteChangeProgress color={PRIMARY_MAIN_COLOR} />
      {children}
    </ThemeColorProvider>
  </ReactReduxProvider>
);

export default CommonProvider;
export { type CommonProviderProps };
