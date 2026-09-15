import { GameData } from "../GameData";
import Examples from "./Examples";
import Player from "../customGameobjects/player/Player"
import Bonus from "../customGameobjects/bonus/Bonus"
import BonusCoin from "../customGameobjects/bonus/BonusCoin"
import Enemy from "../customGameobjects/enemy/Enemy"

// Esempio completo: player, monete bonus, nemici (bombe), punteggio ed esplosione con reset del gioco
export default class Example32 extends Examples {
  private _mainCamera: Phaser.Cameras.Scene2D.Camera;
  private _player: Player;
  private _text: Phaser.GameObjects.Text; // testo che mostra il punteggio (monete raccolte)
  private _groupBonus: Phaser.GameObjects.Group;
  private _groupEnemy: Phaser.GameObjects.Group;

  private _toggledebug: Phaser.Input.Keyboard.Key;
  private _coins: number; // contatore monete raccolte

  constructor() {
    super();
  }
  create() {
    this._coins = 0;
    this._mainCamera = this.cameras.main;
    this._mainCamera.setBackgroundColor(0x000000);
    this._groupBonus = this.add.group({ runChildUpdate: true });
    this._groupEnemy = this.add.group({ runChildUpdate: true });

    // immagini di sfondo (griglia) solo a scopo visivo
    this.add.image(0, 0, "grid").setOrigin(0).setAlpha(.3);
    this.add.image(1024, 0, "grid").setOrigin(0).setAlpha(.3);
    // testo HUD del punteggio, fissato sullo schermo con setScrollFactor(0)
    this._text = this.add.text(100, 100, "0").setAlign("center").setFontFamily("Roboto").setColor("#ffffff").setStroke("#000000", 6).setFontSize(40).setScrollFactor(0).setOrigin(.5).setDepth(1000)

    // tasto "D" per attivare/disattivare il debug grafico della fisica
    this._toggledebug = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.add.text(640, 200, "Press D to toggle debug.\nGet coins, avoid bombs").setAlign("center").setFontFamily("Roboto").setColor("#ffffff").setStroke("#000000", 6).setFontSize(40).setScrollFactor(0).setOrigin(.5).setDepth(1000)

    // camera e mondo fisico più larghi dello schermo, per poter scorrere seguendo il player
    this._mainCamera.setBounds(0, 0, 1024 * 2, 1024);
    this.physics.world.setBounds(0, 0, 1024 * 2, 1024);

    this._player = new Player({ scene: this, x: 512, y: 300, key: "robo" });

    // richiamiamo il metodo locale addBonus per aggiungere
    // un bonus al gruppo alla posizione 100 100
    this.generateBonus();

    this.generateEnemy();

    this.followPlayer();

    // Creiamo un collider tra il player e il bonus group
    // quando collidono viene richiamato il metodo hitBonus
    this.physics.add.collider(this._player, this._groupBonus, this.hitBonus, undefined, this);

    // collider tra il player e il gruppo nemici: alla collisione viene richiamato hitEnemy
    this.physics.add.collider(this._player, this._groupEnemy, this.hitEnemy, undefined, this);

  }

  // genera una nuova moneta bonus in posizione casuale entro i bounds del mondo
  generateBonus() {

    this.addBonus(new BonusCoin({ scene: this, x: Phaser.Math.RND.integerInRange(100, 2048 - 100), y: Phaser.Math.RND.integerInRange(100, 1024 - 100), key: "bonus-coin" }));

  }

  // genera un nuovo nemico (bomba) in posizione casuale entro i bounds del mondo
  generateEnemy() {

    this.addEnemy(new Enemy({ scene: this, x: Phaser.Math.RND.integerInRange(100, 2048 - 100), y: Phaser.Math.RND.integerInRange(100, 1024 - 100), key: "bomb" }))
  }


  followPlayer() {
    this._mainCamera.startFollow(this._player, true, .1, .1);
  }
  unfollowPlayer() {
    this._mainCamera.stopFollow();
  }

  updateValues(x: number, y: number) {
    this._text.setText("player position:" + Math.round(x) + " " + Math.round(y));
  }

  //il metodo che viene richiamato quando c’è collisione tra player e bonus
  hitBonus(player: any, bonus: any) {
    //effettuiamo una conversione dal tipo any al tipo corretto
    const _bonus: Bonus = <Bonus>bonus;
    //viene richiamato il metodo getBonus della classe Bonus
    _bonus.getBonus();
    // incrementiamo il punteggio e aggiorniamo il testo HUD
    this._coins++;
    this._text.setText(this._coins + "");
    this.generateBonus();
    //genero una nuova bomba ogni volta che raccolgo un bonus
    this.generateEnemy();
  }

  //il metodo che viene richiamato quando c’è collisione tra player e la bomba
  hitEnemy(player: any, Enemy: any) {

    // mostra l'animazione di esplosione nel punto di impatto
    this.createExplosion(Enemy.x, Enemy.y);
    this.removeEnemy(Enemy);
    // ricomincia la partita azzerando punteggio e gruppi
    this.resetGame();

  }

  //metodo per aggiungere un bonus al gruppo
  addBonus(bonus: Bonus) {
    this._groupBonus.add(bonus);
  }

  //metodo per rimuovere un bonus dal gruppo
  removeBonus(bonus: Bonus) {
    this._groupBonus.remove(bonus, true, true);
  }

  addEnemy(bonus: Enemy) {
    this._groupEnemy.add(bonus);
  }

  //metodo per rimuovere un bonus dal gruppo
  removeEnemy(bonus: Enemy) {
    this._groupEnemy.remove(bonus, true, true);
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


  // crea (una sola volta) l'animazione dell'esplosione e la riproduce nella posizione indicata
  createExplosion(x: number, y: number) {

    // definiamo l'animazione solo se non è già stata registrata, per evitare duplicati
    if (!this.anims.exists("explosion-anim")) {
      let _animation4: Phaser.Types.Animations.Animation = {
        key: "explosion-anim",
        // genera la sequenza di frame dallo spritesheet "explosion" (frame 0-27)
        frames: this.anims.generateFrameNumbers("explosion", { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27] }),
        frameRate: 20, // velocità di riproduzione (frame al secondo)
        yoyo: false,
        repeat: 0, // l'animazione viene eseguita una sola volta

      };
      this.anims.create(_animation4);
    }
    // riproduce l'effetto sonoro dell'esplosione (audio sprite "explo" dentro "sfx")
    this.sound.playAudioSprite("sfx", "explo", { volume: .5, loop: false })
    let _explo: Phaser.GameObjects.Sprite = this.add.sprite(x, y, "explosion").setDepth(10);
    // avvia l'animazione e, al termine, distrugge lo sprite temporaneo dell'esplosione
    _explo.play("explosion-anim").on("animationcomplete", () => {

      _explo.destroy();



    })

  }

  // resetta lo stato di gioco: svuota i gruppi (distruggendo gli oggetti), azzera il punteggio
  // e genera un nuovo bonus e un nuovo nemico
  resetGame() {

    this._groupBonus.clear(true, true);
    this._groupEnemy.clear(true, true);
    this._text.setText("0");
    this._coins = 0;
    this.generateBonus();
    this.generateEnemy();

  }

    shutdown(): void {
    //distruggiamo il player per rimuovere anche il joystick virtuale (nipplejs)
    // altrimenti al cambio scena continua a generare eventi su un player non più valido
    this._player.destroy();
  }



}


