import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  readonly result: Subject<any> = new Subject<any>();

  constructor() { }

  getTransactions(month: moment.Moment) {
    return new window['Transactions']()
      .query(qb => qb.whereBetween('created_at', [month.valueOf(), moment(month).endOf('month').valueOf()]))
      .orderBy('created_at', 'desc')
      .fetchAll()
      .then(result => {
        this.result.next(result);
      });
  }
}
