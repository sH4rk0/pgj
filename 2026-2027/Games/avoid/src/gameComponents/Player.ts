// Personaggio controllato dal giocatore: segue il puntatore del mouse/touch e
// si ferma vicino ad esso, evitando i germi e raccogliendo i pickup.
export default class Player extends Phaser.Physics.Arcade.Image
{
    private speed:number;
    private target:Phaser.Math.Vector2;
    isAlive:boolean;

    constructor (scene:Phaser.Scene, x:number, y:number)
    {
        super(scene, x, y, 'assets', 'player');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCircle(14, 3, 6);
        this.setCollideWorldBounds(true);

        this.isAlive = false;

        this.speed = 280;
        this.target = new Phaser.Math.Vector2();
    }

    // Attiva il player e registra il listener che lo fa muovere verso la posizione
    // del puntatore ad ogni movimento del mouse/touch (input diretto, non a scatti).
    start ()
    {
        this.isAlive = true;

        this.scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) =>
        {
            if (this.isAlive)
            {
                this.target.x = pointer.x;
                this.target.y = pointer.y;

                //  Add 90 degrees because the sprite is drawn facing up
                this.rotation = this.scene.physics.moveToObject(this, this.target, this.speed) + 1.5707963267948966;
            }
        });
    }

    // Segna il player come morto e ferma il suo corpo fisico (chiamato al game over)
    kill ()
    {
        this.isAlive = false;

        this.body.stop();
    }

    // Ad ogni frame: se il player si sta muovendo ed è vivo, controlla se ha quasi
    // raggiunto il punto target (soglia di 6px) e in tal caso lo blocca esattamente
    // lì, evitando che continui a "vibrare" attorno al puntatore per inerzia della fisica.
    preUpdate ()
    {
        //@ts-ignore
        if (this.body.speed > 0 && this.isAlive)
        {
            if (Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) < 6)
            {
                this.body.reset(this.target.x, this.target.y);
            }
        }
    }
}