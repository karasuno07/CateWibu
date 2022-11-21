if (isProduction && 'serviceWorker' in navigator) {
   window.addEventListener('load', () => {
      navigator.serviceWorker
         .register('service-worker.js', { scope: './' })
         .then((registration) => {
			registration.onupdatefound = (evt) => {
				console.log("Service Worker on update found event: ", evt);
			}
            console.log('Service Worker registered: ', registration);
         })
         .catch((registrationError) => {
            console.error('Service Worker registration failed: ', registrationError);
         });
   });
}
