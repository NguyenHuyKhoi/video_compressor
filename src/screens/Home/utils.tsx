import {VideoEntity, VideoGroupEntity} from '@model';

export const groupVideo = (videos: VideoEntity[]) => {
  const groups: VideoGroupEntity[] = [
    {
      name: 'Video bị nén',
      directory: 'Movies/IdeaVideoCompressor/',
    },
    {
      name: 'Download',
      directory: 'Download/',
    },
    {
      name: 'ScreenRecorder',
      directory: 'DCIM/ScreenRecorder/',
    },
    {
      name: 'Camera',
      directory: 'DCIM/Camera/',
    },
  ];

  groups.forEach((group: VideoGroupEntity, index: number) => {
    groups[index].items = videos.filter(
      (video: VideoEntity) => video.relativePath === group.directory,
    );
    groups[index].size =
      groups[index].items?.reduce(
        (sum: number, video: VideoEntity) => (sum += video.size),
        0,
      ) || 0;
  });
  return groups;
};
