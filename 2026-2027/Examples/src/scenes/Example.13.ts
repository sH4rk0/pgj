import { GameData } from "../GameData";
import Examples from "./Examples";

// Esempio: Phaser.Time.Timeline, uno strumento che permette di
// pianificare tween e funzioni da eseguire a istanti precisi (in ms)
// da quando la timeline viene avviata con play().
export default class Example13 extends Examples {



  private _text1: Phaser.GameObjects.Text;
  private _text2: Phaser.GameObjects.Text;
  private _text3: Phaser.GameObjects.Text;
  private _timer: Phaser.Time.TimerEvent;
  private _counter: number = 0;
  private _myTimeline: Phaser.Time.Timeline;
  private _pgj:Phaser.GameObjects.Image;


  constructor() {
    super();
  }

  create() {

     this.add.tileSprite(0, 0, 1280, 800, "space").setOrigin(0);

    this._text1 = this.add.text(640, 150, "Click to play the timeline.",{ fontFamily: "'Press Start 2P'", fontSize: "50px", color: "#ffffff" }).setTint(0xffffff).setDepth(10).setOrigin(.5).setFontSize(30)

    // Immagine posizionata fuori schermo (x:1300) che verrà spostata dentro
    // lo schermo dal primo evento della timeline
    this._pgj = this.add.image(1300, 400, "pgj").setAlpha(1).setScale(.5)



    // Ogni voce della timeline ha un istante "at" (in ms dall'avvio) e può
    // contenere un "tween" da eseguire oppure una funzione custom "run"
    this._myTimeline = this.add.timeline([
      {
        // a 1 secondo: fa scorrere l'immagine pgj verso sinistra
        at: 1000,
        tween: {
          targets: this._pgj,
          x: -200,
          duration: 3000,
          ease: 'Power2'
        }
      },
      {
        // a 2 secondi: crea uno sprite "bomba" ingrandito
        at: 2000,
        run: () => { this.add.sprite(400, 200, 'bomb').setScale(2) }
      },
      {
        // a 3 secondi: crea una bomba in posizione casuale
        at: 3000,
        run: () => { this.createRandomBomb(); },

      },
       {
        // a 4 secondi: aggiorna il testo per segnalare che la timeline è finita
        at: 4000,
        run: () => { this._text1.setText("Timeline completed!").setTint(0x00ff00) },

      },
    ]);

    // La timeline non parte da sola: viene avviata al primo click (once)
    this.input.once('pointerdown', () => {
       this._text1.setText("Timeline in progress...")
      this._myTimeline.play();

    });




  }


  // Crea una bomba in una posizione casuale entro l'area indicata
  createRandomBomb() {

    this.add.image(Phaser.Math.RND.integerInRange(100, 924), Phaser.Math.RND.integerInRange(100, 500), "bomb");

  }



  update(time: number, delta: number): void {



  }


}


