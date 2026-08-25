import { GameData } from "../GameData";
import Examples from "./Examples";

export default class Example26 extends Examples {


  private _bombs: Phaser.GameObjects.Group;
  private _toggledebug: Phaser.Input.Keyboard.Key;
  private _target: Phaser.GameObjects.Image;
  private _text: Phaser.GameObjects.Text;

  //sprite "sorgente" che segue il mouse: verrà usato come punto di riferimento
  //per calcolare quale bomba è la più vicina/lontana
  private _sprite1: Phaser.GameObjects.Sprite;
  private _sprite2: Phaser.GameObjects.Sprite;
  private _sprite3: Phaser.GameObjects.Sprite;
  //oggetto grafico usato per disegnare le linee verso la bomba più vicina/lontana
  private _gfx: Phaser.GameObjects.Graphics;


  constructor() {
    super();
  }

  //metodo create: prepara sfondo, gruppo bombe, sprite sorgente che segue il mouse
  //e la grafica per disegnare le linee di distanza minima/massima
  create() {



    this.add.tileSprite(0, 0, 1280, 800, "space").setOrigin(0);
    this.add.text(640, 200, "Press D to toggle debug.\nThe body randomly moveTo or accelerateTo a target.").setAlign("center").setFontFamily("Roboto").setColor("#ffffff").setStroke("#000000", 6).setFontSize(40).setScrollFactor(0).setOrigin(.5)

    this._text = this.add.text(640, 400, "").setAlign("center").setFontFamily("Roboto").setColor("#00ff00").setStroke("#000000", 6).setFontSize(40).setScrollFactor(0).setOrigin(.5)




    this._bombs = this.add.group({ runChildUpdate: true })
    this._target = this.add.image(0, 0, "target")
    this.time.addEvent({ delay: 100, callback: this.toTarget, callbackScope: this, loop: false })

    this._toggledebug = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


    this._gfx = this.add.graphics();
    //this.physics.add.sprite crea sprite + body fisico in un solo passaggio (a differenza
    //di this.add.sprite + physics.world.enableBody usato altrove)
    this._sprite1 = this.physics.add.sprite(200, 200, "target"); //source sprite

    this._bombs = this.add.group({ runChildUpdate: true });


    //lo sprite sorgente segue la posizione del puntatore del mouse/touch
    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      this._sprite1.setVisible(true).setPosition(pointer.x, pointer.y);
    });


    this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Body) => {
      this.sound.playAudioSprite("sfx", "nodamage", { volume: .5 });


    });






  }

  //genera due bombe che rimbalzeranno liberamente nella scena
  toTarget() {


    this._sprite2 = this.generateBomb()
    this._sprite3 = this.generateBomb()



  }

  //crea una bomba circolare in posizione casuale, con velocità casuale e rimbalzo sui confini del mondo
  generateBomb() {

    let _sprite = this.add.sprite(Phaser.Math.RND.integerInRange(100, 1180), Phaser.Math.RND.integerInRange(100, 700), "bomb").setScale(2).setAlpha(0);
    this.tweens.add({ targets: _sprite, alpha: 1, duration: 300 });
    this.physics.world.enableBody(_sprite);
    let _body: Phaser.Physics.Arcade.Body = <Phaser.Physics.Arcade.Body>_sprite.body;

    this._bombs.add(_sprite)
    _body.setCircle(10).setOffset(6, 6);
    _body.onWorldBounds = true;
    _body.setVelocity(Phaser.Math.RND.integerInRange(100, 400), Phaser.Math.RND.integerInRange(100, 400)).setCollideWorldBounds(true).setBounce(1, 1);
    this._bombs.add(_sprite)

    return _sprite

  }


  //update globale: gestisce il toggle debug e disegna le linee verso la bomba
  //più vicina (verde) e più lontana (rossa) rispetto allo sprite sorgente
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

    //physics.closest/furthest confrontano le distanze tra la sorgente e tutti gli
    //elementi del gruppo, restituendo rispettivamente il più vicino e il più lontano
    let _closest = <Phaser.GameObjects.Sprite>this.physics.closest(this._sprite1, this._bombs.getChildren());
    let _furthest = <Phaser.GameObjects.Sprite>this.physics.furthest(this._sprite1, this._bombs.getChildren());

    if (_closest != null && _furthest != null)
      this._gfx.clear()
        .lineStyle(2, 0x00ff00)
        .lineBetween(_closest.x, _closest.y, this._sprite1.x, this._sprite1.y)
        .lineStyle(2, 0xff0000)
        .lineBetween(_furthest.x, _furthest.y, this._sprite1.x, this._sprite1.y);
  }



}


