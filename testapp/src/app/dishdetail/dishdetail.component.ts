import { Component, OnInit, Input, ViewChild , Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentContent } from '../shared/CommentContent';
import { ThemePalette } from '@angular/material';
import { Comment } from '../shared/comment';
import { switchMap } from 'rxjs/operators';
import { visibility } from '../animations/app.animation';
import { flyInOut , expand} from '../animations/app.animation';




@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      visibility(),
      expand()
    ]
})
export class DishdetailComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective;
  feedbackForm: FormGroup;
  commentcontent: CommentContent;
  visibility = 'shown';

  @Input()
color: ThemePalette;
  
  dish: Dish;
  errMess : string;
  dishcopy: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  newcomment : Comment;

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('baseURL') private baseURL) { 
      this.createForm();
    }

    formErrors = {
      'author': '',
      'comment': ''
    };

    validationMessages = {
      'author': {
        'required':'Auther Name is required.',
        'minlength':'Auther Name must be at least 2 characters long.'
      },
      'comment': {
        'required':'Comment is required.',
        'minlength':'Auther Name must be at least 10 characters long.'
      }
    };

  onValueChanged(data?: any) {
    console.log('onValueChanged() !!');
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
      
        const control = form.get(field);
        console.log('field name: '+field);
        console.log('field dirty: '+control.dirty);
        console.log('field valid: '+control.valid);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          console.log('message: '+messages);
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  
    createForm() {
      this.feedbackForm = this.fb.group({
        author: ['', [Validators.required ,Validators.minLength(2)]],
        comment: ['',[ Validators.required ,Validators.minLength(10)]],
        rating:'5'
       });

      this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data), errmess => this.errMess = <any>errmess);
     

      this.onValueChanged(); // (re)set validation messages now
    }

    
    onSubmit() {

      
   

      this.commentcontent = this.feedbackForm.value;
      console.log(this.commentcontent);
       this.newcomment = this.commentcontent;
      this.newcomment.date = Date.now().toString();

      this.dishcopy.comments.push(this.newcomment);
      console.log(this.newcomment.comment);
      console.log(this.newcomment.date);
      console.log(this.newcomment.rating);
      console.log(this.newcomment.author);
      this.dishservice.putDish(this.dishcopy)
        .subscribe(dish => {
          this.dish = dish; this.dishcopy = dish;
        },
        errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });

        
      this.dish.comments.push(this.newcomment);
      this.feedbackForm.reset(this.createForm());
      this.feedbackFormDirective.resetForm();
    }


    setPrevNext(dishId: string) {
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }

   ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    /*this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish;this.dish = dish; this.dishcopy = dish;  this.setPrevNext(dish.id); });*/

    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(params['id']); }))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
      errmess => this.errMess = <any>errmess);
  }

  goBack(): void {
    this.location.back();
  }
}
