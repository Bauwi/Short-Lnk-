import React, {Component} from 'react'
import Modal from 'react-modal'
import { Meteor } from 'meteor/meteor'
import propTypes from 'prop-types'

export default class RemoveLink extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false
    }
    this.onRemove = this.onRemove.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
  }

  onRemove(e) {
    e.preventDefault()
    Meteor.call('links.removeLink', this.props._id)
  }

  handleModalClose() {
    this.setState({
      isVisible: false
    })
  }

  render() {
    return(
      <div>
        <button className="button button--remove" onClick={() => this.setState({isVisible: true})}>X</button>
        <Modal
          isOpen={this.state.isVisible}
          contentLabel="Add link"
          onRequestClose={this.handleModalClose}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal">
            <h1>Are you sure ? </h1>
            <p>{this.props.url}</p>
            <button className="button button--pill button--warning" onClick={this.onRemove}>delete</button>
            <button className="button button--pill" onClick={this.handleModalClose}>Cancel</button>
        </Modal>
      </div>

    )
  }
}
