import Examples from "./Examples";
import Bonus from "../customGameobjects/bonus/Bonus";
import BonusCoin from "../customGameobjects/bonus/BonusCoin";
import PlayerPlatform from "../customGameobjects/player/PlayerPlatform";
import Enemy from "../customGameobjects/enemy/Enemy";
import EnemyBomb from "../customGameobjects/enemy/EnemyBomb";
import EnemyRobot from "../customGameobjects/enemy/EnemyRobot";

// Esempio 33: livello a piattaforme creato con Tiled (mappa "level-0-platform").
// Bonus/Enemy/Player riusano le classi condivise in customGameobjects; PlayerPlatform
// eredita da Player aggiungendo solo gravità/salto (impostati sul singolo body,
// non sul mondo fisico) per non impattare il Player "top-down" usato dagli altri esempi.
export default class Example33 extends Examples {

  private _mainCamera: Phaser.Cameras.Scene2D.Camera;
  private _player: PlayerPlatform;
  private _text: Phaser.GameObjects.Text;
  private _groupBonus: Phaser.GameObjects.Group;
  private _groupEnemy: Phaser.GameObjects.Group;

  // tile sprite di sfondo con effetto parallax (scorrono a velocità diverse in base a scrollX)
  private _bg: Phaser.GameObjects.TileSprite;
  private _bg2: Phaser.GameObjects.TileSprite;
  private _bg3: Phaser.GameObjects.TileSprite;

  // i game object relativi alla mappa di tile gestita con TILED
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  // layer visibile con il pavimento/le piattaforme (solo grafica, nessuna collisione)
  private layer: Phaser.Tilemaps.TilemapLayer;
  // layer per la gestione delle collisioni con pavimento/piattaforme
  private layer2: Phaser.Tilemaps.TilemapLayer;
  // layer per la gestione dell'overlap (uscita livello, respawn point, ecc.)
  private layer3: Phaser.Tilemaps.TilemapLayer;
  // layer per la collisione dei nemici con tile speciali (es. inversione di marcia)
  private layer4: Phaser.Tilemaps.TilemapLayer;
  private _respawnPoint: Phaser.Math.Vector2;

  private _gameCompleted: boolean = false;
  private _levelText: Phaser.GameObjects.Text;

  constructor() {
    super();
  }

  create() {

    this._mainCamera = this.cameras.main;
    this._gameCompleted = false;
    this._groupBonus = this.add.group({ runChildUpdate: true });
    this._groupEnemy = this.add.group({ runChildUpdate: true });
    this._mainCamera.setBackgroundColor(0x000000);

    // sfondi in parallax fissati sullo schermo (setScrollFactor(0)), aggiornati in update()
    this._bg = this.add.tileSprite(0, 0, 1280, 800, "bg1").setOrigin(0, 0).setDepth(0).setScrollFactor(0);
    this._bg2 = this.add.tileSprite(0, 250, 1280, 450, "bg3").setOrigin(0, 0).setDepth(0).setScrollFactor(0);
    this._bg3 = this.add.tileSprite(0, 250, 1280, 450, "bg4").setOrigin(0, 0).setDepth(0).setScrollFactor(0);

    this._text = this.add.text(0, 0, "")
      .setScrollFactor(0)
      .setFontSize(30)
      .setShadow(2, 2, "#000000", 2)
      .setStroke("#ff0000", 5)
      .setDepth(100);

    this._levelText = this.add.text(640, 400, "Usa le freccette per muoverti e saltare")
      .setFontFamily("Roboto").setFontSize(30).setColor("#ffffff").setStroke("#000000", 6)
      .setScrollFactor(0).setOrigin(.5).setDepth(1000);

    this._player = new PlayerPlatform({ scene: this, x: 500, y: 650, key: "robo-idle" });

    this.followPlayer();

    // richiamiamo il metodo createMap che gestisce la visualizzazione della mappa
    this.createMap();
    // creiamo i vari game object prelevandoli dal layer "gameObjects" di Tiled
    this.setupObjects();

    this.physics.add.overlap(this._player, this._groupBonus, this.hitBonus, undefined, this);
    this.physics.add.collider(this._groupBonus, this.layer2, () => { }, undefined, this);
    this.physics.add.collider(this._groupEnemy, this.layer2, () => { }, undefined, this);
    this.physics.add.collider(this._player, this._groupEnemy, this.hitPlayer, undefined, this);

    // il testo introduttivo scompare dopo qualche secondo per non ingombrare la scena
    this.time.delayedCall(4000, () => this._levelText.destroy());
  }

