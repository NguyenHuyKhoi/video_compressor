export const images = {
  facebook: require('./facebook.png'),
  gmail: require('./gmail.png'),
  instagram: require('./instagram.png'),
  line: require('./line.png'),
  linkedin: require('./linkedin.png'),
  telegram: require('./telegram.png'),
  twitter: require('./twitter.png'),
  whatsapp: require('./whatsapp.png'),
  youtube: require('./youtube.png'),
  messenger: require('./messenger.png'),
  emtpy: require('./empty.png'),
  folder: require('./folder.png'),
};

export type ImageTypes = keyof typeof images;
