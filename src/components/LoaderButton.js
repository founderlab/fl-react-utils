import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Button} from 'react-bootstrap'

export default class LoaderButton extends React.Component {

  static propTypes = {
    loading: PropTypes.bool,
    renderLoader: PropTypes.func,
  }

  static defaultProps = {
    renderLoader: () => (<i className="inline-loader" />),
  }

  render() {
    const {loading, children, renderLoader, ...btnProps} = this.props
    if (loading) btnProps.disabled = true
    console.log('btnProps', btnProps)
    return (
      <Button {...btnProps}>
        {loading && renderLoader()}
        {children}
      </Button>
    )
  }
}
