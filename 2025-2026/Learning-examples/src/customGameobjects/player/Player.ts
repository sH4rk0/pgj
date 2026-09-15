import IPlayer from "./IPlayer";
//Importiamo la scena di gameplay in modo da potervi accedere
import Examples from "../../scenes/Examples";
import nipplejs from 'nipplejs';

export default class Player extends Phaser.GameObjects.Sprite implements IPlayer {
    protected _config: genericConfig;
    //riferimento alla scena dove il nostro game object verrà inserito
    //protected: così le sottoclassi (es. PlayerPlatform) possono riutilizzarlo
    protected _scene: Examples;
    //variabile locale di tipo arcade.body per poter accedere ai metodi del Body
    // descritti nel capitolo 7
    protected _body: Phaser.Physics.Arcade.Body;
    //variabile locale per la gestione dei tasti cursore come visto nel capitolo 6
    protected _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    //variabile locale per impostare la velocità del body
    protected _velocity: number = 200;
    //riferimento al joystick virtuale, serve per poterlo distruggere allo shutdown
    //il tipo non è scritto a mano: ReturnType<typeof nipplejs.create> chiede a TypeScript
    //"qual è il tipo restituito dalla funzione nipplejs.create()?" e usa quello automaticamente
    private _joystickManager: ReturnType<typeof nipplejs.create>;
    //array di oggetti per la creazione dell’animazione
    private _animations: Array<{ key: string, frames: Array<number>, frameRate: number, yoyo: boolean, repeat: number }> = [
        { key: "idle", frames: [0, 1, 2, 3], frameRate: 10, yoyo: false, repeat: -1 },
        { key: "move", frames: [4, 5, 6, 7], frameRate: 10, yoyo: false, repeat: -1 }
    ];
    constructor(params: genericConfig) {
        super(params.scene, params.x, params.y, params.key);
        this._config = params;
       
        //richiamiamo il metodo create nel quale sono inserite alcune
        // inizializzazioni della nostra classe custom
        this.create();

    }

    create() {
        //Creiamo un riferimento alla scena in modo da poterlo utilizzare 
        // successivamente per richiamare dei metodi della scena
        this._scene = <Examples>this._config.scene;
        //Abilitiamo this ovvero la classe corrente alla fisica di phaser
        this._scene.physics.world.enable(this);
        //Inseriamo in this._body il cast di this.body
        //Lo facciamo perché altrimenti non riusciremmo ad avere accesso
        // ai metodi di body
        this._body = <Phaser.Physics.Arcade.Body>this.body;
        //indichiamo al body che deve collidere con i bounds del world
        this._body.setCollideWorldBounds(true);
        //Creiamo l’istanza dei cursori per poter muovere il Player
        this._cursors = this._scene.input.keyboard.createCursorKeys();
        //Settiamo il livello di profondità a 11
        this.setDepth(11);
        //Aggiungiamo il Player alla scena
        this._scene.add.existing(this);

         //richiamiamo un metodo locale per implementare le animazioni dello
        // sprite
        this.createAnimations();

        if (this._scene.sys.game.device.input.touch) {

            this._joystickManager = nipplejs.create({ color: 'red' });
            let joystickManager = this._joystickManager;
            // possiamo eseguire del codice quando il virtual joystick inizia a muoversi

            joystickManager.on('start', () => { })
            // sull’ evento move eseguiamo il codice per il movimento
            // nipplejs v1 passa un unico oggetto evento: evt.data contiene forza e angolo
            joystickManager.on('move', (evt: any) => {
                let output = evt.data;
                if (!output || !output.angle) return;
                // get the force and don't let it be greater than 1
                let force: number = Math.min(output.force, 1);
                // get the angle, in radians
                let angle: number = output.angle.radian;
                // determine the speed, according to force and player speed
                // this._acceleration è un valore arbitrario Es: 200
                let speed: number = 200 * force;
                // set player velocity using trigonometry
                // this.setVelocity è riferito al body del nostro personaggio
                this._body.setVelocity(speed * Math.cos(angle), speed * Math.sin(angle) * -1);
                this.anims.play('move', true);
            });
            // possiamo eseguire del codice quando il virtual joystick smette di muoversi
            joystickManager.on('end', () => {
                this.anims.play('idle', true);
                this._body.setVelocity(0);
            });



        }
    }

    createAnimations() {
        //creazione dell’animazione come visto nei capitoli precedenti
        this._animations.forEach(element => {

            if (!this._scene.anims.exists(element.key)) {
                let _animation: Phaser.Types.Animations.Animation = {
                    key: element.key,
                    frames: this.anims.generateFrameNumbers("robo", { frames: element.frames }),
                    frameRate: element.frameRate,
                    yoyo: element.yoyo,
                    repeat: element.repeat
                };

                this._scene.anims.create(_animation);
            }
        });

        this.anims.play('idle', true);
    }

    update(time: number, delta: number) {
        this.setDepth(this.y);

        if (!this._scene.sys.game.device.input.touch) {
            //se il il cursore sinistro è premuto
            if (this._cursors.left.isDown) {
                //gira il PLAYER nella posizione iniziale, quella definita nello spritesheet
                this.setFlipX(false);
                //effettua il play dell'animazione
                this.anims.play('move', true);
                //setta la velocità x in modo da far muovere il player
                this._body.setVelocityX(-this._velocity);
            }
            //se il il cursore destro è premuto
            if (this._cursors.right.isDown) {
                //gira il PLAYER in direzione opposta da quella definita nello spritesheet
                this.setFlipX(true);
                //effettua il play dell'animazione
                this.anims.play('move', true);
                //setta la velocità x in modo da far muovere il player
                this._body.setVelocityX(this._velocity);
            }

            //se il il cursore in alto è premuto
            if (this._cursors.up.isDown) {
                //effettua il play dell'animazione
                this.anims.play('move', true);
                //setta la velocità x in modo da far muovere il player
                this._body.setVelocityY(-this._velocity);
            }
            //se il il cursore in basso è premuto
            if (this._cursors.down.isDown) {
                //effettua il play dell'animazione
                this.anims.play('move', true);
                //setta la velocità x in modo da far muovere il player
                this._body.setVelocityY(this._velocity);
            }

            if (!this._cursors.left.isDown && !this._cursors.right.isDown && !this._cursors.up.isDown && !this._cursors.down.isDown) {
                //setta la velocità x a 0 in modo da far fermare il PLAYER
                this._body.setVelocity(0);
                //effettua il play dell'animazione di pausa
                this.anims.play('idle', true);
            }
        }
    }

    destroy(fromScene?: boolean) {
        //distruggiamo il joystick virtuale se esiste, altrimenti allo shutdown
        // della scena nipplejs continua a triggerare eventi su un player non più valido
        if (this._joystickManager) {
    
            this._joystickManager.destroy();
            this._joystickManager = undefined;
        }
        super.destroy(fromScene);
    }

}
