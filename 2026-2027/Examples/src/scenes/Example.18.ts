import { GameData } from "../GameData";
import Examples from "./Examples";

// Esempio: come Example17 (movimento camera con freccie), con l'aggiunta
// di uno zoom animato della camera dopo un ritardo (timer event).
export default class Example18 extends Examples {


  //Variabile di tipo SmoothedKeyControl che consente di controllare il movimento 
  //e lo zoom di una camera utilizzando i tasti cursore.
  //E'possibile fornire a questo "controls" valori fisici per l'accelerazione, 
  //il trascinamento e la velocità massima per ottenere effetti più fluidi.
  //Per il corretto funzionamento è necessario richiamare il metodo update del "controls"
  //ogni frame (update)
  private _controls: Phaser.Cameras.Controls.SmoothedKeyControl;
  //definiamo una variabile per la nostra main camera
  private _mainCamera: Phaser.Cameras.Scene2D.Camera;
  //variabile cursor nella quale inizializzeremo un oggetto che contiene i riferimenti
  //ai tasti cursore
  private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  constructor() {
    super();
  }


  create() {

    //aggiungiamo 4 sprite alla nostra scena
    this.add.sprite(0, 0, "grid").setOrigin(0);
    this.add.sprite(1024, 0, "grid").setOrigin(0);
    this.add.sprite(0, 1024, "grid").setOrigin(0);
    this.add.sprite(1024, 1024, "grid").setOrigin(0);
 
    this.add.text(640,400,"Zoom after 2 seconds delay.\nUse arrows to move the camera.").setAlign("center").setFontFamily("Roboto").setColor("#ffffff").setStroke("#000000",6).setFontSize(40).setScrollFactor(0).setOrigin(.5)

    //Settiamo i margini del viewport il doppio della misura del nostro gioco
    //in questo caso sarà 2048*2048
    this.cameras.main.setBounds(
      0, //x
      0, //y
      1024 * 2, //laghezza
     1024 * 2 //altezza
    );

    //Settiamo la nostra main camera
    this._mainCamera = this.cameras.main;
    //Settiamo i tasti cursore
    this._cursors = this.input.keyboard.createCursorKeys();
    //creiamo un oggetto di configurazione per in nostro controller della camera
    const controlConfig: Phaser.Types.Cameras.Controls.SmoothedKeyControlConfig = {
      camera: this._mainCamera,
      //assegniamo a quale camera deve far riferimento il control
      left: this._cursors.left,
      //il cursore per lo spostamento a sinistra
      right: this._cursors.right,
      //il cursore per lo spostamento a destra
      up: this._cursors.up,
      //il cursore per lo spostamento in alto
      down: this._cursors.down,
      //il cursore per lo spostamento in basso
      acceleration: 0.06, //l'accelerazione
      drag: 0.0005, //il rallentamento quando fermiamo il movimento
      maxSpeed: 1.0 //la velocità massima
    };
    //creiamo il controller
    this._controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);


    // Dopo 2 secondi chiamiamo this.zoom passando 2 come argomento (args)
    this.time.addEvent({ delay: 2000,  callback: this.zoom, args:[2], callbackScope: this})


  }


  update(time: number, delta: number): void {

    // Necessario ogni frame: aggiorna la posizione della camera in base
    // ai tasti premuti e ai parametri di accelerazione/drag configurati
    this._controls.update(delta);

  }

  // Anima lo zoom della camera fino al valore richiesto
  zoom(zoom:number) {


    this._mainCamera.zoomTo(
     zoom, //valore dello zoom
      1000, //duration
      "Sine.easeInOut", //ease function
      true, // force
      (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
        if (progress === 1) { console.log("zoom completed"); }
      }, //callback
      this //callback context
    );


  }



}


