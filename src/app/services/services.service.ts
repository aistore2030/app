import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Route, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  anuncios: any[] = [];
  info: any[] = [];
  private itemsCollection: AngularFirestoreCollection<any>;


  constructor(public afs: AngularFirestore, public rout: Router) {
  }


  goto(id) {
    this.rout.navigateByUrl(id);
  }


  getProfile(id) {
    this.itemsCollection = this.afs.collection<any>(`users/${id}/profile/`);

    return this.itemsCollection.snapshotChanges().pipe(map((info: any[]) => {
      this.info = [];

      for (const infos of info) {
        this.info.unshift(infos);
      }

      return this.info;
    }));
  }




  crearUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection(`users/${value.uid}/profile`).doc(value.uid).set({
        name: value.name,
        phone: value.phone,
        mail: value.mail,
        img: value.img,
        uid: value.uid,
        adress: value.adress,
        date: Date.now(),

      });
      this.rout.navigateByUrl(`fill`);
    });
  }



  updateUser(value, id?) {
   return this.afs.collection('users').doc(value.uid).collection('profile').doc(id).set(value);
  }

  userdata(car, mode , uid) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection(`users/${uid}/profile`).doc(uid).update({
        car: car,
        mode: mode,
      });

      this.rout.navigateByUrl(`profile`);
    });
  }

}
