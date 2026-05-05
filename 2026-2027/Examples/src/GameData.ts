export let GameData: gameData = {
  globals: {
    gameWidth: 1280,
    gameHeight: 800,
    bgColor: "#ffffff",
    debug: false
  },

  preloader: {
    bgColor: "ffffff",
    image: "phaser4",
    imageX: 1280 / 2,
    imageY: 800 / 2,
    loadingText: "Loading...",
    loadingTextFont: "roboto",
    loadingTextComplete: "Tap/click to view the example",
    loadingTextY: 700,
    loadingBarColor: 0xff0000,
    loadingBarY: 630,
  },

  spritesheets: [

    {
      name: "players",
      path: "assets/images/players.png",
      width: 52,
      height: 70,
      frames: 84
    },
    {
      name: "asteroid-1",
      path: "assets/images/asteroid-1.png",
      width: 80,
      height: 80,
      frames: 12
    },
    {
      name: "explosion",
      path: "assets/images/explosion.png",
      width: 80,
      height: 80,
      frames: 28
    },
    { name: "levelthumb", path: "assets/images/hud/levelthumb.png", width: 60, height: 60, frames: 50 },
    { name: "levelpages", path: "assets/images/hud/levelpages.png", width: 30, height: 30, frames: 50 },
    {
      name: "bomb",
      path: "assets/images/bomb.png",
      width: 33,
      height: 31,
      frames: 6
    },

  ],
  images: [

    { name: "logo-phaser", path: "assets/images/logo-phaser.png" },

      { name: "logo", path: "assets/images/phaser.png" },


   

    { name: "bg1", path: "assets/images/bg/1.png" },
    { name: "bg2", path: "assets/images/bg/2.png" },
    { name: "bg3", path: "assets/images/bg/3.png" },
    { name: "bg4", path: "assets/images/bg/4.png" },
    { name: "bg5", path: "assets/images/bg/5.png" },
    { name: "bg6", path: "assets/images/bg/6.png" },
    { name: "bg7", path: "assets/images/bg/7.png" },
        { name: "space", path: "assets/images/nebula.jpg" },
 
   
        { name: "popup", path: "assets/images/popup.png" },

          { name: "pgj", path: "assets/images/pgj.png" },
          { name:"stars", path: "assets/images/stars.png" },
       



  ],
  atlas: [
      {
      key: "flares",
      imagepath: "assets/images/flares.png",
      jsonpath: "assets/images/flares.json"
    }
  ],
  sounds: [
    /*{
    name: "music",
    paths: ["assets/sounds/intro.ogg", "assets/sounds/intro.m4a"],
    volume: 1,
    loop: true,
    frame: 1,
  }*/
  ],

  videos: [

    // { name: "video", path: "/assets/video/video.mp4" },

  ],
  audios: [

    /*{
    name: "sfx",
    jsonpath: "assets/sounds/sfx.json",
    paths: ["assets/sounds/sfx.ogg", "assets/sounds/sfx.m4a"],
    instances: 10,
  }*/
  ],

  scripts: [],
  fonts: [{ key: "ralewayRegular", path: "assets/fonts/raleway.regular.ttf", type: "truetype" }],
  webfonts: [{ key: 'Nosifer' }, { key: 'Roboto' }, { key: 'Press+Start+2P' }, { key: 'Rubik+Doodle+Shadow' }, { key: 'Rubik+Glitch' }],
  bitmapfonts: [{ name: 'arcade', imgpath: 'assets/fonts/arcade.png', xmlpath: 'assets/fonts/arcade.xml' }],

};
