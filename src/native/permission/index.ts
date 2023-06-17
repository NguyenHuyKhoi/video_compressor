import {check, Permission, request, RESULTS} from 'react-native-permissions';

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
