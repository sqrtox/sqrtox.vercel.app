import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { themeModeSlice } from '~/store/slices/theme-mode';

const isDev = process.env.NODE_ENV === 'development';

const rootReducer = combineReducers({
  themeMode: themeModeSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    const middleware = getDefaultMiddleware();

    if (isDev) {
      const logger = createLogger({
        diff: true
      });

      middleware.push(logger);
    }

    return middleware;
  }
});

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof rootReducer>;

export {
  type AppDispatch,
  type RootState,
  store
};
