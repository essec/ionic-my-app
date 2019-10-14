import * as fromRoot from '../../reducers/';
import * as fromTopStories from './top-stories';
import * as fromPagination from './pagination';
import * as fromItems from '../../reducers/items';
import { ActionReducerMap } from '@ngrx/store';

export interface TopStoriesState {
  stories: fromTopStories.State;
  pagination: fromPagination.State;
}

export interface State extends fromRoot.State {
  items: fromItems.State;
  topStories: TopStoriesState;
}

export interface State extends fromRoot.State {
  items: fromItems.State;
  topStories: TopStoriesState;
}

export const reducers: ActionReducerMap<TopStoriesState> = {
  stories: fromTopStories.reducer,
  pagination: fromPagination.reducer,
};
