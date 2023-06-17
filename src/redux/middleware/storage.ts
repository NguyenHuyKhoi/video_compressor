import {dispatch} from '@common';
import {
  FileType,
  getPersistedUriPermissions,
  stat,
} from 'react-native-scoped-storage';
import {setGrantedFolder} from '@reducer';

export const refreshGrantedFolders = async () => {
  const uris = await getPersistedUriPermissions();
  const listFolders: FileType[] = await Promise.all(
    uris.map(async (uri: string) => {
      const folder = await stat(uri);
      return folder;
    }),
  );
  dispatch(setGrantedFolder(listFolders));
};
