import { GameData } from "../GameData";
import Examples from "./Examples";

export default class Example1 extends Examples {

  private bg: Phaser.GameObjects.TileSprite;
  private stars: Phaser.GameObjects.TileSprite;

  constructor() {
    super();
  }


  create() {


    this.bg=this.add.tileSprite(this.scale.width / 2, this.scale.height / 2, 1920, 1080, 'space');
    this.stars=this.add.tileSprite(this.scale.width / 2, this.scale.height / 2, 1920, 1080, 'stars');

    this.add.text(this.scale.width / 2, 120, "PHASER GAME JAM EXAMPLES", { fontFamily: "'Press Start 2P'", fontSize: "50px", color: "#ffffff" }).setOrigin(.5, 0);

    let _particles1 = this.add.particles(980, 680, 'flares',
      {
        frame: 'blue',
        color: [0x96e0da, 0x937ef3],
        colorEase: 'quad.out',
        lifespan: 1200,
        angle: { min: -100, max: -80 },
        scale: { start: 0.70, end: 0, ease: 'sine.out' },
        speedX: { min: 60, max: 200 },
        speedY: { min: 60, max: 100 },
        advance: 2000,
        blendMode: 'ADD'
      }).setAlpha(0.5);

    let _particles2 = this.add.particles(1050, 680, 'flares',
      {
        frame: 'blue',
        color: [0x96e0da, 0x937ef3],
        colorEase: 'quad.out',
        lifespan: 1200,
        angle: { min: -100, max: -80 },
        scale: { start: 0.70, end: 0, ease: 'sine.out' },
        speedX: { min: 60, max: 200 },
        speedY: { min: 60, max: 100 },
        advance: 2000,
        blendMode: 'ADD'
      }).setAlpha(0.5);



    let pgj = this.add.image(1920 / 2, 1080 / 2, "pgj").setAlpha(1);

    let _particles3 = this.add.particles(1130, 680, 'flares',
      {
        frame: 'blue',
        color: [0x96e0da, 0x937ef3],
        colorEase: 'quad.out',
        lifespan: 1000,
        angle: { min: -100, max: -80 },
        scale: { start: 0.70, end: 0, ease: 'sine.out' },
        speedX: { min: 60, max: 200 },
        speedY: { min: 60, max: 100 },
        advance: 2000,
        blendMode: 'ADD'
      });


    let _particles4 = this.add.particles(1200, 680, 'flares',
      {
        frame: 'blue',
        color: [0x96e0da, 0x937ef3],
        colorEase: 'quad.out',
        lifespan: 1000,
        angle: { min: -100, max: -80 },
        scale: { start: 0.70, end: 0, ease: 'sine.out' },
        speedX: { min: 60, max: 200 },
        speedY: { min: 60, max: 100 },
        advance: 2000,
        blendMode: 'ADD'
      });


    let _container = this.add.container(-300,-50).setAlpha(1);
    _container.add([_particles1, _particles2, pgj, _particles3, _particles4]);


     this.tweens.add({
      targets: _container,
      y: "+=20",
      duration: 1000,
      ease: Phaser.Math.Easing.Sine.InOut,
      repeat: -1,
      yoyo: true,
    });
  }


    update(time: number, delta: number): void {

    

    if (this.bg) {
      this.bg.tilePositionX -= 2;
      this.bg.tilePositionY -= .5;
    }

     if (this.stars) {
      this.stars.tilePositionX -= 4;
      this.stars.tilePositionY -= 1;
    }

  }



}