  // il player perde e riparte dal respawn point quando tocca un nemico
  hitPlayer(player: any, enemy: any) {
    const _enemy: Enemy = <Enemy>enemy;
    _enemy.destroy();
    this._player.setPosition(this._respawnPoint.x, this._respawnPoint.y);
  }

  followPlayer() {
    this._mainCamera.startFollow(this._player, true, .1, .1);
  }

  unfollowPlayer() {
    this._mainCamera.stopFollow();
  }

  // callback richiamata dall'overlap tra player e bonus
  hitBonus(player: any, bonus: any) {
    const _bonus: Bonus = <Bonus>bonus;
    _bonus.getBonus();
  }

  updateValues(x: number, y: number) {
    this._text.setText("player position:" + Math.round(x) + " " + Math.round(y));
  }

  addBonus(bonus: Bonus) {
    this._groupBonus.add(bonus);
  }

  removeBonus(bonus: Bonus) {
    this._groupBonus.remove(bonus, true, true);
  }

  addEnemy(enemy: any) {
    this._groupEnemy.add(enemy);
  }

  removeEnemy(enemy: any) {
    this._groupEnemy.remove(enemy, true, true);
  }

  // questo metodo crea la mappa partendo dal file .json (Tiled) e dal tileset
  createMap(): void {

    //this._respawnPoint = new Phaser.Math.Vector2(500, 650);

    // se un'istanza di map è già attiva la distruggo (utile se create() viene richiamato più volte)
    if (this.map != null) this.map.destroy();

    // creo la tilemap usando la chiave registrata in GameData.tilemaps
    this.map = this.make.tilemap({ key: "level-0-platform" });

    // definisco i bounds della camera: x/y a 0 e dimensioni pari a quelle della mappa
    this._mainCamera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    // definisco i bounds della fisica allo stesso modo, così i body non escono dalla mappa
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    // creo il tileset che sarà utilizzato nei singoli layer come texture per le tile
    this.tileset = this.map.addTilesetImage("platform-extruded");

    // primo layer: pavimento/piattaforme visibili, nessuna interazione fisica
    this.layer = <Phaser.Tilemaps.TilemapLayer>this.map
      .createLayer("world", this.tileset, 0, 0)
      .setDepth(9)
      .setAlpha(1);

    // secondo layer: contiene le tile con collide:true, invisibile (alpha 0 nell'originale,
    // qui lasciato leggermente visibile solo per non confondersi con "world")
    this.layer2 = <Phaser.Tilemaps.TilemapLayer>this.map
      .createLayer("collision", this.tileset, 0, 0)
      .setDepth(0)
      .setAlpha(0);

    // tutte le tile di questo layer con la property "collide" devono avere collisione con i game object
    this.layer2.setCollisionByProperty({ collide: true });

    // alcune tile devono essere collidibili solo dal lato superiore (es. piattaforme sospese)
    this.layer2.forEachTile((tile: Phaser.Tilemaps.Tile) => {
      if (tile.properties.collideTop != undefined && tile.properties.collideTop == true) {
        tile.setCollision(false, false, true, false);
      }
    });

    // terzo layer: gestisce l'overlap (uscita livello, respawn, morte istantanea)
    this.layer3 = <Phaser.Tilemaps.TilemapLayer>this.map
      .createLayer("overlap", this.tileset, 0, 0)
      .setDepth(0)
      .setAlpha(0);

    this.layer3.setCollisionByProperty({ collide: true });

    // quarto layer: collisione/overlap dei soli nemici con tile speciali
    this.layer4 = <Phaser.Tilemaps.TilemapLayer>this.map
      .createLayer("collisionEnemy", this.tileset, 0, 0)
      .setDepth(0)
      .setAlpha(0);

    this.layer4.setCollisionByProperty({ collide: true });

    // collider tra PLAYER e layer2 (pavimento/piattaforme): senza di questo la collisione non avverrebbe
    this.physics.add.collider(
      this._player,
      this.layer2,
      (_player: any, _tile: any) => {
        // una tile con la proprietà "death" fa ripartire il player dal respawn point
        if (_tile.properties.death == true) {
          this._player.setPosition(this._respawnPoint.x, this._respawnPoint.y);
        }
      },
      undefined,
      this
    );

    // overlap tra PLAYER e layer3: gestisce fine livello e checkpoint di respawn
    this.physics.add.overlap(
      this._player,
      this.layer3,
      (_player: any, _tile: any) => {
        if (_tile.properties.exit == true && !this._gameCompleted) {
          this._gameCompleted = true;
          this.showLevelCompleted();
        }

        if (_tile.properties.respawn == true) {
          this._respawnPoint = new Phaser.Math.Vector2(_tile.pixelX, _tile.pixelY);
        }
      },
      undefined,
      this
    );

    // overlap tra nemici e layer4: fa cambiare direzione ai robot sulle tile "changeDirection"
    this.physics.add.overlap(
      this._groupEnemy,
      this.layer4,
      (_enemy: any, _tile: any) => {
        if (_tile.properties.changeDirection == true && _enemy.name == "robot") {
          const enemy: EnemyRobot = <EnemyRobot>_enemy;
          enemy.changeDirection();
        }
      },
      undefined,
      this
    );
  }

