import { Story, StoryItem } from '@prisma/client';
import { ApiRoutes } from './constants';
import { axiosInstance } from './instance';

export type IStory = Story & {
  items: StoryItem[];
};

export async function getAll() {
  const { data } = await axiosInstance.get<IStory[]>(ApiRoutes.STORIES);

  return data;
}
