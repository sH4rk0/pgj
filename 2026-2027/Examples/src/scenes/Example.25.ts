import { GameData } from "../GameData";
import Examples from "./Examples";

export default class Example25 extends Examples {


  private _bombs: Phaser.GameObjects.Group;
  private _toggledebug: Phaser.Input.Keyboard.Key;
  private _target: Phaser.GameObjects.Image;
  private _text:Phaser.GameObjects.Text;

  constructor() {
    super();
  }


  create() {



    this.add.tileSprite(0, 0, 1280, 800, "space").setOrigin(0);
    this.add.text(640, 200, "Press D to toggle debug.\nThe body randomly moveTo or accelerateTo a target.").setAlign("center").setFontFamily("Roboto").setColor("#ffffff").setStroke("#000000", 6).setFontSize(40).setScrollFactor(0).setOrigin(.5)

    this._text= this.add.text(640, 400, "").setAlign("center").setFontFamily("Roboto").setColor("#00ff00").setStroke("#000000", 6).setFontSize(40).setScrollFactor(0).setOrigin(.5)




    this._bombs = this.add.group({ runChildUpdate: true })
    this._target = this.add.image(0, 0, "target")
    this.time.addEvent({ delay: 100, callback: this.toTarget, callbackScope: this, loop: false })

    this._toggledebug = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);



  }


  toTarget() {

    this.sound.playAudioSprite("sfx", "launch", { volume: .5, loop: false })
    const rndPoint: Phaser.Math.Vector2 = this.cameras.main.worldView.getRandomPoint();
    this._target.setPosition(rndPoint.x, rndPoint.y)

    if (Phaser.Math.RND.integerInRange(0, 1)) {
      this._text.setText("Accelerate to...")
      this.physics.accelerateToObject(this.generateBomb(), this._target, 300)
    } else {
       this._text.setText("Move to...")
      this.physics.moveToObject(this.generateBomb(), this._target, 300)

    }



  }


  generateBomb() {

    let _sprite = this.add.sprite(640, 400, "bomb").setScale(2).setAlpha(0);
    this.tweens.add({ targets: _sprite, alpha: 1, duration: 300 });
    this.physics.world.enableBody(_sprite);
    let _body: Phaser.Physics.Arcade.Body = <Phaser.Physics.Arcade.Body>_sprite.body;


    this._bombs.add(_sprite)
    _body.setCircle(10).setOffset(6, 6);

    _sprite.update = () => {
      if (!this.cameras.main.worldView.contains(_sprite.x, _sprite.y)) {
        this.createExplosion(_sprite.x, _sprite.y);
        this._bombs.remove(_sprite, true, true)
      }
    }

    return _sprite

  }

  createExplosion(x: number, y: number) {

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
    this.sound.playAudioSprite("sfx", "explo", { volume: .5, loop: false })
    let _explo: Phaser.GameObjects.Sprite = this.add.sprite(x, y, "explosion");
    _explo.play("explosion-anim").on("animationcomplete", () => {

      _explo.destroy();

      this.toTarget();

    })

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


