import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CatalogListComponent} from './catalog/list/list.component';
import {CityListComponent} from './city/list/list.component';
import {CourseListComponent} from './course/list/list.component';
import {SignListComponent} from './sign/list/list.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'catalogs',
      component: CatalogListComponent,
    },
    {
      path: 'cities',
      component: CityListComponent,
    },
    {
      path: 'courses',
      component: CourseListComponent,
    },
    {
      path: 'signs',
      component: SignListComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
