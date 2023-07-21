import Input from '@components/ExpenseForm/Input/Input.tsx';
import { useReducer } from 'react';
import useExpensesStore from '@hooks/useExpensesStore.ts';
import { observer } from 'mobx-react-lite';
import { amountValidator, titleValidator } from '@utils/validators.ts';
import { Fields } from '@models/expenses.ts';

import styles from './ExpenseForm.module.scss';

type Action<T> = {
  payload: Record<Exclude<Fields, Fields.ConversionRate>, T>;
};

type FieldValue = string | number;

type State = Record<Exclude<Fields, Fields.ConversionRate>, FieldValue>;
type ErrorsState = Record<Exclude<Fields, Fields.ConversionRate>, string | null>;

const reducer = (state: State, action: Action<FieldValue>): State => {
  const { payload } = action;

  return {
    ...state,
    ...payload
  };
};

const errorsReducer = (state: ErrorsState, action: Action<string | null>): ErrorsState => {
  const { payload } = action;

  return {
    ...state,
    ...payload
  };
};

const formInitialState: State = {
  [Fields.Title]: '',
  [Fields.Amount]: ''
};

const errorsInitialState: ErrorsState = {
  [Fields.Title]: '',
  [Fields.Amount]: ''
};

const ExpenseForm = observer(() => {
  const [state, dispatch] = useReducer(reducer, formInitialState);
  const [errors, errorsDispatch] = useReducer(errorsReducer, errorsInitialState);
  const { addExpense } = useExpensesStore();

  const validate = () => {
    const newState: ErrorsState = errorsInitialState;

    Object.entries(state).forEach(([field, value]) => {
      if (field === Fields.Title) {
        newState[field] = titleValidator(value as string);
      }

      if (field === Fields.Amount) {
        newState[field] = amountValidator(Number(value));
      }
    });

    errorsDispatch({
      payload: newState
    });

    return !Object.values(newState).some((value) => value);
  };

  const addHandler = () => {
    if (!validate()) {
      return;
    }

    addExpense({
      amount: Number(state[Fields.Amount]),
      title: state[Fields.Title] as string
    });

    dispatch({
      payload: formInitialState
    });
  };

  const changeValueHandler = (value: number | string, field: Fields) => {
    dispatch({
      payload: {
        ...state,
        [field]: value
      }
    });
  };

  return (
    <form className={styles.Wrapper}>
      <div className={styles.Inputs}>
        <Input
          label="Title of transaction"
          type="text"
          value={state[Fields.Title]}
          field={Fields.Title}
          onChange={changeValueHandler}
          error={errors[Fields.Title]}
        />
        <Input
          label="Amount in (PLN)"
          type="number"
          value={state[Fields.Amount]}
          field={Fields.Amount}
          error={errors[Fields.Amount]}
          onChange={changeValueHandler}
        />
      </div>
      <div className={styles.Options}>
        <button type="button" className={styles.AddButton} onClick={addHandler}>
          Add
        </button>
      </div>
    </form>
  );
});

export default ExpenseForm;
