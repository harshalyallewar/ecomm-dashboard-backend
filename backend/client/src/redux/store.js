import {configureStore} from '@reduxjs/toolkit';

import alertsSlice from './alertsSlice';

export const Store = configureStore({
  reducer: {
    alerts : alertsSlice
  },
});