  // legge il layer oggetti "gameObjects" di Tiled e istanzia bonus/nemici nelle posizioni indicate
  setupObjects(): void {

    const _objLayer: Phaser.Tilemaps.ObjectLayer = this.map.getObjectLayer("gameObjects");

    if (_objLayer != null) {
      const _objects: any = _objLayer.objects as any[];

      _objects.forEach((tile: Phaser.Tilemaps.Tile) => {

        // la property custom "data" contiene un JSON con il campo "type" che indica cosa istanziare
        
        let _objectValue: string = "";
        if (tile.properties != undefined && tile.properties[0].value!=undefined) {

          _objectValue = JSON.parse(tile.properties[0].value).type;



          switch (_objectValue) {
            case "bonus":
              this.addBonus(new BonusCoin({ scene: this, x: tile.x, y: tile.y, key: "bonus-coin" }));
              break;

            case "enemyBomb":
              this.addEnemy(new EnemyBomb({ scene: this, x: tile.x, y: tile.y, key: "bomb" }));
              break;

            case "enemyRobot":
              this.addEnemy(new EnemyRobot({ scene: this, x: tile.x, y: tile.y, key: "robo2" }));
              break;
          }
        }

      });
    }
  }

  // mostra il messaggio di livello completato senza cambiare scena, per non
  // interferire con il flusso di navigazione del menu degli esempi
  showLevelCompleted(): void {
    this.add.text(this._mainCamera.width / 2, this._mainCamera.height / 2, "Livello completato!")
      .setFontFamily("Roboto").setFontSize(50).setColor("#ffffff").setStroke("#000000", 8)
      .setScrollFactor(0).setOrigin(.5).setDepth(1000);
  }

  update(time: number, delta: number): void {

    if (!this._gameCompleted) {
      this._player.update(time, delta);
      // effetto parallax: gli sfondi più "lontani" scorrono più lentamente
      this._bg.tilePositionX = this._mainCamera.scrollX * .05;
      this._bg2.tilePositionX = this._mainCamera.scrollX * .07;
      this._bg3.tilePositionX = this._mainCamera.scrollX * .15;
    }
  }

  shutdown(): void {
    // distruggiamo il player dedicato di questo esempio quando si passa a un altro esempio
    this._player.destroy();
  }
}
