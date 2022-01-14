import React from 'react';
import './SignIn.css';

class SignIn extends React.Component {
  constructor(props){
    super(props);
    this.state={
      signInEmail: "",
      signInPassword: "",
      invalidCredentials: false
    }
  }
  onEmailChange = (event) =>{
    this.setState({signInEmail: event.target.value})
  } 

  onPasswordChange = (event) =>{
    this.setState({signInPassword: event.target.value})
  } 

  onSubmitSignIn = () => {
    fetch("https://stormy-dusk-29467.herokuapp.com/signin", {
      method: "post",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(response=> response.json())
    .then(user => {
      if (user.id){
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      } else{
        this.setState({invalidCredentials : true});
      }
    })
  }

  onDemoLogin = () => {
    fetch("https://stormy-dusk-29467.herokuapp.com/signin", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: "guest@gmail.com",
        password: "demo"
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      })
  }

  render(){
    const { onRouteChange } = this.props
    const failedMessage = this.state.invalidCredentials ? "Invalid login or password" : ""
    return (
      <article className="signInBG br3 ba b--white-10 mv4 w-100 w-50-m mw6 center shadow-5">
        <main className="pa4 gray-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0 light-gray">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6 light-gray">Login</label>
                <input onChange={this.onEmailChange}
                className="pa2 input-reset ba bg-transparent hover-bg-black white hover-white w-100"
                type="email" name="email-address" id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6 light-gray">Password</label>
                <input onChange={this.onPasswordChange}
                className="b pa2 input-reset ba bg-transparent hover-bg-black white hover-white w-100"
                type="password"
                name="password"
                id="password"
                />
              </div>
            </fieldset>
            <div className="failedMessage">
            {failedMessage}
            </div>
            <div className="">
              <input
                /* if we don't include '() =>', our function will run when component renders and not on click */
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--silver bg-transparent grow pointer f6 dib light-gray"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="mt3">
              <input
                /* if we don't include '() =>', our function will run when component renders and not on click */
                onClick={this.onDemoLogin}
                className="b ph3 pv2 input-reset ba b--silver bg-transparent grow pointer f6 dib light-gray"
                type="submit"
                value="Use Demo login"
              />
            </div>
            <div className="lh-copy mt1 registerBtn">
              <p
                onClick={() => onRouteChange("register")}
                className="f6 link dim light-gray db pointer">Register</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;