import { GameData } from "../GameData";
import Examples from "./Examples";
import Player from "../customGameobjects/player/Player"

// Esempio: player custom con controllo camera che lo segue (startFollow) entro i bounds del mondo
export default class Example30 extends Examples {


  //variabile locale che associeremo alla main camera
  private _mainCamera: Phaser.Cameras.Scene2D.Camera;
  //variabile locale che conterrà l’istanza del Player
  private _player: Player;
  private _toggledebug: Phaser.Input.Keyboard.Key;
  constructor() {
    super();
  }

  create() {

    this._mainCamera = this.cameras.main;
    this._mainCamera.setBackgroundColor(0x000000);
    //aggiungiamo un’immagine qualunque alla scena in modo da renderci conto
    // del movimento del Player
    // potete inserire una qualunque immagine abbastanza grande in modo
    // da poter percepire il movimento del Player e quindi della camera 
    
    this.add.image(0, 0, "grid").setOrigin(0).setAlpha(.3);
    this.add.image(1024, 0, "grid").setOrigin(0).setAlpha(.3);
    
       // tasto "D" per attivare/disattivare il debug grafico della fisica
       this._toggledebug = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.add.text(640, 200, "Press D to toggle debug.\nUse arrows to move the player").setAlign("center").setFontFamily("Roboto").setColor("#ffffff").setStroke("#000000", 6).setFontSize(40).setScrollFactor(0).setOrigin(.5).setDepth(1000)

    //settiamo i bounds della camera e del world
    this._mainCamera.setBounds(
      0, //x
      0, //y
     1024 * 2, //laghezza
      1024  //altezza
    );

    this.physics.world.setBounds(
      0, //x
      0, //y
      1024 * 2, //laghezza
      1024  //altezza
    );
    //Creiamo l’istanza del Player
    this._player = new Player({ scene: this, x: 512, y: 300, key: "robo" });
    //Richiamiamo un metodo custom della nostra scena che attiva il follow
    //della camera sul nostro player
    this.followPlayer();




  }

  followPlayer() {
    //associamo la main camera alla nostra istanza di Player
    // come visto nel capitolo dedicato alla camera
    this._mainCamera.startFollow(this._player, true, .1, .1);
  }

  update(time: number, delta: number): void {
    //richiamiamo il metodo update del player per rendere attivo
    // il controllo sui tasti
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


