import { GameData } from "../GameData";
import Examples from "./Examples";

export default class Example16 extends Examples {

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


    this._numBombs = Phaser.Math.RND.integerInRange(2, 5);

    for (let i = 0; i < this._numBombs; i++) {

      this.createBomb();

    }

  }


  createBomb(): void {


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
     this.events.emit("update-bombs",[1]);
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

    let _explo: Phaser.GameObjects.Sprite = this.add.sprite(x, y, "explosion");
    _explo.play("explosion-anim").on("animationcomplete", () => {

      _explo.destroy();

      if (this._counter == this._numBombs) {
        //passiamo il valore tramite il parametro data
        this.scene.start("ExamplesScene", { bombs: this._counter });
      }


    })

  }


  update(time: number, delta: number): void {



  }

shutdown(): void {
    console.log("shutdown 16");
    this.scene.stop("ExamplesHUD")
    this.scene.remove("ExamplesHUD")

  }


}


