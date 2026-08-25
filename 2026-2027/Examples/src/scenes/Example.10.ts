import { GameData } from "../GameData";
import Examples from "./Examples";

// Esempio: menu principale con logo animato, bottoni interattivi,
// container per i crediti e un effetto particellare di stelle rotanti.
export default class Example10 extends Examples {

  private _containerCredits: Phaser.GameObjects.Container;
  private _groupStars: Phaser.GameObjects.Group;

  private _tile1: Phaser.GameObjects.TileSprite;
  private _logo: Phaser.GameObjects.Image;

  private _bomb1: Phaser.GameObjects.Sprite;
  private _bomb2: Phaser.GameObjects.Sprite;

  private _text1: Phaser.GameObjects.Text;
  private _text2: Phaser.GameObjects.Text;
  private _close: Phaser.GameObjects.Text;

  private _counter: number = 0;
  private _clicked: boolean = false;
  constructor() {
    super();
  }


  create() {

    // Sfondo che si ripete (tile) grande quanto tutta la scena
    this._tile1 = this.add.tileSprite(0, 0, 1280, 800, "space").setOrigin(0);

    // Logo iniziale invisibile (alpha 0), verrà mostrato con un tween più sotto
    this._logo = this.add.image(640, 50, "phaser-gamejam").setScale(.8).setAlpha(0).setDepth(10);

    // Abilitiamo i filtri sul GameObject e prendiamo la color matrix
    // per poterne modificare la tonalità (hue) via codice
    const fx = this._logo.enableFilters().filters.internal.addColorMatrix().colorMatrix;

    // Contatore animato (0->360) usato come valore di hue per far
    // "ciclare" i colori del logo all'infinito (loop: -1)
    const tween = this.tweens.addCounter({
      from: 0,
      to: 360,
      duration: 3000,
      loop: -1,
      onUpdate: () => {
        fx.hue(tween.getValue());
      }
    });

    // Definiamo un'animazione a partire dai frame dello spritesheet "bomb"
    let _animation: Phaser.Types.Animations.Animation = {
      key: "bomb-rotation",
      frames: this.anims.generateFrameNumbers("bomb", { frames: [0, 1, 2, 3, 4, 5] }),
      frameRate: 10,
      yoyo: false,
      repeat: -1 // -1 = ripeti all'infinito
    };
    this.anims.create(_animation);

    // Bottone testuale "Play": cambia colore al passaggio del mouse (pointerover/out)
    // e sposta le bombe accanto al testo per un effetto decorativo
    this._text1 = this.add.text(640, 500, "Play").setDepth(10).setAlpha(0).setOrigin(.5).setFontSize(40).setFontFamily("Roboto").setInteractive().on("pointerover", () => {
      this._text1.setTint(0xff0000);
      this.setBombsPosition(this._text1.x, this._text1.y)
    }).on("pointerout", () => {
      this._text1.clearTint();
    }).on("pointerdown", () => {
      //do something
    });

    // Bottone testuale "Credits": apre il popup dei crediti al click
    this._text2 = this.add.text(640, 600, "Credits").setDepth(10).setAlpha(0).setOrigin(.5).setFontSize(40).setFontFamily("Roboto").setInteractive()
      .on("pointerover", () => {
        this._text2.setTint(0xff0000);
        this.setBombsPosition(this._text2.x, this._text2.y)
      })
      .on("pointerout", () => {
        this._text2.clearTint();
      }).on("pointerdown", () => {
        this.showCredits();

      });

    // Due sprite "bomba" animati, posizionati ai lati del testo (inizialmente invisibili)
    this._bomb1 = this.add.sprite(this._text1.x - 100, this._text1.y, "bomb");
    this._bomb1.play("bomb-rotation").setAlpha(0).setDepth(10);
    this._bomb2 = this.add.sprite(this._text1.x + 100, this._text1.y, "bomb");
    this._bomb2.play("bomb-rotation").setAlpha(0).setDepth(10);

    //container code
    //--------------------------------------------------------
    // Un Container raggruppa più GameObject così possiamo
    // muoverli/animarli/nasconderli tutti insieme (es. alpha del container)
    this._containerCredits = this.add.container(0, 0).setAlpha(0).setDepth(11);
    let _layer = this.add.image(640, 400, "layer").setAlpha(.8)
    let _popup = this.add.image(640, 400, "popup");
    let _text = this.add.text(640, 280, "Credits").setOrigin(.5).setFontFamily("Roboto").setFontSize(40);
    // Bottone "Chiudi" per nascondere il popup dei crediti
    this._close = this.add.text(640, 550, "Chiudi").setOrigin(.5).setFontFamily("Roboto").setFontSize(30)
      .on("pointerover", () => {
        this._close.setTint(0xff0000);
      })
      .on("pointerout", () => {
        this._close.clearTint();
      })
      .on("pointerdown", () => {
        this.hideCredits();
      })
    // setWordWrapWidth forza il testo lungo ad andare a capo entro il popup
    let _text2 = this.add.text(640, 400, "This is an example of a container to insert some useful information for the game.\n\nIt is possible to insert long text and to prevent it from going out of the popup borders we use the setWordWrapWidth(700) method. \n\nAny gameObject can be added to the container.").setOrigin(.5).setFontFamily("Roboto").setFontSize(20).setWordWrapWidth(700);
    // Aggiungiamo tutti gli elementi del popup al container
    this._containerCredits.add([_layer, _popup, _text, _text2, this._close]);

    //codice del tween
    //---------------------------------------------------------------------------
    // Tween di ingresso del logo: sale in posizione e diventa visibile;
    // al termine (onComplete) fa partire gli altri tween a cascata
    this.tweens.add({
      targets: this._logo, alpha: 1, y: 250, duration: 1000, ease: "Sine.easeOut", onComplete: () => {

        // Effetto "fluttuante" continuo del logo (yoyo + repeat infinito)
        this.tweens.add({
          targets: this._logo, alpha: 1, y: "-=50", duration: 1500, ease: "Sine.easeInOut", yoyo: true, repeat: -1
        });

        // stagger fa apparire i due testi uno dopo l'altro con un piccolo ritardo tra loro
        this.tweens.add({ targets: [this._text1, this._text2], alpha: 1, duration: 1000, delay: this.tweens.stagger(300, {}) });

        // Le bombe compaiono (fade in) con un ritardo fisso
        this.tweens.add({ targets: [this._bomb1, this._bomb2], alpha: 1, duration: 1000, delay: 600 });

        // Effetto "pulsante" (scale su e giù all'infinito) sulle bombe
        this.tweens.add({ targets: [this._bomb1, this._bomb2], scale: 1.5, duration: 1000, yoyo: true, repeat: -1, delay: 600 });
      }
    });


    // Group per gestire insieme tante particelle "flare" (bagliori)
    this._groupStars = this.add.group();

    for (let i = 0; i < 16; i++) {
      // setBlendMode("ADD") crea un effetto luminoso additivo (tipico delle particelle)
      let _flare = this.add.sprite(0, 0, "flares").setBlendMode("ADD");
      _flare.setAlpha(0)
      this._groupStars.add(_flare)

    }
    // Cerchio geometrico (non visibile) usato solo come guida per il posizionamento
    let circle = new Phaser.Geom.Circle(640, 550, 100);

    // Phaser.Actions.PlaceOnCircle distribuisce tutti gli sprite del group
    // equidistanti lungo la circonferenza del cerchio
    Phaser.Actions.PlaceOnCircle(this._groupStars.getChildren(), circle);


    // Scorrimento avanti/indietro dello sfondo (parallax) tramite tilePositionX
    this.tweens.add({
      targets: this._tile1,
      tilePositionX: "+=100",
      ease: 'Sine.easeInOut',
      duration: 5000,
      yoyo: true,
      repeat: -1
    });

    // Il tween anima il "raggio" del cerchio: non muove nulla direttamente,
    // ma il valore viene letto in onUpdate per far ruotare le particelle
    // a distanza variabile dal centro (effetto respiro)
    this.tweens.add({
      targets: circle,
      radius: 200,
      ease: 'Sine.easeInOut',
      duration: 1500,
      yoyo: true,
      repeat: -1,
      delay: 2000,
      onStart: () => {
        // Le particelle diventano visibili solo quando l'animazione parte
        this.tweens.add({
          targets: this._groupStars.getChildren(), alpha: .5,
          duration: 1000
        });
      },
      onUpdate: () => {
        // Ruota tutte le particelle attorno al punto (640,550) usando il
        // raggio corrente del cerchio (che sta cambiando grazie al tween sopra)
        Phaser.Actions.RotateAroundDistance(this._groupStars.getChildren(), { x: 640, y: 550 }, 0.02, circle.radius);
      }
    });




  }

  // Mostra il popup dei crediti: disabilita i bottoni sottostanti
  // per evitare click accidentali mentre il popup è aperto
  showCredits() {
    this._text1.disableInteractive();
    this._text2.disableInteractive();
    this.tweens.add({
      targets: this._containerCredits, y: 0, alpha: 1, duration: 300, ease: "Sine.easeOut", onComplete: () => {
        this._close.setInteractive();
      }
    })

  }
  // Nasconde il popup e ripristina l'interattività dei bottoni principali
  hideCredits() {
    this.tweens.add({
      targets: this._containerCredits, y: -50, alpha: 0, ease: "Sine.easeOut", duration: 300, onComplete: () => {
        this._text1.setInteractive();
        this._text2.setInteractive();
      }
    })
  }


  // Riposiziona le due bombe decorative accanto al bottone su cui si passa il mouse
  setBombsPosition(x: number, y: number) {

    this._bomb1.setPosition(x - 100, y);
    this._bomb2.setPosition(x + 100, y);
  }

  update(time: number, delta: number): void {



  }



}


