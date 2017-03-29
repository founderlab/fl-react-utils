import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import React, {PropTypes} from 'react'
import warning from 'warning'
import ReactDatetime from 'react-datetime'
import Inflection from 'inflection'
import ReactQuill from 'react-quill'
import Select from 'react-select'
import {FormGroup, Checkbox, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
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
    label: PropTypes.node,
    help: PropTypes.node,
    defaultHelp: PropTypes.node,
    helpTop: PropTypes.bool,
    type: PropTypes.string,
    bsProps: PropTypes.object,
    meta: PropTypes.object,
    input: PropTypes.object,
    inputProps: PropTypes.object,
    markdownProps: PropTypes.object,
    options: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    value: PropTypes.any,
    includeEmpty: PropTypes.bool,
    onBlur: PropTypes.func,
    quillTheme: PropTypes.string,
    quillFormat: PropTypes.array,
    validationState: PropTypes.func,
    feedback: PropTypes.bool,
    dateFormat: PropTypes.string,
    localeDateFormat: PropTypes.string,
  }

  static defaultProps = {
    validationState,
    localeDateFormat: 'L',
    feedback: false,
    type: 'text',
    quillTheme: 'snow',
    quillFormat: [
      'bold',
      'italic',
      'strike',
      'underline',
      'font',
      'size',
      'bullet',
      'list',
      'link',
      'align',
    ],
    markdownProps: {
      escapeHtml: true,
    },
  }

  render() {
    const {label, input, meta, helpMd, defaultHelpMd, helpTop, type, bsProps, defaultHelp, validationState, options} = this.props

    const inputProps = _.extend({
      autoComplete: 'on',
    }, input, this.props.inputProps)

    let help = this.props.help
    if (_.isUndefined(help)) {
      if (helpMd) {
        help = (<ReactMarkdown source={helpMd} {...this.props.markdownProps} />)
      }
      else {
        help = validationHelp(meta) || defaultHelp || (defaultHelpMd && (<ReactMarkdown source={defaultHelpMd} {...this.props.markdownProps} />))
      }
    }

    const id = this.props.id || Inflection.dasherize((this.props.name || inputProps.name || '').toLowerCase())
    let feedback = this.props.feedback
    let hideLabel = false
    let control

    switch (type) {
      case 'rich':
      case 'rich-text':
      case 'quill':
        control = (<ReactQuill theme={this.props.quillTheme} format={this.props.quillFormat} {...inputProps} />)
        break

      case 'date':
      case 'datetime':
      case 'time':
        let placeholder = 'DD/MM/YYYY 9:00 am'
        inputProps.dateFormat = this.props.dateFormat || moment.localeData().longDateFormat(this.props.localeDateFormat)
        if (type === 'date') {
          placeholder = inputProps.dateFormat
          inputProps.timeFormat = false
          if (!meta.dirty && _.isString(inputProps.value)) inputProps.value = moment(inputProps.value)
        }
        else if (type === 'time') {
          placeholder = '9:00 am'
          inputProps.dateFormat = false
          inputProps.timeFormat = 'hh:mm a'
          if (!meta.dirty && _.isString(inputProps.value)) inputProps.value = moment(inputProps.value)
        }
        else {
          if (!meta.dirty && _.isString(inputProps.value)) inputProps.value = moment(inputProps.value)
        }
        control = (<ReactDatetime closeOnSelect inputProps={{placeholder}} {..._.omit(inputProps, 'onFocus')} />)
        break

      case 'select':
        if (!options) {
          warning(false, 'select components require an options prop')
          return null
        }
        control = (
          <FormControl componentClass="select" {...inputProps} value={inputProps.value}>
            {this.props.includeEmpty && (<option />)}
            {_.map(options, option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </FormControl>
        )
        break

      case 'react-select':
        if (!options) {
          warning(false, 'react-select components require an options prop')
          return null
        }
        const {onChange, onBlur, value, ...props} = inputProps
        feedback = false
        const stringValue = _.isArray(value) ? value.join(',') : value
        const funcs = {}
        if (onChange) funcs.onChange = value => onChange(inputProps.multi ? ensureArray(value) : value)
        if (onBlur) funcs.onBlur = () => onBlur(inputProps.multi ? ensureArray(value) : value)

        control = (
          <Select
            options={options}
            value={stringValue}
            {...funcs}
            {...props}
          />
        )
        break

      case 'image':
      case 'file':
        control = (
          <S3Uploader inputProps={inputProps} />
        )
        break

      case 'static':
        control = (
          <FormControl.Static {...bsProps} {...inputProps}>{inputProps.value}</FormControl.Static>
        )
        break

      case 'checkbox':
      case 'boolean':
        inputProps.checked = !!inputProps.value
        hideLabel = true
        control = (
          <Checkbox inline {...bsProps} {...inputProps}>{label}</Checkbox>
        )
        break

      case 'textarea':
        control = (
          <FormControl componentClass="textarea" {...bsProps} {...inputProps} />
        )
        break

      // case 'text':
      // case 'email':
      // case 'password':
      default:
        control = (
          <FormControl type={type} {...bsProps} {...inputProps} />
        )
    }

    return (
      <FormGroup controlId={id} validationState={validationState ? validationState(meta) : null}>
        {label && !hideLabel && <ControlLabel>{label}</ControlLabel>}
        {help && helpTop && (<HelpBlock>{help}</HelpBlock>)}
        {control}
        {feedback && <FormControl.Feedback />}
        {help && !helpTop && (<HelpBlock>{help}</HelpBlock>)}
      </FormGroup>
    )
  }
}
