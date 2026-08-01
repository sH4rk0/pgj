import { GameData } from "../GameData";
import Bonus from "../customGameobjects/bonus/Bonus"
import Enemy from "../customGameobjects/enemy/Enemy";

export default class Examples extends Phaser.Scene {


  constructor() {
    super({
      key: "Examples",
    });
  }


  init() {

  }


  create() {

  }

  update(time: number, delta: number): void { }

  shutdown() { }

  addBonus(bonus: Bonus) { }
  removeBonus(bonus: Bonus) { }

  addEnemy(bonus: Enemy) { }
  removeEnemy(bonus: Enemy) { }


}
