import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import warning from 'warning'
import ReactDatetime from 'react-datetime'
import Inflection from 'inflection'
import ReactQuill from 'react-quill'
import Select from 'react-select'
import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap'
import {S3Uploader} from './S3Uploader'
import QUILL_FORMAT from '../../../consts/quill_format'
import {validationHelp, validationState} from '../validation'

export default class Input extends React.Component {

  static propTypes = {
    label: PropTypes.string,
    helpTop: PropTypes.bool,
    help: PropTypes.string,
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

  static defaultProps: {
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
  }

  render() {
    const {label, meta, helpTop, type, bsProps} = this.props

    const inputProps = _.extend({
      autoComplete: 'on',
    }, this.props.input, this.props.inputProps)

    const help = _.isUndefined(this.props.help) ? validationHelp(meta) : this.props.help

    const id = Inflection.dasherize((label || '').toLowerCase())
    let feedback = true
    let control

    switch (type) {
      case 'rich':
        control = (<ReactQuill theme={this.props.quillTheme} format={this.props.quillFormat} {...inputProps} />)
        break

      case 'date':
      case 'datetime':
        const placeholder = type === 'date' ? 'DD/MM/YYYY' : 'DD/MM/YYYY 9:00 AM'
        control = (<ReactDatetime closeOnSelect inputProps={{placeholder}} {...inputProps} />)
        break

      case 'select':
        if (!this.props.options) {
          warning(false, 'select components require an options prop')
          return null
        }
        control = (
          <FormControl componentClass="select" {...inputProps} value={inputProps.value}>
            {this.props.includeEmpty && (<option />)}
            {_.map(this.props.options, option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </FormControl>
        )
        break

      case 'react-select':
        if (!this.props.options) {
          warning(false, 'react-select components require an options prop')
          return null
        }
        const {onBlur, ...props} = inputProps
        feedback = false
        control = (
          <Select
            value={inputProps.value}
            onBlur={() => onBlur(inputProps.value)}
            options={this.props.options}
            {...props}
          />
        )
        break

      case 'image':
        control = (
          <S3Uploader inputProps={inputProps} />
        )
        break

      case 'textarea':
        control = (
          <FormControl componentClass="textarea" {...bsProps} {...inputProps} />
        )
        break

      default:
        control = (
          <FormControl componentClass="input" type={type} {...bsProps} {...inputProps} />
        )
    }

    return (
      <FormGroup controlId={id} validationState={validationState(meta)}>
        {label && <ControlLabel>{label}</ControlLabel>}
        {help && helpTop && (<HelpBlock>{help}</HelpBlock>)}
        {control}
        {feedback && <FormControl.Feedback />}
        {help && !helpTop && (<HelpBlock>{help}</HelpBlock>)}
      </FormGroup>
    )
  }

}
