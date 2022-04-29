import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: "root"
})
export class ProfileService {
  url = 'http://127.0.0.1:4000/profiles';
  status;
  errorMessage;

  constructor(private http: HttpClient) { }

  getProfiles() {
    return this.http.get<any>(this.url);
    // .pipe(
    //   map(this.extractData),
    //   catchError(this.handleErrorObservable)
    // )
    // return this.http.get<any>('https://jsonplaceholder.typicode.com/photos?_limit=20');
  }
  getProfile(user) {
    let url = this.url + user;
    return this.http.get<any>(url);
  }
  deleteProfile(profileId: string) {
    let urlGetOutfit = this.url + "/delete/" + profileId;
    this.http.delete(urlGetOutfit)
      .subscribe({
        next: data => {
          this.status = 'Delete successful';

        },
        error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      });

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
