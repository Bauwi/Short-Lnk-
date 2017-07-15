import React, {Component} from 'react'
import {Meteor} from 'meteor/meteor'
import propTypes from 'prop-types'
import Clipboard from 'clipboard'
import moment from 'moment'

import RemoveLink from './remove_link'

export default class LinksListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      justCopied: false
    }
  }
  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy)

    this.clipboard.on('success', () => {
      this.setState({justCopied: true})
      setTimeout(() => {
        this.setState({justCopied: false})
      }, 2000);
    }).on('error', () => {
      alert('unable to copy')
    })
  }
  componentWillUnmount() {
    this.clipboard.destroy()
  }

  beautifyUrl(url) {
    return url.replace(/https:\/\//, '').replace(/http:\/\//, '').replace(/www./, '')
  }

  renderStats() {
    const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits'
    let visitedMessage = null

    if(typeof this.props.lastVisitedAt === 'number' ){
      visitedMessage = `(visited ${moment(this.props.lastVisitedAt).fromNow() })`
    }

    return <p className="item__message">{this.props.visitedCount} {visitMessage} {visitedMessage}</p>
  }


  render() {
    const {shortUrl, url, visible, _id} = this.props

    return (
      <div className="item">
        <div className="item__header">
          <h2>{this.beautifyUrl(url)}</h2>
          <RemoveLink _id={_id} url={this.beautifyUrl(url)}/>
        </div>
        <p className="item__message">{shortUrl}</p>
        {this.renderStats()}
        <a className="button button--pill button--link" href={shortUrl} target="_blank">
          Visit
        </a>
        <button className="button button--pill" ref="copy" data-clipboard-text={shortUrl}>
          {(this.state.justCopied)
            ? 'Copied'
            : 'Copy'}
        </button>
        <button className="button button--pill" onClick={() => {
          Meteor.call('links.setVisibility', _id, !visible)
        }}>
          {visible ? 'Hide' : 'Show'}
        </button>
      </div>
    )
  }
}

LinksListItem.propTypes = {
  _id: propTypes.string.isRequired,
  userId: propTypes.string.isRequired,
  shortUrl: propTypes.string.isRequired,
  visible: propTypes.bool.isRequired,
  url: propTypes.string.isRequired,
  visitedCount: propTypes.number.isRequired,
  lastVisitedAt: propTypes.number
}
