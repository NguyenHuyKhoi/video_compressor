import {StandardResolution} from '@model';

export const MIN_WIDTH_VIDEO = 100;
export const MIN_HEIGHT_VIDEO = 100;
export const MIN_PERCENT_COMPRESS_VIDEO = 20;
export const MAX_PERCENT_COMPRESS_VIDEO = 95;
export const STEP_PERCENT_COMPRESS_VIDEO = 5;
export const RESOLUTIONS: StandardResolution[] = [
  {
    value: 2160,
    value2: 3840,
    name: '4K',
    bitrate: '35M',
  },
  {
    value: 1440,
    value2: 2560,
    name: '2K',
    bitrate: '16M',
  },
  {
    value: 1080,
    value2: 1920,
    name: '1080p',
    bitrate: '8M',
  },
  {
    value: 720,
    value2: 1280,
    name: '720p',
    bitrate: '5M',
  },
  {
    value: 480,
    value2: 640,
    name: '480p',
    bitrate: '2.5M',
  },
  {
    value: 360,
    value2: 480,
    name: '360p',
    bitrate: '1M',
  },
];
