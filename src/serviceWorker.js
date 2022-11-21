if (isProduction && 'serviceWorker' in navigator) {
   window.addEventListener('load', () => {
      navigator.serviceWorker
         .register('service-worker.js', { scope: './' })
         .then((registration) => {
            serviceWorkerRegistration.pushManager.subscribe().then(
               (pushSubscription) => {
                  console.log('Fired a push event: ', pushSubscription.endpoint);
                  // The push subscription details needed by the application
                  // server are now available, and can be sent to it using,
                  // for example, an XMLHttpRequest.
               },
               (error) => {
                  console.error(error);
               }
            );
            registration.onupdatefound = () => {
               const installingWorker = registration.installing;
               console.log('A new service worker is being installed:', installingWorker);
            };
            console.log('Service Worker registered: ', registration);
         })
         .catch((registrationError) => {
            console.error('Service Worker registration failed: ', registrationError);
         });
   });
}
