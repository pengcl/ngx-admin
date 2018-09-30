import {Injectable} from '@angular/core';

@Injectable()
export class ToolsService {

  constructor() {
  }

  getTitleFormValue(arr, value) {
    let title = '无';
    arr.forEach(item => {
      if (item._id === value) {
        title = item.label
      }
    });
    return title;
  }
}
