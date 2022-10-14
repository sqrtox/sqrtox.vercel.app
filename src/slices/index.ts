import { combineReducers, configureStore } from '@reduxjs/toolkit';
/// #if DEVELOPMENT
import { createLogger } from 'redux-logger';
/// #endif
import { themeColorSlice } from '~/slices/theme-color';

const rootReducer = combineReducers({
  themeColor: themeColorSlice.reducer
});

const store = configureStore({
  /// #if DEVELOPMENT
  middleware: getDefaultMiddleware => {
    const middleware = getDefaultMiddleware();

    const logger = createLogger({
      diff: true
    });

    middleware.push(logger);

    return middleware;
  },
  /// #endif
  reducer: rootReducer
});

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof rootReducer>;

export {
  type AppDispatch,
  type RootState,
  store
};
