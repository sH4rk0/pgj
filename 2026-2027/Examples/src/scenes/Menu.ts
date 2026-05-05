import Example1 from "./Example.1";
import Example2 from "./Example.2";
import Example3 from "./Example.3";
import Example4 from "./Example.4";
import Example5 from "./Example.5";
import Example6 from "./Example.6";
import Example7 from "./Example.7";


export const GameOptions = {
    pages: 2,
    tintColors: [0xff0000, 0x00ff00, 0x0000ff],
    columns: 5,
    rows: 4,
    unlocked: 7,
    thumbWidth: 150,
    thumbHeight: 150,
    spacing: 20,
    threshold: 0.2
}

export default class Menu extends Phaser.Scene {


    private _examplesObj: Array<{ name: string, type: any, title: string }> = [
        { name: "Example 1", type: Example1, title: "This is the first example" },
        { name: "Example 2", type: Example2, title: "This is the second example" },
        { name: "Example 3", type: Example3, title: "This is the third example" },
        { name: "Example 4", type: Example4, title: "This is the fourth example" },
        { name: "Example 5", type: Example5, title: "This is the fifth example" },
        { name: "Example 6", type: Example6, title: "This is the sixth example" },
        { name: "Example 7", type: Example7, title: "This is the seventh example" },
    ]

    private _container: Phaser.GameObjects.Container;
    private _containerPager: Phaser.GameObjects.Container;
    private _menuContainer: Phaser.GameObjects.Container;
    private _menuIsOpen: boolean = false;
    private _menuText: Phaser.GameObjects.Text;

    constructor() {
        super({
            key: "Menu",
        });
    }


