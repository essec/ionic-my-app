import { Item } from '../model/item';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ItemActions, ItemActionTypes } from '../actions/items';
import { createFeatureSelector } from '@ngrx/store';

export interface State extends EntityState<Item> {
  loading: boolean;
  error: any;
}

export const adapter: EntityAdapter<Item> = createEntityAdapter<Item>({
  selectId: (item: Item) => item.id,
  sortComparer: false,
});

export const initalState: State = adapter.getInitialState({
  loading: false,
  error: null,
});

export function reducer(
  state = initalState,
  action: ItemActions,
): State {
  switch (action.type) {
    case ItemActionTypes.Load: {
      return {
        ...this.state,
        loading: true,
      };
    }
    case ItemActionTypes.LoadFail: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export const getItemsState = createFeatureSelector<State>('items');

export const {
  selectEntities: getItemEntities,
} = adapter.getSelectors(getItemsState);

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;
