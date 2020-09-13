import { Component, OnInit, Inject } from '@angular/core';
import {LeaderService} from '../services/leader.service';
import {LEADERS} from '../shared/leaders';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  Leaders: Leader[];
  constructor(private leaderservice : LeaderService,  @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    this.leaderservice.getLeaders().subscribe((leaders) => this.Leaders = leaders);
  }

}
