import { Item } from './item';
import { Observable } from 'rxjs';

export interface Items {
    offset: number;
    limit: number;
    total?: number;
    results: Observable<Item>;
}