import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})


export class MenuComponent implements OnInit {

  dishes = DISHES;

  selectedDish :Dish;


  ngOnInit() {
    this.dishService.getDishes().then((dishes) => this.dishes = dishes);
    
  }
  

  constructor(private dishService : DishService){

  }

  onSelect(dish: Dish)
  {
    console.log('test on select event');
    this.selectedDish = dish;
  }

  getDish(id: string): Dish {
    return DISHES.filter((dish) => (dish.id === id))[0];
  }

  getFeaturedDish(): Dish {
    return DISHES.filter((dish) => dish.featured)[0];
  }

   
  }