import { GameData } from "../GameData";
import Examples from "./Examples";

export default class Example23 extends Examples {


  private _bombs: Phaser.GameObjects.Group;
  private _toggledebug: Phaser.Input.Keyboard.Key;

  constructor() {
    super();
  }

  //metodo create: prepara sfondo, gruppo bombe, timer di generazione e tasto debug
  create() {



    this.add.tileSprite(0, 0, 1280, 800, "space").setOrigin(0);
    this.add.text(640, 200, "Press D to toggle debug.\nThe body is randomly set to circle.").setAlign("center").setFontFamily("Roboto").setColor("#ffffff").setStroke("#000000", 6).setFontSize(40).setScrollFactor(0).setOrigin(.5)




    this._bombs = this.add.group({ runChildUpdate: true })
    this.time.addEvent({ delay: 1000, callback: this.generateBomb, callbackScope: this, loop: true })

    this._toggledebug = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


  }

  //crea una bomba con velocità iniziale casuale; il body fisico è a volte rettangolare, a volte circolare
  generateBomb() {
    this.sound.playAudioSprite("sfx", "launch", { volume: .5, loop: false })
    let _sprite = this.add.sprite(640, 400, "bomb").setScale(2).setAlpha(0);
    this.tweens.add({ targets: _sprite, alpha: 1, duration: 300 });
    this.physics.world.enableBody(_sprite);
    let _body: Phaser.Physics.Arcade.Body = <Phaser.Physics.Arcade.Body>_sprite.body;
    _body.setGravityY(400);
    _body.setVelocityY(-300).setVelocityX(Phaser.Math.RND.integerInRange(-200, 200));
    this._bombs.add(_sprite)

    //con probabilità 50% sostituiamo il body rettangolare (default) con uno circolare
    //setOffset riposiziona il body rispetto allo sprite per centrarlo correttamente
    if (Phaser.Math.RND.integerInRange(0, 1)) {
      _body.setCircle(10).setOffset(6, 6);
    }

     _sprite.update = () => {
     //se la bomba esce dall'area visibile della camera, esplode e viene rimossa
     if (!this.cameras.main.worldView.contains(_sprite.x, _sprite.y)) {
        this.createExplosion(_sprite.x, _sprite.y);
        this._bombs.remove(_sprite, true,true)
      }
    }

  }

  //crea (una sola volta) l'animazione di esplosione e la riproduce nella posizione indicata
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
    //a fine animazione lo sprite dell'esplosione viene distrutto
    _explo.play("explosion-anim").on("animationcomplete", () => {

      _explo.destroy();

    })

  }

  //update globale: gestisce il toggle del debug grafico della fisica (tasto D)
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


