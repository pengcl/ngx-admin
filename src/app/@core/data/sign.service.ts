import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SignService {

  constructor(private http: HttpClient) {
  }

  get(id?) {
    return this.http.get('/api/sign/get' + (id ? '?id=' + id : ''))
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  remove(id) {
    return this.http.post('/api/sign/remove', {id: id})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  export() {
    return this.http.get('/api/sign/export')
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
