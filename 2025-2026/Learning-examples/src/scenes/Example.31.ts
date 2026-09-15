import { GameData } from "../GameData";
import Examples from "./Examples";
import Player from "../customGameobjects/player/Player"
import Bonus from "../customGameobjects/bonus/Bonus"
import BonusCoin from "../customGameobjects/bonus/BonusCoin"

// Esempio: player che raccoglie un bonus tramite collider (Player <-> gruppo Bonus)
export default class Example31 extends Examples {
 private _mainCamera: Phaser.Cameras.Scene2D.Camera;
  private _player: Player;
  private _text: Phaser.GameObjects.Text;
  private _groupBonus: Phaser.GameObjects.Group; // gruppo che conterrà gli oggetti bonus (es. monete)
    private _toggledebug: Phaser.Input.Keyboard.Key;

  constructor() {
    super();
  }
  create() {
    this._mainCamera = this.cameras.main;
    this._mainCamera.setBackgroundColor(0x000000);
    this._groupBonus = this.add.group({ runChildUpdate: true });
// immagini di sfondo (griglia) solo a scopo visivo, per notare lo scroll della camera
this.add.image(0, 0, "grid").setOrigin(0).setAlpha(.3);
    this.add.image(1024, 0, "grid").setOrigin(0).setAlpha(.3);

       // tasto "D" per attivare/disattivare il debug grafico della fisica
       this._toggledebug = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.add.text(640, 200, "Press D to toggle debug.\nUse arrows to move the player.\nGet the bonus").setAlign("center").setFontFamily("Roboto").setColor("#ffffff").setStroke("#000000", 6).setFontSize(40).setScrollFactor(0).setOrigin(.5).setDepth(1000)

    this._text = this.add.text(0, 0, "")
      .setScrollFactor(0)
      .setFontSize(30)
      .setShadow(2, 2, "#000000", 2)
      .setStroke("#ff0000", 5);
    this._mainCamera.setBounds(0, 0, this.game.canvas.width * 2, this.game.canvas.height * 2);
    this.physics.world.setBounds(0, 0, this.game.canvas.width * 2, this.game.canvas.height * 2);

    this._player = new Player({ scene: this, x: 512, y: 300, key: "robo" });
    // [4]
    // richiamiamo il metodo locale addBonus per aggiungere
    // un bonus al gruppo alla posizione 100 100
    this.addBonus(new BonusCoin({ scene: this, x: 100, y: 100, key: "bonus-coin" }));

    this.followPlayer();
    // [5]
    // Creiamo un collider tra il player e il bonus group
    // quando collidono viene richiamato il metodo hitBonus
    this.physics.add.collider(this._player, this._groupBonus, this.hitBonus, undefined, this);

  }
  // la camera segue il player con un leggero "lerp" (smorzamento 0.1 su x e y)
  followPlayer() {
    this._mainCamera.startFollow(this._player, true, .1, .1);
  }
  // interrompe il following, la camera resta fissa
  unfollowPlayer() {
    this._mainCamera.stopFollow();
  }
  updateValues(x: number, y: number) {
    this._text.setText("player position:" + Math.round(x) + " " + Math.round(y));
  }
  // [6]
  //il metodo che viene richiamato quando c’è collisione tra player e bonus
  hitBonus(player: any, bonus: any) {
    //effettuiamo una conversione dal tipo any al tipo corretto
    const _bonus: Bonus = <Bonus>bonus;
    //viene richiamato il metodo getBonus della classe Bonus
    _bonus.getBonus();
  }
  // [7]
  //metodo per aggiungere un bonus al gruppo
  addBonus(bonus: Bonus) {
    this._groupBonus.add(bonus);
  }
  // [8]
  //metodo per rimuovere un bonus dal gruppo
  removeBonus(bonus: Bonus) {
    this._groupBonus.remove(bonus, true, true);
  }

 

  update(time: number, delta: number): void {
    this._player.update(time, delta);

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

    shutdown(): void {
    //distruggiamo il player per rimuovere anche il joystick virtuale (nipplejs)
    // altrimenti al cambio scena continua a generare eventi su un player non più valido
    this._player.destroy();
  }



}


