import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import DropzoneS3Uploader from 'react-dropzone-s3-uploader'

export default class S3Uploader extends React.Component {

  static propTypes = {
    label: PropTypes.string,
    size: PropTypes.string,
    style: PropTypes.object,
    input_props: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
  }

  handleFinishedUpload = (info) => {
    this.props.input_props.onChange(info.filename)
  }

  render() {
    const {config, size, input_props} = this.props
    const {url, s3_url} = config
    const max_file_size = config.max_file_upload_size
    const filename = input_props.value
    const accept = input_props.accept || ''

    const style = this.props.style || {
      height: size === 'large' ? 200 : 100,
      border: 'dashed 2px #999',
      borderRadius: 5,
      position: 'relative',
      cursor: 'pointer',
    }

    const uploader_props = {style, max_file_size, s3_url, filename, host: url, accept}

    return (
      <div className="form-group form-group-lg">
        {this.props.label ? (<label className="control-label">{this.props.label}</label>) : null}
        <DropzoneS3Uploader onFinish={this.handleFinishedUpload} {...uploader_props} />
      </div>
    )
  }
}
