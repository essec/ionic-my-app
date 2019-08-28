import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopStoriesRoutingModule } from './top-stories-routing.module';
import { TopStoriesComponent } from './top-stories.component';


@NgModule({
  declarations: [
    TopStoriesComponent
  ],
  imports: [
    CommonModule,
    TopStoriesRoutingModule
  ]
})
export class TopStoriesModule { }
