export interface VideoEntity {
  id: number;
  title: string;
  displayName: string;
  data: string;
  duration: number;
  size: number;
  relativePath: string;
  bitrate: number;
  width: number;
  height: number;
  resolution: string;
  uri: string;
  base64Thumb: string;
  orientation: ORIENTATION;
  createdAt: string;
}

export enum ORIENTATION {
  PORTRAIT = '0',
  LANDSCAPE = '90',
}
