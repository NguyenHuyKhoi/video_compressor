import {showMessage} from 'react-native-flash-message';

export enum ToastType {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'danger',
  WARNING = 'warning',
  NOTIF = 'NOTIF',
}
export const showNotifications = (
  message: string,
  description: string,
  onPress?: () => void,
  duration: number = 3000,
) => {
  showMessage({
    type: ToastType.NOTIF,
    message,
    description,
    onPress: onPress || undefined,
    duration,
  });
};
export const showToast = (
  type: ToastType,
  message: string,
  duration: number = 3000,
) => {
  showMessage({
    message,
    type,
    duration,
  });
};

export const showApiError = (message: string, duration?: number) => {
  showToast(ToastType.ERROR, message || 'Thao tác không thành công!', duration);
};
export const showApiSuccess = (message?: string, duration?: number) => {
  showToast(ToastType.SUCCESS, message || 'Thao tác thành công!', duration);
};
