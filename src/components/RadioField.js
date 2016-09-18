import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import Inflection from 'inflection'
import {Field} from 'redux-form'
import {FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap'
import {validationState} from '../validation'

export default class Input extends React.Component {

  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    helpTop: PropTypes.bool,
    help: PropTypes.string,
    validationState: PropTypes.string,
    options: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
  }

  render() {
    const {name, label, help, validationState, helpTop} = this.props
    const id = Inflection.dasherize((label || '').toLowerCase())

    console.log('input', this.props)

    return (
      <FormGroup controlId={id} validationState={validationState}>
        {label && <ControlLabel>{label}</ControlLabel>}
        {help && helpTop && (<HelpBlock>{help}</HelpBlock>)}
        <div>
          {this.props.options.map((opt, i) => (
            <label key={i} className="radio-inline">
              <Field
                name={name}
                value={opt.value}
                component="input"
                type="radio"
              />
              {opt.label}
            </label>
          ))}
        </div>
        {help && !helpTop && (<HelpBlock>{help}</HelpBlock>)}
      </FormGroup>
    )
  }

}

      //       <Field
      //         name="gender"
      //         label="Gender"
      //         type="radio"
      //         options={[
      //           {label: 'Male', value: 'male'},
      //           {label: 'Female', value: 'female'},
      //           {label: 'Other or prefer not to say', value: 'other'},
      //         ]}
      //         help="Your gender won’t be visible to other users. It's used for reporting purposes only."
      //         component={Input}
      //       />      <div>
      //   <label>Sex</label>
      //   <div>
      //     <label><Field name="sex" component="input" type="radio" value="male"/> Male</label>
      //     <label><Field name="sex" component="input" type="radio" value="female"/> Female</label>
      //   </div>
      // </div>
