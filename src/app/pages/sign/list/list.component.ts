import {Component} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {DatePipe} from '@angular/common';
import {ToasterService} from 'angular2-toaster';
import {CityService} from '../../../@core/data/city.service';
import {SignService} from '../../../@core/data/sign.service';

@Component({
  selector: 'ngx-sign-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [DatePipe]
})
export class SignListComponent {

  signs = [];

  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    headers: [],
    showTitle: true,
    title: '签到数据',
    useBom: false,
    removeNewLines: true,
    keys: []
  };

  settings = {
    mode: 'external',
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      no: {
        title: '序号',
        type: 'string',
        addable: false,
        editable: false
      },
      name: {
        title: '微信昵称',
        type: 'string',
      },
      nickName: {
        title: '微信昵称',
        type: 'string',
      },
      phone: {
        title: '手机号',
        type: 'string'
      },
      level: {
        title: '会员等级',
        type: 'string'
      },
      origin: {
        title: '注册地',
        type: 'string'
      },
      city: {
        title: '签到地区',
        type: 'string'
      },
      course: {
        title: '签到课程',
        type: 'string'
      },
      signAt: {
        title: '签到时间',
        type: 'string'
      },
      cardNo: {
        title: 'ATELIER卡号',
        type: 'string'
      },
      floor: {
        title: 'ATELIER楼层',
        type: 'string'
      },
      company: {
        title: 'ATELIER公司',
        type: 'string'
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private datePipe: DatePipe, private toasterSvc: ToasterService, private citySvc: CityService, private signSvc: SignService) {
    this.getData();

  }

  getData() {
    this.signSvc.get().then(res => {
      const signs = [];
      if (res.success) {
        res.result.forEach((item, index) => {
          signs.push({
            no: index + 1,
            name: item.user.real_name || item.user.nick_name || item.user.phone,
            nickName: item.user.nick_name,
            phone: item.user.phone,
            level: item.user.level_id,
            origin: item.user.reg_origin,
            city: item.city ? item.city.label : '',
            course: item.course ? item.course.label : '',
            signAt: this.datePipe.transform(item.sign.signAt, 'yyyy-MM-dd HH:mm:ss'),
            cardNo: '',
            floor: '',
            company: ''
          });
        });
        this.signs = signs;
        this.source.load(signs);
      }
    });
  }

  export() {
    this.signSvc.export().then(res => {
      console.log(res);
    });
  }
}
