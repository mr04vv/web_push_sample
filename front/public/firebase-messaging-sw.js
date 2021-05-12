importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: "797421315987", // index.htmlにあるconfigのmessagingSenderIdと同じもの
});

const messaging = firebase.messaging();

self.addEventListener('push', (event) => {
  // event.data は、以下のような JSON だとします
  //
  // {
  //   "title": "hogehoge",
  //   "body": "foobar"
  //   "data": {
  //     "url": "https://freshlive.tv"
  //   }
  // }

  const data = event.data.json();
  const title = data.notification.title;
  const body = data.notification.body;
  const url = data.notification.click_action;
  console.debug('recieved notification');

  self.registration.showNotification(title, {
    icon: '/img/web_push_icon.png',
    body,
    data: { url },
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  // Web Push 通知が指定した URL に遷移する
  event.waitUntil(self.clients.openWindow(event.notification.data.url));
});
