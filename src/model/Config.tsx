export interface ConfigEntity {
  width: number;
  height: number;
  size?: number;
  resolution?: StandardResolution;
}

export interface StandardResolution {
  name: string;
  value: number;
  value2: number;
}
