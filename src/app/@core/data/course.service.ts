import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CourseService {

  constructor(private http: HttpClient) {
  }

  get(id?) {
    console.log(id);
    return this.http.get('/api/course/get' + (id ? '?id=' + id : ''))
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  add(body) {
    return this.http.post('/api/course/add', body)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  edit(body) {
    return this.http.post('/api/course/edit', body)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  remove(id) {
    return this.http.post('/api/course/remove', {id: id})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  removes(ids) {
    return this.http.post('/api/course/removes', {ids: ids})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
