import { ChangeEvent, FC, HTMLInputTypeAttribute, ReactElement } from 'react';
import classNames from 'classnames';
import { Fields } from '@models/expenses.ts';

import styles from './Input.module.scss';

type Props = {
  label: string;
  type: HTMLInputTypeAttribute;
  value: string | number;
  field: Fields;
  error?: string | null;
  onChange: (value: string | number, field: Fields) => void;
};

const Input: FC<Props> = ({ label, type, value, field, error = '', onChange }): ReactElement => {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value, field);

  return (
    <div className={styles.Wrapper}>
      <label className={styles.Label} htmlFor={field}>
        {label}
      </label>
      <div className={styles.InputWrapper}>
        <input
          id={field}
          className={classNames(styles.Input, { [styles.HasError]: error })}
          type={type}
          value={value}
          onChange={changeHandler}
          minLength={5}
        />
        {error ? <span className={styles.Error}>{error}</span> : null}
      </div>
    </div>
  );
};

export default Input;
