import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import {Glyphicon} from 'react-bootstrap'
import Sidebar from 'react-sidebar'

export default class FLSidebar extends Component {

  static propTypes = {
    change_key: PropTypes.string,
    docked_width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    disable_toggle: PropTypes.bool,
    react_sidebar_props: PropTypes.object.isRequired,
    sidebar: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    react_sidebar_props: {
      sidebarClassName: 'sidebar',
    },
    docked_width: 768,
  }

  constructor() {
    super()
    this.state = {docked: false, open: false}
  }

  componentWillMount() {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia(`(min-width: ${this.props.docked_width}px)`)
    mql.addListener(this.handleMediaQueryChanged)
    this.setState({mql, docked: mql.matches})
  }

  componentWillReceiveProps(new_props) {
    if (new_props.change_key !== this.props.change_key) this.setState({open: false})
  }

  componentWillUnmount() {
    this.state.mql && this.state.mql.removeListener(this.handleMediaQueryChanged)
  }

  onSetOpen = open => {
    this.setState({open})
  }

  handleMediaQueryChanged = () => {
    this.setState({docked: this.state.mql && this.state.mql.matches})
  }

  handleSidebarToggle = ev => {
    this.setState({open: !this.state.open})
    if (ev) ev.preventDefault()
  }

  render() {
    const sidebar_props = _.extend(this.props.react_sidebar_props, {
      sidebar: this.props.sidebar,
      docked: this.state.docked,
      open: this.state.open,
      onSetOpen: this.onSetOpen,
    })

    const disable_sidebar_toggle = this.props.disable_toggle || this.state.docked
    return (
      <Sidebar {...sidebar_props}>
        {!disable_sidebar_toggle && (
          <div className="sidebar-toggle">
            <a onClick={this.handleSidebarToggle}>
              <Glyphicon glyph="menu-hamburger" />
            </a>
          </div>
        )}
        {this.props.children}
      </Sidebar>
    )
  }

}
