import { GameData } from "../GameData";
import Examples from "./Examples";

// Esempio: gestione audio (musica in loop + audio sprite per gli effetti sonori)
// e visualizzazione delle onde sonore usando la Web Audio API (AnalyserNode).
export default class Example11 extends Examples {


  private _music: Phaser.Sound.BaseSound;
  private _analyser: any;
  private _dataArray: any;
  private _bufferLength: any;
  private _graphics: Phaser.GameObjects.Graphics;




  constructor() {
    super();
  }



  create() {


    //this is the only code you need to play an audio
    this._music = this.sound.add("music", { loop: true, volume: 0.1 });
    this._music.play();



     this.add.text(640, 500, "Click to play a random SFX").setDepth(10).setAlpha(1).setOrigin(.5).setFontSize(40).setFontFamily("Roboto");

     // Ad ogni click riproduciamo un effetto sonoro scelto a caso da uno
     // "audio sprite" (un unico file audio che contiene più suoni concatenati)
     this.input.on("pointerdown",()=>{

      this.sound.playAudioSprite("sfx",Phaser.Math.RND.pick(["plutonio","gloria","nientedimeno","allora","bestia","allora"]),{volume:.5});

     });



    // this code is just for fun from: https://labs.phaser.io/phaser4-view.html?src=src%5Cgame%20objects%5Cvideo%5Ctransparent%20video.js&return=phaser4-index.html%3Fpath%3Dgame%2520objects%252Fvideo
    this.add.tileSprite(0, 0, 1280, 800, "space").setOrigin(0);
    // Graphics: oggetto usato per disegnare a runtime la forma d'onda (linee)
    this._graphics = this.add.graphics();

    // Accediamo al sound manager come WebAudioSoundManager per poter
    // collegare un AnalyserNode nativo della Web Audio API
    let soundManager = this.sound as Phaser.Sound.WebAudioSoundManager;
    let analyser = soundManager.context.createAnalyser();
    // Colleghiamo l'output audio principale del gioco all'analyser,
    // e l'analyser agli altoparlanti, così l'audio continua a sentirsi
    // mentre ne analizziamo i dati
    soundManager.masterVolumeNode.connect(analyser);
    analyser.connect(soundManager.context.destination);
    analyser.smoothingTimeConstant = 1;
    // Buffer che conterrà i campioni della forma d'onda letti ogni frame
    this._bufferLength = analyser.frequencyBinCount;
    this._dataArray = new Uint8Array(this._bufferLength);
    this._analyser = analyser;


  }

  update(time: number, delta: number): void {

    if (!this._graphics) {
      return;
    }

    // Copia i campioni audio correnti (ampiezza dell'onda) nel buffer
    this._analyser.getByteTimeDomainData(this._dataArray);

    // Ridisegniamo la linea da zero ad ogni frame
    this._graphics.clear();
    this._graphics.lineStyle(2, 0x00ff00);

    this._graphics.beginPath();

    // Distanza orizzontale tra un campione e il successivo per riempire tutto lo schermo
    var sliceWidth = 1280 / this._bufferLength;
    var x = 0;

    for (var i = 0; i < this._bufferLength; i++) {
      // I valori del buffer vanno da 0 a 255, con 128 come "silenzio" (linea centrale)
      var v = this._dataArray[i] / 128;
      var y = v * 400;

      if (i === 0) {
        this._graphics.moveTo(x, y);
      }
      else {
        this._graphics.lineTo(x, y);
      }

      x += sliceWidth;
    }

    this._graphics.lineTo(1280, 400);
    this._graphics.stroke();
  }



  // Metodo chiamato da Phaser quando la scena viene chiusa:
  // fermiamo e distruggiamo la musica per evitare che continui a suonare
  shutdown() {
    if (this._music.isPlaying) { this._music.stop(); this._music.destroy(); }
  }


}


