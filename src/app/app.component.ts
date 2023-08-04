import { Component } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  userData!: Observable<any>;
  allUsers: any;

  constructor(private firestore: Firestore) {
    this.getData();
  }

  addData(f: any) {
    // console.log(f.value);
    const collectionInstance = collection(this.firestore, 'users');
    addDoc(collectionInstance, f.value)
      .then(() => {
        console.log('Data saved successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getData() {
    const collectionInstance = collection(this.firestore, 'users');
    collectionData(collectionInstance, { idField: 'id' }).subscribe((val) => {
      console.log(val);
      this.allUsers = val;
    });
    this.userData = collectionData(collectionInstance);
  }

  updateData(id: any) {
    // console.log(id);
    const docInstance = doc(this.firestore, 'users', id);
    const updateData = {
      name:'updatedName'
    }
    updateDoc(docInstance, updateData)
      .then(() => {
        console.log('Data updated');
      })
      .catch((err) => {
        console.log(err);
    })
    console.log(docInstance)
  }
}