    create(): void {


        let isDragging: boolean = false;
        this._menuIsOpen = false;
        const pageSelectors: PageSelector[] = [];
        let startX: number = 0;
        let startContainerX: number = 0;
        let currentPage: number = 0;

        const contentWidth: number = GameOptions.pages * this.scale.width;
        this._container = this.add.container(0, 0).setAlpha(0).setDepth(2);
        this._containerPager = this.add.container(0, 0).setAlpha(0).setDepth(1);
        const bg: Phaser.GameObjects.Rectangle = this.add.rectangle(0, 0, contentWidth, this.scale.height, 0x000000).setOrigin(0).setAlpha(0.75).setInteractive();
        this._containerPager.add(bg);


        const pageText: Phaser.GameObjects.Text = this.add.text(this.scale.width / 2, 16, 'Page 1 / ' + GameOptions.pages, {
            font: '18px Arial',
            color: '#000000',
            align: 'center'
        });
        pageText.setOrigin(0.5).setDepth(4);

        const rowLength: number = GameOptions.thumbWidth * GameOptions.columns + GameOptions.spacing * (GameOptions.columns - 1);
        const columnHeight: number = GameOptions.thumbHeight * GameOptions.rows + GameOptions.spacing * (GameOptions.rows - 1);
        const leftMargin: number = (this.scale.width - rowLength) / 2 + GameOptions.thumbWidth / 2;
        const topMargin: number = (this.scale.height - columnHeight) / 2 + GameOptions.thumbHeight / 2;
        let levelNumber: number = 0;
        let _counter: number = 0;
        for (let k: number = 0; k < GameOptions.pages; k++) {
            for (let i: number = 0; i < GameOptions.rows; i++) {
                for (let j: number = 0; j < GameOptions.columns; j++) {

                    if (this._examplesObj[_counter] !== undefined) {
                        _counter++;
                        const posX: number = k * this.scale.width + leftMargin + j * (GameOptions.thumbWidth + GameOptions.spacing);
                        const posY: number = topMargin + i * (GameOptions.thumbHeight + GameOptions.spacing);
                        const thumb: LevelThumbnail = new LevelThumbnail(this, posX, posY, 'levelthumb', levelNumber + 1, k, this._examplesObj[levelNumber].name);
                        this._container.add(thumb)
                        thumb.on('levelSelected', (level: number) => {


                            this.loadExample(level - 1);
                            this.hideExamples();
                        });
                        levelNumber++;

                    }


                }
            }

            if (this._examplesObj[_counter] === undefined) continue;

            pageSelectors[k] = new PageSelector(this, this.scale.width / 2 + (k - Math.floor(GameOptions.pages / 2) + 0.5 * (1 - GameOptions.pages % 2)) * 40, this.scale.height - 40, 'levelpages', k, 0);
            pageSelectors[k].on('pageSelected', (page: number) => {
                currentPage = page;
                const targetX: number = -currentPage * this.scale.width;
                this.tweens.add({
                    targets: this._container,
                    x: targetX,
                    duration: 250,
                    ease: 'Cubic.easeOut',
                    onComplete: () => {
                        snapToPage();
                    }
                });
            });

            this._containerPager.add(pageSelectors[k]);
        }

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            if (!this._menuIsOpen) return;
            isDragging = true;
            startX = pointer.x;
            startContainerX = this._container.x;
        });

        this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            if (!this._menuIsOpen) return;
            if (isDragging) {
                const delta: number = pointer.x - startX;
                this._container.x = Phaser.Math.Clamp(startContainerX + delta, this.scale.width - contentWidth, 0);
            }
        });

        this.input.on('pointerup', () => {
            if (!this._menuIsOpen) return;
            if (isDragging) {
                ;
                isDragging = false;
                snapToPage();
            }
        });

        this.input.on('pointerupoutside', () => {
            if (!this._menuIsOpen) return;
            if (isDragging) {
                isDragging = false;
                snapToPage();
            }
        });

        this.input.on('wheel', (_pointer: Phaser.Input.Pointer, _gameObjects: Phaser.GameObjects.GameObject[], deltaX: number, deltaY: number) => {
            if (!this._menuIsOpen) return;
            const delta: number = (deltaX !== 0) ? deltaX : deltaY;
            if (delta != 0) {
                if (isDragging) {
                    isDragging = false;
                    startContainerX = this._container.x;
                }
                const direction: number = delta > 0 ? 1 : -1;
                const newPage: number = Phaser.Math.Clamp(currentPage + direction, 0, GameOptions.pages - 1);
                if (newPage != currentPage) {
                    currentPage = newPage;
                    moveToPage(currentPage);
                }
            }
        });

        const snapToPage = (): void => {
            const delta: number = startContainerX - this._container.x;
            currentPage = Math.round(-this._container.x / this.scale.width);
            if (Math.abs(delta) > this.scale.width * GameOptions.threshold) {
                if (delta > 0) {
                    currentPage = Math.ceil(-this._container.x / this.scale.width);
                }
                else {
                    currentPage = Math.floor(-this._container.x / this.scale.width);
                }
            }
            currentPage = Phaser.Math.Clamp(currentPage, 0, GameOptions.pages - 1);
            moveToPage(currentPage);
        };

        const moveToPage = (page: number): void => {
            const targetX: number = -page * this.scale.width;
            this.tweens.add({
                targets: this._container,
                x: targetX,
                duration: 250,
                ease: 'Cubic.easeOut'
            });
            pageText.setText('Page ' + (currentPage + 1).toString() + ' / ' + GameOptions.pages);
            pageSelectors.forEach((selector) => {
                selector.updateThumb(currentPage)
            })
        }


        //check if the Querystring contains the attribute "example" and if it does, try to load the example with the corresponding number (e.g. "?example=3" will load the third example)
        const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
        const exampleParam: string | null = urlParams.get('example');
        if (exampleParam) {
            const exampleIndex: number = parseInt(exampleParam, 10) - 1;
            if (!isNaN(exampleIndex)) {
                this.loadExample(exampleIndex);
            }
        }


        this._menuContainer = this.add.container(0, 0).setDepth(3);


        let _menuBg = this.add.image(this.scale.width / 2, 0, "menu");

        let _menuBtn = this.add.image(130, 5, "menu-btn").setOrigin(0, 0).setInteractive().on("pointerdown", () => {
            this.toggleExamples();
        }).setOrigin(.5, 0).on("pointerover", () => {
            _menuBtn.setTint(0xbbbbbb).setTintMode(Phaser.TintModes.FILL);
        }).on("pointerout", () => {
            _menuBtn.clearTint();
        });


        this._menuText = this.add.text(130, 20, "Open Menu", { fontFamily: "'Press Start 2P'", fontSize: "16px", color: "#000000" }).setOrigin(.5, 0);

        this._menuContainer.add([_menuBg, _menuBtn, this._menuText]);


    }


    toggleExamples(): void {
        if (this._menuIsOpen) {
            this.hideExamples();
        }
        else {
            this.showExamples();
        }

    }


    showExamples(): void {

        this._container.setAlpha(0);
        this._containerPager.setAlpha(0);
        this._menuText.setText("Close Menu");
        this.tweens.add({
            targets: [this._container, this._containerPager],
            alpha: 1,
            duration: 500,
            ease: 'Cubic.easeOut',
            onComplete: () => {
                this._menuIsOpen = true;
            }
        });


    }

    hideExamples(): void {
        this._menuIsOpen = false;
        this._menuText.setText("Open Menu");
        this.tweens.add({
            targets: [this._container, this._containerPager],
            alpha: 0,
            duration: 500,
            ease: 'Cubic.easeOut'
        });
    }


    loadExample(index: number): void {
        const example = this._examplesObj[index];
        if (!example) return;

        this.scene.remove("Examples");
        this.scene.add("Examples", (example as any).type, true);
        this.scene.bringToTop(this);
    }

}


