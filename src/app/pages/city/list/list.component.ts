import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {ToasterService} from "angular2-toaster";
import {CityService} from "../../../@core/data/city.service";

@Component({
  selector: 'ngx-city-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [DatePipe]
})
export class CityListComponent {

  editing = {};
  rows = [];
  selected = [];

  addPanelShow: boolean = false;

  addForm: FormGroup;

  constructor(private datePipe: DatePipe,
              private toasterSvc: ToasterService,
              private citySvc: CityService) {
    this.getData();

    this.addForm = new FormGroup({
      label: new FormControl('', [Validators.required, Validators.minLength(2)])
    })
  }

  getData() {
    this.citySvc.get().then(res => {
      const cities = [];
      if (res.success) {
        res.result.forEach(item => {
          cities.push({
            _id: item._id,
            label: item.label,
            createAt: this.datePipe.transform(item.meta.createAt, 'yyyy-MM-dd HH:mm:ss'),
            updateAt: this.datePipe.transform(item.meta.updateAt, 'yyyy-MM-dd HH:mm:ss')
          })
        });
        this.rows = cities;
      }
    });
  }

  showAddPanel() {
    this.addPanelShow = !this.addPanelShow;
  }

  onSelect({selected}) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    this.citySvc.edit({_id: this.rows[rowIndex]._id, label: this.rows[rowIndex][cell]}).then(res => {
      if (res.success) {
        this.rows = [...this.rows];
      }
    });
  }

  add() {
    if (this.addForm.invalid) {
      return false;
    }
    this.citySvc.add(this.addForm.value).then(res => {
      if (res.success) {
        this.rows.splice(0, 0, {
          _id: res.result._id,
          label: res.result.label,
          createAt: this.datePipe.transform(res.result.meta.createAt, 'yyyy-MM-dd HH:mm:ss'),
          updateAt: this.datePipe.transform(res.result.meta.updateAt, 'yyyy-MM-dd HH:mm:ss')
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
      this.citySvc.removes(ids).then(res => {
        if (res.success) {
          const rows = [];
          res.result.forEach(item => {
            const row = {
              _id: item._id,
              label: item.label,
              createAt: this.datePipe.transform(item.meta.createAt, 'yyyy-MM-dd HH:mm:ss'),
              updateAt: this.datePipe.transform(item.meta.updateAt, 'yyyy-MM-dd HH:mm:ss')
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
