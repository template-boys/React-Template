import React from 'react';
import { Formik, Form as FormikForm } from 'formik';

export default function Form({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  classes,
}) {
  let formClasses = 'form ';
  if (classes) {
    formClasses += classes;
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <FormikForm className={formClasses}>{children}</FormikForm>
    </Formik>
  );
}
