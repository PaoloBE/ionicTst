import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { DishProvider } from '../dish/dish';
import { Storage } from '@ionic/storage';

/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorites: Array<any>;
  constructor(public http: Http,private dishservice: DishProvider, private storage: Storage) {
    console.log('Hello FavoriteProvider Provider');
    
    this.favorites = [];
    this.storage.get('favorites').then(
      fav => {
        if(fav){
          console.log(fav);
          this.favorites=fav
        }else{
          this.favorites=[]
        }
      },
      err => {
        console.log('Storage err= '+err),
        this.favorites=[]
      });
  }

  addFavorite(id: number): boolean {
    if (!this.isFavorite(id))
    this.favorites.push(id);
    this.storage.get('favorites').then(
      favs => this.favorites=favs
    )
    this.storage.set('favorites',this.favorites)
    return true;
  }

  isFavorite(id: number): boolean {
      if(this.favorites!){
        this.favorites=[] 
      }
        return this.favorites.some(el => el === id);
  }

  getFavorites(): Observable<Dish[]> {

    this.storage.get('favorites').then(
      fav => {
        if(fav){
          console.log(fav);
          this.favorites=fav
        }else{
          this.favorites=[]
        }
      },
      err => {
        console.log('Storage err= '+err),
        this.favorites=[]
      });

    return this.dishservice.getDishes()
      .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index,1);
      this.storage.set('favorites',this.favorites)
      return this.dishservice.getDishes()
      .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
    }
    else {
      console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existant favorite' + id);
    }
  }
}
