import { GameData } from "../GameData";
import Examples from "./Examples";

// Esempio: collider tra sprite dello stesso gruppo (bombe che rimbalzano e collidono tra loro)
export default class Example28 extends Examples {

  private _toggledebug: Phaser.Input.Keyboard.Key; // tasto per attivare/disattivare il debug della fisica
  private _bombs: Phaser.GameObjects.Group; // gruppo che contiene le bombe (runChildUpdate = ogni figlio riceve update)
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

    // collider tra il gruppo e se stesso: rileva la collisione fisica tra le bombe
    // e blocca/rimbalza i corpi, richiamando onCollide ad ogni impatto
    this.physics.add.collider(this._bombs, this._bombs, this.onCollide, null, this);

  }





  // crea uno sprite fisico "bomba" in una posizione casuale entro i margini dello schermo
  createBomb(): Phaser.GameObjects.Sprite {
    let _sprite = this.physics.add.sprite(Phaser.Math.RND.integerInRange(100,this.game.canvas.width-100),Phaser.Math.RND.integerInRange(100,this.game.canvas.height-100), "bomb").setScale(4);
    // velocità iniziale casuale, rimbalza sui bordi del mondo (collideWorldBounds),
    // bounce 1,1 = rimbalzo elastico al 100%, gravità verticale leggera,
    // setCircle definisce un corpo di collisione circolare più preciso dello sprite rettangolare
    _sprite.body.setVelocity(Phaser.Math.RND.integerInRange(-200,200),Phaser.Math.RND.integerInRange(-200,200)).setCollideWorldBounds(true).setBounce(1, 1).setGravityY(100).setCircle(14, 4, 4)

    return _sprite;


  }

  // callback richiamata dal collider ad ogni collisione tra due bombe:
  // cambia il colore (tint) di entrambe con un colore casuale, solo per feedback visivo
  onCollide(object1: any, object2: any) {

    const _sprite1 = <Phaser.GameObjects.Sprite>object1;
    const _sprite2 = <Phaser.GameObjects.Sprite>object2;

    _sprite1.setTint(Math.random() * 0xffffff);
    _sprite2.setTint(Math.random() * 0xffffff);
  }



  update(time: number, delta: number): void {

    // se il tasto D è stato appena premuto, attiva/disattiva il rendering di debug della fisica
    // (mostra i box/cerchi di collisione dei corpi fisici)
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


