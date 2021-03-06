import { Component, OnInit ,Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import {LeaderService} from '../services/leader.service';
import {Leader} from '../shared/leader';
import {visibility,expand} from '../animations/app.animation';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    visibility(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader : Leader;
  errMess : string;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice : LeaderService,
    @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    console.log(this.baseURL);
    this.dishservice.getFeaturedDish().subscribe((dish) => this.dish = dish, errmess => this.errMess = <any>errmess);
    this.promotionservice.getFeaturedPromotion().subscribe((featurePromotion) => this.promotion = featurePromotion, errmess => this.errMess = <any>errmess);
    this.leaderservice.getFeaturedLeader().subscribe((featuerLeader) => this.leader = featuerLeader, errmess => this.errMess = <any>errmess);
  
  }

}
