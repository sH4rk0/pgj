import { GameData } from "../GameData";
import Germs  from "../gameComponents/Germs";
import Germ from "../gameComponents/Germ";
import Pickups  from "../gameComponents/Pickups";
import Player  from "../gameComponents/Player";

// Scena principale di gioco: gestisce player, germi e pickup, il punteggio,
// le collisioni e il flusso di game over / nuovo record.
export default class GamePlay extends Phaser.Scene {


    player:Player;
    private germs:Germs;
    private pickups:Pickups;
    private introText:Phaser.GameObjects.BitmapText;
    private scoreText:Phaser.GameObjects.BitmapText;
    private score:number;
    private highscore:number;
    private newHighscore:boolean;



  constructor() {
    super({
      key: "GamePlay",
    });
    this.player;
    this.germs;
    this.pickups;

    this.introText;
    this.scoreText;
    this.score = 0;
    this.highscore = 0;
    this.newHighscore = false;
  }


  init() {
    
  }

  // Inizializza la partita: crea player, gruppi di germi/pickup, HUD e i listener
  // di collisione/input. Il gioco resta in pausa (player e germi fermi) finché
  // l'utente non fa il primo click, così può leggere il messaggio introduttivo.
  create ()
    {
        this.score = 0;
        this.highscore = this.registry.get('highscore');
        this.newHighscore = false;

        this.add.image(400, 300, 'background').setScale(2);

        this.germs = new Germs( this.physics.world, this);

        this.pickups = new Pickups(this.physics.world, this);

        this.player = new Player(this, 400, 400);

        this.scoreText = this.add.bitmapText(16, 32, 'slime', 'Score   0', 40).setDepth(1);

        this.introText = this.add.bitmapText(400, 300, 'slime', 'Avoid the Germs\nCollect the Rings', 60).setOrigin(0.5).setCenterAlign().setDepth(1);

        this.pickups.start();

        // Il primo click avvia realmente la partita: player e germi iniziano a muoversi
        // e il testo introduttivo sparisce con una dissolvenza
        this.input.once('pointerdown', () => {

            this.player.start();
            this.germs.start();

            this.sound.play('start');

            this.tweens.add({
                targets: this.introText,
                alpha: 0,
                duration: 300
            });

        });

        this.physics.add.overlap(this.player, this.pickups, (player:any, pickup:any) => this.playerHitPickup(player, pickup));
        this.physics.add.overlap(this.player, this.germs, (player:any, germ:any) => this.playerHitGerm(player, germ));
    }

    // Callback di collisione player-germe: termina la partita solo se il germe
    // è pienamente visibile (alpha 1), per evitare hit "ingiusti" durante il fade in/out.
    playerHitGerm (player:Player, germ:Germ)
    {
        //  We don't count a hit if the germ is fading in or out
        if (player.isAlive && germ.alpha === 1)
        {
            this.gameOver();
        }
    }

    // Callback di collisione player-pickup: incrementa il punteggio, aggiorna l'HUD
    // e gestisce il suono (record vs pickup normale) in base al punteggio raggiunto.
    playerHitPickup (player:Player, pickup:Pickups)
    {
        this.score++;

        this.scoreText.setText('Score   ' + this.score);

        if (!this.newHighscore && this.score > this.highscore)
        {
            if (this.highscore > 0)
            {
                //  Only play the victory sound if they actually set a new highscore
                this.sound.play('victory');
            }
            else
            {
                this.sound.play('pickup');
            }

            this.newHighscore = true;
        }
        else
        {
            this.sound.play('pickup');
        }

        this.pickups.collect(pickup);
    }

    // Gestisce la fine della partita: ferma player e germi, salva l'eventuale
    // nuovo record e attende un click per tornare alla scena Intro.
    gameOver ()
    {
        this.player.kill();
        this.germs.stop();

        this.sound.stopAll();
        this.sound.play('fail');

        this.introText.setText('Game Over!');

        this.tweens.add({
            targets: this.introText,
            alpha: 1,
            duration: 300
        });

        if (this.newHighscore)
        {
            this.registry.set('highscore', this.score);
        }

        this.input.once('pointerdown', () => {
            this.scene.start('Intro');
        });
    }

    // Copia la posizione corrente del player nell'oggetto target passato
    // (usato dai germi per calcolare la direzione di inseguimento)
    getPlayer (target:any)
    {
        target.x = this.player.x;
        target.y = this.player.y;

        return target;
    }


}
