import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Feedback, ContactType } from '../shared/feedback';
import { visibility } from '../animations/app.animation';

import {FeedbackService} from '../services/feedback.service';
import { flyInOut, expand } from '../animations/app.animation';




@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    visibility(),
    expand()
  ]
})
export class ContactComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective;
  feedbackForm: FormGroup;
  copyfeedback : Feedback;
  feedback: Feedback;
  errMess : string;
  contactType = ContactType;
  issendingdata = false;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };



  constructor(private fb: FormBuilder, private feedbackservice : FeedbackService) {
    this.createForm();
  }

  ngOnInit() {
  }

  onValueChanged(data?: any) {
    console.log('valid on value changed !!');
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        console.log(control.dirty);
        console.log(control.valid);
        if (true /* && control.dirty && !control.valid*/) {
          console.log(' passed !!');
          const messages = this.validationMessages[field];
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
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now

  }

  onSubmit() {
    this.issendingdata = true;
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackservice.submitFeedback(this.feedback).subscribe(fb => 
      {
        this.feedback = fb;
        this.copyfeedback = fb;
        this.issendingdata = false;
      },
      errmess => {this.feedback = null;this.copyfeedback=null;this.issendingdata=false;this.errMess = <any>errmess;}
      );

      this.copyfeedback = this.feedbackForm.value;

    this.feedbackFormDirective.resetForm();

    var that = this;
    setTimeout(function() {
      that.copyfeedback =null;
  }, 5000);
  }


}
