import { useState } from 'react';
import viteLogo from '/vite.svg';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  function subscribeApp(page_id, page_access_token) {
    console.log('Subscribing page to app! ' + page_id);
    FB.api(
      '/' + page_id + '/subscribed_apps',
      'post',
      { access_token: page_access_token, subscribed_fields: ['leadgen'] },
      function (response) {
        console.log('Successfully subscribed page', response);
      }
    );
  }

  // Only works after `FB.init` is called
  function myFacebookLogin() {
    FB.login(
      function (response) {
        console.log('Successfully logged in', response);
        FB.api('/me/accounts', function (response) {
          console.log('Successfully retrieved pages', response);
          var pages = response.data;
          var ul = document.getElementById('list');
          for (var i = 0, len = pages.length; i < len; i++) {
            var page = pages[i];
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = '#';
            a.onclick = subscribeApp.bind(this, page.id, page.access_token);
            a.innerHTML = page.name;
            li.appendChild(a);
            ul.appendChild(li);
          }
        });
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
        <button style={fbButtonStyle} onClick={myFacebookLogin}>
          Continue with Facebook
        </button>
      </div>
      <ul id="list"></ul>
    </div>
  );
}

export default App;
