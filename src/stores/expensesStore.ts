import { Expense } from '@models/expenses.ts';
import { makeAutoObservable } from 'mobx';

class Expenses {
  list: Expense[] = [];

  conversionRate = 4.382;

  constructor() {
    makeAutoObservable(this);
  }

  addExpense = (expense: Omit<Expense, 'id'>) => {
    this.list.push({
      ...expense,
      id: crypto.randomUUID(),
      convertedAmount: Number(this.convertAmount(expense.amount))
    });
  };

  deleteExpense = (id: string) => {
    this.list = this.list.filter((item) => item?.id !== id);
  };

  get sum(): number {
    return this.list.reduce((acc, item) => acc + item.amount, 0);
  }

  convertAmount = (amount: number): string => {
    return Number(amount / this.conversionRate).toFixed(2);
  };

  changeConversionRate = (value: number) => {
    this.conversionRate = value;
  };

  get enrichedList(): Expense[] {
    return this.list.map((expense) => ({
      ...expense,
      convertedAmount: Number(this.convertAmount(expense.amount))
    }));
  }

  get isListEmpty(): boolean {
    return !this.enrichedList.length;
  }
}

export const expensesStore = new Expenses();
export default expensesStore;
