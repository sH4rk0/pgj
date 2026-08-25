import Player from "./Player";
import IPlayer from "./IPlayer";

// Player per i livelli a piattaforme (esempio 33): eredita da Player (fisica,
// cursori, profondità, distruzione del joystick) ma aggiunge gravità e salto.
// Le animazioni usano chiavi dedicate ("platform-idle"/"platform-move") sulla
// spritesheet robo-idle/robo-run: this.anims è un AnimationManager globale al
// game, quindi riusare le chiavi "idle"/"move" del Player condiviso avrebbe
// fatto sì che questo player mostrasse le animazioni sbagliate (quelle di "robo").
export default class PlayerPlatform extends Player implements IPlayer {

    private _jumpVelocity: number = 400;

    constructor(params: genericConfig) {
        super(params);
    }

    create() {
        // richiama il create() del Player base: abilita la fisica, crea i cursori,
        // aggiunge il player alla scena e richiama createAnimations() (sovrascritto sotto)
        super.create();

        // la gravità viene impostata solo su questo body: il mondo fisico è
        // condiviso con gli altri esempi, che restano a gravità zero (config globale in index.ts)
        this._body.setGravityY(600);
        this._body.setSize(24, 30).setOffset(3, 20);
    }

    createAnimations() {
        const _animations: Array<{ sprite: string, key: string, frames: Array<number>, frameRate: number, yoyo: boolean, repeat: number }> = [
            { sprite: "robo-idle", key: "platform-idle", frames: [0, 1, 2, 3], frameRate: 10, yoyo: false, repeat: -1 },
            { sprite: "robo-run", key: "platform-move", frames: [0, 1, 2, 3], frameRate: 10, yoyo: false, repeat: -1 }
        ];

        _animations.forEach(element => {
            if (!this._scene.anims.exists(element.key)) {
                let _animation: Phaser.Types.Animations.Animation = {
                    key: element.key,
                    frames: this.anims.generateFrameNumbers(element.sprite, { frames: element.frames }),
                    frameRate: element.frameRate,
                    yoyo: element.yoyo,
                    repeat: element.repeat
                };
                this._scene.anims.create(_animation);
            }
        });

        this.anims.play("platform-idle", true);
    }

    update(time: number, delta: number) {
        this.setDepth(this.y);

        if (this._cursors.left.isDown) {
            this.setFlipX(false);
            this.anims.play("platform-move", true);
            this._body.setVelocityX(-this._velocity);
        }
        else if (this._cursors.right.isDown) {
            this.setFlipX(true);
            this.anims.play("platform-move", true);
            this._body.setVelocityX(this._velocity);
        }
        else {
            this._body.setVelocityX(0);
            this.anims.play("platform-idle", true);
        }

        // il salto è consentito solo quando il player tocca il pavimento (niente doppio salto)
        if (this._cursors.up.isDown && this._body.onFloor()) {
            this._body.setVelocityY(-this._jumpVelocity);
        }
    }
}
