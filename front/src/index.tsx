import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { notifyRequest, sleepNotifyRequest } from './api/notification';

var firebaseConfig = {
  apiKey: 'AIzaSyAXg4mmXG5FN04Dzkw-H1By00L5sHXBGiI',
  authDomain: 'web-push-4a4f2.firebaseapp.com',
  projectId: 'web-push-4a4f2',
  storageBucket: 'web-push-4a4f2.appspot.com',
  messagingSenderId: '797421315987',
  appId: '1:797421315987:web:65b02ad8c40431ba2aea66',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const App = () => {
  const [token, setToken] = useState<String>();
  useEffect(() => {
    const messaging = firebase.messaging();

    console.debug(navigator.serviceWorker);

    navigator.serviceWorker
      .register('./firebase-messaging-sw.js')
      .then(() => {
        return navigator.serviceWorker.ready;
      })
      .then((registration) => {
        console.debug(messaging);
        messaging
          .getToken({
            vapidKey:
              'BNyGSX3u7L1j5K6IfNCHp-svJAIhL7Qeyej4SGhgVFlWUlimiu23TJ5KZ3drJmbVrcfd2WlTpFXdnXrOuxleEK4',
            serviceWorkerRegistration: registration,
          })
          .then((token) => {
            setToken(token);
            // 取得した Firebase トークンをサーバーへ送信
          })
          .catch((error) => {
            console.debug(error);
            // Firebase トークンの取得に失敗した場合
          });
      })
      .catch((error) => {
        console.debug(error);
        // Service Worker スクリプトの登録に失敗した場合
      });
  }, []);

  const sendNotifyRequest = async () => {
    if (token) {
      await notifyRequest(token);
    }
  };

  const sendSleepNotifyRequest = async () => {
    if (token) {
      await sleepNotifyRequest(token);
    }
  };
  return (
    <div>
      <div>web push no sample dayooo</div>
      {!token && <div>getting fcm token...</div>}
      {token && (
        <div>
          <button onClick={() => sendNotifyRequest()}>notify</button>
        </div>
      )}
      {token && (
        <div>
          <button onClick={() => sendSleepNotifyRequest()}>
            notify after 4seconds
          </button>
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
