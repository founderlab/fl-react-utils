import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import React, {PropTypes} from 'react'
import warning from 'warning'
import ReactDatetime from 'react-datetime'
import Inflection from 'inflection'
import ReactQuill from 'react-quill'
import Select from 'react-select'
import {FormGroup, Checkbox, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap'
import S3Uploader from './S3Uploader'
import {validationHelp, validationState} from '../validation'

function ensureArray(values) {
  if (_.isArray(values)) return values
  if (!values) return []
  if (_.isString(values)) return values.split(',')
  warning(false, `[fl-react-utils] Input: react-select gave a strange value: ${JSON.stringify(values)}`)
  return []
}

export default class Input extends React.Component {

  static propTypes = {
    label: PropTypes.string,
    helpTop: PropTypes.bool,
    help: PropTypes.string,
    defaultHelp: PropTypes.string,
    type: PropTypes.string,
    bsProps: PropTypes.object,
    meta: PropTypes.object,
    input: PropTypes.object,
    inputProps: PropTypes.object,
    options: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    value: PropTypes.any,
    includeEmpty: PropTypes.bool,
    onBlur: PropTypes.func,
    quillTheme: PropTypes.string,
    quillFormat: PropTypes.array,
  }

  static defaultProps = {
    feedback: false,
    isValidDate: current => current.isAfter(moment().subtract(1, 'day')),
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'hh:mm a',
  }

  constructor() {
    super()
    this.state = {}
  }

  integrateTimeWithDate = date => {
    const currentTime = moment(this._time.state.inputValue, this.props.timeFormat)
    const newDate = moment(date).hours(currentTime.hours()).minutes(currentTime.minutes())
    return newDate
  }

  integrateDateWithTime = time => {
    const currentDate = moment(this._date.state.inputValue, this.props.dateFormat)
    const newDate = currentDate.hours(time.hours()).minutes(time.minutes())
    return newDate
  }

  onDateChange = newDate => this.props.input.onChange(this.integrateTimeWithDate(newDate))
  onDateBlur = newDate => {
    this.props.input.onBlur(this.integrateTimeWithDate(newDate))
  }
  onTimeBlur = newDate => {
    this.props.input.onBlur(this.integrateDateWithTime(newDate))
  }

  render() {
    const {label, meta, helpTop, type, bsProps} = this.props

    const inputProps = _.extend({}, this.props.input, this.props.inputProps)

    let help = this.props.help
    if (_.isUndefined(help)) {
      help = validationHelp(meta) || this.props.defaultHelp
    }

    const id = Inflection.dasherize((label || '').toLowerCase())
    let feedback = this.props.feedback

    const dateInputProps = {
      ref: c => this._date = c,
      className: 'date',
      onChange: this.onDateChange,
      onDateBlur: this.onDateBlur,
      placeholder: 'DD/MM/YYYY',
      timeFormat: false,
      closeOnSelect: true,
      isValidDate: this.props.isValidDate,
      ..._.omit(inputProps, 'onBlur', 'onChange', 'onFocus')
    }
    const timeInputProps = {
      ref: c => this._time = c,
      className: 'time',
      onBlur: this.onTimeBlur,
      placeholder: '9:00 am',
      dateFormat: false,
      closeOnSelect: true,
      ..._.omit(inputProps, 'onBlur', 'onFocus')
    }
    if (!this.props.meta.dirty && inputProps.value) {
      dateInputProps.value = moment(inputProps.value).format(this.props.dateFormat)
      timeInputProps.value = moment(inputProps.value).format(this.props.timeFormat)
    }
    const dateControl = (<ReactDatetime {...dateInputProps} />)
    const timeControl = (<ReactDatetime {...timeInputProps} />)

    return (
      <FormGroup controlId={id} validationState={validationState(meta)} bsClass="form-group split-datetime">
        {label && (<ControlLabel>{label}</ControlLabel>)}
        {help && helpTop && (<HelpBlock>{help}</HelpBlock>)}
        {dateControl}
        {timeControl}
        {help && !helpTop && (<HelpBlock>{help}</HelpBlock>)}
      </FormGroup>
    )
  }
}
