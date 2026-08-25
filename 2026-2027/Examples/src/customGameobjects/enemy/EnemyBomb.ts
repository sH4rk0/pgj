import Enemy from "./Enemy";
import IEnemy from "./IEnemy";

// Bomba rotante: eredita da Enemy (che gestisce già corpo circolare, rimbalzo
// e animazione "rotation" sulla spritesheet "bomb"), qui aggiungiamo solo il nome
// usato per riconoscere il tipo di nemico nelle callback di collisione/overlap.
export default class EnemyBomb extends Enemy implements IEnemy {

    constructor(params: genericConfig) {
        super(params);
        this.name = "bomb";
    }

    create() { }
    update(time: number, delta: number) { }
}
