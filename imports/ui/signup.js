import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'

import { Accounts } from 'meteor/accounts-base'

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    this.checkAuthentication()
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.location !== this.props.location) {
      checkAuthentication(nextProps)
    }
  }

  checkAuthentication() {
    const { history } = this.props
    if(Meteor.userId()) {
      return history.replace({pathname: '/links'})
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('btn has been clicked')
    let email = this.refs.email.value.trim()
    let password = this.refs.password.value.trim()

    if(password.length < 9) {
      return this.setState({error: 'Password must be more than 8 characters long'})
    }

    Accounts.createUser({email, password}, (err) => {
      if(err){
        this.setState({error: err.reason})
      } else{
        this.setState({error: ''})
      }
    })
  }

  render () {
    return(
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join Short Lnk</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form className="boxed-view__form" onSubmit={this.handleSubmit} noValidate>
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="password" />
            <button className="button">Create Account</button>
          </form>


          <Link to ="/">Have an account?</Link>
        </div>
      </div>
    )
  }
}
