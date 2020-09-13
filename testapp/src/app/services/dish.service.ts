import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { promise } from 'protractor';
import { resolve } from 'url';
import { delay, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http : HttpClient) { }

  getDishes(): Observable<Dish[]> {
   // return of(DISHES).pipe(delay(2000));
   return this.http.get<Dish[]>(baseURL + 'dishes');
  }

  getDish(id: string): Observable<Dish> {
   
    //return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
    return this.http.get<Dish>(baseURL + 'dishes/' + id);
        //.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  }

  getFeaturedDish(): Observable<Dish> {
//    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]));
  /*  console.log(DISHES.filter((dish) => dish.featured)[0].name);
    return  new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    });*/
    
}

getDishIds(): Observable<number[] | any> {
  return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
}

}