import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { formatNumber } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { OutfitsService } from "../outfits.service";


@Component({
  selector: 'app-outfit-edit',
  templateUrl: './outfit-edit.page.html',
  styleUrls: ['./outfit-edit.page.scss'],
})
export class OutfitEditPage implements OnInit {
  fileName = '';
  selectedFile: File;
  allowed_types = ['image/png', 'image/jpeg'];
  cardImageBase64: string;
  isImageSaved: boolean;
  predictionRes;
  predictionResP;
  outOfRange: boolean = false;
  resultSave;
  outfit;

  constructor(private router: Router, private http: HttpClient,
    @Inject(LOCALE_ID) private locale: string, public alertController: AlertController, private activatedRoute: ActivatedRoute, private outfitsService: OutfitsService) { }

  ngOnInit() {
    this.cardImageBase64 = "";
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has("outfitId")) {
        // redirect
        this.router.navigate(['/outfits']);
      }
      const idO = paramMap.get("outfitId");
      this.outfit = this.outfitsService.getOutfit(idO)
        .subscribe(data => {
          this.outfit = data;
        });
    });


  }

  saveEditOutfit(title, desc) {
    if (title.value === "") {
      this.presentAlert('No se puede guardar', 'Por favor,', 'Inserta título');
    } else if (desc.value === "") {
      this.presentAlert('No se puede guardar', 'Por favor,', 'Inserta descripción');
      // } else if (this.cardImageBase64 === "") {
      //   this.presentAlert('No se puede guardar', 'Por favor,', 'Selecciona imagen');
      // } else if (this.predictionResP === undefined) { this.presentAlert('No se puede guardar', 'Por favor,', 'Pulsa botón para obtener predicción'); }
    } else {
      const data = [
        {
          "title": title.value,
          "description": desc.value,
          "id": this.outfit.id
        }];

      this.resultSave = this.http.post('http://127.0.0.1:4000/outfits/edit/save', data)
        .subscribe(res => {
          this.resultSave = res;
        });
      let urlO = "/outfits/" + this.outfit.id;
      this.router.navigate([urlO])
        .then(() => {
          window.location.reload();
        });
    }
  }
  async presentAlert(head, sub, mes) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: head,
      subHeader: sub,
      message: mes,
      buttons: ['OK']
    });

    await alert.present();
  }
  cancelEdit() {
    this.router.navigate(["/outfits", this.outfit.id]);
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
        const imgBase64Path = e.target.result;
        this.cardImageBase64 = imgBase64Path;
        this.isImageSaved = true;
      }
    };
    reader.readAsDataURL(this.selectedFile);
  }



  onUpload() {
    if (this.cardImageBase64 === "") {
      this.presentAlert('No hay ninguna imagen para predecir', 'Por favor,', 'Selecciona imagen');

    } else {
      const data = [{ "image_encoded": this.cardImageBase64 }];

      this.predictionRes = this.http.post('http://127.0.0.1:4000/outfits/new-outfit/predict', data)
        .subscribe(res => {
          this.predictionRes = res;
          this.predictionResP = this.predictionRes.prediction.res;
          this.predictionResP = formatNumber(this.predictionResP, this.locale, '1.2-2');
        });
    }
  }
  async deleteOutfit() {
    const alertElment = await this.alertController.create({
      header: "Are you Sure, You want to delete this outfit?",
      message: "Be carefull.",
      buttons: [
        {
          text: "Cancel",
          cssClass: 'success',
        },
        {
          text: "Delete",
          cssClass: 'danger',
          handler: () => {
            this.outfitsService.deleteOutfit(this.outfit.id);
            this.router.navigate(['/outfits'])
              .then(() => {
                window.location.reload();
              });
          }
        }
      ]
    });
    await alertElment.present();
  }
}
