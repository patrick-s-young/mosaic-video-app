import { combineReducers } from '@reduxjs/toolkit';
import  navSlice  from 'features/navigation/navSlice';

import appSlice from 'app/appSlice';

const rootReducer = combineReducers({
  app: appSlice,
  nav: navSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;