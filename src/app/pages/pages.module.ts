import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {PagesRoutingModule} from './pages-routing.module';
import {ThemeModule} from '../@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {CatalogListComponent} from './catalog/list/list.component';
import {CityListComponent} from './city/list/list.component';
import {CourseListComponent} from './course/list/list.component';
import {SignListComponent} from './sign/list/list.component';

const PAGES_COMPONENTS = [
  PagesComponent,
  CatalogListComponent,
  CityListComponent,
  CourseListComponent,
  SignListComponent
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    Ng2SmartTableModule,
    NgxDatatableModule,
    DashboardModule,
    MiscellaneousModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ]
})
export class PagesModule {
}
