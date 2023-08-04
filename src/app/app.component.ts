import { Component } from '@angular/core';
import { Firestore,collection,addDoc,collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private firestore: Firestore) {
    this.getData();
  }

  addData(f:any) {
    // console.log(f.value);
    const collectionInstance = collection(this.firestore, 'users');
    addDoc(collectionInstance, f.value).then(() => {
      console.log('Data saved successfully');
    })
      .catch((err) => {
        console.log(err);
    })
  };

  getData() {
    const collectionInstance = collection(this.firestore, 'users');
    collectionData(collectionInstance).subscribe(val => {
      console.log(val);
    })
    
  }
}
