import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: "root"
})
export class ProfileService {
  url =  'http://127.0.0.1:4000/profiles';
  constructor(private http: HttpClient) {}

  getDataProfile() {
    return this.http.get(this.url).pipe(
      map(this.extractData),
      catchError(this.handleErrorObservable)
  )
    // return this.http.get<any>('https://jsonplaceholder.typicode.com/photos?_limit=20');
  }
  private extractData(res: any) {
    let body = res;
    return body;
}
private handleErrorObservable(error: any) {
    console.error(error.message || error);
    return throwError(error);
}
}
