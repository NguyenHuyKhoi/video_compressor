import {VideoEntity} from './Video';

export interface VideoGroupEntity {
  name: string;
  videos: VideoEntity[];
  directory?: string;
}
