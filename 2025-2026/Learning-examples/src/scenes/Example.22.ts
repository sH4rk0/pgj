import { GameData } from "../GameData";
import Examples from "./Examples";

export default class Example22 extends Examples {


  //gruppo che contiene tutte le "bombe" attive; runChildUpdate:true fa chiamare
  //automaticamente il metodo update() di ogni child del gruppo ad ogni frame
  private _bombs: Phaser.GameObjects.Group;
  //tasto usato per attivare/disattivare il debug grafico della fisica
  private _toggledebug: Phaser.Input.Keyboard.Key;

  constructor() {
    super();
  }

  //metodo create: prepara lo sfondo, il gruppo bombe, il timer di generazione e il tasto debug
  create() {

    this.add.tileSprite(0, 0, 1280, 800, "space").setOrigin(0);
  this.add.text(640, 200, "Press D to toggle debug.").setAlign("center").setFontFamily("Roboto").setColor("#ffffff").setStroke("#000000", 6).setFontSize(40).setScrollFactor(0).setOrigin(.5)

    //gruppo generico (non fisico) che conterrà gli sprite delle bombe
    this._bombs = this.add.group({ runChildUpdate: true })
    //ogni secondo, in loop, viene generata una nuova bomba
    this.time.addEvent({ delay: 1000, callback: this.generateBomb, callbackScope: this, loop: true })

    //registriamo il tasto "D" per il toggle del debug
    this._toggledebug = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

  }

  //crea una bomba, le abilita un body fisico e le imprime una velocità iniziale casuale
  generateBomb() {
    this.sound.playAudioSprite("sfx", "launch", { volume: .5, loop: false })
    //creiamo lo sprite invisibile (alpha 0) e lo facciamo apparire con un tween di fade-in
    let _sprite = this.add.sprite(640, 400, "bomb").setScale(2).setAlpha(0);
    this.tweens.add({ targets: _sprite, alpha: 1, duration: 300 });
    //abilitiamo un body Arcade Physics sullo sprite (di default non ne ha uno)
    this.physics.world.enableBody(_sprite);
    let _body: Phaser.Physics.Arcade.Body = <Phaser.Physics.Arcade.Body>_sprite.body;
    //gravità applicata solo su questo body (indipendente da quella globale del mondo)
    _body.setGravityY(400);
    //velocità iniziale casuale: verso l'alto (Y negativa) e con una componente X casuale
    _body.setVelocityY(Phaser.Math.RND.integerInRange(-500, -300)).setVelocityX(Phaser.Math.RND.integerInRange(-200, 200));
    this._bombs.add(_sprite)
    //override dell'update del singolo sprite: viene chiamato automaticamente
    //dal gruppo grazie a runChildUpdate:true
    _sprite.update = () => {

      //se la bomba esce dall'area visibile della camera, esplode e viene rimossa dal gruppo
      if (!this.cameras.main.worldView.contains(_sprite.x, _sprite.y)) {
        this.createExplosion(_sprite.x, _sprite.y);
        this._bombs.remove(_sprite, true,true)
      }
    }

  }

  //crea (una sola volta) l'animazione di esplosione e la riproduce nella posizione indicata
  createExplosion(x: number, y: number) {

    //creiamo l'animazione solo la prima volta che serve, per non ridefinirla ad ogni esplosione
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
    //quando l'animazione termina distruggiamo lo sprite dell'esplosione per non sprecare memoria
    _explo.play("explosion-anim").on("animationcomplete", () => {

      _explo.destroy();

    })

  }

  //update globale della scena: gestisce solo il toggle del debug grafico della fisica
  update(time: number, delta: number): void {
    //JustDown rileva la pressione del tasto in questo frame (non lo stato "premuto")
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


