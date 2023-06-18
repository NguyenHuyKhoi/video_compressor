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
      folder.name =
        folder.name ||
        decodeURIComponent(
          uri.replace(
            'content://com.android.externalstorage.documents/tree/primary%3A',
            '',
          ),
        );
      return folder;
    }),
  );
  dispatch(setGrantedFolder(listFolders));
};
