import logo from './logo.svg';
import FacebookLogin from "react-facebook-login"
import './App.css';
import { useEffect, useState } from 'react';
const insertScriptHead = ({ name, src }) => {
  return new Promise((resolve, reject)=>{
    if (!document.querySelector(`#${name}`)) {
      const container = document.head || document.querySelector('head');
      const scriptElement = document.createElement('script')
      scriptElement.setAttribute('id', name)
      scriptElement.async = true
      scriptElement.src = src;
      scriptElement.onload = () => {
        resolve(window.FB)
      }
      container.appendChild(scriptElement)
    }
  })

}

const setUpFacebookLogin = async() =>{
  const FB = await insertScriptHead({ name: "facebook-jssdk", src: "https://connect.facebook.net/en_US/sdk.js" });

  FB.init({
    appId: '756461653261426',
    xfbml: true,
    version: 'v19.0'
  });
  console.log({FB})
  return {
    FB: window.FB,
    login: () => window.FB.login(function (response) {
      if (response.authResponse) {
        console.log('Welcome!  Fetching your information.... ');
        window.FB.api('/me', { fields: 'name, email' }, function (response) {
          console.log({ response })
        });
      } else {
        console.log(response)
        console.log('User cancelled login or did not fully authorize.');
      }
    }, { config_id: "1288179395434347" })
  };
}
const useFacebook = () => {
  const [state, setState] = useState({FB: null, login: null});
  useEffect(()=> {
    setUpFacebookLogin().then(setState);
  },[])
  return state;
}
function App() {
  const [accessToken, setAccessToken] = useState();
  const [name, setName] = useState();
  const {FB, login} = useFacebook();
  return (
    <div className="App">
      <h1>{name?"Hi " +  name + "!" : "Login Please"}</h1>
      {login? <button onClick={login}>login with facebook</button> : <p>loading...</p>}
    </div>
  );
}

export default App;
