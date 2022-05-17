import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { formatNumber } from '@angular/common';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-outfit-add',
  templateUrl: './outfit-add.page.html',
  styleUrls: ['./outfit-add.page.scss'],
})
export class OutfitAddPage implements OnInit {
  fileName = '';
  selectedFile: File;
  allowed_types = ['image/jpeg'];
  cardImageBase64: string;
  isImageSaved: boolean;
  predictionRes;
  predictionResP;
  outOfRange: boolean = false;
  resultSave;
  predictionColor;

  constructor(private router: Router, private http: HttpClient, @Inject(LOCALE_ID) private locale: string, public alertController: AlertController) { }

  ngOnInit() {
    this.cardImageBase64 = "";
    this.predictionColor = "light";
  }

  saveNewOutfit(title, desc) {
    if (title.value === "") {
      this.presentAlert('No se puede guardar', 'Por favor,', 'Inserta título');
    } else if (desc.value === "") {
      this.presentAlert('No se puede guardar', 'Por favor,', 'Inserta descripción');
    } else if (this.cardImageBase64 === "") {
      this.presentAlert('No se puede guardar', 'Por favor,', 'Selecciona imagen');
    } else if (this.predictionResP === undefined) { this.presentAlert('No se puede guardar', 'Por favor,', 'Pulsa botón para obtener predicción'); }
    else {
      const data = [
        {
          "percentage": this.predictionResP,
          "title": title.value,
          "image_encoded": this.cardImageBase64,
          "description": desc.value
        }];

      this.resultSave = this.http.post('http://127.0.0.1:4000/outfits/new-outfit/save', data)
        .subscribe(res => {
          this.resultSave = res;
        });
      this.router.navigate(['/outfits'])
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

  goToHome() {
    this.router.navigate(['/outfits']);
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];

    if (!this.allowed_types.includes(this.selectedFile.type)) {
      this.presentAlert('No se puede subir una imagen en .PNG', 'Por favor,', 'Escoge otra foto');
      this.cardImageBase64 = "";
      return false;
    }
    else {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];
          if (img_width > 3840 || img_height > 2160) {
            this.presentAlert('No se puede guardar', 'Por favor,', 'Escoge otra foto menor a 3840x2160 pixeles');
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            return true;
          }
        }
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onUpload() {
    if (this.cardImageBase64 === "") {
      this.presentAlert('No hay ninguna imagen para predecir', 'Por favor,', 'Selecciona imagen');

    } else {
      const data = [{ "image_encoded": this.cardImageBase64 }];

      this.predictionRes = this.http.post('http://127.0.0.1:4000/outfits/new-outfit/predict', data)
        .subscribe(res => {
          this.predictionRes = res;
          let predictionResN = this.predictionRes.prediction.res;
          this.predictionResP = formatNumber(predictionResN, this.locale, '1.2-2');
          this.presentAlert('Predicción para este outfit', '', this.predictionResP + '%');

          if (this.predictionResP >= 0 && this.predictionResP < 25) {
            this.predictionColor = "025";
          }
          else if (this.predictionResP >= 25 && this.predictionResP < 50) {
            this.predictionColor = "2550";
          }
          else if (this.predictionResP >= 50 && this.predictionResP < 75) {
            this.predictionColor = "5075";
          }
          else if (this.predictionResP >= 75 && this.predictionResP <= 100) {
            this.predictionColor = "75100";
          }
        });
    }
  }

}
