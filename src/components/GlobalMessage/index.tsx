import {_screen_width, sizes} from '@utils';
import React, {useImperativeHandle, useState} from 'react';
import {
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from 'react-native';

export const globalMessageRef = React.createRef<any>();
export const globalMessage = {
  show: (title: string, content: string) => {
    globalMessageRef?.current?.show(title, content);
  },
};

export interface GlobalMessageProps {
  name?: string;
}

export const GlobalMessage = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  useImperativeHandle(ref, () => {
    return {show: show};
  });

  const show = (titleMess: string, contentMess: string) => {
    setVisible(true);
    setTitle(titleMess);
    setContent(contentMess);
  };

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
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View style={styles.main}>
          <View style={styles.boxContent}>
            <View style={styles.content}>
              <View style={styles.title}>
                <Text style={styles.titleMess}>{title}</Text>
              </View>
              <View style={styles.message}>
                <Text style={styles.contentMess}>{content}</Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setVisible(false);
                }}>
                <Text>Ok</Text>
              </TouchableOpacity>
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
    width: _screen_width / 1.5,
    backgroundColor: 'white',
    borderRadius: sizes._15sdp,
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: sizes._16sdp,
    justifyContent: 'center',
  },
  title: {
    marginVertical: sizes._16sdp,
  },
  message: {
    marginBottom: sizes._16sdp,
  },
  button: {
    width: sizes._80sdp,
    height: sizes._40sdp,
    alignItems: 'center',
  },
  titleMess: {
    fontSize: sizes._17sdp,
    fontWeight: 'bold',
  },
  contentMess: {textAlign: 'center', fontSize: sizes._15sdp},
});
