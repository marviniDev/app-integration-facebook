import { useState } from 'react';
import viteLogo from '/vite.svg';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  function subscribeApp( page_id, page_access_token ) {
    console.log( 'Subscribing page to app! ' + page_id );
    FB.api(
      '/' + page_id + '/subscribed_apps',
      'post',
      { access_token: page_access_token, subscribed_fields: [ 'leadgen' ] },
      function ( response ) {
        console.log( 'Successfully subscribed page', response );
      }
    );
  }

  // Only works after `FB.init` is called
  function myFacebookLogin() {
    FB.login(
      function ( response ) {
        console.log( response );
        var authResponse = response.authResponse;

        if (!authResponse) {
          return
        }

        var secrets = "00010001122"

        // PROCESS
        var access_token = CryptoJS.AES.encrypt( authResponse.access_token, secrets );
        var userID = CryptoJS.AES.encrypt( authResponse.userID, secrets );;

        var request = new Request( {
          url: 'http://localhost:3000/dev/save-access-token',
          method: 'GET',
          access_token,
          userID
        } );

        fetch( request );
      },
      { scope: 'pages_show_list' }
    );
  }

  const fbButtonStyle = {
    border: 'none',
    backgroundColor: '#3578e5',
    color: 'white',
    fontWeight: 'bold',
  };

  return (
    <div className="App">
      <h1>Integração Facebook</h1>
      <div className="card">
        <button style={ fbButtonStyle } onClick={ myFacebookLogin }>
          Continue with Facebook
        </button>
      </div>
      <ul id="list"></ul>
    </div>
  );
}

export default App;
