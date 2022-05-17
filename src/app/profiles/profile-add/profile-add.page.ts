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
  img_width;
  img_height;

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
      if (this.checkEmail(mail.value) && this.checkPhoto()) {
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
        this.router.navigate(['/profiles'])
          .then(() => {
            window.location.reload();
          });
      }
    }
  }

  checkEmail(mail) {
    //E-mail valiadtion using Regex
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if (!regexp.test(mail)) {
      let isValid = false;
      this.presentAlert('No se puede guardar', 'Por favor,', 'Inserta email válido');
      return isValid;
    } else {
      let isValid = true;
      return isValid;
    }
  }
  checkPhoto() {
    if (this.img_width > 3840 || this.img_height > 2160) {
      this.presentAlert('No se puede guardar', 'Por favor,', 'Escoge otra foto menor a 3840x2160 pixeles');
      return false;
    } else {
      return true;
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
    this.selectedFile = event.target.files[0];

    if (!this.allowed_types.includes(this.selectedFile.type)) {
      this.presentAlert('No se puede subir una imagen con otro formato diferente a .JPG o .PNG', 'Por favor,', 'Escoge otra foto');
      this.cardImageBase64 = "";
      return false;
    }
    else {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          this.img_height = rs.currentTarget['height'];
          this.img_width = rs.currentTarget['width'];
          if (this.img_width > 3840 || this.img_height > 2160) {
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

}
