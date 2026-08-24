import { GameData } from "../GameData";
import Examples from "./Examples";

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


    this._pgj = this.add.image(1300, 400, "pgj").setAlpha(1).setScale(.5)

        
    let _particles3 = this.add.particles(0, 0, 'space', {
            frame: 'blue',
            speed: {
                onEmit: (particle, key, t, value) => this.ship.body.speed
            },
            lifespan: {
                onEmit: (particle, key, t, value) => Phaser.Math.Percent(this.ship.body.speed, 0, 300) * 20000
            },
            alpha: {
                onEmit: (particle, key, t, value) => Phaser.Math.Percent(this.ship.body.speed, 0, 300) * 1000

            },
            scale: { start: 1.0, end: 0 },
            blendMode: 'ADD'
        }).startFollow(this._pgj,200,200,true).start()



    this._myTimeline = this.add.timeline([
      {
        at: 1000,
        tween: {
          targets: this._pgj,
          x: -200,
          duration: 3000,
          ease: 'Power2'
        }
      },
      {
        at: 2000,
        run: () => { this.add.sprite(400, 200, 'bomb').setScale(2) }
      },
      {
        at: 3000,
        run: () => { this.createRandomBomb(); },
        
      },
       {
        at: 4000,
        run: () => { this._text1.setText("Timeline completed!").setTint(0x00ff00) },
        
      },
    ]);

    this.input.once('pointerdown', () => {
       this._text1.setText("Timeline in progress...")
      this._myTimeline.play();

    });




  }


  createRandomBomb() {

    this.add.image(Phaser.Math.RND.integerInRange(100, 924), Phaser.Math.RND.integerInRange(100, 500), "bomb");

  }



  update(time: number, delta: number): void {



  }


}


