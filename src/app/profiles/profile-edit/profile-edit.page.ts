import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import { formatNumber } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { ProfileService } from "../profiles.service";


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  fileName = '';
  selectedFile: File;
  allowed_types = ['image/png', 'image/jpeg'];
  cardImageBase64: string;
  isImageSaved: boolean;
  predictionRes;
  predictionResP;
  outOfRange: boolean = false;
  resultSave;
  profile;

  constructor(private router: Router, private http: HttpClient,
    @Inject(LOCALE_ID) private locale: string, public alertController: AlertController, private activatedRoute: ActivatedRoute, private profileService: ProfileService) { }

  ngOnInit() {
    this.cardImageBase64 = "";
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has("profileId")) {
        // redirect
        this.router.navigate(['/profiles']);
      }
      const idP = paramMap.get("profileId");
      this.profile = this.profileService.getProfileById(idP)
        .subscribe(data => {
          this.profile = data;
        });
    });


  }

  saveEditProfile(user, name, mail) {
    if (user.value === "") {
      this.presentAlert('No se puede guardar', 'Por favor,', 'Inserta nombre de usuario');
    } else if (name.value === "") {
      this.presentAlert('No se puede guardar', 'Por favor,', 'Inserta nombre');
    } else if (mail.value === "") {
      this.presentAlert('No se puede guardar', 'Por favor,', 'Inserta email');
    } else if (this.cardImageBase64 === "") {
      this.presentAlert('No se puede guardar', 'Por favor,', 'Selecciona imagen');
    } else {
      const data = [
        {
          "id": this.profile.id,
          "username": user.value,
          "name": name.value,
          "mail": mail.value,
          "photo": this.cardImageBase64
        }];

      this.resultSave = this.http.post('http://127.0.0.1:4000/profiles/edit/save', data)
        .subscribe(res => {
          this.resultSave = res;
        });
      let urlO = "/profiles/" + user.value;
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
    this.router.navigate(["/profiles", this.profile.username]);
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



  // onUpload() {
  //   if (this.cardImageBase64 === "") {
  //     this.presentAlert('No hay ninguna imagen para predecir', 'Por favor,', 'Selecciona imagen');

  //   } else {
  //     const data = [{ "image_encoded": this.cardImageBase64 }];

  //     this.predictionRes = this.http.post('http://127.0.0.1:4000/profiles/new-profile/predict', data)
  //       .subscribe(res => {
  //         this.predictionRes = res;
  //         this.predictionResP = this.predictionRes.prediction.res;
  //         this.predictionResP = formatNumber(this.predictionResP, this.locale, '1.2-2');
  //       });
  //   }
  // }
  async deleteProfile() {
    const alertElment = await this.alertController.create({
      header: "Are you Sure, You want to delete this profile?",
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
            this.profileService.deleteProfile(this.profile.id);
            this.router.navigate(['/profiles'])
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
