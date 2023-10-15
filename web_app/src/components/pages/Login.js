import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import loginLogo from '../../imgs/img-01.png'

class Login extends Component{

    render(){
      return (
        <div class="limiter">
            <div class="wrap-login100">
              <div class="login100-pic js-tilt" data-tilt>
                <img src={loginLogo} alt="IMG" />
              </div>

              <form class="login100-form validate-form">
                <span class="login100-form-title">Member Login</span>

                <div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                  <input class="input100" type="text" name="email" placeholder="Username" />
                  <span class="focus-input100"></span>
                  <span class="symbol-input100">
                    <i class="fa fa-user" aria-hidden="true"></i>
                  </span>
                </div>

                <div class="wrap-input100 validate-input" data-validate="Password is required">
                  <input class="input100" type="password" name="pass" placeholder="Password" />
                  <span class="focus-input100"></span>
                  <span class="symbol-input100">
                    <i class="fa fa-lock" aria-hidden="true"></i>
                  </span>
                </div>

                <div class="container-login100-form-btn">
                  <button class="login100-form-btn">Login</button>
                </div>
              </form>
            </div>
        </div>
      );
    }
  }

export default Login;