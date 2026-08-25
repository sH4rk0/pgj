import { GameData } from "../GameData";
import Examples from "./Examples";

// Esempio di Group: gestione di molti sprite come collezione, con rimozione casuale ed esplosioni
export default class Example6 extends Examples {

  private _groupBomb: Phaser.GameObjects.Group;
  private _tile1: Phaser.GameObjects.TileSprite;
  private _text1: Phaser.GameObjects.Text;
  private _counter: number = 0;
  private _clicked: boolean = false;

  constructor() {
    super();
  }


  create() {

    // Group: contenitore logico di GameObject, utile per applicare operazioni a tutti gli elementi insieme
    this._groupBomb = this.add.group();

    //setta il background di sfondo a bianco
    this.cameras.main.setBackgroundColor("#ffffff");
    this._tile1 = this.add.tileSprite(0, 0, 1280, 800, "space").setOrigin(0);

    this.add.text(640, 100, "Click to remove an element from the group!").setOrigin(.5).setFontSize(30);

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



    // Crea 100 sprite bomba, tutti con l'animazione di rotazione, e li aggiunge al group
    for (let i = 0; i < 100; i++) {

      let _sprite = this.add.sprite(0, 0, "bomb");
      _sprite.play("bomb-rotation")
      this._groupBomb.add(_sprite);

    }

    // GridAlign dispone automaticamente tutti gli elementi del group in una griglia (10 colonne, celle 58x48)
    Phaser.Actions.GridAlign(this._groupBomb.getChildren(), { width: 10, cellWidth: 58, cellHeight: 48, x: 340, y: 200 });

    if (!this.anims.exists("explosion-anim")) {
      let _animation4: Phaser.Types.Animations.Animation = {
        key: "explosion-anim",
        frames: this.anims.generateFrameNumbers("explosion", { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27] }),
        frameRate: 20,
        yoyo: false,
        repeat: 0,

      };
      this.anims.create(_animation4);
    }

    this._text1 = this.add.text(640, 740, 'bombs: ' + this._groupBomb.getLength()).setFontSize(40).setOrigin(.5);
    // Al click, rimuove casualmente un elemento dal group e fa esplodere la bomba corrispondente
    this.input.on("pointerdown", () => {

      // RemoveRandomElement rimuove ed estrae un elemento a caso dall'array (rimane comunque da rimuoverlo/distruggerlo come sprite)
      let bomb: Phaser.GameObjects.Sprite = <Phaser.GameObjects.Sprite>Phaser.Utils.Array.RemoveRandomElement(this._groupBomb.getChildren());

      if (this._groupBomb.getLength() === 0) {
        this._text1.setText('No more bombs');
      } else {
        this._text1.setText('bombs: ' + (this._groupBomb.getLength() - 1));

      }

      if (bomb) {
        this.createExplosion(bomb.x, bomb.y);
        bomb.destroy();
      }


    });

  }



  // Crea uno sprite di esplosione temporaneo che si distrugge da solo al termine dell'animazione
  createExplosion(x: number, y: number) {

    let _explo: Phaser.GameObjects.Sprite = this.add.sprite(x, y, "explosion");
    _explo.play("explosion-anim").on("animationcomplete", () => {

      _explo.destroy();

    })

  }


  update(time: number, delta: number): void {


    this._tile1.tilePositionY += 0.2; //velocità lenta




  }



}
