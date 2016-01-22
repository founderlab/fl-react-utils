import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import {ButtonToolbar, ButtonGroup, Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

export default class Pagination extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    items_per_page: PropTypes.number.isRequired,
    current_page: PropTypes.number.isRequired,
    total_items: PropTypes.number.isRequired,
  }

  render() {
    const {location, items_per_page, current_page, total_items} = this.props
    const links = []
    const total_pages = Math.ceil(total_items / items_per_page)
    if (!total_pages) return null

    for (let i=1; i<=total_pages; i++) {
      links.push(
        <LinkContainer key={i} to={location.pathname} query={_.extend({}, location.query, {page: i})}>
          <Button bsStyle={current_page === i ? 'primary' : 'default'}>{i}</Button>
        </LinkContainer>
      )
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
