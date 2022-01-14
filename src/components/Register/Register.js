import React from 'react';

class Register extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: ''
    }
  }
  onNameChange = (event) => {
    this.setState({ name: event.target.value })
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value })
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value })
  } 

  onSubmitSignIn = (event) => {
    event.preventDefault();
    fetch("https://stormy-dusk-29467.herokuapp.com/register", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
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
    return (
      <article className="signInBG br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
        <main className="pa4 gray-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0 light-gray">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6 light-gray">Display Name</label>
                <input 
                className="pa2 input-reset ba bg-transparent hover-bg-black white hover-white w-100"
                type="text"
                name="name" 
                id="name"
                maxLength="20"
                onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6 light-gray">Login</label>
                <input 
                className="pa2 input-reset ba bg-transparent hover-bg-black white hover-white w-100" 
                type="email" 
                name="email-address" 
                id="email-address"
                onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6 light-gray">Password</label>
                <input 
                className="b pa2 input-reset ba bg-transparent hover-bg-black white hover-white w-100" 
                type="password" 
                name="password" 
                id="password" 
                onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                /* if we don't include '() =>', our function will run when component renders and not on click */
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--silver bg-transparent grow pointer f6 dib light-gray"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;