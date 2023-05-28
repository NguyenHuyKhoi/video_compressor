export interface ConfigEntity {
  percentage?: number;
  width: number;
  height: number;
  size?: number;
  bitrate: number;
  standard?: string;
}

export interface StandardResolution {
  name: string;
  value: number;
}
