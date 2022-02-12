import { Injectable } from "@angular/core";
import { Outfit } from "./outfit.model";

@Injectable({
  providedIn: "root"
})
export class OutfitsService {
  private outfits: Outfit[] = [
    {
      id: '1',
      title: "Eiffel Tower",
      imageURL:
        "https://www.toureiffel.paris/themes/custom/tour_eiffel/img/picto_myGoogleBusiness_1.jpg",
      comments: ["Awesome place", "wonderful experience"]
    },
    {
      id: "2",
      title: "Statue of Liberty",
      imageURL:
        "https://inteng-storage.s3.amazonaws.com/img/iea/ypwqn1mmON/sizes/statue-of-liberty_resize_md.jpg",
      comments: ["Awesome place", "wonderful experience"]
    }
  ];

  constructor() {}

  getOutfits(): Outfit[] {
    return [...this.outfits];
  }

  getOutfit(outfitId: string) {
    return {
      ...this.outfits.find(outfit => {
        return outfit.id === outfitId;
      })
    };
  }

  deleteOutfit(outfitId: string) {
    this.outfits = this.outfits.filter(outfit => {
      return outfit.id !== outfitId;
    });
  }

  addOutfit(title, imageURL) {
    this.outfits.push({
      title,
      imageURL,
      comments: [],
      id: this.outfits.length + 1 + ""
    });
  }

}
