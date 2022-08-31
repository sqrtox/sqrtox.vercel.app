import CssBaseline from '@mui/material/CssBaseline';
import { type FC, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import ThemeModeProvider from '~/components/ThemeModeProvider';
import { store } from '~/store';

type CommonProviderProps = Readonly<{
  children?: ReactNode
}>;

const CommonProvider: FC<CommonProviderProps> = ({ children }) => (
  <Provider store={store}>
    <ThemeModeProvider>
      <CssBaseline />
      {children}
    </ThemeModeProvider>
  </Provider>
);

export default CommonProvider;
export { type CommonProviderProps };
