import { GameData } from "../GameData";
import Examples from "./Examples";

export default class Example29 extends Examples {

  private _toggledebug: Phaser.Input.Keyboard.Key;
  private _bombs: Phaser.GameObjects.Group;
  constructor() {
    super();
  }


  create() {
    this.add.tileSprite(0, 0, 1280, 800, "space").setOrigin(0);
    this._bombs = this.add.group({ runChildUpdate: true });

    this._toggledebug = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.add.text(640, 200, "Press D to toggle debug.").setAlign("center").setFontFamily("Roboto").setColor("#ffffff").setStroke("#000000", 6).setFontSize(40).setScrollFactor(0).setOrigin(.5)

    this._bombs.add(this.createBomb());
    this._bombs.add(this.createBomb());
    this._bombs.add(this.createBomb());

    this.physics.add.overlap(this._bombs, this._bombs, this.onOverlap, null, this);

  }


  createBomb(): Phaser.GameObjects.Sprite {
    let _sprite = this.physics.add.sprite(Phaser.Math.RND.integerInRange(100,this.game.canvas.width-100),Phaser.Math.RND.integerInRange(100,this.game.canvas.height-100), "bomb").setScale(4);
    _sprite.body.setVelocity(Phaser.Math.RND.integerInRange(-200,200),Phaser.Math.RND.integerInRange(-200,200)).setCollideWorldBounds(true).setBounce(1, 1).setGravityY(100).setCircle(14, 4, 4)

    return _sprite;


  }

  onOverlap(object1: any, object2: any) {

    const _sprite1 = <Phaser.GameObjects.Sprite>object1;
    const _sprite2 = <Phaser.GameObjects.Sprite>object2;

    _sprite1.setTint(Math.random() * 0xffffff);
    _sprite2.setTint(Math.random() * 0xffffff);
  }



  update(time: number, delta: number): void {

    if (Phaser.Input.Keyboard.JustDown(this._toggledebug)) {
      if (this.physics.world.drawDebug) {
        this.physics.world.drawDebug = false;
        this.physics.world.debugGraphic.clear();
      }
      else {
        this.physics.world.drawDebug = true;
      }
    }
  }



}


