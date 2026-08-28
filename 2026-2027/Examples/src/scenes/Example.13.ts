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
  private _t:Phaser.GameObjects.Text;
  private _i:Phaser.GameObjects.Text;
  private _m:Phaser.GameObjects.Text;
  private _e:Phaser.GameObjects.Text;
  private _ll:Phaser.GameObjects.Text;
  private _ii:Phaser.GameObjects.Text;
  private _nn:Phaser.GameObjects.Text;
  private _ee:Phaser.GameObjects.Text;

  private _letters:Array<Phaser.GameObjects.Text>;
  private _text="TIMELINE";



  constructor() {
    super();
  }

  create() {


    this._letters=[];

     this.add.tileSprite(0, 0, 1280, 800, "space").setOrigin(0);

    this._text1 = this.add.text(640, 150, "Click to play the timeline.",{ fontFamily: "'Press Start 2P'", fontSize: "50px", color: "#ffffff" }).setTint(0xffffff).setDepth(10).setOrigin(.5).setFontSize(30)

    const _textConfig={ fontFamily: "'Press Start 2P'", fontSize: "70px", color: "#ffffff" }

    for (let i = 0; i < this._text.length; i++) {
      const letter = this.add.text(200 + i * 125, 100, this._text[i], _textConfig).setOrigin(.5).setAlpha(0);
      this._letters.push(letter);
    }



    // Immagine posizionata fuori schermo (x:1300) che verrà spostata dentro
    // lo schermo dal primo evento della timeline
    this._pgj = this.add.image(1500, 400, "pgj").setAlpha(1).setScale(.5)



    // Ogni voce della timeline ha un istante "at" (in ms dall'avvio) e può
    // contenere un "tween" da eseguire oppure una funzione custom "run"
    const _letterEvents: Phaser.Types.Time.TimelineEventConfig[] = this._letters.map((letter, i) => ({
      at: i * 400,
      tween: {
        targets: letter,
        y: 400,
        rotation: Math.PI * 2,
        alpha: 1,
        duration: 700,
        ease: 'Power2'
      }
    }));

    // Lo spread operator (...) "spacchetta" l'array _letterEvents e ne
    // inserisce ogni elemento come voce separata dentro l'array passato a
    // timeline(). Utile per gestire N oggetti dinamici (una lettera per
    // ogni carattere) senza scrivere a mano un evento per ciascuno.
    this._myTimeline = this.add.timeline([
      ..._letterEvents,
      {
        // a 1 secondo: fa scorrere l'immagine pgj verso sinistra
        at: 1000,
        tween: {
          targets: this._pgj,
          x: -200,
          duration: 6000,
          ease: 'Power2'
        }
      },
      {
        // a 2 secondi: crea uno sprite "bomba" ingrandito
        at: 2000,
        run: () => {  }
      },
      {
        // a 3 secondi: crea una bomba in posizione casuale
        at: 3000,
        run: () => {  },

      },
       {
        // a 4 secondi: aggiorna il testo per segnalare che la timeline è finita
        at: 6000,
        run: () => { this._text1.setText("Timeline completed!").setTint(0x00ff00) },

      },
    ]);

    // La timeline non parte da sola: viene avviata al primo click (once)
    this.input.once('pointerdown', () => {
       this._text1.setText("Timeline in progress...")
      this._myTimeline.play();

    });




  }





  update(time: number, delta: number): void {



  }


}


