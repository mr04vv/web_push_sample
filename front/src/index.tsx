import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const AA = () => {
  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      switch (permission) {
        case 'granted':
          // 許可された場合
          break;
        case 'denied':
          // ブロックされた場合
          break;
        case 'default':
          // 無視された場合
          break;
        default:
          break;
      }
    });

    console.debug('here');
  }, []);

  const showNotification = () => {
    if (Notification.permission === 'granted') {
      // If it's okay let's create a notification
      var notification = new Notification('Hi there!');

      notification.addEventListener(
        'click',
        () => {
          console.debug('notification clicked');
          // do something ...
        },
        false
      );
    }
  };
  return (
    <div>
      <div>web push no sample dayooo</div>
      <button onClick={() => showNotification()}>notification</button>
    </div>
  );
};

ReactDOM.render(<AA />, document.getElementById('root'));
