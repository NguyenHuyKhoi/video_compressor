import {NativeModules} from 'react-native';
const {VideoModule} = NativeModules;
interface IVideoModule {
  getVideos(path?: string | null): Promise<any[]>;
  getVideoInfo(path?: string | null): Promise<any>;
  createThumbnail(path?: string | null): Promise<any>;
}

export default VideoModule as IVideoModule;
