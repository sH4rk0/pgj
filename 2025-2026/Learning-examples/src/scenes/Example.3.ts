import { GameData } from "../GameData";
import Examples from "./Examples";

// Esempi sulle immagini: scala, tint, alpha, blend mode, interattività e depth
export default class Example3 extends Examples {

  private _image1: Phaser.GameObjects.Image;
  private _image2: Phaser.GameObjects.Image;
  private _image3: Phaser.GameObjects.Image;
  private _image4: Phaser.GameObjects.Image;
  private _image5: Phaser.GameObjects.Image;
  private _image6: Phaser.GameObjects.Image;
  private _image7: Phaser.GameObjects.Image;

  private _tile1: Phaser.GameObjects.TileSprite;

  private _counter: number = 0;
  private _clicked: boolean = false;
  constructor() {
    super();
  }


  create(): void {




     this._tile1 = this.add.tileSprite(0, 0, 1280, 800, "space").setOrigin(0);

    this._image1 = this.add.image(150, 150, "logo-phaser");
    this._image2 = this.add.image(150, 330, "logo-phaser").setAngle(45).setScale(.5);
    // setTint con 4 colori: colora i 4 angoli dell'immagine (alto-sx, alto-dx, basso-sx, basso-dx) per un effetto gradiente
    this._image3 = this.add.image(150, 510, "logo-phaser").setAngle(45).setScale(.75).setTint(0x000000, 0xff0000, 0x00ff00, 0x0000ff);

    // setAlpha con 4 valori: trasparenza differente per ciascun angolo dell'immagine
    this._image3 = this.add.image(150, 700, "logo-phaser").setScale(.75).setAlpha(1, 0, 0, 0);

    // setBlendMode NORMAL: nessuna fusione speciale con lo sfondo (comportamento standard)
    this.add.image(850, 500, "logo-phaser-black").setBlendMode(Phaser.BlendModes.NORMAL).setScale(.75);
    this.add.image(1100, 500, "logo-phaser-white").setBlendMode(Phaser.BlendModes.NORMAL).setScale(.75);

    // SCREEN e MULTIPLY sono modalità di fusione che mescolano i colori con quelli sotto (schiarisce/scurisce)
    let _blendScreen=this.add.image(850, 650, "logo-phaser-black").setBlendMode(Phaser.BlendModes.SCREEN).setScale(.75);
    let _blendMultiply=this.add.image(1100, 650, "logo-phaser-white").setBlendMode(Phaser.BlendModes.MULTIPLY).setScale(.75);

    // Tween che sposta l'immagine a destra in modo relativo ("+=")
    this.tweens.add({
      targets: [_blendScreen],

      x: "+=125",

      duration: 4000,

      repeat: 0,
    })

     // Tween che sposta l'immagine a sinistra ("-=")
     this.tweens.add({
      targets: [_blendMultiply],

      x: "-=125",

      duration: 4000,

      repeat: 0,
    })





    // Immagine interattiva: cambia tint al passaggio del mouse e alpha/flip al click (setFlip inverte l'immagine)
    this._image4 = this.add.image(450, 250, "logo-phaser")
      .setAngle(45)
      .setScale(.75)
      .setInteractive()
      .on("pointerover", () => {
        this._image4.setTint(0x000000, 0xff0000, 0x00ff00, 0x0000ff);
      })
      .on("pointerout", () => { this._image4.clearTint(); })
      .on("pointerdown", () => {
        if (this._clicked) {
          this._image4.setAlpha(0.5).setFlip(true, true)
        } else {
          this._image4.setAlpha(1).setFlip(false, false)
        }
        this._clicked = !this._clicked;

      })

    this.add.text(450, 330, "roll over and click", { fontFamily: "Arial Black", fontSize: "24px", color: "#ffffff" }).setOrigin(.5)




    // Immagine che viene distrutta (rimossa dalla scena) al click
    this._image5 = this.add.image(450, 550, "logo-phaser")
      .setAngle(45)
      .setScale(1)
      .setInteractive()
      .on("pointerdown", () => {

        this._image5.destroy();
      })

    this.add.text(450, 650, "Click to destroy!", { fontFamily: "Arial Black", fontSize: "24px", color: "#ffffff" }).setOrigin(.5)



    // setDepth controlla l'ordine di disegno: valori più alti vengono disegnati sopra quelli più bassi
    this._image6 = this.add.image(980, 200, "logo").setScale(.25).setDepth(1);
    this._image7 = this.add.image(875, 200, "logo-phaser");




}



  update(time: number, delta: number): void {

    // ruota costantemente l'immagine ad ogni frame
    this._image5.rotation += .01;

  }




}
