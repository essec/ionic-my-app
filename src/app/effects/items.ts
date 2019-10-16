import { Injectable } from '@angular/core';
import { ActionsSubject, Action } from '@ngrx/store';
import { AngularFireDatabase } from '@angular/fire/database';
import { Effect, ofType } from '@ngrx/effects';
import { Observable, combineLatest, of } from 'rxjs';
import { ItemActionTypes, LoadSuccess, LoadFail, Load } from '../actions/items';
import { mergeMap, take, map, catchError } from 'rxjs/operators';
import { Item } from '../model/item';

@Injectable()
export class ItemsEffects {
  constructor(
    private actions$: ActionsSubject,
    private db: AngularFireDatabase
  ) { }
  @Effect()
  loadItems$: Observable<Action> = this.actions$.pipe(
    ofType(ItemActionTypes.Load),
    map((action: Load) => action.payload),
    mergeMap((ids: number[]) =>
      combineLatest(
        ids.map(id => this.db.object('/v0/item/' + id).valueChanges().pipe(take(1)))
      ).pipe(
        map((items: Item[]) => new LoadSuccess(items)),
        catchError(error => of(new LoadFail(error)))
      ))
  );
}
