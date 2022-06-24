addEventListener('install', () => {
  console.log("Installed")
});

addEventListener('push', async (e) => {
  console.log("Push event received", e)
  self.registration.showNotification('Push Event Received', {
    body: e.data,
    tag: 'push-notification-demo',
  })
})
