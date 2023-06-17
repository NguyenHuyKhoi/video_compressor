import {VideoEntity, VideoGroupEntity} from '@model';

export const groupVideo = (videos: VideoEntity[]) => {
  console.log('VIDEOS: ', videos);
  const groups: VideoGroupEntity[] = [
    {
      name: 'Download',
      directory: 'Download/',
    },
    {
      name: 'DCIM',
      directory: 'DCIM/',
    },
    {
      name: 'ScreenRecorder',
      directory: 'DCIM/ScreenRecorder/',
    },
    {
      name: 'Camera',
      directory: 'DCIM/Camera/',
    },
    {
      name: 'Movies',
      directory: 'Movies/',
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
