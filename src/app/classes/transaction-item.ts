import { Service } from "./service";
import { Transaction } from "./transaction";

export class TransactionItem {
    id: number;
    transaction_id: number;
    service_id: number;

    transaction: Transaction;
    service: Service;
    nominal: number;
  
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}
