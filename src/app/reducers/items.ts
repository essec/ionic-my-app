import { Item } from '../model/item';
import { EntityState } from '@ngrx/entity';

export interface State extends EntityState<Item> {
    loading: boolean;
    error: any;
}
