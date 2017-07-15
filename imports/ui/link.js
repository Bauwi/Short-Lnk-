import React, {Component} from 'react'
import { Meteor } from 'meteor/meteor'

import LinksList from './links_list'
import PrivateHeader from './private_header'
import AddLink from './add_link'
import LinksListFilters from './links_list_filters'

export default class Link extends Component {
  componentWillMount() {
    this.checkAuthentication()
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.location !== this.props.location) {
      this.checkAuthentication(nextProps)
    }
  }

  checkAuthentication() {
    const {history} = this.props
    if(!Meteor.userId()) {
      return history.replace({pathname: '/'})
    }
  }

  render() {
    return(
      <div>
        <PrivateHeader title="Your Links" />
        <div className="page-content">
          <LinksListFilters />
          <AddLink />
          <LinksList />
        </div>
      </div>
    )
  }
}
