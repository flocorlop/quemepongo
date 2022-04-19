import { Injectable } from "@angular/core";
import { Outfit } from "./outfit.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class OutfitsService {

  urlGetOutfits = 'http://127.0.0.1:4000/outfits';
  status;
  errorMessage;

  constructor(private http: HttpClient) { }

  getOutfits() {
    return this.http.get<any>(this.urlGetOutfits);
  }

  getOutfit(outfitId: string) {
    let urlGetOutfit = this.urlGetOutfits + "/" + outfitId;
    return this.http.get<any>(urlGetOutfit);
  }

  deleteOutfit(outfitId: string) {
    let urlGetOutfit = this.urlGetOutfits + "/delete/" + outfitId;
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


}
