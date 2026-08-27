//importiamo la classe GameData
import { GameData } from "../GameData";
import WebFont from "webfontloader";

//Scena di caricamento: carica tutti gli asset del gioco (immagini, font, suoni, ecc.)
//definiti in GameData, mostra una barra di progresso e poi avvia la scena Intro
export default class Preloader extends Phaser.Scene {

  private _loading: Phaser.GameObjects.Text;
  private _progress: Phaser.GameObjects.Graphics;
  private _image: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: "Preloader",
    });
  }

  //avvia il caricamento degli asset definiti in GameData e prepara la grafica per la barra di progresso
  preload() {
    this.cameras.main.setBackgroundColor(GameData.globals.bgColor);
    this._progress = this.add.graphics();
    this.loadAssets();
  }

  //crea l'immagine e il testo di caricamento (con una dissolvenza in ingresso) mostrati durante il preload
  init() {
    this._image = this.add
      .image(
        GameData.preloader.imageX,
        GameData.preloader.imageY,
        GameData.preloader.image
      )
      .setAlpha(0).setScale(.2);

    this.tweens.add({
      targets: [this._image],
      alpha: 1,
      duration: 500,
    });

    this._loading = this.add
      .text(this.game.canvas.width / 2, GameData.preloader.loadingTextY, "")
      .setAlpha(1)
      .setDepth(1001)
      .setOrigin(0.5, 1).setColor("#000000").setFontSize(40).setFontFamily(GameData.preloader.loadingTextFont);
  }

  //registra i listener del loader (per aggiornare la barra di progresso) e mette in coda
  //tutte le categorie di asset dichiarate in GameData (font, immagini, suoni, animazioni, ecc.)
  loadAssets(): void {

    this.load.on("start", () => { });

    this.load.on("fileprogress", (file: any, value: any) => {

    });

    //aggiorna la barra di progresso e il testo percentuale man mano che gli asset vengono caricati
    this.load.on("progress", (value: number) => {

      this._progress.clear();
      this._progress.fillStyle(GameData.preloader.loadingBarColor, 1);
      this._progress.fillRect(0, GameData.preloader.loadingBarY, GameData.globals.gameWidth * value, 70);
      this._loading.setText(GameData.preloader.loadingText + " " + Math.round(value * 100) + "%");
    });

    //al termine del caricamento attende un click, poi con una dissolvenza in uscita
    //registra le animazioni dei germi e passa alla scena Intro
    this.load.on("complete", () => {

      this._progress.clear();
      this._loading.setText(GameData.preloader.loadingTextComplete);

      this.input.once("pointerdown", () => {
        this.tweens.add({
          targets: [this._image, this._loading],
          alpha: 0,
          duration: 500,
          onComplete: () => {


            //custom code from https://phaser.io/examples/v3.85.0/games/view/avoid-the-germs
            //definisce le 4 animazioni dei germi (una per colore/frame prefix) usando i fotogrammi 1-3 dell'atlas 'assets'
            this.anims.create({
              key: 'germ1',
              frames: this.anims.generateFrameNames('assets', { prefix: 'red', start: 1, end: 3 }),
              frameRate: 8,
              repeat: -1
          });
  
          this.anims.create({
              key: 'germ2',
              frames: this.anims.generateFrameNames('assets', { prefix: 'green', start: 1, end: 3 }),
              frameRate: 8,
              repeat: -1
          });
  
          this.anims.create({
              key: 'germ3',
              frames: this.anims.generateFrameNames('assets', { prefix: 'blue', start: 1, end: 3 }),
              frameRate: 8,
              repeat: -1
          });
  
          this.anims.create({
              key: 'germ4',
              frames: this.anims.generateFrameNames('assets', { prefix: 'purple', start: 1, end: 3 }),
              frameRate: 8,
              repeat: -1
          });
            //end custom code

            //fermiamo la scena corrente
            this.scene.stop("Preloader");
            //richiamiamo il metodo start della far partire la scena Intro
            this.scene.start("Intro");

          },
        });

      });

    });


    //Assets Load
    //--------------------------

    // web fonts (Google Fonts via webfontloader)
    if (GameData.webfonts != null && GameData.webfonts.length > 0) {
      WebFont.load({
        google: { families: GameData.webfonts.map((f: FontAsset) => f.key) },
      });
    }

    //local FONT
    if (GameData.fonts != null) {
      let _fonts: Array<string> = [];
      GameData.fonts.forEach((element: FontAsset) => {
        this.load.font(element.key, element.path,element.type);
      });
      
    }


    //glsl
    if (GameData.glsl != null) {
      
      GameData.glsl.forEach((element: FontAsset) => {
        this.load.glsl(element.key, element.path);
      });
      
    }


     //JSON
     if (GameData.json != null) {
       GameData.json.forEach((element: jsonAsset) => {
        this.load.json(element.key, element.path);
      });
      
    }



     //Animations
     if (GameData.animations != null) {
      
      GameData.animations.forEach((element: jsonAsset) => {
        this.load.animation(element.key, element.path);
      });
      
    }


    //SCRIPT
    if (GameData.scripts != null)
      GameData.scripts.forEach((element: ScriptAsset) => {
        this.load.script(element.key, element.path);
      });

    // IMAGES
    if (GameData.images != null)
      GameData.images.forEach((element: ImageAsset) => {
        this.load.image(element.name, element.path);
      });

    // TILEMAPS
    if (GameData.tilemaps != null)
      GameData.tilemaps.forEach((element: TileMapsAsset) => {
        this.load.tilemapTiledJSON(element.key, element.path);
      });

    // ATLAS
    if (GameData.atlas != null)
      GameData.atlas.forEach((element: AtlasAsset) => {
        this.load.atlas(element.key, element.imagepath, element.jsonpath);
      });

    // SPRITESHEETS
    if (GameData.spritesheets != null)
      GameData.spritesheets.forEach((element: SpritesheetsAsset) => {
        this.load.spritesheet(element.name, element.path, {
          frameWidth: element.width,
          frameHeight: element.height,
          endFrame: element.frames,
        });
      });

    //video 
    if (GameData.videos != null) {
      GameData.videos.forEach((element: VideoAsset) => {
        this.load.video(element.name, element.path, true);
      });
    }

    //bitmap fonts
    if (GameData.bitmapfonts != null)
      GameData.bitmapfonts.forEach((element: BitmapfontAsset) => {
        this.load.bitmapFont(element.name, element.imgpath, element.xmlpath);
      });

    // SOUNDS
    if (GameData.sounds != null)
      GameData.sounds.forEach((element: SoundAsset) => {
        this.load.audio(element.name, element.paths);
      });

    // Audio
    if (GameData.audios != null)
      GameData.audios.forEach((element: AudioSpriteAsset) => {
        this.load.audioSprite(
          element.name,
          element.jsonpath,
          element.paths,
          element.instance
        );
      });
  }
}
