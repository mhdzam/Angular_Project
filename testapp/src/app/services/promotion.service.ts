import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { resolve } from 'url';
import { settings } from 'cluster';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Promotion[]> {
return new Promise (resolve => setTimeout(() => resolve(PROMOTIONS),2000));
    //return Promise.resolve(PROMOTIONS);
  }

  getPromotion(id: string): Promise<Promotion> {
    return new Promise (resolve => setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]),2000));
   // return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]);
  }

  getFeaturedPromotion(): Promise<Promotion> {
    console.log(PROMOTIONS.filter((promotion) => promotion.featured)[0].name);
    return new Promise (resolve => setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]),2000));
   // return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
  }
  
}
