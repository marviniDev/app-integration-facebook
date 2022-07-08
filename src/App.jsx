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
  async function myFacebookLogin() {
    var access_token;
    var userID;

    await FB.login(
      function ( response ) {
        console.log( response );

        var authResponse = response.authResponse;

        if ( !authResponse ) {
          return;
        }

        // PROCESS
        access_token = authResponse.accessToken;
        userID = authResponse.userID;

        fetch( `http://localhost:3000/dev/save-access-token?access_token=${ access_token }&user_id=${ userID }` );
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
