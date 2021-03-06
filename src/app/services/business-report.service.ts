import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class BusinessReportService {
  loadTransactionsData(month: moment.Moment) {
    const knex = window['knex'];
    return knex('transaction_items')
      .select([
        knex.raw("strftime('%d', datetime(transactions.created_at/1000, 'unixepoch', 'localtime')) as day_of_month"),
        knex.raw("categories.report_category_id"),
        knex.raw("SUM(transaction_items.nominal * transaction_items.amount) as nominal")
      ])
      .leftJoin('services', 'transaction_items.service_id', 'services.id')
      .leftJoin('categories', 'services.category_id', 'categories.id')
      .leftJoin('transactions', 'transaction_items.transaction_id', 'transactions.id')
      .whereBetween('transactions.created_at', [month.valueOf(), moment(month).endOf('month').valueOf()])
      .groupByRaw("strftime('%d', datetime(transactions.created_at/1000, 'unixepoch', 'localtime')), categories.report_category_id")
      .then(result => result);
  }

  loadExpensesData(month: moment.Moment) {
    const knex = window['knex'];
    return knex('daily_materials_uses')
      .select([
        knex.raw("strftime('%d', datetime(daily_uses.created_at/1000, 'unixepoch', 'localtime')) as day_of_month"),
        knex.raw("daily_materials_uses.material_id"),
        knex.raw("SUM(daily_materials_uses.nominal) as nominal")
      ])
      .leftJoin('daily_uses', 'daily_materials_uses.daily_use_id', 'daily_uses.id')
      .whereBetween('daily_uses.created_at', [month.valueOf(), moment(month).endOf('month').valueOf()])
      .groupByRaw("strftime('%d', datetime(daily_uses.created_at/1000, 'unixepoch', 'localtime')), daily_materials_uses.material_id")
      .then(result => result);
  }

  loadDiscountData(month: moment.Moment) {
    const knex = window['knex'];
    return knex('transactions')
      .select([
        knex.raw("strftime('%d', datetime(transactions.created_at/1000, 'unixepoch', 'localtime')) as day_of_month"),
        knex.raw("SUM(transactions.discount) as discount")
      ])
      .whereBetween('transactions.created_at', [month.valueOf(), moment(month).endOf('month').valueOf()])
      .groupByRaw("strftime('%d', datetime(transactions.created_at/1000, 'unixepoch', 'localtime'))")
      .then(result => result);
  }
}
