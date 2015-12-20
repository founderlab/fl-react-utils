import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import {ButtonToolbar, ButtonGroup, Button} from 'react-bootstrap'

export default class Pagination extends Component {
  static propTypes = {
    location: PropTypes.object,
    // pagination: PropTypes.object,
    pushState: PropTypes.func,
  }

  handlePage = (page) => {
    const {location, pushState} = this.props
    pushState(null, `${location.pathname}?page=${page}`)
  }

  render() {
    const {items_per_page, current_page, total_items} = this.props
    const links = []
    const total_pages = Math.ceil(total_items / items_per_page)
    if (!total_pages) return null

    const handlePageFn = (i) => () => this.handlePageFn(i)

    for (let i=1; i<=total_pages; i++) {
      const style = current_page === i ? 'primary' : 'default'
      links.push(<Button key={i} onClick={handlePageFn(i)} bsStyle={style}>{i}</Button>)
    }

    return (
      <ButtonToolbar>
        <ButtonGroup bsSize="small">
          {links}
        </ButtonGroup>
      </ButtonToolbar>
    )
  }
}
