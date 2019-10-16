import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopStoriesRoutingModule } from './top-stories-routing.module';
import { TopStoriesComponent } from './top-stories.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ItemComponent } from '../components/item/item.component';
import { ItemsComponent } from '../components/items/items.component';
import { ComponentsModule } from '../components/components.module';
import { StoreModule } from '@ngrx/store';
// import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { TopStoriesEffects } from './effects/top-stories';
import { reducers as topStoriesReducers } from './reducers';

@NgModule({
  declarations: [
    // TimeAgoPipe,
    TopStoriesComponent,
    ItemComponent,
    ItemsComponent,
  ],
  imports: [
    // TimeAgoPipe,
    CommonModule,
    TopStoriesRoutingModule,
    IonicModule,
    ComponentsModule,
    StoreModule.forFeature('topStories', topStoriesReducers),
    EffectsModule.forFeature([TopStoriesEffects]),
    RouterModule.forChild([
      {
        path: '',
        component: TopStoriesComponent
      }
    ])
  ],
})
export class TopStoriesModule { }
