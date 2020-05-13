import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Input } from 'react-native-elements';
import validation from './validation';
import text from './text';
import { black, blue, red } from './colors';
import { rowCenterCenter, colTopCenter } from './flex';

const styles = StyleSheet.create({
  inputStyle: {
    color: black,
    fontSize: 14,
  },
});

export default class FormScreen extends Component {
  /* eslint-disable camelcase */
  UNSAFE_componentWillMount() {
    const { inputs, values } = this.props;
    inputs.forEach((item) => {
      if (!Array.isArray(item)) this.setInputState(item);
      else item.forEach((block) => this.setInputState(block));
    });

    if (values) {
      const inputRefs = Object.keys(values);
      const inputValues = Object.values(values);

      inputRefs.forEach((ref, i) => {
        const value = inputValues[i];
        this.setInputState({ ref }, value);
      });
    }
  }

  setInputState = (item, value) => {
    const errorMessage = `${item.ref}ErrorMessage`;
    this.setState({
      [item.ref]: value || '',
      [errorMessage]: '',
    });
  }

  clearInputState = (ref) => {
    this.setState({ [ref]: '' });
  }

  checkInputValidity = (item) => {
    const { ref, validationKey } = item;
    if (!validationKey || !ref) {
      // console.warn('You need to assign a validationKey & ref in types.js');
      return false;
    }
    const { [ref]: inputValue } = this.state;
    const inputErrorMessage = `${ref}ErrorMessage`;

    const isValid = validation[validationKey](inputValue, this.state);

    if (!isValid) {
      const visualErrorMessage = text.ERRORS[validationKey];
      this.setState({ [inputErrorMessage]: visualErrorMessage });
      return false;
    }

    this.setState({ [inputErrorMessage]: '' });
    return true;
  }

  saveInputValueToState = (value, item) => {
    const { formatValue, ref } = item;
    const { [ref]: inputValue } = this.state;
    const backspacePressed = inputValue.length > value.length;

    if (formatValue) {
      const formattedValues = formatValue(
        value,
        this.state,
        backspacePressed,
      );
      this.setState(formattedValues);
    } else this.setState({ [ref]: value });
  }

  submitForm = () => {
    const { inputs } = this.props;
    const values = {};
    let isValid = true;
    inputs.forEach((item) => {
      if (!Array.isArray(item)) {
        const { ref } = item;
        const { [ref]: inputRef } = this.state;
        const passesValidation = this.checkInputValidity(item);
        if (!passesValidation) isValid = false;
        values[ref] = inputRef;
      } else {
        item.forEach((subItem) => {
          const { ref } = subItem;
          const { [ref]: inputRef } = this.state;
          const passesValidation = this.checkInputValidity(subItem);
          if (!passesValidation) isValid = false;
          values[ref] = inputRef;
        });
      }
    });
    return { isValid, values };
  }

  focusNextField(nextRef) {
    if (nextRef) {
      if (this[nextRef].input) this[nextRef].input.focus();
    }
  }

  renderInputElement(item) {
    const inputErrorMessage = `${item.ref}ErrorMessage`;
    const {
      [item.ref]: inputValue,
      [inputErrorMessage]: errorMessage,
    } = this.state;
    const validInputValue = inputValue && inputValue.length;
    return (
      <Input
        inputComponent={item.inputComponent
          ? () => item.inputComponent((value) => {
            if (this.checkInputValidity(item)) this.saveInputValueToState(value, item);
          },
          inputValue)
          : undefined}
        containerStyle={[{ marginBottom: 10, ...(item.containerStyle || {}) }]}
        errorMessage={errorMessage}
        errorStyle={[{ color: red, ...(item.errorStyle || {}) }]}
        id={item.ref}
        inputStyle={[{ ...styles.inputStyle, ...(item.inputStyle || {}) }]}
        inputContainerStyle={[{
          marginLeft: 0, paddingLeft: 0, ...(item.inputContainerStyle || {}),
        }]}
        key={`${item.ref}-input-form`}
        label={item.label || null}
        labelStyle={[item.labelStyle || { color: black }]}
        leftIcon={item.leftIcon || null}
        leftIconContainerStyle={[{
          marginLeft: 0, paddingLeft: 0, ...(item.leftIconContainerStyle || {}),
        }]}
        onBlur={() => this.checkInputValidity(item)}
        onChangeText={(value) => this.saveInputValueToState(value, item)}
        onSubmitEditing={() => this.focusNextField(item.nextRef)}
        placeholder={item.placeholder}
        ref={(el) => { this[item.ref] = el; }}
        rightIcon={!item.disableIcon && validInputValue ? {
          color: blue,
          name: 'times',
          onPress: () => this.clearInputState(item.ref),
          size: 14,
          type: 'font-awesome',
        } : null}
        secureTextEntry={item.validationKey === 'password'}
        value={inputValue}
        /* eslint-disable react/jsx-props-no-spreading */
        {...item}
      />
    );
  }

  render() {
    const { inputs } = this.props;

    return (
      <View
        style={[colTopCenter, { padding: 8, width: '100%' }]}
      >
        {inputs.map((item) => {
          if (!Array.isArray(item)) return this.renderInputElement(item);
          return (
            <View key={`${item.placeholder}-input-form-container`} style={rowCenterCenter}>
              {item.map((children) => this.renderInputElement(children))}
            </View>
          );
        })}
      </View>
    );
  }
}

FormScreen.propTypes = {
  inputs: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        nextRef: PropTypes.string.isRequired,
        ref: PropTypes.string.isRequired,
      }),
      PropTypes.arrayOf(
        PropTypes.shape({
          nextRef: PropTypes.string.isRequired,
          ref: PropTypes.string.isRequired,
        }),
      ),
    ]),
  ).isRequired,
  values: PropTypes.shape({}).isRequired,
};
