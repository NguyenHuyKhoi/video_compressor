import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  FileType,
  getPersistedUriPermissions,
  stat,
} from 'react-native-scoped-storage';
export interface StorageState {
  folders: FileType[];
  selectedFolder?: FileType | null;
}
const initialState: StorageState = {
  folders: [],
  selectedFolder: undefined,
};

const slice = createSlice({
  name: 'STORAGE_REDUCER',
  initialState: initialState,
  reducers: {
    setGrantedFolder: (state, {payload}: PayloadAction<FileType[]>) => {
      state.folders = payload;
    },
    selectFolder: (state, {payload}: PayloadAction<FileType>) => {
      state.selectedFolder = payload;
    },
  },
});
const storageReducer = slice.reducer;
export default storageReducer;
export const {selectFolder, setGrantedFolder} = slice.actions;
