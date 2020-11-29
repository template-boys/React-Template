import React from 'react';
import { ErrorMessage, Field } from 'formik';

function Label({ label, meta }) {
  if (!!label) {
    return <label>{label}</label>;
  } else {
    return null;
  }
}

function InputField({ name, label, type }) {
  return (
    <Field name={name}>
      {({ field, meta }) => (
        <div className='form-field'>
          <Label label={label} meta={meta} />
          <input
            className={meta.touched && meta.error ? 'error' : ''}
            type={name === 'password' ? 'password' : type || 'text'}
            {...field}
          />
          <ErrorMessage name={name}>
            {(message) => (
              <div
                style={{ fontSize: 'small', fontStyle: 'italic' }}
                className='error'
              >
                {message}
              </div>
            )}
          </ErrorMessage>
        </div>
      )}
    </Field>
  );
}

export default InputField;
