import Enemy from "./Enemy";
import IEnemy from "./IEnemy";

// Robot che cammina avanti e indietro. Eredita da Enemy (fisica/fade-in/changeDirection)
// ma sovrascrive corpo, animazione e velocità impostati dalla classe base (pensata per
// la bomba rotonda) con l'aspetto e il movimento del robot ("robo2").
export default class EnemyRobot extends Enemy implements IEnemy {

    private _robotAnimations: Array<{ key: string, frames: Array<number>, frameRate: number, yoyo: boolean, repeat: number }> = [
        { key: "robo2-idle", frames: [0, 1, 2, 3], frameRate: 10, yoyo: false, repeat: -1 },
        { key: "robo2-walk", frames: [4, 5, 6, 7], frameRate: 10, yoyo: false, repeat: -1 }
    ];

    constructor(params: genericConfig) {
        super(params);
        this.name = "robot";

        // il robot cammina sul pavimento: niente scala/corpo circolare da bomba,
        // rimbalza solo orizzontalmente (bounce.y = 0) e si muove solo lungo X
        this.setScale(1);
        this._body.setCircle(0);
        this._body.setSize(this.width, this.height);
        this._body.setBounce(1, 0);
        this._body.setVelocity(-100, 0);

        this._robotAnimations.forEach(element => {
            if (!this._scene.anims.exists(element.key)) {
                let _animation: Phaser.Types.Animations.Animation = {
                    key: element.key,
                    frames: this.anims.generateFrameNumbers("robo2", { frames: element.frames }),
                    frameRate: element.frameRate,
                    yoyo: element.yoyo,
                    repeat: element.repeat
                };
                this._scene.anims.create(_animation);
            }
        });

        this.play("robo2-walk");
    }

    create() { }
    update(time: number, delta: number) { }
}
