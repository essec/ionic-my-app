
import { Injectable } from '@angular/core';
import { Observable, combineLatest, Subject, merge } from 'rxjs';
// import * as isEqual from 'lodash.isequal';
import { AngularFireDatabase } from '@angular/fire/database';
import { filter, map, withLatestFrom, switchAll, skip, take } from 'rxjs/operators';
import { Items } from 'src/app/model/items';
import { Item } from 'src/app/model/item';

export interface Query {
  refresh?: boolean;
  offset: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})

export class ItemService {
  private queries: Subject<Query>;
  private rawItemIds: Observable<number[]>;
  totalItem = 0;

  constructor(private db: AngularFireDatabase) {
    this.queries = new Subject<Query>();
  }

  load(query: Query) {
    this.queries.next(query);
  }

  get(): Observable<Items> {
    const rawItemIds = this.db.list<number>('/v0/topstories')
      .valueChanges();
    const itemIds = combineLatest(
      rawItemIds,
      this.queries
    ).pipe(
      filter(([ids, query]) => query.refresh),
      map(([ids, query]) => ids)
    );
    const selector = ({ offset, limit }, ids) =>
      combineLatest(...(ids.slice(offset, offset + limit)
        .map(id => this.db.object<Item>('/v0/item/' + id).valueChanges()))
      ) as Observable<Items>;
    return merge(
      combineLatest(this.queries, itemIds).pipe(
        map(([query, ids]) => selector(query, ids).pipe(take(1)))
      ),
      this.queries.pipe(
        skip(1),
        withLatestFrom(itemIds, selector)
      )
    ).pipe(switchAll());
  }
}
