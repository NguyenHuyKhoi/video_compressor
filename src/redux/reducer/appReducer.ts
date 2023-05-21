import {createSlice} from '@reduxjs/toolkit';
export interface AppSate {}
const initialState: AppSate = {};
const slice = createSlice({
  name: 'APP_STATE',
  initialState: initialState,
  reducers: {
    // onSetToken: (state, {payload}: PayloadAction<string>) => {
    //   state.token = payload;
    // },
  },
});
const appReducer = slice.reducer;
export default appReducer;
export const {} = slice.actions;
