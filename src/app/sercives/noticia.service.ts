import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Noticia } from '../models/noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  private path: string = 'Noticia';

  constructor(private db: Firestore) { }

  getAll(): Observable<any>{
    const colle = collection(this.db, this.path);
    return collectionData(colle, ref => ref.orderBy('fecha', 'asc'));
  }
  add(noticia: Noticia){
    const refer = collection(this.db, this.path);
    return addDoc(refer, noticia);
  }

}
