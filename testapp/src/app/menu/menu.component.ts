import { Component, OnInit, Inject } from '@angular/core';
import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';




@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})


export class MenuComponent implements OnInit {

  dishes;
  errMess: string;


  constructor(private dishService : DishService,
    @Inject('baseURL') private baseURL){

  }

  ngOnInit() {
    this.dishService.getDishes().subscribe((dishes) => this.dishes = dishes,
    errmess => this.errMess = <any>errmess);
    this.dishes.forEach(function (value) {
      console.log(value.image);
    }); 
  }
  }