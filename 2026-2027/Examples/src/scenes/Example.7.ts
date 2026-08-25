import { GameData } from "../GameData";
import Examples from "./Examples";

// Esempio di menu: voci di testo interattive e un popup dei crediti realizzato con un Container
export default class Example7 extends Examples {

  private _containerCredits: Phaser.GameObjects.Container;
  private _tile1: Phaser.GameObjects.TileSprite;
  private _bomb1: Phaser.GameObjects.Sprite;
  private _bomb2: Phaser.GameObjects.Sprite;
  private _text1: Phaser.GameObjects.Text;
  private _text2: Phaser.GameObjects.Text;



  constructor() {
    super();
  }


  create() {


    //setta il background di sfondo a bianco
    this.cameras.main.setBackgroundColor("#ffffff");
    this._tile1 = this.add.tileSprite(0, 0, 1280, 800, "space").setOrigin(0);



    if (!this.anims.exists("bomb-rotation")) {
      let _animation: Phaser.Types.Animations.Animation = {
        key: "bomb-rotation",
        frames: this.anims.generateFrameNumbers("bomb", { frames: [0, 1, 2, 3, 4, 5] }),
        frameRate: 10,
        yoyo: false,
        repeat: -1
      };
      this.anims.create(_animation);
    }

    // Voce di menu "Play": al roll-over evidenzia il testo e sposta le bombe decorative accanto ad esso
    this._text1 = this.add.text(640, 300, "Play").setOrigin(.5).setFontSize(40).setFontFamily("Roboto").setInteractive().on("pointerover", () => {
      this._text1.setTint(0xff0000);
      this.setBombsPosition(this._text1.x, this._text1.y)
    }).on("pointerout", () => {
      this._text1.clearTint();
    }).on("pointerdown", () => {

     //do something
    });

    // Voce di menu "Credits": al click disabilita l'interattività delle voci e mostra il popup (alpha 1)
    this._text2 = this.add.text(640, 400, "Credits").setOrigin(.5).setFontSize(40).setFontFamily("Roboto").setInteractive()
      .on("pointerover", () => {
        this._text2.setTint(0xff0000);
        this.setBombsPosition(this._text2.x, this._text2.y)
      })
      .on("pointerout", () => {
        this._text2.clearTint();
      }).on("pointerdown", () => {
        this._text1.disableInteractive();
        this._text2.disableInteractive();
        this._containerCredits.setAlpha(1);
      });

    this._bomb1 = this.add.sprite(this._text1.x - 100, this._text1.y, "bomb");
    this._bomb1.play("bomb-rotation");
    this._bomb2 = this.add.sprite(this._text1.x + 100, this._text1.y, "bomb");
    this._bomb2.play("bomb-rotation");

    //container code
    // Container inizialmente invisibile (alpha 0) che funge da popup dei crediti
    this._containerCredits = this.add.container().setAlpha(0);
    let _layer = this.add.image(640, 400, "layer").setAlpha(.8)
    let _popup = this.add.image(640, 400, "popup");
    let _text = this.add.text(640, 270, "Credits").setOrigin(.5).setFontFamily("Roboto").setFontSize(40);
    // Il bottone "Close" nasconde il popup e riattiva l'interattività delle voci di menu
    let _close = this.add.text(640, 550, "Close").setOrigin(.5).setFontFamily("Roboto").setFontSize(30).setInteractive().on("pointerdown", () => {
      this._containerCredits.setAlpha(0);
      this._text1.setInteractive();
      this._text2.setInteractive();
    })
    // setWordWrapWidth forza il testo lungo a mandare a capo automaticamente entro la larghezza indicata (px)
    let _text2 = this.add.text(640, 400, "This is an example of a container to insert some useful information for the game.\n\nIt is possible to insert long text and to prevent it from going out of the popup borders we use the setWordWrapWidth(700) method. \n\nAny gameObject can be added to the container.").setOrigin(.5).setFontFamily("Roboto").setFontSize(20).setWordWrapWidth(700);
    this._containerCredits.add([_layer, _popup, _text, _text2, _close]);

  }


  // Aggiorna la posizione delle due bombe decorative accanto alla voce di menu evidenziata
  setBombsPosition(x: number, y: number) {

    this._bomb1.setPosition(x - 100, y);
    this._bomb2.setPosition(x + 100, y);
  }

  update(time: number, delta: number): void {

    this._tile1.tilePositionY += 0.2; //velocità lenta

  }



}
