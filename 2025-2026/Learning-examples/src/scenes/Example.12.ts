import { GameData } from "../GameData";
import Examples from "./Examples";

// Esempio: uso dei Timer Event (this.time.addEvent) per eseguire
// azioni ripetute nel tempo (loop) e azioni una tantum dopo un ritardo.
export default class Example12 extends Examples {



  private _text1: Phaser.GameObjects.Text;
  private _text2: Phaser.GameObjects.Text;
  private _text3: Phaser.GameObjects.Text;
  private _timer: Phaser.Time.TimerEvent;
  private _counter: number = 0;
  constructor() {
    super();
  }




  create() {

    this.add.tileSprite(0, 0, 1280, 800, "space").setOrigin(0);
    this._text1 = this.add.text(640, 100, "Waiting").setTint(0xffffff).setOrigin(.5);

    // Bottone che metti in pausa/riprende il timer semplicemente
    // impostando la proprietà "paused" del TimerEvent
    this._text3 = this.add.text(640, 150, "Click here to pause bomb release").setTint(0xffffff).setDepth(10).setOrigin(.5).setFontSize(30).setInteractive().on("pointerdown", () => {
      if (this._timer.paused == false) {
        this._timer.paused = true;
        this._text3.setText("Click here to resume bomb release").setTint(0x00ff00);
      } else {
        this._timer.paused = false;
        this._text3.setText("Click here to pause bomb release").setTint(0xffffff);

      }
    }, this);

    this._text2 = this.add.text(640, 710, "Waiting").setTint(0xffffff).setOrigin(.5);;



    //do something every 1 second
    // loop:true fa ripetere il callback all'infinito ogni "delay" ms
    this._timer = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        this.createBomb();
      },
      callbackScope: this
    })


    //do somethig after 3 seconds
    // Senza loop, questo evento viene eseguito una sola volta dopo il delay
    this.time.addEvent({
      delay: 3000,
      callback: this.myCustomMethod,
      callbackScope: this
    });


  }


  createBomb(): void {
     //method fired every 1 sec
    this._counter++;
    this._text1.setText("bomb: " + this._counter);
    // Bomba creata invisibile (alpha 0) e poi mostrata con un fade in
    let _bomb = this.add.image(Phaser.Math.RND.integerInRange(100, 1180), Phaser.Math.RND.integerInRange(100, 700), "bomb").setAlpha(0);
    this.tweens.add({
      targets:_bomb,
      alpha:1
    })

  }

  myCustomMethod(): void {
    //method fired after 3 sec
    this._text2.setText("custom method fired after 3 seconds").setColor("#00ff00");
  }


  update(time: number, delta: number): void {




  }



}


