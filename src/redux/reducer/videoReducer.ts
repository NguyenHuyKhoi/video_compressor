import {PayloadAction, createSlice} from '@reduxjs/toolkit';
export interface VideoState {
  deleted_uris: string[];
}
const initialState: VideoState = {
  deleted_uris: [],
};

const slice = createSlice({
  name: 'VIDEO_REDUCER',
  initialState: initialState,
  reducers: {
    onDeleteVideo: (state, {payload}: PayloadAction<string>) => {
      state.deleted_uris.push(payload);
    },
  },
});
const videoReducer = slice.reducer;
export default videoReducer;
export const {onDeleteVideo} = slice.actions;
