import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { formatNumber } from '@angular/common';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-profile-add',
  templateUrl: './profile-add.page.html',
  styleUrls: ['./profile-add.page.scss'],
})
export class ProfileAddPage implements OnInit {
  fileName = '';
  selectedFile: File;
  allowed_types = ['image/png', 'image/jpeg'];
  cardImageBase64: string;
  isImageSaved: boolean;
  predictionRes;
  predictionResP;
  outOfRange: boolean = false;
  resultSave;

  constructor(private router: Router, private http: HttpClient, @Inject(LOCALE_ID) private locale: string, public alertController: AlertController) { }

  ngOnInit() {
    this.cardImageBase64 = "";
  }

  saveNewProfile(title, desc) {
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

      this.resultSave = this.http.post('http://127.0.0.1:4000/profiles/new-profile/save', data)
        .subscribe(res => {
          this.resultSave = res;
        });
      console.log("guardado");
      this.router.navigate(['/profiles'])
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
    this.router.navigate(['/profiles']);
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

      this.predictionRes = this.http.post('http://127.0.0.1:4000/profiles/new-profile/predict', data)
        .subscribe(res => {
          this.predictionRes = res;
          this.predictionResP = this.predictionRes.prediction.res;
          this.predictionResP = formatNumber(this.predictionResP, this.locale, '1.2-2');
        });
    }
  }
}
