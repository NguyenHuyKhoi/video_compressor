import {PayloadAction, createSlice} from '@reduxjs/toolkit';
export interface ViewState {
  scrollEnable: boolean;
}
const initialState: ViewState = {
  scrollEnable: true,
};

const slice = createSlice({
  name: 'VIEW_REDUCER',
  initialState: initialState,
  reducers: {
    setScrollEnable: (state, {payload}: PayloadAction<boolean>) => {
      state.scrollEnable = payload;
    },
  },
});
const viewReducer = slice.reducer;
export default viewReducer;
export const {setScrollEnable} = slice.actions;
