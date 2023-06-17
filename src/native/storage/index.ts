import {NativeModules} from 'react-native';
const {StorageModule} = NativeModules;
interface IStorageModule {
  deleteFile(path: string): Promise<boolean>;
}

export default StorageModule as IStorageModule;
