import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopStoriesRoutingModule } from './top-stories-routing.module';
import { TopStoriesComponent } from './top-stories.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ItemComponent } from '../components/item/item.component';
import { ItemsComponent } from '../components/items/items.component';
import { TimeAgoPipe } from '../components/time-ago.pipe';


@NgModule({
  declarations: [
    TopStoriesComponent,
    ItemComponent,
    ItemsComponent,
    TimeAgoPipe,
  ],
  imports: [
    CommonModule,
    TopStoriesRoutingModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: TopStoriesComponent
      }
    ])
  ]
})
export class TopStoriesModule { }
