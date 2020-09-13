import { Injectable } from '@angular/core';
import {LEADERS} from '../shared/leaders';
import { Leader } from '../shared/leader';
import { Observable, of } from 'rxjs';
import {delay, map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http:HttpClient) { }

  getLeaders(): Observable<Leader[]> {
  //  return of(LEADERS).pipe(delay(2000));
  return  this.http.get<Leader[]>(baseURL + 'leadership');
 //   return Promise.resolve(LEADERS);
  }

  getLeader(id: string): Observable<Leader> {
   // return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
   return  this.http.get<Leader>(baseURL + 'leadership' + id);
  //  return new Promise (resolve => setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]),2000));
  //  return Promise.resolve(LEADERS.filter((leader) => (leader.id === id))[0]);
  }

  getFeaturedLeader(): Observable<Leader> {
   // return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
    //return  this.http.get<Leader>(baseURL + 'Leadres?featured=true');
  
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map(dishes => dishes[0]));
  //  console.log(' FL is : '+LEADERS.filter((leader) => leader.featured)[0].name);
  //      return new Promise (resolve => setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]),2000));

 // return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);

  }
}