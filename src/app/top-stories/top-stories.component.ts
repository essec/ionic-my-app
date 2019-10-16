import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Items } from '../model/items';
import { Subscription, Observable, from } from 'rxjs';
import { ItemService } from '../services/services/item/item.service';

import * as fromTopStories from './reducers';
import * as topStoriesActions from './actions/top-stories';
import { LoadingController, ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { filter, concatMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-top-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './top-stories.component.html',
  styleUrls: ['./top-stories.component.scss'],
})

export class TopStoriesComponent implements OnInit, OnDestroy {
  items$: Observable<Items>;
  private itemsLoading$: Observable<boolean>;
  private idsLoading$: Observable<boolean>;
  private errors$: Observable<any>;
  private loading: HTMLIonLoadingElement;
  private subscriptions: Subscription[];
  private infiniteScrollComponent: any;
  private refresherComponent: any;

  constructor(
    private store: Store<fromTopStories.State>,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.items$ = store.pipe(select(fromTopStories.getDisplayItems), map(items => items.results));
    this.itemsLoading$ = store.pipe(select(fromTopStories.isItemsLoading));
    this.idsLoading$ = store.pipe(select(fromTopStories.isTopStoriesLoading));
    this.errors$ = store.pipe(select(fromTopStories.getError), filter(error => error != null));
    this.subscriptions = [];
  }

  ngOnInit() {
    this.subscriptions.push(this.itemsLoading$.
      subscribe(loading => {
        if (!loading) {
          this.notifyScrollComplete();
        }
      }));
    this.subscriptions.push(this.idsLoading$.
      pipe(concatMap(loading => {
        return loading ? from(this.showLoading()) : from(this.
          hideLoading());
      })).subscribe());
    this.subscriptions.push(this.errors$.pipe(concatMap(error => from(this.showError(error)))).subscribe());
    this.doLoad(true);
  }
  private showError(error: any): Promise<void> {
    return this.toastCtrl.create({
      message: `An error occurred: ${error}`,
      duration: 3000,
      showCloseButton: true,
    }).then(toast => toast.present());
  }

  private hideLoading(): Promise<void> {
    if (this.loading) {
      this.notifyRefreshComplete();
      return this.loading.dismiss().then(() => null);
    }
    return Promise.resolve();
  }

  load(event) {
    this.infiniteScrollComponent = event.target;
    this.doLoad(false);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.
      unsubscribe());
  }
  // tslint:disable-next-line: adjacent-overload-signatures
  doLoad(refresh: boolean) {
    if (refresh) {
      this.store.dispatch(new topStoriesActions.Refresh());
    } else {
      this.store.dispatch(new topStoriesActions.LoadMore());
    }
  }

  refresh(event) {
    this.refresherComponent = event.target;
    this.doLoad(true);
  }

  private notifyScrollComplete(): void {
    if (this.infiniteScrollComponent) {
      this.infiniteScrollComponent.complete();
    }
  }
  private notifyRefreshComplete(): void {
    if (this.refresherComponent) {
      this.refresherComponent.complete();
    }
  }

  private showLoading(): Promise<void> {
    return this.hideLoading().then(() => {
      return this.loadingCtrl.create({
        message: 'Loading...',
      }).then(loading => {
        this.loading = loading;
        return this.loading.present();
      });
    });
  }
}