export class PageSelector extends Phaser.GameObjects.Sprite {

    private pageIndex: number;
    private isPressed: boolean = false;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string, pageIndex: number, current: number) {

        super(scene, x, y, key);

        this.pageIndex = pageIndex;
        scene.add.existing(this);

        this.setTint(GameOptions.tintColors[pageIndex % GameOptions.tintColors.length]);
        this.setFrame(pageIndex === current ? 1 : 0);

        this.updateThumb(current);

        this.setInteractive();

        this.on('pointerdown', () => {
            this.isPressed = true;
        });

        this.on('pointerup', () => {
            if (this.isPressed) {
                this.isPressed = false;
                this.emit('pageSelected', pageIndex);
            }
        });

        this.on('pointerout', () => {
            this.isPressed = false;
        });
    }

    updateThumb(n: number): void {
        this.setFrame(this.pageIndex === n ? 1 : 0);
    }
}

export class LevelThumbnail extends Phaser.GameObjects.Container {

    private levelText: Phaser.GameObjects.Text;
    private levelSprite: Phaser.GameObjects.Sprite;
    private isPressed: boolean = false;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string, level: number, page: number, title: string) {

        super(scene, x, y);
        scene.add.existing(this);

        this.levelSprite = scene.add.sprite(0, 0, key);

        this.levelSprite.setTint(GameOptions.tintColors[page % GameOptions.tintColors.length]);
        this.add(this.levelSprite);

        this.levelText = scene.add.text(0, - 14, title, {
            font: '24px Arial',
            color: '#000000'
        });
        this.levelText.setOrigin(0.5);
        this.add(this.levelText);

        this.levelSprite.setInteractive();

        this.levelSprite.on('pointerdown', () => {
            this.isPressed = true;
        });

        this.levelSprite.on('pointerup', () => {
            if (this.isPressed) {
                this.isPressed = false;
                this.emit('levelSelected', level);
            }
        });

        this.levelSprite.on('pointerout', () => {
            this.isPressed = false;
        });
    }
}
