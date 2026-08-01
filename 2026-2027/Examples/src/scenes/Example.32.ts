import { GameData } from "../GameData";
import Examples from "./Examples";
import Player from "../customGameobjects/player/Player"
import Bonus from "../customGameobjects/bonus/Bonus"
import BonusCoin from "../customGameobjects/bonus/BonusCoin"
import Enemy from "../customGameobjects/enemy/Enemy"

export default class Example32 extends Examples {
  private _mainCamera: Phaser.Cameras.Scene2D.Camera;
  private _player: Player;
  private _text: Phaser.GameObjects.Text;
  private _groupBonus: Phaser.GameObjects.Group;
  private _groupEnemy: Phaser.GameObjects.Group;

  private _toggledebug: Phaser.Input.Keyboard.Key;
  private _coins: number;

  constructor() {
    super();
  }
  create() {
    this._coins = 0;
    this._mainCamera = this.cameras.main;
    this._mainCamera.setBackgroundColor(0x000000);
    this._groupBonus = this.add.group({ runChildUpdate: true });
    this._groupEnemy = this.add.group({ runChildUpdate: true });

    this.add.image(0, 0, "grid").setOrigin(0).setAlpha(.3);
    this.add.image(1024, 0, "grid").setOrigin(0).setAlpha(.3);
    this._text = this.add.text(100, 100, "0").setAlign("center").setFontFamily("Roboto").setColor("#ffffff").setStroke("#000000", 6).setFontSize(40).setScrollFactor(0).setOrigin(.5).setDepth(1000)

    this._toggledebug = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.add.text(640, 200, "Press D to toggle debug.\nGet coins, avoid bombs").setAlign("center").setFontFamily("Roboto").setColor("#ffffff").setStroke("#000000", 6).setFontSize(40).setScrollFactor(0).setOrigin(.5).setDepth(1000)

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

    this.physics.add.collider(this._player, this._groupEnemy, this.hitEnemy, undefined, this);

  }

  generateBonus() {

    this.addBonus(new BonusCoin({ scene: this, x: Phaser.Math.RND.integerInRange(100, 2048 - 100), y: Phaser.Math.RND.integerInRange(100, 1024 - 100), key: "bonus-coin" }));

  }

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
    this._coins++;
    this._text.setText(this._coins + "");
    this.generateBonus();
    //genero una nuova bomba ogni volta che raccolgo un bonus
    this.generateEnemy();
  }

  //il metodo che viene richiamato quando c’è collisione tra player e la bomba
  hitEnemy(player: any, Enemy: any) {

    this.createExplosion(Enemy.x, Enemy.y);
    this.removeEnemy(Enemy);
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
    let _explo: Phaser.GameObjects.Sprite = this.add.sprite(x, y, "explosion").setDepth(10);
    _explo.play("explosion-anim").on("animationcomplete", () => {

      _explo.destroy();



    })

  }

  resetGame() {

    this._groupBonus.clear(true, true);
    this._groupEnemy.clear(true, true);
    this._text.setText("0");
    this._coins = 0;
    this.generateBonus();
    this.generateEnemy();

  }



}


