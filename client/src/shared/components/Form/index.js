import { Formik, Form as FormikForm } from "formik";
import React from "react";

const Form = (props) => {
  console.log(props.children.props.children);
  return (
    <Formik onSubmit={props.onSubmit} initialValues={props.initialValues}>
      <FormikForm>
        <div className="form-control"></div>
      </FormikForm>
    </Formik>
  );
};

export default Form;
