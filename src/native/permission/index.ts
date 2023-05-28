import {check, Permission, request, RESULTS} from 'react-native-permissions';
export const checkPermission = async (permission: Permission) => {
  try {
    const result = await check(permission);
    switch (result) {
      case RESULTS.UNAVAILABLE:
      case RESULTS.DENIED:
      case RESULTS.BLOCKED:
        return false;
      case RESULTS.LIMITED:
      case RESULTS.GRANTED:
        return true;
    }
  } catch (error) {
    return false;
  }
};

export const requestPermission = async (permission: Permission) => {
  try {
    const result = await request(permission);
    switch (result) {
      case RESULTS.UNAVAILABLE:
      case RESULTS.DENIED:
      case RESULTS.BLOCKED:
        return false;
      case RESULTS.LIMITED:
      case RESULTS.GRANTED:
        return true;
    }
  } catch (error) {
    return false;
  }
};
