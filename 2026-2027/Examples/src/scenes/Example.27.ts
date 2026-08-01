import { GameData } from "../GameData";
import Examples from "./Examples";

export default class Example27 extends Examples {


  private _bombs: Phaser.GameObjects.Group;
  private _gfx: Phaser.GameObjects.Graphics;
  private _line: Phaser.Geom.Line;
  private _angle: number = 0;
  private _toggledebug: Phaser.Input.Keyboard.Key;

  private _cannonX: number = 0;
  private _cannonY: number = 0;
  private _isCharging: boolean = false;
  private _speed: number = 200;
  private _speedBarGfx: Phaser.GameObjects.Graphics;

  private readonly MIN_SPEED = 200;
  private readonly MAX_SPEED = 600;
  private readonly SPEED_CHARGE_RATE = 300; // units per second
  private readonly BOMB_Y_LIMIT = 750;

  constructor() {
    super();
  }


  create() {

    this.add.tileSprite(0, 0, 1280, 800, "space").setOrigin(0);

    this.add.tileSprite(0, 800, 1280, 280, "moon").setOrigin(0, 1);

    this._toggledebug = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.add.text(640, 200, "Press D to toggle debug.\nClick to release a bomb").setAlign("center").setFontFamily("Roboto").setColor("#ffffff").setStroke("#000000", 6).setFontSize(40).setScrollFactor(0).setOrigin(.5)

    var cannonHead = this.add.image(640, 716 - 50, 'cannon-head').setDepth(1);
    var cannon = this.add.image(640, 764 - 50, 'cannon-body').setDepth(1);

    this._bombs = this.add.group({ runChildUpdate: true });

    this._gfx = this.add.graphics().setDefaultStyles({ lineStyle: { width: 10, color: 0xffdd00, alpha: 0.5 } });
    this._line = new Phaser.Geom.Line();
    this._angle = 0;
    this._cannonX = cannon.x;
    this._cannonY = cannon.y;

    this._speedBarGfx = this.add.graphics().setDepth(2);


    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      // ruota cannone solo se mouse sopra orizzonte (y minore della base del cannone)
      if (pointer.y >= this._cannonY) {
        return;
      }
      this._angle = Phaser.Math.Angle.BetweenPoints(cannon, pointer);
      cannonHead.rotation = this._angle;
      Phaser.Geom.Line.SetToAngle(this._line, cannon.x, cannon.y - 50, this._angle, 128);
      this._gfx.clear().strokeLineShape(this._line);
    }, this);

    this.input.on('pointerdown', () => {
      this._isCharging = true;
      this._speed = this.MIN_SPEED;
    }, this);

    this.input.on('pointerup', () => {
      this._isCharging = false;
      this._speedBarGfx.clear();

      let bomb: Phaser.GameObjects.Sprite = this._bombs.get(cannon.x, cannon.y - 50, 'bomb');
      bomb.setActive(true).setVisible(true);
      if (!bomb.body) {
        this.physics.world.enableBody(bomb);
      }
      let bombBody: Phaser.Physics.Arcade.Body = <Phaser.Physics.Arcade.Body>bomb.body;
      bombBody.reset(cannon.x, cannon.y - 50);
      bombBody.enable = true;
      bombBody.setGravityY(300);
      bomb.update = () => {

        if (bombBody.velocity.y > 0) {

          bomb.setDepth(2);
        } else {
          bomb.setDepth(0);

        }
      }

      this.physics.velocityFromRotation(this._angle, this._speed, bombBody.velocity);
    }, this);
  }


  update(time: number, delta: number): void {

    if (this._isCharging) {
      this._speed = Phaser.Math.Clamp(
        this._speed + this.SPEED_CHARGE_RATE * (delta / 1000),
        this.MIN_SPEED,
        this.MAX_SPEED
      );
      this.drawSpeedBar();
    }

    if (Phaser.Input.Keyboard.JustDown(this._toggledebug)) {
      if (this.physics.world.drawDebug) {
        this.physics.world.drawDebug = false;
        this.physics.world.debugGraphic.clear();
      }
      else {
        this.physics.world.drawDebug = true;
      }
    }

    this._bombs.getChildren().forEach((child: Phaser.GameObjects.GameObject) => {
      let bomb = <Phaser.GameObjects.Sprite>child;
      if (bomb.active && bomb.y >= this.BOMB_Y_LIMIT) {
        this.createExplosion(bomb.x, bomb.y);
        let bombBody: Phaser.Physics.Arcade.Body = <Phaser.Physics.Arcade.Body>bomb.body;
        bombBody.enable = false;
        bomb.setActive(false).setVisible(false);
      }
    });

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

  private drawSpeedBar(): void {
    const barX = 40;
    const barY = 700;
    const barWidth = 30;
    const barHeight = 200;

    const ratio = (this._speed - this.MIN_SPEED) / (this.MAX_SPEED - this.MIN_SPEED);
    const fillHeight = barHeight * ratio;

    this._speedBarGfx.clear();
    this._speedBarGfx.fillStyle(0x000000, 0.5);
    this._speedBarGfx.fillRect(barX, barY - barHeight, barWidth, barHeight);

    this._speedBarGfx.fillStyle(0xff3300, 1);
    this._speedBarGfx.fillRect(barX, barY - fillHeight, barWidth, fillHeight);

    this._speedBarGfx.lineStyle(2, 0xffffff, 1);
    this._speedBarGfx.strokeRect(barX, barY - barHeight, barWidth, barHeight);
  }



}


