import React from 'react';
import PropTypes from 'prop-types';
import FormContainer from './screen';
import types from './types';
import constants from './constants';

// formType is the type of form you want to render
// values is an object that allows you to prefill input values

function Form({ formType, values }) {
  const { [formType]: inputs } = types;
  return (
    <FormContainer
      inputs={inputs}
      values={values}
    />
  );
}

Form.propTypes = {
  formType: PropTypes.oneOf([
    'changePassword',
    'forgotPassword',
    'login',
  ]).isRequired,
  values: PropTypes.shape({}),
};

Form.defaultProps = {
  values: {},
};

export {
  constants,
  Form,
};
