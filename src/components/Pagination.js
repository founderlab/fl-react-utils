import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import {ButtonToolbar, ButtonGroup, Button, Glyphicon} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

export default class Pagination extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    items_per_page: PropTypes.number.isRequired,
    current_page: PropTypes.number.isRequired,
    total_items: PropTypes.number,
    max_links: PropTypes.number,
  }

  static defaultProps = {
    max_links: 4,
  }

  render() {
    const {location, items_per_page, current_page, total_items} = this.props
    if (!total_items) return null
    const max_links = this.props.max_links - 1
    const links = []
    const total_pages = Math.ceil(total_items / items_per_page)
    if (!total_pages) return null

    let start = Math.min(Math.floor(current_page - max_links/2), total_pages-max_links)
    if (start < 1) start = 1
    const end = Math.min(start+max_links, total_pages)

    if (start > 1) {
      links.push(
        <LinkContainer key={1} to={location.pathname} query={_.extend({}, location.query, {page: 1})}>
          <Button bsStyle="default">1</Button>
        </LinkContainer>
      )
      start = start + 1
    }

    for (let i=start; i<=end; i++) {
      links.push(
        <LinkContainer key={i} to={location.pathname} query={_.extend({}, location.query, {page: i})}>
          <Button bsStyle={current_page === i ? 'primary' : 'default'}>{i}</Button>
        </LinkContainer>
      )
    }

    if (end < total_pages) {
      links.push(
        <LinkContainer key="next" to={location.pathname} query={_.extend({}, location.query, {page: current_page+1})}>
          <Button bsStyle="default"><Glyphicon glyph="chevron-right" /></Button>
        </LinkContainer>
      )
    }

    return (
      <ButtonToolbar className="pagination-buttons">
        <ButtonGroup bsSize="small">
          {links}
        </ButtonGroup>
      </ButtonToolbar>
    )
  }
}
