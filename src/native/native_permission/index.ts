import {NativeModules} from 'react-native';
const {PermissionModule} = NativeModules;
interface IPermissionModule {
  requestWritePermission(): Promise<string>;
}

export default PermissionModule as IPermissionModule;
