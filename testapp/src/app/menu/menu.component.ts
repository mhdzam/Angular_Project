import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


export class MenuComponent implements OnInit {

  dishes = DISHES;

  selectedDish :Dish;


  ngOnInit() {
    
  }

  constructor(){

  }

  onSelect(dish: Dish)
  {
    console.log('test on select event');
    this.selectedDish = dish;
  }

   
  }