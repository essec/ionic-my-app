// import * as fromRoot from '../../reducers/';
import * as fromRoot from '../../reducers/items';
import * as fromTopStories from './top-stories';
import * as fromPagination from './pagination';
import * as fromItems from '../../reducers/items';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { getItemsState, getItemEntities } from '../../reducers/items';

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

export const getTopStoriesState = createFeatureSelector<TopStoriesState>('topStories');

export const getPaginationState = createSelector(
  getTopStoriesState,
  state => state.pagination,
);

export const getStoriesState = createSelector(
  getTopStoriesState,
  state => state.stories,
);

export const getStoryIds = createSelector(
  getStoriesState,
  fromTopStories.getIds,
);

export const getDisplayItems = createSelector(
  getStoryIds,
  getItemEntities,
  getPaginationState,
  (ids, entities, pagination) => {
    return {
      results: ids.slice(0, pagination.offset + pagination.limit).map(id => entities[id]),
    };
  }
);

export const isItemsLoading = createSelector(
  getItemsState,
  fromItems.getLoading,
);

export const getItemsError = createSelector(
  getItemsState,
  fromItems.getError,
);

export const isTopStoriesLoading = createSelector(
  getStoriesState,
  fromTopStories.getLoading,
);
export const getTopStoriesError = createSelector(
  getStoriesState,
  fromTopStories.getError,
);
export const getError = createSelector(
  getTopStoriesError,
  getItemsError,
  (e1, e2) => e1 || e2,
);
