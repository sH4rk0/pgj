import { GameData } from "../GameData";
import Examples from "./Examples";

// Esempio: overlap tra sprite dello stesso gruppo (a differenza del collider,
// l'overlap rileva la sovrapposizione ma NON modifica velocità/posizione dei corpi)
export default class Example29 extends Examples {

  private _toggledebug: Phaser.Input.Keyboard.Key; // tasto per attivare/disattivare il debug della fisica
  private _bombs: Phaser.GameObjects.Group; // gruppo che contiene le bombe
  constructor() {
    super();
  }


  create() {
    // sfondo che si estende su tutta l'area di gioco
    this.add.tileSprite(0, 0, 1280, 800, "space").setOrigin(0);
    this._bombs = this.add.group({ runChildUpdate: true });

    // tasto "D" per mostrare/nascondere i box di debug della fisica
    this._toggledebug = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.add.text(640, 200, "Press D to toggle debug.").setAlign("center").setFontFamily("Roboto").setColor("#ffffff").setStroke("#000000", 6).setFontSize(40).setScrollFactor(0).setOrigin(.5)

    // creiamo 3 bombe con fisica e le aggiungiamo al gruppo
    this._bombs.add(this.createBomb());
    this._bombs.add(this.createBomb());
    this._bombs.add(this.createBomb());

    // overlap tra il gruppo e se stesso: le bombe continuano ad attraversarsi
    // (non c'è risposta fisica), ma onOverlap viene richiamato quando si sovrappongono
    this.physics.add.overlap(this._bombs, this._bombs, this.onOverlap, null, this);

  }


  // crea uno sprite fisico "bomba" in una posizione casuale entro i margini dello schermo
  createBomb(): Phaser.GameObjects.Sprite {
    let _sprite = this.physics.add.sprite(Phaser.Math.RND.integerInRange(100,this.game.canvas.width-100),Phaser.Math.RND.integerInRange(100,this.game.canvas.height-100), "bomb").setScale(4);
    // velocità iniziale casuale, rimbalza sui bordi del mondo, rimbalzo elastico,
    // leggera gravità verticale, corpo di collisione circolare
    _sprite.body.setVelocity(Phaser.Math.RND.integerInRange(-200,200),Phaser.Math.RND.integerInRange(-200,200)).setCollideWorldBounds(true).setBounce(1, 1).setGravityY(100).setCircle(14, 4, 4)

    return _sprite;


  }

  // callback richiamata quando due bombe si sovrappongono: cambia il tint di entrambe
  onOverlap(object1: any, object2: any) {

    const _sprite1 = <Phaser.GameObjects.Sprite>object1;
    const _sprite2 = <Phaser.GameObjects.Sprite>object2;

    _sprite1.setTint(Math.random() * 0xffffff);
    _sprite2.setTint(Math.random() * 0xffffff);
  }



  update(time: number, delta: number): void {

    // toggle del debug grafico della fisica alla pressione del tasto D
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


