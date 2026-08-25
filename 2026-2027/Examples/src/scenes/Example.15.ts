import { GameData } from "../GameData";
import Examples from "./Examples";

// Esempio: come Example14, ma il punteggio viene passato alla scena
// successiva tramite il parametro "data" di scene.start invece del registry.
export default class Example15 extends Examples {

  private _numBombs: number = 0;
  private _counter: number = 0;

  constructor() {
    super();
  }


  create() {

    this._counter = 0;

    this.add.tileSprite(0, 0, 1280, 800, "space").setOrigin(0);
    this.add.text(640, 400, "Destroy all the bombs").setTint(0xffffff).setOrigin(.5).setFontSize(40).setFontFamily('Roboto').setInteractive().on("pointerdown", () => {

    });


    // Numero di bombe casuale ad ogni partita, tra 2 e 5
    this._numBombs = Phaser.Math.RND.integerInRange(2, 5);

    for (let i = 0; i < this._numBombs; i++) {

      this.createBomb();

    }

  }


  createBomb(): void {


    // Bomba interattiva: al click genera l'esplosione nella sua posizione
    // e si autodistrugge
    let _bomb = this.add.image(Phaser.Math.RND.integerInRange(100, 1180), Phaser.Math.RND.integerInRange(100, 700), "bomb").setScale(2).setAlpha(0).setInteractive().on("pointerdown", () => {

      this.createExplosion(_bomb.x, _bomb.y)
      _bomb.destroy();
    });

    this.tweens.add({
      targets: _bomb,
      alpha: 1
    })

  }


  createExplosion(x: number, y: number) {
    this._counter++;
    // Creiamo l'animazione di esplosione una sola volta (anims.exists evita duplicati)
    if (!this.anims.exists("explosion-anim")) {
      let _animation4: Phaser.Types.Animations.Animation = {
        key: "explosion-anim",
        frames: this.anims.generateFrameNumbers("explosion", { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27] }),
        frameRate: 15,
        yoyo: false,
        repeat: 0,

      };
      this.anims.create(_animation4);
    }

   

    // Sprite temporaneo dell'esplosione, distrutto al termine dell'animazione
    let _explo: Phaser.GameObjects.Sprite = this.add.sprite(x, y, "explosion");
    _explo.play("explosion-anim").on("animationcomplete", () => {

      _explo.destroy();

      // Quando tutte le bombe sono state distrutte torniamo al menu,
      // passando il conteggio finale come dato di avvio della scena
      if (this._counter == this._numBombs) {
        //passiamo il valore tramite il parametro data
        this.scene.start("ExamplesScene", { bombs: this._counter });
      }


    })

  }


  update(time: number, delta: number): void {



  }

  


}


