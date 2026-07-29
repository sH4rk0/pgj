import { GameData } from "../GameData";
import Examples from "./Examples";

export default class Example4 extends Examples {

  private _sprite1: Phaser.GameObjects.Sprite;
  private _sprite2: Phaser.GameObjects.Sprite;
  private _sprite3: Phaser.GameObjects.Sprite;
  private _sprite4: Phaser.GameObjects.Sprite;
  private _sprite5: Phaser.GameObjects.Sprite;

  private _clicked: boolean = false;
  constructor() {
    super();
  }


  create() {

    this.add.tileSprite(0, 0, 1280, 800, "space").setOrigin(0);

    this.add.tileSprite(0, -100, 1280, 800, "bg7").setOrigin(0).setScale(2);

    this.add.text(1100, 560, "Click to set random frame").setOrigin(.5)
    this._sprite1 = this.add.sprite(1100, 640, "players").setScale(2).setInteractive().on("pointerdown", () => {

      this._sprite1.setFrame(Phaser.Math.RND.pick([0, 1, 2, 3, 4, 5, 6, 7]));

    });



    this.add.text(400, 560, "Running animation").setOrigin(.5)
    this._sprite2 = this.add.sprite(400, 640, "players").setScale(2);

    if (!this.anims.exists("player-running")) {
      let _animation: Phaser.Types.Animations.Animation = {
        key: "player-running",
        frames: this.anims.generateFrameNumbers("players", { frames: [0, 1, 2, 3, 4, 5, 6, 7] }),
        frameRate: 10,
        yoyo: false,
        repeat: -1
      };
      this.anims.create(_animation);
    }
    this._sprite2.play("player-running")



    this.add.text(100, 560, "Idle animation").setOrigin(.5)
    this._sprite5 = this.add.sprite(100, 640, "players").setScale(2);

    if (!this.anims.exists("player-idle")) {
      let _animation: Phaser.Types.Animations.Animation = {
        key: "player-idle",
        frames: this.anims.generateFrameNumbers("players", { frames: [8, 9, 10, 11, 12, 13] }),
        frameRate: 10,
        yoyo: false,
        repeat: -1
      };
      this.anims.create(_animation);
    }
    this._sprite5.play("player-idle")

    this.add.text(700, 560, "Click to switch the animation").setOrigin(.5)

    this._sprite3 = this.add.sprite(700, 640, "players").setScale(2);
    if (!this.anims.exists("player-idle")) {
      let _animation2: Phaser.Types.Animations.Animation = {
        key: "player-idle",
        frames: this.anims.generateFrameNumbers("players", { frames: [8, 9, 10, 11, 12, 13] }),
        frameRate: 10,
        yoyo: false,
        repeat: -1
      };
      this.anims.create(_animation2);
    }
    this._sprite3.play("player-idle").setInteractive().on("pointerdown", () => {

      if (this._clicked) {
        this._sprite3.play("player-idle")
      } else {
        this._sprite3.play("player-running")
      }
      this._clicked = !this._clicked;
    });


    this.add.text(1280 / 2, 340, "Click to destroy!!").setOrigin(.5)
    this._sprite4 = this.add.sprite(1280 / 2, 400, "asteroid-1").setScale(1);
    if (!this.anims.exists("asteroid-rotation")) {
      let _animation3: Phaser.Types.Animations.Animation = {
        key: "asteroid-rotation",
        frames: this.anims.generateFrameNumbers("asteroid-1", { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }),
        frameRate: 10,
        yoyo: false,
        repeat: -1
      };

      this.anims.create(_animation3);
    }
    this._sprite4.play("asteroid-rotation").setInteractive().on("pointerdown", () => {

      this.createExplosion(this._sprite4.x, this._sprite4.y);
      this._sprite4.destroy();
    });

    if (!this.anims.exists("explosion-anim")) {
      let _animation4: Phaser.Types.Animations.Animation = {
        key: "explosion-anim",
        frames: this.anims.generateFrameNumbers("explosion", { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27] }),
        frameRate: 10,
        yoyo: false,
        repeat: 0,

      };
      this.anims.create(_animation4);
    }
  }

  createExplosion(x: number, y: number) {

    let _explo: Phaser.GameObjects.Sprite = this.add.sprite(x, y, "explosion");
    _explo.play("explosion-anim").on("animationcomplete", () => {
      console.log("animation complete");
      _explo.destroy();

    })

  }


  update(time: number, delta: number): void {


    this._sprite4.rotation += 0.01;

  }

}
