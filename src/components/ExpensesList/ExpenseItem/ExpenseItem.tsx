import { FC, ReactElement } from 'react';
import { Expense } from '@models/expenses.ts';
import useExpensesStore from '@hooks/useExpensesStore.ts';

import styles from './ExpenseItem.module.scss';

type Props = {
  expense: Expense;
};

const ExpenseItem: FC<Props> = ({
  expense: { id, amount, title, convertedAmount }
}): ReactElement => {
  const expensesStore = useExpensesStore();

  const deleteHandler = () => expensesStore.deleteExpense(id);

  return (
    <tr className={styles.Wrapper}>
      <td>{title}</td>
      <td>{amount}</td>
      <td>{convertedAmount}</td>
      <td>
        <button type="button" className={styles.DeleteButton} onClick={deleteHandler}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ExpenseItem;
