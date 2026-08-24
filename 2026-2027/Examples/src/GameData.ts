export let GameData: gameData = {
  globals: {
    gameWidth: 1280,
    gameHeight: 800,
    bgColor: "#ffffff",
    debug: true
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
    loadingBarY: 640,
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

    {
      name: "bomb",
      path: "assets/images/bomb.png",
      width: 33,
      height: 31,
      frames: 6
    },
    {
      name: "menu-btn",
      path: "assets/images/hud/menu.png",
      width: 32,
      height: 32,
      frames: 2
    },
    {
      name: "robo",
      path: "assets/images/robo.png",
      width: 30,
      height: 50,
      frames: 8
    },
    , {
      name: "bonus-heart",
      path: "assets/images/bonus-heart.png",
      width: 40,
      height: 40,
      frames: 2
    },
    {
      name: "bonus-key",
      path: "assets/images/bonus-key.png",
      width: 40,
      height: 40,
      frames: 2
    },
    {
      name: "bonus-coin",
      path: "assets/images/bonus-coin.png",
      width: 64,
      height: 64,
      frames: 8
    }, {
      name: "robo2",
      path: "assets/images/robo2.png",
      width: 30,
      height: 50,
      frames: 8
    },

  ],
  images: [

    { name: "logo-phaser", path: "assets/images/logo-phaser.png" },
    { name: "thumb", path: "assets/images/hud/thumb.png" },
    { name: "logo-phaser-green", path: "assets/images/logo-phaser-green.png" },
    { name: "logo-phaser-white", path: "assets/images/logo-phaser-white.png" },
    { name: "logo-phaser-black", path: "assets/images/logo-phaser-black.png" },
    { name: "logo", path: "assets/images/phaser.png" },
    { name: "github", path: "assets/images/hud/github.png" },
    { name: "link", path: "assets/images/hud/link.png" },
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
    { name: "stars", path: "assets/images/stars.png" },
    { name: "phaser-gamejam", path: "assets/images/phaser-gamejam.png" },
    { name: "grid", path: "assets/images/grid.png" },
    { name: "target", path: "assets/images/target.png" },
    { name: "moon", path: "assets/images/moon.png" },
    { name: "cannon-head", path: "assets/images/cannon_head.png" },
    { name: "cannon-body", path: "assets/images/cannon_body.png" },


    { name: "thumb-1", path: "assets/images/hud/thumbs/1.jpg" },
    { name: "thumb-2", path: "assets/images/hud/thumbs/2.jpg" },
    { name: "thumb-3", path: "assets/images/hud/thumbs/3.jpg" },
    { name: "thumb-4", path: "assets/images/hud/thumbs/4.jpg" },
    { name: "thumb-5", path: "assets/images/hud/thumbs/5.jpg" },
    { name: "thumb-6", path: "assets/images/hud/thumbs/6.jpg" },
    { name: "thumb-7", path: "assets/images/hud/thumbs/7.jpg" },
    { name: "thumb-8", path: "assets/images/hud/thumbs/8.jpg" },
    { name: "thumb-9", path: "assets/images/hud/thumbs/9.jpg" },
    { name: "thumb-10", path: "assets/images/hud/thumbs/10.jpg" },
    { name: "thumb-11", path: "assets/images/hud/thumbs/11.jpg" },
    { name: "thumb-12", path: "assets/images/hud/thumbs/12.jpg" },
    { name: "thumb-13", path: "assets/images/hud/thumbs/13.jpg" },
    { name: "thumb-14", path: "assets/images/hud/thumbs/14.jpg" },
    { name: "thumb-15", path: "assets/images/hud/thumbs/15.jpg" },
    { name: "thumb-16", path: "assets/images/hud/thumbs/16.jpg" },
    { name: "thumb-17", path: "assets/images/hud/thumbs/17.jpg" },
    { name: "thumb-18", path: "assets/images/hud/thumbs/18.jpg" },
    { name: "thumb-19", path: "assets/images/hud/thumbs/19.jpg" },
    { name: "thumb-20", path: "assets/images/hud/thumbs/20.jpg" },
    { name: "thumb-21", path: "assets/images/hud/thumbs/21.jpg" },
    { name: "thumb-22", path: "assets/images/hud/thumbs/22.jpg" },
    { name: "thumb-23", path: "assets/images/hud/thumbs/23.jpg" },
    { name: "thumb-24", path: "assets/images/hud/thumbs/24.jpg" },
    { name: "thumb-25", path: "assets/images/hud/thumbs/25.jpg" },
    { name: "thumb-26", path: "assets/images/hud/thumbs/26.jpg" },
    { name: "thumb-27", path: "assets/images/hud/thumbs/27.jpg" },
    { name: "thumb-28", path: "assets/images/hud/thumbs/28.jpg" },
    { name: "thumb-29", path: "assets/images/hud/thumbs/29.jpg" },
    { name: "thumb-30", path: "assets/images/hud/thumbs/30.jpg" },
    { name: "thumb-31", path: "assets/images/hud/thumbs/31.jpg" },




  ],
  atlas: [
    {
      key: "flares",
      imagepath: "assets/images/flares.png",
      jsonpath: "assets/images/flares.json"
    }
  ],
  sounds: [
    {
      name: "music",
      paths: ["assets/sounds/music.ogg", "assets/sounds/music.m4a"],

    }
  ],

  videos: [

    // { name: "video", path: "/assets/video/video.mp4" },

  ],
  audios: [

    {
      name: "sfx",
      jsonpath: "assets/sounds/sfx.json",
      paths: ["assets/sounds/sfx.ogg", "assets/sounds/sfx.m4a"],
      instance: { instance: 10 },
    }
  ],

  scripts: [],
  fonts: [{ key: "ralewayRegular", path: "assets/fonts/raleway.regular.ttf", type: "truetype" }],
  webfonts: [{ key: 'Nosifer' }, { key: 'Roboto' }, { key: 'Press+Start+2P' }, { key: 'Rubik+Doodle+Shadow' }, { key: 'Rubik+Glitch' }],
  bitmapfonts: [{ name: 'arcade', imgpath: 'assets/fonts/arcade.png', xmlpath: 'assets/fonts/arcade.xml' }],

};
