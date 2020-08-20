import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { resolve } from 'url';
import { settings } from 'cluster';
import { delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Observable<Promotion[]> {
return of(PROMOTIONS).pipe(delay(2000));
    //return Promise.resolve(PROMOTIONS);
  }

  getPromotion(id: string): Observable<Promotion> {
    return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
   // return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]);
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
  //  return new Promise (resolve => setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]),2000));
   // return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
  }
  
}
