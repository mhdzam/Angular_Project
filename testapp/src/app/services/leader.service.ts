import { Injectable } from '@angular/core';
import {LEADERS} from '../shared/leaders';
import { Leader } from '../shared/leader';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Leader[]> {
    return new Promise (resolve => setTimeout(() => resolve(LEADERS),2000));

 //   return Promise.resolve(LEADERS);
  }

  getLeader(id: string):Promise<Leader> {
    return new Promise (resolve => setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]),2000));
  //  return Promise.resolve(LEADERS.filter((leader) => (leader.id === id))[0]);
  }

  getFeaturedLeader():Promise<Leader> {
    console.log(' FL is : '+LEADERS.filter((leader) => leader.featured)[0].name);
        return new Promise (resolve => setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]),2000));

 // return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);

  }
}