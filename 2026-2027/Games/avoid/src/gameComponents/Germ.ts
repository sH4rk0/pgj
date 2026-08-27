import GamePlay from "../scenes/GamePlay";

// Nemico del gioco: appare con una dissolvenza, dopo un ritardo casuale inizia a
// inseguire il player per un tempo limitato (lifespan), poi svanisce e diventa
// inattivo finché non viene riutilizzato (pooling) dal gruppo Germs.
export default class Germ extends Phaser.Physics.Arcade.Sprite
{
    private speed:number;
    private lifespan:number;
    private isChasing:boolean;
    private target:Phaser.Math.Vector2;
    private _gamePlay:GamePlay

    constructor (scene:Phaser.Scene, x:number, y:number, animation:string, speed:number)
    {
        super(scene, x, y, 'assets');

        this.play(animation)

        this.setScale(Phaser.Math.FloatBetween(1, 2));

        this.speed = speed;

        this.alpha = 0;
        this.lifespan = 0;
        this.isChasing = false;
        this._gamePlay = scene as GamePlay

        this.target = new Phaser.Math.Vector2();
    }

    // Avvia il ciclo di vita del germe: imposta la hitbox e fa comparire il germe con
    // una dissolvenza (2s). "hold" mantiene il germe visibile ma fermo per chaseDelay
    // ms prima di iniziare a inseguire, così i germi non attaccano tutti insieme.
    // Se chaseDelay non è passato viene generato casualmente e viene riprodotto il suono di comparsa
    // (comportamento diverso da quando viene chiamato con delay esplicito da Restart).
    Start (chaseDelay:number)
    {
        this.setCircle(14, 6, 2);

        if (!chaseDelay)
        {
            chaseDelay = Phaser.Math.RND.between(3000, 8000);

            this.scene.sound.play('appear');
        }

        this.scene.tweens.add({
            targets: this,
            alpha: 1,
            duration: 2000,
            ease: 'Linear',
            hold: chaseDelay,
            onComplete: () => {
                // inizia l'inseguimento solo se il player è ancora vivo (evita che germi
                // "ritardatari" partano dopo un game over)
                if (this._gamePlay.player.isAlive)
                {
                    this.lifespan = Phaser.Math.RND.between(6000, 12000);
                    this.isChasing = true;
                }
            }
        });

        return this;
    }

    // Rimette in gioco (pooling) un germe precedentemente disattivato: lo riposiziona,
    // lo rende di nuovo attivo/visibile e lo fa ripartire da invisibile (Start(0)).
    Restart (x:number, y:number)
    {
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);
        this.setAlpha(0);

        return this.Start(0);
    }

    // Eseguito ad ogni frame: se il germe sta inseguendo, scala il tempo rimanente (lifespan)
    // e, una volta esaurito, lo ferma e lo fa svanire disattivandolo (pronto per il riutilizzo).
    // Altrimenti aggiorna direzione/velocità verso il player.
    preUpdate (time:number, delta:number)
    {
        super.preUpdate(time, delta);

        if (this.isChasing)
        {
            this.lifespan -= delta;

            if (this.lifespan <= 0)
            {
                this.isChasing = false;

                this.body.stop();

                // dissolvenza in uscita, poi il germe viene disattivato e nascosto (torna nel pool)
                this.scene.tweens.add({
                    targets: this,
                    alpha: 0,
                    duration: 1000,
                    ease: 'Linear',
                    onComplete: () => {
                        this.setActive(false);
                        this.setVisible(false);
                    }
                });
            }
            else
            {
                this._gamePlay.getPlayer(this.target);

                //  Add 90 degrees because the sprite is drawn facing up
                this.rotation = this.scene.physics.moveToObject(this, this.target, this.speed) + 1.5707963267948966;
            }
        }
    }

    // Interrompe immediatamente l'inseguimento e ferma il corpo fisico (usato al game over)
    Stop ()
    {
        this.isChasing = false;

        this.body.stop();
    }
}