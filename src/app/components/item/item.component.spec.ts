import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComponent } from './item.component';
import { TestUtils } from 'src/testing/test-utils';
import { TimeAgoPipe } from '../time-ago.pipe';
import { By } from '@angular/platform-browser';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async(() => {
    TestUtils.beforeEachCompiler([
      ItemComponent, TimeAgoPipe])
      .then(compiled => {
        fixture = compiled.fixture;
        component = compiled.instance;
      });
  }));

  it('should create', () => {
    component.item = {
      id: 1,
      title: 'Test item 1',
      url: 'http://www.example.com/test1',
      by: 'user1',
      time: 1478576387,
      score: 242,
    }
    fixture.detectChanges()
    expect(component).toBeTruthy();

    const debugElement = fixture.debugElement.query(By.css('.title'))
    expect(debugElement.nativeElement.textContent).toContain('Test item 1')
  });
});