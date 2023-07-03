import {_screen_width, sizes} from '@utils';
import React, {useImperativeHandle, useState} from 'react';
import {
  Modal,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {Button} from '../Button';
import {colors} from '@themes';
import {Text} from '@components';

export interface AlertData {
  title: string;
  content?: string;
  confirmLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}
export const globalAlertRef = React.createRef<any>();
export const globalAlert = {
  show: (data: AlertData) => {
    globalAlertRef?.current?.show(data);
  },
  hide: () => {
    globalAlertRef?.current?.hide();
  },
};

export interface GlobalAlertProps {}

export const GlobalAlert = React.forwardRef((_, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [data, setData] = useState<AlertData | undefined>(undefined);

  useImperativeHandle(ref, () => {
    return {show: show, hide: hide};
  });

  const show = (params: AlertData) => {
    setVisible(true);
    setData(params);
  };
  const hide = () => {
    setVisible(false);
  };
  if (!data) {
    return;
  }

  const {title, content, onCancel, onConfirm, confirmLabel} = data;
  console.log('Global dataL ', title, content);
  return (
    <Modal
      style={styles.main}
      visible={visible}
      animationType={'none'}
      transparent>
      <StatusBar
        translucent
        backgroundColor={'rgba(0,0,0,0.6)'}
        barStyle={'light-content'}
      />
      <TouchableWithoutFeedback
        onPress={() => {
          hide();
        }}>
        <View style={styles.main}>
          <View style={styles.boxContent}>
            <View style={styles.content}>
              <Text style={styles.title}>{title}</Text>
              {content && <Text style={styles.message}>{content}</Text>}
              <View style={styles.footer}>
                <Button
                  label="cancel"
                  labelStyle={styles.cancelLabel as ViewStyle}
                  onPress={() => {
                    onCancel && onCancel();
                    hide();
                  }}
                  style={styles.cancelBtn as ViewStyle}
                />
                <Button
                  label={confirmLabel || 'confirm'}
                  onPress={() => {
                    onConfirm && onConfirm();
                    hide();
                  }}
                  style={styles.button}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContent: {
    width: _screen_width * 0.85,
    marginHorizontal: sizes._32sdp,
    backgroundColor: colors.raisinBlack,
    borderRadius: sizes._15sdp,
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: sizes._25sdp,
    justifyContent: 'center',
  },
  message: {
    marginBottom: sizes._25sdp,
    fontSize: sizes._16sdp,
    fontWeight: '400',
    color: colors.white,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: colors.white,
    marginRight: sizes._20sdp,
  },
  cancelLabel: {
    color: colors.raisinBlack,
  },
  button: {
    flex: 1,
  },
  title: {
    fontSize: sizes._20sdp,
    fontWeight: '500',
    color: colors.white,
    marginBottom: sizes._20sdp,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: sizes._20sdp,
  },
});
