import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from './time-ago.pipe';



@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [TimeAgoPipe],
  imports: [
    CommonModule
  ],
  exports: [
    TimeAgoPipe
  ]
})
export class ComponentsModule { }
