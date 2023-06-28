import {useSelector as useReduxSelector} from 'react-redux';
import {RootState} from '@store';
import isEqual from 'react-fast-compare';
import {useEffect, useState} from 'react';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {BackHandler} from 'react-native';

function useSelector<T>(
  selector: (state: RootState) => T,
  equalityFn = isEqual,
): T {
  return useReduxSelector<RootState, T>(selector, equalityFn);
}
type NetInfoTuple = [boolean, boolean];
function useNetWorkStatus(): NetInfoTuple {
  const [status, setStatus] = useState<boolean>(false);
  const [canAccess, setCanAccess] = useState<boolean>(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setStatus(state.isConnected ?? false);
      setCanAccess(state.isInternetReachable ?? false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return [status, canAccess];
}

const useHardwareBackButton = (handler: () => void) => {
  useEffect(() => {
    const backAction = () => {
      if (handler) {
        handler();
        return true; // Indicate that the event has been handled
      }
      return false; // Allow the default back button behavior
    };

    // Add the event listener
    BackHandler.addEventListener('hardwareBackPress', backAction);

    // Clean up the event listener
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, [handler]);
};
export {useSelector, useNetWorkStatus};
