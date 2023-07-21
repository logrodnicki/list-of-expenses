import { ReactElement } from 'react';
import { observer } from 'mobx-react-lite';
import useExpensesStore from '@hooks/useExpensesStore.ts';
import ExpensesList from '@components/ExpensesList/ExpensesList.tsx';
import ExpenseForm from '@components/ExpenseForm/ExpenseForm.tsx';

import { formatCurrency } from '@utils/common.ts';
import ConversionRateForm from '@components/ConversionRateForm/ConversionRateForm.tsx';
import styles from './Expenses.module.scss';

const Expenses = observer((): ReactElement => {
  const { conversionRate, sum, convertAmount } = useExpensesStore();

  return (
    <div className={styles.Wrapper}>
      <header className={styles.Header}>
        <h1>List of expenses</h1>
        <span>{`1EUR = ${formatCurrency(conversionRate)} PLN`}</span>
      </header>
      <ConversionRateForm />
      <ExpenseForm />
      <ExpensesList />
      <footer>{`Sum: ${sum} PLN (${formatCurrency(convertAmount(sum))} EUR)`}</footer>
    </div>
  );
});

export default Expenses;
