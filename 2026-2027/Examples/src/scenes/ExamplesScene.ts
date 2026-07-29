import { GameData } from "../GameData";

export default class ExamplesScene extends Phaser.Scene {

  private _bombs: number;

  constructor() {
    super({
      key: "ExamplesScene",
    });
  }


  init(data: { bombs: number }) {
    //recuperiamo il valore bombs e controlliamo che questo valore non sia null
   
    if (data.bombs != null) {
      this._bombs = data.bombs
    } else {
      //se è null settiamo il bombs = 0 
      this._bombs = 0;
    }
  }


  create() {

    this.cameras.main.setBackgroundColor("#ff0000");
    this.add.text(640, 400, "Congratulations!").setFontFamily("Roboto").setFontSize(40).setTint(0xffffff).setOrigin(.5);
    let _result: Phaser.GameObjects.Text = this.add.text(640, 450, "").setFontFamily("Roboto").setFontSize(30).setTint(0xffffff).setOrigin(.5);

    let _bombs: number = this.registry.get("bombs");
    if (_bombs > 0) {
      _result.setText(_bombs + " bombs destroyed! (from registry)");
      this.registry.remove("bombs");

    } else if (this._bombs > 0) {
      _result.setText(this._bombs + " bombs destroyed! (from data object)");
    }

  }

  update(time: number, delta: number): void {

  }

  shutdown() { }


}
