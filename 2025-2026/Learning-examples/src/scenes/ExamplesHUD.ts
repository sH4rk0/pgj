import { GameData } from "../GameData";
import Examples from "./Examples";

export default class ExamplesHUD extends Phaser.Scene {

  private _bombs: number;
  private _gameplayScene: Examples;
  private _bombText: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "ExamplesHUD",
    });
  }



  create() {

    this._bombs=0;
    this._gameplayScene = <Examples>this.scene.get("Examples");
   
    //rimuoviamo il listener per l'aggiornamento del punteggio
    this._gameplayScene.events.off("update-bombs", this.updateBombs, this);
    //ricreiamo il listener per l'aggiornamento del punteggio
    this._gameplayScene.events.on("update-bombs", this.updateBombs, this);

    this._bombText = this.add.text(100, 100, "0").setTint(0xffffff).setOrigin(0).setFontFamily("Roboto").setFontSize(40)



  }

  update(time: number, delta: number): void {

  }

  private updateBombs(parameters: Array<any>) {

    // il primo valore dell’array è lo score 
    // che aggiungiamo allo score corrente
    this._bombs += parameters[0];
    // settiamo il valore del gameobject
    this._bombText.setText(this._bombs + "");
    // salviamo il valore nel registry in modo che possa essere utilizzato
    // nella scena di GameOver se dovesse servire
    this.registry.set("score", this._bombs);

  }

  shutdown() { }


}
