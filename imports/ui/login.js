import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: ''
    }
  }
  //before the component mounts, checks if user is authenticated
  componentWillMount() {
    this.checkAuthentication()
  }

  //if component updates, check the authentication again?
  componentWillReceiveProps(nextProps) {
    if(nextProps.location !== this.props.location) {
      checkAuthentication(nextProps)
    }
  }

  checkAuthentication() {
    const { history } = this.props
    if(Meteor.userId()){
      return history.replace({pathname: '/links'})
    }
  }

  onSubmit (e) {
    e.preventDefault()

    let email = this.refs.email.value.trim()
    let password = this.refs.password.value.trim()

    Meteor.loginWithPassword({email}, password, (err) =>{
      if(err) {
        this.setState({error: err.reason})
      } else {
        this.setState({error: ''})
      }
    })

  }

  render() {
    return(
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Short Lnk Login</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="password" />
            <button className="button">Login</button>
          </form>
          <Link to ="signup">have an account?</Link>
        </div>
      </div>
    )
  }
}
