import {StandardResolution} from '@model';

export const MIN_WIDTH_VIDEO = 100;
export const MIN_HEIGHT_VIDEO = 100;
export const MIN_PERCENT_COMPRESS_VIDEO = 20;
export const MAX_PERCENT_COMPRESS_VIDEO = 95;
export const STEP_PERCENT_COMPRESS_VIDEO = 5;
export const STANDARD_WIDTHS: StandardResolution[] = [
  {
    value: 2160,
    name: '2160p',
  },
  {
    value: 1080,
    name: '1080p',
  },
  {
    value: 720,
    name: '720',
  },
  {
    value: 480,
    name: '480p',
  },
  {
    value: 360,
    name: '360p',
  },
  {
    value: 240,
    name: '240p',
  },
];
