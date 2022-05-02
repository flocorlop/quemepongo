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
  resultPhoto;
  ph;
  resultSave;

  constructor(private router: Router, private http: HttpClient, @Inject(LOCALE_ID) private locale: string, public alertController: AlertController) { }

  ngOnInit() {
    this.cardImageBase64 = "";
  }

  saveNewProfile(user, name, mail) {
    if (user.value === "") {
      this.presentAlert('No se puede guardar', 'Por favor,', 'Inserta nombre de usuario');
    } else if (name.value === "") {
      this.presentAlert('No se puede guardar', 'Por favor,', 'Inserta nombre');
    } else if (mail.value === "") {
      this.presentAlert('No se puede guardar', 'Por favor,', 'Inserta email');
    } else if (this.cardImageBase64 === "") {
      this.presentAlert('No se puede guardar', 'Por favor,', 'Selecciona imagen');
    }
    else {
      const data = [
        {
          "username": user.value,
          "name": name.value,
          "mail": mail.value,
          "photo": this.cardImageBase64
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
    // this.onUpload();
  }



  // onUpload() {
  //   if (this.cardImageBase64 === "") {
  //     this.presentAlert('No hay ninguna imagen', 'Por favor,', 'Selecciona imagen');

  //   } else {
  //     const data = [{ "image_encoded": this.cardImageBase64 }];

  //      this.resultPhoto = this.http.post('http://127.0.0.1:4000/profiles/new-profile/photo', data)
  //        .subscribe(res => {
  //        this.ph = res;
  //       });
  //   }
  // }
}
