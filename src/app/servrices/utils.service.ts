import { Injectable } from '@angular/core';
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  uploadPercent: Observable<any>;
  downloadURL: Observable<any>;

  constructor(
    private storage: AngularFireStorage
  ) { }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'UsersPic/picIrl/NupIeZmypzZn7mKMI2opi2IulKu1';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL() )
    )
      .subscribe((result) => {
        console.log(result);
      })
  }


  public returnImage(path_: string): any {
    const ref = this.storage.ref(path_);
    return ref.getDownloadURL();
  }





} // END CLASS
