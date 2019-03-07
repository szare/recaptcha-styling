import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { loadReCaptcha, ReCaptcha } from 'react-recaptcha-google'

let loadReCaptchaPromise = new Promise(function (resolve, reject) {
  loadReCaptcha();
  resolve(true);
  reject(false);
});

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      reCaptchaLoaded: false,
      recaptchaVerified: false,
    };
    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.onRecaptchaExpired = this.onRecaptchaExpired.bind(this);
  }

  componentDidMount() {
    loadReCaptchaPromise.then((result) => {
      this.setState({ reCaptchaLoaded: result });
    });
  }

  verifyCallback() {
    this.setState({ recaptchaVerified: true });
  }

  onLoadRecaptcha() {
    if (this.voucherCaptcha) {
      this.voucherCaptcha.reset();
      console.log('reCaptcha has loadede!!!!') //inja load shode....
    }
  }

  onRecaptchaExpired() {
    this.setState({ recaptchaVerified: false });
  };

  render() {
    const { reCaptchaLoaded } = this.state;
    console.log('reCaptchaLoaded ==>', reCaptchaLoaded);
    return (
      <div className="App">
        {reCaptchaLoaded &&
          <ReCaptcha
            ref={(el) => { this.voucherCaptcha = el; }}
            size="normal"
            render="explicit"
            sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
            onloadCallback={this.onLoadRecaptcha}
            verifyCallback={this.verifyCallback}
            expiredCallback={this.onRecaptchaExpired}
          />
        }
      </div>
    );
  }
}

export default App;
