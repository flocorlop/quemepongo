import { Injectable } from "@angular/core";
import { Outfit } from "./outfit.model";

@Injectable({
  providedIn: "root"
})
export class OutfitsService {
  private outfits: Outfit[] = [
    {
      id: "1",
      percentage: "95",
      title: "Summer outfit",
      imageURL:
        "https://www.stylevore.com/wp-content/uploads/2019/06/summer-style-fashion-ootd.jpg",
      description: "White top with high waist jeans"
    },
    {
      id: "2",
      percentage: "85",
      title: "Winter outfit for men",
      imageURL:
        "https://cdn.shopify.com/s/files/1/0162/2116/files/Winter_street_style_looks_for_men_19.jpg?v=1548239991",
      description: "White sweater with brown jacket, jeans and boots"
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

  addOutfit(title, imageURL, description) {
    this.outfits.push({
      title,
      imageURL,
      description,
      id: this.outfits.length + 1 + ""
    });
  }

}
