import moment from 'moment'

// Validation highlighting for react-bootstrap Input component
export function validationState(field) {
  if (!field || !field.touched) return null
  return field.error ? 'error' : 'success'
}

// Validation highlighting for other input component
export function validationStyle(field) {
  if (!field || !field.touched) return null
  return field.error ? 'has-error' : 'has-success'
}

// Vadliation help text for react-bootstrap Input component
export function validationHelp(field) {
  if (!field) return null
  return (field.touched && field.error) || null
}

const yesterday = moment().subtract(1, 'day')
export function validDate(current) {
  return current.isAfter(yesterday)
}

export function allFieldsRequiredFn(fieldNames) {
  return data => {
    const errors = {}
    fieldNames.forEach(fieldName => {
      if (!data[fieldName]) errors[fieldName] = 'This field is required'
    })
    return errors
  }
}
