import { GameData } from "../GameData";
import Examples from "./Examples";

// Scena di apertura: sfondo animato, titolo e particelle decorative con un container che oscilla
export default class Example1 extends Examples {

  private bg: Phaser.GameObjects.TileSprite;
  private stars: Phaser.GameObjects.TileSprite;

  constructor() {
    super();
  }


  create() {



    // TileSprite: immagine che si ripete a piastrelle; utile per scorrere sfondi infiniti muovendo il "tilePosition"
    this.bg=this.add.tileSprite(this.scale.width / 2, this.scale.height / 2, 1920, 1080, 'space');
    this.stars=this.add.tileSprite(this.scale.width / 2, this.scale.height / 2, 1920, 1080, 'stars');

    // Testo del titolo centrato orizzontalmente (setOrigin(.5,0) ancora il punto centrale-alto)
    this.add.text(this.scale.width / 2, 120, "PHASER GAME JAM EXAMPLES", { fontFamily: "'Press Start 2P'", fontSize: "50px", color: "#ffffff" }).setOrigin(.5, 0);

    // Emettitore di particelle basato sulla texture 'flares': crea piccole scintille animate
    let _particles1 = this.add.particles(980, 680, 'flares',
      {
        frame: 'blue', // frame specifico dello spritesheet da usare
        color: [0x96e0da, 0x937ef3], // transizione di colore delle particelle nel tempo
        colorEase: 'quad.out',
        lifespan: 1200, // durata di vita di ogni particella in ms
        angle: { min: -100, max: -80 }, // direzione di emissione (range in gradi)
        scale: { start: 0.70, end: 0, ease: 'sine.out' }, // le particelle si restringono fino a scomparire
        speedX: { min: 60, max: 200 },
        speedY: { min: 60, max: 100 },
        advance: 2000, // fa avanzare la simulazione di 2000ms subito, per non partire "vuota"
        blendMode: 'ADD' // modalità di fusione additiva per un effetto luminoso
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



    // Logo/immagine centrale del gioco
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


    // Container: raggruppa più oggetti così si possono muovere/trasformare insieme
    let _container = this.add.container(-300,-50).setAlpha(1);
    _container.add([_particles1, _particles2, pgj, _particles3, _particles4]);


     // Tween che fa oscillare verticalmente il container all'infinito (repeat:-1 + yoyo:true)
     this.tweens.add({
      targets: _container,
      y: "+=20", // spostamento relativo rispetto alla posizione attuale
      duration: 1000,
      ease: Phaser.Math.Easing.Sine.InOut,
      repeat: -1, // -1 = ripeti all'infinito
      yoyo: true, // torna indietro invece di ripartire da zero
    });
  }


    // update viene chiamato ad ogni frame: qui si sposta la tilePosition per far scorrere lo sfondo
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
