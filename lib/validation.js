'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports.validationState = validationState;
exports.validationStyle = validationStyle;
exports.validationHelp = validationHelp;
exports.validDate = validDate;
exports.allFieldsRequiredFn = allFieldsRequiredFn;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

// Validation highlighting for react-bootstrap Input component

function validationState(field) {
  if (!field || !field.touched) return null;
  return field.error ? 'error' : 'success';
}

// Validation highlighting for other input component

function validationStyle(field) {
  if (!field || !field.touched) return null;
  return field.error ? 'has-error' : 'has-success';
}

// Vadliation help text for react-bootstrap Input component

function validationHelp(field) {
  if (!field) return null;
  return field.touched && field.error || null;
}

var yesterday = _moment2['default']().subtract(1, 'day');

function validDate(current) {
  return current.isAfter(yesterday);
}

function allFieldsRequiredFn(fieldNames) {
  return function (data) {
    var errors = {};
    fieldNames.forEach(function (fieldName) {
      if (!data[fieldName]) errors[fieldName] = 'This field is required';
    });
    return errors;
  };
}