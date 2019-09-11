
import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import * as isEqual from 'lodash.isequal';
import { Items } from 'src/app/model/items';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, mergeMap, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(
    private db: AngularFireDatabase
  ) { }

  load(offset: number, limit: number): Observable<Items> {
    return this.db.list('/v0/topstories')
      .valueChanges()
      .pipe(
        map(ids => ids.slice(offset, offset + limit)),
        distinctUntilChanged(isEqual),
        map((ids: any[]) => ids.map(id => this.db.object('/v0/item/' + id).valueChanges())),
        map((items: any) => ({
          offset,
          limit,
          total: limit,
          results: items,
        }))
      );
  }
}