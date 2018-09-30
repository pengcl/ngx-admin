import {Component} from '@angular/core';
import {ToasterService} from "angular2-toaster";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CatalogService} from "../../../@core/data/catalog.service";
import {CityService} from "../../../@core/data/city.service";
import {CourseService} from "../../../@core/data/course.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'ngx-course-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [DatePipe]
})
export class CourseListComponent {

  catalogs = [];
  cities = [];

  editing = {};
  rows = [];
  selected = [];

  addPanelShow: boolean = false;

  addForm: FormGroup;

  constructor(private datePipe: DatePipe,
              private toasterSvc: ToasterService,
              private catalogSvc: CatalogService,
              private citySvc: CityService,
              private courseSvc: CourseService) {
    this.getData();

    this.catalogSvc.get().then(res => {
      this.catalogs = res.result;
    });

    this.citySvc.get().then(res => {
      this.cities = res.result;
    });

    const now = new Date;

    this.addForm = new FormGroup({
      label: new FormControl('', [Validators.required, Validators.minLength(2)]),
      catalog: new FormControl('', [Validators.required, Validators.minLength(2)]),
      city: new FormControl('', [Validators.required, Validators.minLength(2)]),
      start: new FormControl(this.datePipe.transform(now, 'yyyy-MM-dd HH:mm:ss'), [Validators.required, Validators.minLength(2)]),
      end: new FormControl(this.datePipe.transform(now, 'yyyy-MM-dd HH:mm:ss'), [Validators.required, Validators.minLength(2)]),
      isPublic: new FormControl(false, []),
    })
  }

  getData() {
    this.courseSvc.get().then(res => {
      const courses = [];
      if (res.success) {
        res.result.forEach(item => {
          courses.push({
            _id: item._id,
            label: item.label,
            catalog: item.catalog,
            city: item.city,
            start: this.datePipe.transform(item.start, 'yyyy-MM-dd HH:mm:ss'),
            end: this.datePipe.transform(item.end, 'yyyy-MM-dd HH:mm:ss'),
            isPublic: item.isPublic
          })
        });
        this.rows = courses;
      }
    });
  }

  showAddPanel() {
    this.addPanelShow = !this.addPanelShow;
  }

  onSelect({selected}) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  updateValue(event, cell, rowIndex) {
    console.log(cell);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    const body = {};
    body['_id'] = this.rows[rowIndex]._id;
    body[cell] = this.rows[rowIndex][cell];
    this.courseSvc.edit(body).then(res => {
      if (res.success) {
        this.rows = [...this.rows];
      }
    });
  }

  publish(isPublic, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = !isPublic;
    this.rows = [...this.rows];
    const body = {};
    body['_id'] = this.rows[rowIndex]._id;
    body[cell] = this.rows[rowIndex][cell];
    this.courseSvc.edit(body).then(res => {
      if (res.success) {
        this.rows = [...this.rows];
      }
    });
  }

  add() {
    if (this.addForm.invalid) {
      return false;
    }
    this.courseSvc.add(this.addForm.value).then(res => {
      if (res.success) {
        this.rows.splice(0, 0, {
          _id: res.result._id,
          label: res.result.label,
          catalog: res.result.catalog,
          city: res.result.city,
          start: this.datePipe.transform(res.result.start, 'yyyy-MM-dd HH:mm:ss'),
          end: this.datePipe.transform(res.result.end, 'yyyy-MM-dd HH:mm:ss'),
          isPublic: res.result.isPublic
        });
        this.rows = [...this.rows];
      }
    });
  }

  remove() {
    if (window.confirm('您确定要删除吗?')) {
      const ids = [];
      this.selected.forEach(item => {
        ids.push(item._id);
      });
      this.courseSvc.removes(ids).then(res => {
        if (res.success) {
          const rows = [];
          res.result.forEach(item => {
            const row = {
              _id: item._id,
              label: item.label,
              catalog: item.catalog,
              city: item.city,
              start: this.datePipe.transform(item.start, 'yyyy-MM-dd HH:mm:ss'),
              end: this.datePipe.transform(item.end, 'yyyy-MM-dd HH:mm:ss'),
              isPublic: item.isPublic
            };
            rows.push(row);
          });
          this.rows = [...rows];
        }
      });
    } else {
    }
  }
}
