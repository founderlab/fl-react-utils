import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import DropzoneS3Uploader from 'react-dropzone-s3-uploader'

export default class S3Uploader extends React.Component {

  static propTypes = {
    label: PropTypes.string,
    size: PropTypes.string,
    style: PropTypes.object,
    inputProps: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
  }

  handleFinishedUpload = (info) => {
    this.props.inputProps.onChange(info.filename)
  }

  render() {
    const {config, size, inputProps} = this.props
    const {url, s3Url} = config
    const maxFileSize = config.maxFileUploadSize
    const filename = inputProps.value
    const accept = inputProps.accept || ''

    const style = this.props.style || {
      height: size === 'large' ? 200 : 100,
      border: 'dashed 2px #999',
      borderRadius: 5,
      position: 'relative',
      cursor: 'pointer',
    }

    const uploaderProps = {style, maxFileSize, s3Url, filename, host: url, accept}

    return (
      <div className="form-group form-group-lg">
        {this.props.label ? (<label className="control-label">{this.props.label}</label>) : null}
        <DropzoneS3Uploader onFinish={this.handleFinishedUpload} {...uploaderProps} />
      </div>
    )
  }
}
