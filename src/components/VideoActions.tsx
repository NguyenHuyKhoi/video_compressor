import {colors} from '@themes';
import {_screen_width, sizes} from '@utils';
import React, {FC} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {images} from '@assets';
import {VideoEntity} from '@model';
import Share, {
  ShareOptions,
  ShareSingleOptions,
  Social,
} from 'react-native-share';
const itemWidth = sizes._60sdp;
interface IAction {
  title: string;
  image?: any;
  icon?: string;
  warning?: boolean;
  onPress: () => void;
}
const Action: FC<IAction> = ({title, image, icon, warning, onPress}) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <View style={styles.iconView}>
        {image ? (
          <Image source={image} style={styles.itemImage} />
        ) : (
          icon && (
            <Icon
              name={icon}
              size={itemWidth * 0.5}
              style={styles.itemIcon}
              color={warning ? '#ff9966' : colors.white}
            />
          )
        )}
      </View>
      <Text
        adjustsFontSizeToFit
        // eslint-disable-next-line react-native/no-inline-styles
        style={[styles.itemTitle, {color: warning ? '#ff9966' : colors.white}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
interface Props {
  data: VideoEntity;
}
export const VideoActions: FC<Props> = ({data}) => {
  const {uri} = data;
  const shareSocial = (social: Social) => {
    const options: ShareSingleOptions = {
      title: 'Share',
      message: '',
      url: uri,
      social,
      //   whatsAppNumber: '9199999999', // country code + phone number
      filename: data.displayName,

      //  whatsAppNumber: Share.Social.WHATSAPP ? '' : undefined,
      appId: '',
    };
    Share.shareSingle(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };
  const share = () => {
    const options: ShareOptions = {
      title: 'Share',
      message: '',
      url: uri,
    };
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  const deleteVideo = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Action title={'Other'} icon={'share'} onPress={() => share()} />
        <Action
          title={'Email'}
          image={images.gmail}
          onPress={() => shareSocial(Share.Social.EMAIL)}
        />
        <Action
          title={'Messenger'}
          image={images.messenger}
          onPress={() => shareSocial(Share.Social.MESSENGER)}
        />
        <Action
          title={'Facebook'}
          image={images.facebook}
          onPress={() => shareSocial(Share.Social.FACEBOOK)}
        />
        <Action
          title={'Instagram'}
          image={images.instagram}
          onPress={() => shareSocial(Share.Social.INSTAGRAM)}
        />
      </View>
      <View style={styles.row}>
        <Action
          title={'Telegram'}
          image={images.telegram}
          onPress={() => shareSocial(Share.Social.TELEGRAM)}
        />
        <Action
          title={'Whatsapp'}
          image={images.whatsapp}
          onPress={() => shareSocial(Share.Social.WHATSAPP)}
        />
        <Action
          warning
          title={'Delete'}
          icon={'delete'}
          onPress={deleteVideo}
        />
        <View style={{width: itemWidth}} />
        <View style={{width: itemWidth}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: itemWidth,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: sizes._10sdp,
  },
  iconView: {
    width: '90%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: sizes._100sdp,
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTitle: {
    marginTop: sizes._5sdp,
    fontWeight: '600',
    color: colors.white,
    fontSize: sizes._11sdp,
  },
  itemImage: {
    width: itemWidth * 0.5,
    height: itemWidth * 0.5,
  },
  itemIcon: {},
});
