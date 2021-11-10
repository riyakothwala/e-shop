import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TotalCostService {

  private costSource = new BehaviorSubject<number>(0);
  currentCost = this.costSource.asObservable();

  private costTotalSource = new BehaviorSubject<number>(0);
  currentCostTotal = this.costTotalSource.asObservable();

  constructor() { }

  changeCost(newCost: number) {
    this.costSource.next(newCost)
  }

  changeCostTotal(newCostTotal: number) {
    this.costTotalSource.next(newCostTotal)
  }

}
