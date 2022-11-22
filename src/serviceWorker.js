if (isProduction && 'serviceWorker' in navigator) {
   window.addEventListener('load', () => {
      navigator.serviceWorker
         .register('service-worker.js', { scope: './' })
         .then((registration) => {
            if ('PushManager' in window && registration.active) {
               registration.pushManager.subscribe({ userVisibleOnly: true }).then(
                  (pushSubscription) => {
                     console.log('Fired a push event: ', pushSubscription.endpoint);
                  },
                  (error) => {
                     console.error(error);
                  }
               );
            }

            registration.addEventListener('updatefound', () => {
               const installingWorker = registration.installing;
               console.log('A new service worker is being installed:', installingWorker);
            });

            console.log('Service Worker registered: ', registration);
         })
         .catch((registrationError) => {
            console.error('Service Worker registration failed: ', registrationError);
         });
   });
}
