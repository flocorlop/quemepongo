import { Injectable } from "@angular/core";
import { Outfit } from "./outfit.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class OutfitsService {

  urlGetOutfits = 'http://127.0.0.1:4000/outfits';

  constructor(private http: HttpClient) { }

  getOutfits() {
    return this.http.get<any>(this.urlGetOutfits);
  }

  getOutfit(outfitId: string) {
    let urlGetOutfit = this.urlGetOutfits + "/" + outfitId;
    return this.http.get<any>(urlGetOutfit);
  }

  // deleteOutfit(outfitId: string) {
  //   this.outfits = this.outfits.filter(outfit => {
  //     return outfit.id !== outfitId;
  //   });
  // }

  // addOutfit(tit, desc, imageurl) {
  //   const perc = 'x';
  //   this.outfits.push({
  //     id: this.outfits.length + 1 + "",
  //   percentage: perc,
  //   title: tit,
  //   imageURL: imageurl,
  //   description: desc
  //   });
  // }

}
