import {VideoEntity} from './Video';

export interface VideoGroupEntity {
  name: string;
  items: VideoEntity[];
  size: number;
}
