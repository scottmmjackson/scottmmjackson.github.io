console.log("loaded script")

const registerServiceWorker = async () => {
   return await navigator.serviceWorker.register("sw.js");
};

const requestNotificationPerms = async () => {
   return await window.Notification.requestPermission();
};

(async function() {
	await requestNotificationPerms();
	await registerServiceWorker();
})();
