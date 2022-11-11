const BGM = () => {
   const audio = new Audio();

   const attributes = {
      id: 'bgm',
      src: '/soundtracks/bgm.mp3',
	  loop: true,
      preload: true,
   };

   for (const [key, value] of Object.entries(attributes)) {
      audio.setAttribute(key, value);
   }

   return audio;
};

export default BGM();
