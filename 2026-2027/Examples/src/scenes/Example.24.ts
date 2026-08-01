import { GameData } from "../GameData";
import Examples from "./Examples";

export default class Example24 extends Examples {


  private _bombs: Phaser.GameObjects.Group;
  private _toggledebug: Phaser.Input.Keyboard.Key;
  private _bombCounters: Array<Phaser.GameObjects.Text>;
  private _counter: number;

  constructor() {
    super();
  }


  create() {

    this._counter=0;
    this._bombCounters = [];

    this.add.tileSprite(0, 0, 1280, 800, "space").setOrigin(0);
    this.add.text(640, 200, "Press D to toggle debug.\nWorld bound collision").setAlign("center").setFontFamily("Roboto").setColor("#ffffff").setStroke("#000000", 6).setFontSize(40).setScrollFactor(0).setOrigin(.5)


    this._bombs = this.add.group({ runChildUpdate: true })
    this.time.addEvent({ delay: 1000, callback: this.generateBomb, callbackScope: this, loop: true })

    this._toggledebug = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Body) => {
      this.sound.playAudioSprite("sfx", "nodamage", { volume: .5 });
      let _gameObject: Phaser.GameObjects.Sprite = <Phaser.GameObjects.Sprite>body.gameObject;
      let _bounces: number = _gameObject.getData("bounces");
      let _maxBounces: number = _gameObject.getData("maxBounces");
      let _counter:number = _gameObject.getData("counter");
      _bounces++;

      this._bombCounters[_counter].setText(_maxBounces-_bounces+"");
    
      _gameObject.setData("bounces", _bounces);
      if (_bounces == _maxBounces) {

        this.createExplosion(_gameObject.x, _gameObject.y);
        this._bombCounters[_counter].destroy()
        this._bombs.remove(_gameObject, true, true);

      }


    });

  }


  generateBomb() {
    this.sound.playAudioSprite("sfx", "launch", { volume: .5, loop: false })
    let _sprite = this.add.sprite(640, 400, "bomb").setScale(2).setAlpha(0);
    let _text = this.add.text(0, 0, "1").setOrigin(.5).setFontFamily("Roboto").setColor("#ffffff").setStroke("#000000", 4).setFontSize(20)
    this.tweens.add({ targets: _sprite, alpha: 1, duration: 300 });
    this.physics.world.enableBody(_sprite);
    let _body: Phaser.Physics.Arcade.Body = <Phaser.Physics.Arcade.Body>_sprite.body;
    _body.setCircle(10).setOffset(6, 6);
    let _maxBounces: number = Phaser.Math.RND.integerInRange(2, 5);
    _text.setText(_maxBounces+"");
    this._bombCounters.push(_text);
    _sprite.setData("maxBounces", _maxBounces)
    _sprite.setData("bounces", 0);
    
    _sprite.setData("counter",this._counter)
    _body.onWorldBounds = true;
    _body.setVelocity(Phaser.Math.RND.integerInRange(100, 400), Phaser.Math.RND.integerInRange(100, 400)).setCollideWorldBounds(true).setBounce(1, 1);
    this._bombs.add(_sprite)

    _sprite.update = () => {

      _text.setPosition(_sprite.x, _sprite.y);
    }

    this._counter++;

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


