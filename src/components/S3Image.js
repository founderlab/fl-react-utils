import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'

export default class S3Image extends Component {

  static propTypes = {
    filename: PropTypes.string.isRequired,
  }

  static contextTypes = {
    s3_url: PropTypes.string.isRequired,
  }

  render() {
    const {filename} = this.props
    const url = `${this.context.s3_url}/${filename}`

    return (
      <img src={url} {...this.props} />
    )
  }
}
