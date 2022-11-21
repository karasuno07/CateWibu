if (isProduction && 'serviceWorker' in navigator) {
   window.addEventListener('load', () => {
      navigator.serviceWorker
         .register('service-worker.js', { scope: './' })
         .then((registration) => {
            console.log('Line 6: Good');
            serviceWorkerRegistration.pushManager.subscribe().then(
               (pushSubscription) => {
                  console.log('Fired a push event: ', pushSubscription.endpoint);
               },
               (error) => {
                  console.error(error);
               }
            );
            console.log('Line 15: Good');
            registration.addEventListener('updatefound', () => {
               const installingWorker = registration.installing;
               console.log('A new service worker is being installed:', installingWorker);
            });
            console.log('Line 20: Good');
            console.log('Service Worker registered: ', registration);
         })
         .catch((registrationError) => {
            console.error('Service Worker registration failed: ', registrationError);
         });
   });
}
