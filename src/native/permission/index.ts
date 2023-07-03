import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import {
  check,
  Permission,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import * as ScopedStorage from 'react-native-scoped-storage';
export const WRITE_FOLDER_KEY = 'library_fodler';
export const VIDEO_FOLDER_NAME = 'ICompressVideos';
const convertResult = (result: string) => {
  console.log('Convert permission : ', result);
  switch (result) {
    case RESULTS.UNAVAILABLE:
    case RESULTS.DENIED:
    case RESULTS.BLOCKED:
      return false;
    case RESULTS.LIMITED:
    case RESULTS.GRANTED:
      return true;
    default:
      return false;
  }
};

export const requestPermission = async (permission: Permission) => {
  try {
    var result = convertResult(await check(permission));
    console.log('Check permission : ', permission, result);
    if (!result) {
      result = convertResult(await request(permission));
      console.log('Request permission : ', permission, result);
    }
    return result;
  } catch (error) {
    console.log('error: ', error);
    return false;
  }
};

export const requestReadStorage = async () => {
  try {
    const sdk = await DeviceInfo.getApiLevel();
    return await requestPermission(
      sdk < 33
        ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        : PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
    );
  } catch (error) {
    return false;
  }
};

export const requestWriteStorage = async () => {
  try {
    const sdk = await DeviceInfo.getApiLevel();
    if (sdk < 30) {
      return await requestPermission(
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      );
    } else {
      const folderPath = await AsyncStorage.getItem(WRITE_FOLDER_KEY);
      console.log('folderPath', folderPath);
      if (folderPath) {
        return true;
      }
      const requestFolder = await ScopedStorage.openDocumentTree(true);
      // Create specify folder to contain all compress videos:
      const videoFolder = await ScopedStorage.createDirectory(
        requestFolder.uri,
        VIDEO_FOLDER_NAME,
      );
      console.log('folder: ', videoFolder);
      await AsyncStorage.setItem(WRITE_FOLDER_KEY, videoFolder.uri);
      return true;
    }
  } catch (error) {
    console.log('error: ', error);
    return false;
  }
};
