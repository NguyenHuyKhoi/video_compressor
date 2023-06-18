export const formatBytes = (bytes: number, decimals: number = 1) => {
  if (!+bytes) {
    return '0 B';
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const formatFFmpegBytes = (bytes: number, decimals: number = 1) => {
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'K', 'M'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))}${sizes[i]}`;
};

export const formatDuration = (duration: number) => {
  var hours: any = Math.floor(duration / 3600);
  var minutes: any = Math.floor((duration - hours * 3600) / 60);
  var seconds: any = duration - hours * 3600 - minutes * 60;
  hours = hours === 0 ? '' : hours < 10 ? '0' + hours + ':' : hours + ':';
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return hours + minutes + ':' + seconds;
};
