import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ToasterService} from "angular2-toaster";

import {UserService} from './users.service';
import {StateService} from './state.service';
import {CatalogService} from "./catalog.service";
import {CityService} from "./city.service";
import {CourseService} from "./course.service";
import {SignService} from "./sign.service";

const SERVICES = [
  ToasterService,
  UserService,
  StateService,
  CatalogService,
  CityService,
  CourseService,
  SignService
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
