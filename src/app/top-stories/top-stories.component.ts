import { Component, OnInit, OnDestroy } from '@angular/core';
import { Items } from '../model/items';
import { Subscription } from 'rxjs';
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
  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.subscription = this.itemService.get().subscribe(items
    => this.items = items);
    this.doLoad(true);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  doLoad(refresh: boolean) {
    this.itemService.load({
      offset: this.offset,
      limit: this.limit,
      refresh,
    });
    this.offset += this.limit;
  }

    // tslint:disable-next-line: adjacent-overload-signatures
  private doLoad(refresh: boolean) {
    this.itemService.load({
      offset: this.offset,
      limit: this.limit,
      refresh,
    });
  }

  hasPrevious(): boolean {
    return this.offset > 0;
  }

  previous(): void {
    if (!this.hasPrevious()) {
      return;
    }
    this.offset -= this.limit;
    this.doLoad(false);
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

  refresh() {
    if (!this.canRefresh()) {
      return;
    }
    this.offset = 0;
    this.doLoad(true);
  }
}
