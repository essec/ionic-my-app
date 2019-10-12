import { Component, OnInit, OnDestroy } from '@angular/core';
import { Items } from '../model/items';
import { Subscription } from 'rxjs';
import { concat } from 'lodash';
import { ItemService } from '../services/services/item/item.service';

@Component({
  selector: 'app-top-stories',
  templateUrl: './top-stories.component.html',
  styleUrls: ['./top-stories.component.scss'],
})
export class TopStoriesComponent implements OnInit, OnDestroy {

  items: Items;
  private subscription: Subscription;
  private offset = 0;
  private limit = 10;
  private infiniteScrollComponent: any;
  private refresherComponent: any;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.subscription = this.itemService.get().subscribe(items
      => {
        if (items.refresh) {
          this.items = items;
          this.notifyRefreshComplete();
        } else {
          this.items = {
            ...this.items,
            results: concat(this.items.results, items.results)
          };
          this.notifyScrollComplete();
        }
      });
    this.doLoad(true);
  }

  load(event) {
    this.infiniteScrollComponent = event.target;
    if (this.hasNext()) {
      this.next();
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // doLoad(refresh: boolean) {
  //   this.itemService.load({
  //     offset: this.offset,
  //     limit: this.limit,
  //     refresh,
  //   });
  //   this.offset += this.limit;
  // }

  // tslint:disable-next-line: adjacent-overload-signatures
  private doLoad(refresh: boolean) {
    this.itemService.load({
      offset: this.offset,
      limit: this.limit,
      refresh,
    });
  }

  hasNext(): boolean {
    return this.items != null && (this.offset + this.limit) < this.items.total;
  }

  next(): void {
    if (!this.hasNext()) {
      return;
    }
    this.offset += this.limit;
    this.doLoad(false);
  }

  canRefresh(): boolean {
    return this.items != null;
  }

  refresh(event) {
    this.refresherComponent = event.target;
    if (this.canRefresh()) {
      this.doRefresh();
    }
  }

  doRefresh() {
    this.offset = 0;
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
}
