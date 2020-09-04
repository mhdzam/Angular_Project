import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentContent } from '../shared/CommentContent';
import { ThemePalette } from '@angular/material';



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective;
  feedbackForm: FormGroup;
  commentcontent: CommentContent;

  @Input()
color: ThemePalette;
  
  dish: Dish;

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) { 
      this.createForm();
    }

    createForm() {
      this.feedbackForm = this.fb.group({
        author: ['', Validators.required ],
        comment: ['', Validators.required ],
        rating: ['', Validators.required ],
        email: ['', Validators.required ],
        agree: false,
        contacttype: 'None',
        message: ''
      });
    }

    onSubmit() {
      this.commentcontent = this.feedbackForm.value;
      console.log(this.commentcontent);
      this.feedbackForm.reset({
        author: '',
        rating: '',
        comment: '',
      });
      this.feedbackFormDirective.resetForm();
    }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.dishservice.getDish(id).subscribe((dish) => this.dish = dish);
  }

  goBack(): void {
    this.location.back();
  }

}
