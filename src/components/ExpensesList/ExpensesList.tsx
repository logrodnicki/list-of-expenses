import { ReactElement } from 'react';
import { observer } from 'mobx-react-lite';
import useExpensesStore from '@hooks/useExpensesStore.ts';
import ExpenseItem from '@components/ExpensesList/ExpenseItem/ExpenseItem.tsx';

import styles from './ExpensesList.module.scss';

const ExpensesList = observer((): ReactElement => {
  const { list } = useExpensesStore();

  return (
    <table className={styles.Table}>
      <thead className={styles.Header}>
        <tr className={styles.Row}>
          <th>Title</th>
          <th>Amount (PLN)</th>
          <th>Amount(EUR)</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {list.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
        {!list.length ? (
          <tr>
            <td colSpan={4}>No data</td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
});

export default ExpensesList;
