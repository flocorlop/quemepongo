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


  async deleteOutfit() {
    const alertElment = await this.alertController.create({
      header: "¿Estas segur@ de que desea borrar el outfit?",
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
