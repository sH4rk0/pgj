import Examples from "../../scenes/Examples";
import IEnemy from "./IEnemy";

export default class Enemy extends Phaser.GameObjects.Sprite implements IEnemy {
    protected _config: genericConfig;
    protected _scene: Examples;
    protected _body: Phaser.Physics.Arcade.Body;
    private _velocity: number = Phaser.Math.RND.integerInRange(180, 220);
    private _animations: Array<{ key: string, frames: Array<number>, frameRate: number, yoyo: boolean, repeat: number }> = [

        { key: "rotation", frames: [0, 1, 2, 3, 4, 5], frameRate: 10, yoyo: false, repeat: -1 }

    ];

    constructor(params: genericConfig) {
        super(params.scene, params.x, params.y, params.key);
        this._config = params;
        this._scene = <Examples>params.scene;
        this._config.scene.physics.world.enableBody(this);
        this._scene.add.existing(this);
        this._body = <Phaser.Physics.Arcade.Body>this.body;
        this.setScale(3).setAlpha(0);
        this._body.setCollideWorldBounds(true).setBounce(1, 1).setCircle(12, 4, 4);
        this._body.setVelocityX(100).setVelocityY(100);
        this._body.enable = false;
        this._scene.tweens.add({
            targets: this, alpha: 1, duration: 1000, onComplete: () => {
                this._body.enable = true;
            }
        })

        this._animations.forEach(element => {

            if (!this._scene.anims.exists(element.key)) {

                let _animation: Phaser.Types.Animations.Animation = {
                    key: element.key,
                    frames: this.anims.generateFrameNumbers("bomb", { frames: element.frames }),
                    frameRate: element.frameRate,
                    yoyo: element.yoyo,
                    repeat: element.repeat
                };

                this._scene.anims.create(_animation);
            }

        });

        this.play("rotation");

    }
    create() { }
    update(time: number, delta: number) { }

    // inverte la direzione orizzontale del nemico (usato ad es. dall'esempio 33
    // quando un robot incontra una tile con la proprietà "changeDirection")
    changeDirection(): void {
        this._body.setVelocityX(this._body.velocity.x * -1);
        this.setFlipX(!this.flipX);
    }

}
