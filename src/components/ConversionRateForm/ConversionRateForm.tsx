import { ReactElement, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Input from '@components/ExpenseForm/Input/Input.tsx';
import useExpensesStore from '@hooks/useExpensesStore.ts';
import { Fields } from '@models/expenses.ts';

import { amountValidator } from '@utils/validators.ts';
import styles from './ConversionRateForm.module.scss';

const ConversionRateForm = observer((): ReactElement => {
  const { conversionRate: initConversionRate, changeConversionRate } = useExpensesStore();

  const [conversionRate, setConversionRate] = useState(initConversionRate);
  const [error, setError] = useState<string | null>(null);

  const validate = (value: number): boolean => {
    const valueError = amountValidator(value);

    setError(valueError);

    return !valueError;
  };

  const changeHandler = (value: number | string) => setConversionRate(value as number);

  const updateHandler = () => {
    if (!validate(conversionRate)) {
      return;
    }

    changeConversionRate(conversionRate);
  };

  return (
    <div className={styles.Wrapper}>
      <Input
        label="Conversion rate"
        type="number"
        value={conversionRate}
        field={Fields.ConversionRate}
        error={error}
        onChange={changeHandler}
      />
      <div>
        <button type="button" className={styles.UpdateButton} onClick={updateHandler}>
          Update
        </button>
      </div>
    </div>
  );
});

export default ConversionRateForm;
