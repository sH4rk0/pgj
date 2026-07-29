import { GameData } from "../GameData";
import Examples from "./Examples";

export default class Example9 extends Examples {

  private _text: Phaser.GameObjects.Text;
  private _logo: Phaser.GameObjects.Image;
  private _bomb: Phaser.GameObjects.Image;
  private _flare: Phaser.GameObjects.Image;
  private _flareTween: Phaser.Tweens.Tween;


  constructor() {
    super();
  }


  create() {


    //setta il background di sfondo a bianco
    this.cameras.main.setBackgroundColor("#000000");
    this.add.tileSprite(0, 0, 1280, 800, "space").setOrigin(0);
    this._text = this.add.text(640, 550, "").setFontSize(30).setOrigin(.5);
    this._logo = this.add.image(640, 50, "phaser-gamejam").setAlpha(0).setScale(.8).setDepth(10);
    this._bomb = this.add.image(640, 350, "bomb").setAlpha(0).setScale(2).setDepth(10).setInteractive().on("pointerdown", () => {

      if (this._flareTween.paused) {
        this._flareTween.paused = false;
        this._flareTween.resume();
      } else {
        this._flareTween.paused = true;
        this._flareTween.pause();
      }

    }).on("pointerover",()=>{
      this._bomb.setScale(2.3)
    }).on("pointerout",()=>{
      this._bomb.setScale(2)
    });



    this._flare = this.add.image(100, 750, "flares").setAlpha(1).setScale(2).setDepth(10);

    this._flareTween = this.tweens.add({
      targets: this._flare,
      duration: 3000,
      x: 1180,
      ease: "Sine.easeInOut",
      delay: 1000,
      yoyo: true,
      repeat: -1
    });

    this.tweens.add({
      targets: this._logo,
      alpha: 1,
      duration: 3000,
      y: 200,
      ease: "Sine.easeOut",
      delay: 1000,
      onStart: () => {
        this._text.setText("Start logo animation");

      },
      onComplete: () => {

        this.bombAnimation();

      }
    });


  }


  bombAnimation() {

    this.tweens.add({
      targets: this._bomb,
      alpha: 1,
      duration: 3000,
      scale: 2,
      y:400,
      ease: "Bounce.easeInOut",
      onStart: () => {
        this._text.setText("Start bomb animation").setTint(0xff0000)
      },
      onComplete: () => {

        this._text.setText("Bomb animation completed").setTint(0x00ff00);
        this.add.text(640, 470, "Click the bomb to pause flare tween").setFontSize(20).setOrigin(.5);

      }
    });
  }



  update(time: number, delta: number): void {

    this._bomb.rotation+=.01;


  }



}
