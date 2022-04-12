import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'app-outfit-add',
  templateUrl: './outfit-add.page.html',
  styleUrls: ['./outfit-add.page.scss'],
})
export class OutfitAddPage implements OnInit {
  fileName = '';
  selectedFile: File;
  allowed_types = ['image/png', 'image/jpeg'];
  cardImageBase64: string;
  isImageSaved: boolean;
  predictionRes;
  predictionResP;
  outOfRange: boolean = false;

  constructor(private router: Router, private http: HttpClient, @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {
    this.cardImageBase64 = "";
  }

  saveNewOutfit(title, desc, imageURL) {
    // this.outfitsService.addOutfit(title.value,desc.value, imageURL.value);
    //this.router.navigate(['/outfits']);
    console.log("guarda");
  }

  goToHome() {
    this.router.navigate(['/outfits']);
  }

  onFileSelected(event) {
    let imageError = null;
    this.selectedFile = event.target.files[0];

    if (!this.allowed_types.includes(this.selectedFile.type)) {
      imageError = 'Only Images are allowed ( JPG | PNG )';
      return false;
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = rs => {
        const img_height = rs.currentTarget['height'];
        const img_width = rs.currentTarget['width'];

        console.log(img_height, img_width);
        const imgBase64Path = e.target.result;
        this.cardImageBase64 = imgBase64Path;
        this.isImageSaved = true;
      }
    };
    reader.readAsDataURL(this.selectedFile);
  }



  onUpload() {
    const data = [{ "image_encoded": this.cardImageBase64 }];

    this.predictionRes = this.http.post('http://127.0.0.1:4000/outfits/new-outfit/predict', data)
      .subscribe(res => {
        this.predictionRes = res;
        this.predictionResP = this.predictionRes.prediction.res * 100;
        this.predictionResP = formatNumber(this.predictionResP, this.locale, '1.2-2');

        if (this.predictionResP > 100 || this.predictionResP < 0) {
          this.outOfRange = true;
          console.log("fuera de rango");

        }
        else {
          this.outOfRange = false;
        }
      });
  }
}
