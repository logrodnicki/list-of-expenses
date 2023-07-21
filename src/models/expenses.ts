export type Expense = {
  title: string;
  amount: number;
  id: string;
  convertedAmount?: number;
};

export enum Fields {
  Title = 'title',
  Amount = 'amount',
  ConversionRate = 'conversionRate'
}
