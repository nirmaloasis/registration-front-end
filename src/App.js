import React, { Component } from 'react';
import {Button,ButtonToolbar,MenuItem,DropdownButton} from 'react-bootstrap'
var DatePicker = require("react-bootstrap-date-picker");
var ControlLabel = require("react-bootstrap-date-picker");
var FormGroup = require("react-bootstrap-date-picker");
var HelpBlock = require("react-bootstrap-date-picker");
var Recaptcha = require('react-recaptcha');


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      action:"signIn"
    };
    this.changeAction = this.changeAction.bind(this);
    this.callback = this.callback.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
  }
  changeAction(){
    var x = (this.state.action =="signUp")?"signIn":"signUp"
    this.setState({action:x})
  }
  callback(){
    console.log("done")
  }
  verifyCallback(){
    console.log("clicked")
    debugger
  }

  render() {
    return (
        
   <div className="user">
    <header className="user__header">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3219/logo.svg" alt="" />
        {(this.state.action == "signUp")?<h1 className="user__title">Sign Up</h1>:<h1 className="user__title">Login</h1>}
    </header>
    {(this.state.action == "signUp")?
    <form className="form">
        <div className="form__group">
            <input type="text" placeholder="Username" className="form__input" />
        </div>
        
        <div className="form__group">
            <input type="email" placeholder="Email" className="form__input" />
        </div>
        
        <div className="form__group">
            <input type="password" placeholder="Password" className="form__input" />
        </div>
           <div className="form__group">
        <DatePicker placeholder="Date of Birth" id="datepicker"/>
        </div>
        <div className="form__group">
         <select id="soft">
           <option>Select an type of user</option>
          <option value="type1">Type 1</option>
          <option value="type2">Type 2</option>
          
        </select>
        </div>
        <br></br>
        
        <Recaptcha
          sitekey="6LduGSwUAAAAALPKPeTjZ0iHKOALkNf_lMesSlLG"
          render="explicit"
          verifyCallback={this.verifyCallback}
          onloadCallback={this.callback}
          
        />
         <br></br>
        <button className="btn" type="button">Register</button>
        
        <Button bsStyle="primary" bsSize="xsmall" onClick={this.changeAction}>Login</Button>
    </form>
    :
    <form className="form">
        <div className="form__group">
            <input type="text" placeholder="Username" className="form__input" />
        </div>
    <div className="form__group">
            <input type="password" placeholder="Password" className="form__input" />
        </div>
        
        <Recaptcha
          ref= "captcha"
          sitekey="6LduGSwUAAAAALPKPeTjZ0iHKOALkNf_lMesSlLG"
          render="explicit"
          verifyCallback={this.verifyCallback}
          onloadCallback={this.callback}
        />
        <br></br>
        <button className="btn" type="button">Login</button>
        <br></br>
        <Button bsStyle="primary" bsSize="xsmall" onClick={this.changeAction}>SignUp here</Button>
    </form>
    } 
</div>

    );
  }
}

export default App;
