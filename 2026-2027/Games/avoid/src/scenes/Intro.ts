// Scena di titolo/menu: mostra il logo, dei germi animati che vagano sullo sfondo
// e attende il click dell'utente per avviare la partita vera e propria (GamePlay).
export default class Intro extends Phaser.Scene {


    private music: Phaser.Sound.BaseSound;



  constructor() {
    super({
      key: "Intro",
    });

  }

  init (data:any)
  {
   

  }

  preload() {


  }
  // Allestisce la schermata di titolo: musica, sfondo, germi decorativi animati,
  // shader di sfondo e logo, poi registra il click per passare a GamePlay.
  create() {

     this.sound.play('music', { loop: true });
        
        this.sound.play('laugh');

        this.add.image(400, 300, 'background').setScale(2);

        const area = new Phaser.Geom.Rectangle(64, 64, 672, 472);

        this.addGerm(area, 'germ1');
        this.addGerm(area, 'germ2');
        this.addGerm(area, 'germ3');
        this.addGerm(area, 'germ4');
        

        this.add.shader('goo', 400, 300, 800, 600);

        this.add.image(400, 260, 'assets', 'logo');

        this.add.bitmapText(400, 500, 'slime', 'Click to Play', 40).setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('GamePlay');

        });

  }


  // Crea un germe puramente decorativo (nessuna fisica/collisione) che vaga a caso
  // dentro "area" muovendosi verso nuovi punti casuali all'infinito (repeat: -1).
  // Le durate X/Y sono diverse (Y = X + 3000) così i due assi non si muovono in sync
  // e il movimento risulta più naturale/organico invece che diagonale e prevedibile.
  addGerm (area:any, animation:any)
  {
      let start = area.getRandomPoint();

      let germ = this.add.sprite(start.x, start.y,"assets").play(animation).setScale(2);

      let durationX = Phaser.Math.Between(4000, 6000);
      let durationY = durationX + 3000;

      this.tweens.add({
          targets: germ,
          x: {
              // ad ogni ciclo del tween sceglie un nuovo punto di arrivo casuale sull'asse X
              getStart: (tween: any, target:any) => {
                  return germ.x;
              },
              getEnd: () => {
                  return area.getRandomPoint().x;
              },
              duration: durationX,
              ease: 'Linear'
          },
          y: {
              getStart: (tween:any, target:any) => {
                  return germ.y;
              },
              getEnd: () => {
                  return area.getRandomPoint().y;
              },
              duration: durationY,
              ease: 'Linear'
          },
          repeat: -1
      });
  }


  update(time: number, delta: number): void {

   

  }

}

