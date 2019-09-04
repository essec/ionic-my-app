import { ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TopStoriesComponent } from './top-stories.component';
import { TestUtils } from 'src/testing/test-utils';
import { ItemsComponent } from '../components/items/items.component';
import { ItemComponent } from '../components/item/item.component';
import { TimeAgoPipe } from '../components/time-ago.pipe';
import { ItemServiceMock } from 'src/testing/item.service.mock';
import { ItemService } from '../services/services/item/item.service';

let fixture: ComponentFixture<TopStoriesComponent> = null;
let component: any = null;
describe('top stories page', () => {
  beforeEach(async(() => TestUtils.beforeEachCompiler(
    [TopStoriesComponent, ItemsComponent, ItemComponent,
      TimeAgoPipe],
    [{ provide: ItemService, useClass: ItemServiceMock }]
  ).then(compiled => {
    fixture = compiled.fixture;
    component = compiled.instance;
  })));
  it('should display a list of 10 items', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let debugElements = fixture.debugElement.queryAll(By.
        css('h2'));
      expect(debugElements.length).toBe(10);
      expect(debugElements[0].nativeElement.textContent).
        toContain('Item 1');
      expect(debugElements[1].nativeElement.textContent).
        toContain('Item 2');
    });
  }));
});
