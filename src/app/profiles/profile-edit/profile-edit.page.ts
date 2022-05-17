import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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

  async deleteProfile() {
    const alertElment = await this.alertController.create({
      header: "¿Estas segur@ de que desea borrar el perfil?",
      message: "Confirme",
      buttons: [
        {
          text: "Cancelar",
          cssClass: 'success',
        },
        {
          text: "Borrar",
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
