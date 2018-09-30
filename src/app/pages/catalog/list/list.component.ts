import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {ToasterService} from 'angular2-toaster';
import {CatalogService} from '../../../@core/data/catalog.service';

@Component({
  selector: 'ngx-catalog-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [DatePipe]
})
export class CatalogListComponent {

  editing = {};
  rows = [];
  selected = [];

  addPanelShow: boolean = false;

  addForm: FormGroup;

  constructor(private datePipe: DatePipe, private toasterSvc: ToasterService, private catalogSvc: CatalogService) {
    this.getData();

    this.addForm = new FormGroup({
      label: new FormControl('', [Validators.required, Validators.minLength(2)])
    });
  }

  getData() {
    this.catalogSvc.get().then(res => {
      const catalogs = [];
      if (res.success) {
        res.result.forEach(item => {
          catalogs.push({
            _id: item._id,
            label: item.label,
            createAt: this.datePipe.transform(item.meta.createAt, 'yyyy-MM-dd HH:mm:ss'),
            updateAt: this.datePipe.transform(item.meta.updateAt, 'yyyy-MM-dd HH:mm:ss')
          });
        });
        this.rows = catalogs;
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
    this.catalogSvc.edit({_id: this.rows[rowIndex]._id, label: this.rows[rowIndex][cell]}).then(res => {
      if (res.success) {
        this.rows = [...this.rows];
      }
    });
  }

  add() {
    if (this.addForm.invalid) {
      return false;
    }
    this.catalogSvc.add(this.addForm.value).then(res => {
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
      this.catalogSvc.removes(ids).then(res => {
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
