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

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.subscription = this.itemService.load(0, 10).
    subscribe(items => this.items = items);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
