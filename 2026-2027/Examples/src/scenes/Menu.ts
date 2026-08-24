import Example1 from "./Example.1";
import Example2 from "./Example.2";
import Example3 from "./Example.3";
import Example4 from "./Example.4";
import Example5 from "./Example.5";
import Example6 from "./Example.6";
import Example7 from "./Example.7";
import Example8 from "./Example.8";
import Example9 from "./Example.9";
import Example10 from "./Example.10";
import Example11 from "./Example.11";
import Example12 from "./Example.12";
import Example13 from "./Example.13";
import Example14 from "./Example.14";
import Example15 from "./Example.15";
import Example16 from "./Example.16";
import Example17 from "./Example.17";
import Example18 from "./Example.18";
import Example19 from "./Example.19";
import Example20 from "./Example.20";
import Example21 from "./Example.21";
import Example22 from "./Example.22";
import Example23 from "./Example.23";
import Example24 from "./Example.24";
import Example25 from "./Example.25";
import Example26 from "./Example.26";
import Example27 from "./Example.27";
import Example28 from "./Example.28";
import Example29 from "./Example.29";
import Example30 from "./Example.30";
import Example31 from "./Example.31";
import Example32 from "./Example.32";
import Example33 from "./Example.33";
import Example34 from "./Example.34";
import Example35 from "./Example.35";
import Example36 from "./Example.36";
import Example37 from "./Example.37";

import Examples from "./Examples";
import ExamplesHUD from "./ExamplesHUD";
import ExamplesScene from "./ExamplesScene";


export const GameOptions = {
    pages: 2,
    tintColors: [0xff0000, 0x00ff00, 0x0000ff],
    columns: 5,
    rows: 4,
    unlocked: 7,
    thumbWidth: 256,
    thumbHeight: 160,
    spacing: 10,
    threshold: 0.2
}

export default class Menu extends Phaser.Scene {


    private _examplesObj: Array<{ name: string, type: any, title: string, gitUrl: string, labsUrl: string, thumb: string }> = [
        { name: "Home", type: Example1, title: "This is the first example", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.1.ts", labsUrl: "https://labs.phaser.io/", thumb:"thumb-1" },

        { name: "Texts", type: Example2, title: "This is the second example", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.2.ts", labsUrl: "https://labs.phaser.io/?path=game+objects%2Ftext", thumb:"thumb-2" },

        { name: "Images", type: Example3, title: "This is the third example", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.3.ts", labsUrl: "https://labs.phaser.io/?path=game+objects%2Fimages", thumb:"thumb-3" },

        { name: "Sprites", type: Example4, title: "This is the fourth example", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.4.ts", labsUrl: "https://labs.phaser.io/?path=game+objects%2Fsprites", thumb:"thumb-4" },

        { name: "TileSprites", type: Example5, title: "This is the fifth example", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.5.ts", labsUrl: "https://labs.phaser.io/?path=game+objects%2Ftile+sprite", thumb:"thumb-5" },

        { name: "Groups", type: Example6, title: "This is the sixth example", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.6.ts", labsUrl: "https://labs.phaser.io/?path=game+objects%2Fgroup", thumb:"thumb-6" },

        { name: "Containers", type: Example7, title: "This is the seventh example", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.7.ts", labsUrl: "https://labs.phaser.io/?path=game+objects%2Fcontainer" , thumb:"thumb-7"},

     //   { name: "Empty", type: Example8, title: "This is example 8", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.8.ts", labsUrl: "" },

        { name: "Tween", type: Example9, title: "This is example 9", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.9.ts", labsUrl: "https://labs.phaser.io/phaser4-index.html?path=tweens" , thumb:"thumb-8"},

        { name: "Menu Plus", type: Example10, title: "This is example 10", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.10.ts", labsUrl: "", thumb:"thumb-9"},

        { name: "Audio", type: Example11, title: "This is example 11", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.11.ts", labsUrl: "https://labs.phaser.io/?path=audio" , thumb:"thumb-10"},

        { name: "Time", type: Example12, title: "This is example 12", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.12.ts", labsUrl: "https://labs.phaser.io/?path=time", thumb:"thumb-11" },

        { name: "Timeline", type: Example13, title: "This is example 13", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.13.ts", labsUrl: "https://labs.phaser.io/?path=time%2Ftimeline", thumb:"thumb-12" },

        { name: "Scene com 1", type: Example14, title: "This is example 14", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.14.ts", labsUrl: "https://labs.phaser.io/?path=scenes", thumb:"thumb-13" },

        { name: "Scene com 2", type: Example15, title: "This is example 15", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.15.ts", labsUrl: "https://labs.phaser.io/?path=scenes", thumb:"thumb-14" },

        { name: "Scene com 3", type: Example16, title: "This is example 16", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.16.ts", labsUrl: "https://labs.phaser.io/?path=scenes" , thumb:"thumb-15"},

        { name: "Hello camera", type: Example17, title: "This is example 17", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.17.ts", labsUrl: "https://labs.phaser.io/?path=camera" , thumb:"thumb-16"},

        { name: "Camera ZOOM", type: Example18, title: "This is example 18", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.18.ts", labsUrl: "https://labs.phaser.io/?path=camera" , thumb:"thumb-17"},

        { name: "Camera FLASH", type: Example19, title: "This is example 19", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.19.ts", labsUrl: "https://labs.phaser.io/?path=camera", thumb:"thumb-18" },

        { name: "Camera SHAKE", type: Example20, title: "This is example 20", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.20.ts", labsUrl: "https://labs.phaser.io/?path=camera" , thumb:"thumb-19"},

        { name: "Camera FADE", type: Example21, title: "This is example 21", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.21.ts", labsUrl: "https://labs.phaser.io/?path=camera", thumb:"thumb-20" },

        { name: "Hello Physics 1", type: Example22, title: "This is example 22", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.22.ts", labsUrl: "https://labs.phaser.io/?path=physics%2Farcade" , thumb:"thumb-21"},

        { name: "Hello Physics 2", type: Example23, title: "This is example 23", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.23.ts", labsUrl: "https://labs.phaser.io/?path=physics%2Farcade" , thumb:"thumb-22"},

        { name: "World bounds", type: Example24, title: "This is example 24", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.24.ts", labsUrl: "https://labs.phaser.io/?path=physics%2Farcade", thumb:"thumb-23" },

        { name: "Move/Accelerate to", type: Example25, title: "This is example 25", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.25.ts", labsUrl: "https://labs.phaser.io/?path=physics%2Farcade", thumb:"thumb-24" },

        { name: "Closest Furthest", type: Example26, title: "This is example 26", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.26.ts", labsUrl: "https://labs.phaser.io/?path=physics%2Farcade" , thumb:"thumb-25"},

        { name: "Angular velocity", type: Example27, title: "This is example 27", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.27.ts", labsUrl: "https://labs.phaser.io/?path=physics%2Farcade" , thumb:"thumb-26"},

        { name: "Collide", type: Example28, title: "This is example 28", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.28.ts", labsUrl: "https://labs.phaser.io/?path=physics%2Farcade", thumb:"thumb-27" },

        { name: "Overlap", type: Example29, title: "This is example 29", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.29.ts", labsUrl: "https://labs.phaser.io/?path=physics%2Farcade", thumb:"thumb-28" },

        { name: "Player", type: Example30, title: "This is example 30", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.30.ts", labsUrl: "" , thumb:"thumb-29"},

        { name: "Bonus", type: Example31, title: "This is example 31", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.31.ts", labsUrl: "", thumb:"thumb-30" },

        { name: "Enemy", type: Example32, title: "This is example 32", gitUrl: "https://github.com/sH4rk0/pgj/blob/main/2026-2027/Examples/src/scenes/Example.32.ts", labsUrl: "", thumb:"thumb-31" },

        ]

    private _container: Phaser.GameObjects.Container;
    private _containerPager: Phaser.GameObjects.Container;
    private _menuContainer: Phaser.GameObjects.Container;
    private _menuIsOpen: boolean = false;
    private _menuBtn: Phaser.GameObjects.Sprite;
    private _gitUrl: Phaser.GameObjects.Image;
    private _labUrl: Phaser.GameObjects.Image;

    private _gitUrlString: string = "";
    private _labUrlString: string = "";

    private _pageText: Phaser.GameObjects.Text;
    private isDragging: boolean = false;
    private snapToPage: any;
    private _menuIsAnimating:boolean;


    constructor() {
        super({
            key: "Menu",
        });
    }


    create(): void {


        this.isDragging = false;
        this._menuIsOpen = false;
        this._menuIsAnimating= false;
      
        let startX: number = 0;
        let startContainerX: number = 0;
        let currentPage: number = 0;

        this._menuContainer = this.add.container(0, 0).setDepth(3);


        let _menuBg = this.add.image(this.scale.width / 2, 0, "menu");

        this._menuBtn = this.add.sprite(24, 24, "menu-btn").setOrigin(.5).setInteractive().on("pointerdown", () => {
            this.toggleExamples();
        }).on("pointerover", () => {
            this._menuBtn.setTint(0xbbbbbb).setTintMode(Phaser.TintModes.FILL);
        }).on("pointerout", () => {
            this._menuBtn.clearTint();
        });


        this._gitUrl = this.add.image(1280 - 16 - 48, 24, "github").setOrigin(1, .5).setInteractive().on("pointerdown", () => {
            if (this._gitUrlString == "") return;
            this.openUrl(this._gitUrlString)


        }).on("pointerover", () => {
            if (this._gitUrlString == "") return;
            this._gitUrl.setTint(0xbbbbbb).setTintMode(Phaser.TintModes.FILL);
        }).on("pointerout", () => {
            this._gitUrl.clearTint();
        });

        this._labUrl = this.add.image(1280 - 16, 24, "link").setOrigin(1, .5).setInteractive().on("pointerdown", () => {
            if (this._labUrlString == "") return;
            this.openUrl(this._labUrlString)
        }).on("pointerover", () => {
            if (this._labUrlString == "") return;
            this._labUrl.setTint(0xbbbbbb).setTintMode(Phaser.TintModes.FILL);
        }).on("pointerout", () => {
            this._labUrl.clearTint();
        });

        this._menuContainer.add([_menuBg, this._menuBtn, this._gitUrl, this._labUrl]);

        const contentWidth: number = GameOptions.pages * this.scale.width;
        this._container = this.add.container(0, 0).setAlpha(0).setDepth(2);
        this._containerPager = this.add.container(0, 0).setAlpha(0).setDepth(1);
        const bg: Phaser.GameObjects.Rectangle = this.add.rectangle(0, 0, contentWidth, this.scale.height, 0xffffff0).setOrigin(0).setAlpha(0.90).setInteractive();
        this._containerPager.add(bg);


        this._pageText = this.add.text(this.scale.width / 2, 24, 'Page 1 / ' + GameOptions.pages, {
            font: '18px Arial',
            color: '#000000',
            align: 'center'
        });
        this._pageText.setOrigin(0.5).setDepth(4).setVisible(false)

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
                        const thumb: exampleThumbnail = new exampleThumbnail(this, posX, posY, this._examplesObj[levelNumber].thumb, levelNumber + 1, k, this._examplesObj[levelNumber].name);
                        this._container.add(thumb)
                        thumb.on('exampleSelected', (level: number) => {

                            this.loadExample(level - 1);
                            this.hideExamples();
                        });
                        levelNumber++;

                    }


                }
            }

            if (this._examplesObj[_counter] === undefined) continue;

        
        }

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            if (!this._menuIsOpen) return;
            this.isDragging = true;
            startX = pointer.x;
            startContainerX = this._container.x;
        });

        this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            if (!this._menuIsOpen) return;
            if (this.isDragging) {
                const delta: number = pointer.x - startX;
                this._container.x = Phaser.Math.Clamp(startContainerX + delta, this.scale.width - contentWidth, 0);
            }
        });

        this.input.on('pointerup', () => {
            if (!this._menuIsOpen) return;
            if (this.isDragging) {
                ;
                this.isDragging = false;
                this.snapToPage();
            }
        });

        this.input.on('pointerupoutside', () => {
            if (!this._menuIsOpen) return;
            if (this.isDragging) {
                this.isDragging = false;
                this.snapToPage();
            }
        });

        this.input.on('wheel', (_pointer: Phaser.Input.Pointer, _gameObjects: Phaser.GameObjects.GameObject[], deltaX: number, deltaY: number) => {
            if (!this._menuIsOpen) return;
            const delta: number = (deltaX !== 0) ? deltaX : deltaY;
            if (delta != 0) {
                if (this.isDragging) {
                    this.isDragging = false;
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

        this.snapToPage = (): void => {
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
            this._pageText.setText('Page ' + (currentPage + 1).toString() + ' / ' + GameOptions.pages);
          
        }


        //check if the Querystring contains the attribute "example" and if it does, try to load the example with the corresponding number (e.g. "?example=3" will load the third example)
        const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
        const exampleParam: string | null = urlParams.get('example');
        if (exampleParam) {
            const exampleIndex: number = parseInt(exampleParam, 10) - 1;
            if (!isNaN(exampleIndex)) {
                this.loadExample(exampleIndex);
            }
        } else {
            this.loadExample(0);
        }







        const hideMenu: boolean | null = <boolean | null><unknown>urlParams.get('hidemenu');

        if (hideMenu !== null) {

            this._menuContainer.setAlpha(0);
        }

        this.input.keyboard?.on('keydown-O', () => {
            this.takeScreenshot();
        });

    }

    openUrl(url: string) {

        window.open(url, "_Blank");
    }

    takeScreenshot(): void {
        this.game.renderer.snapshot((image) => {
            const link = document.createElement('a');
            link.href = (image as HTMLImageElement).src;
            link.download = `screenshot-${Date.now()}.png`;
            link.click();
        });
    }


    toggleExamples(): void {
        if(this._menuIsAnimating) return;
        if (this._menuIsOpen) {
            this.hideExamples();
        }
        else {
            this.showExamples();
        }

    }


    showExamples(): void {

        this._menuIsAnimating=true;
        this._container.setAlpha(0);
        this._containerPager.setAlpha(0);
        this._menuBtn.setFrame(1);
        this._pageText.setVisible(true);
        this.isDragging = false;

        this.tweens.add({
            targets: [this._container, this._containerPager],
            alpha: 1,
            duration: 500,
            ease: 'Cubic.easeOut',
            onComplete: () => {
                this._menuIsOpen = true;
                 this._menuIsAnimating=false;

            }
        });


    }

    hideExamples(): void {
         this._menuIsAnimating=true;
        this._menuIsOpen = false;
        this._menuBtn.setFrame(0);
        this._pageText.setVisible(false);
        this.isDragging = false;

        this.tweens.add({
            targets: [this._container, this._containerPager],
            alpha: 0,
            duration: 500,
            ease: 'Cubic.easeOut',
             onComplete: () => {
                 this._menuIsAnimating=false;
             }
        });
    }


    loadExample(index: number): void {

        const example = this._examplesObj[index];
        //console.log(example)
        this._gitUrlString = example.gitUrl;
        if (this._gitUrlString == "") { this._gitUrl.setAlpha(.2).setInteractive(false); } else {
            this._gitUrl.setAlpha(1).setInteractive(true);
        }
        this._labUrlString = example.labsUrl;
        if (this._labUrlString == "") { this._labUrl.setAlpha(.2).setInteractive(false); } else {
            this._labUrl.setAlpha(1).setInteractive(true);
        }

        this.snapToPage();
        this.isDragging = false;
        if (!example) return;

        let _exampleScene = <Examples>this.scene.get("Examples");
        if (_exampleScene) {
            _exampleScene.shutdown();
        }
        this.scene.remove("Examples");
        this.scene.add("Examples", (example as any).type, true);
        this.scene.bringToTop(this);

      
        
        if (example.name === "Scene com 3") {
           
            this.scene.remove("ExamplesHUD");
            this.scene.add("ExamplesHUD", ExamplesHUD, true);
            this.scene.bringToTop(this);
        }
    }

}




export class exampleThumbnail extends Phaser.GameObjects.Container {

    private levelText: Phaser.GameObjects.Text;
    private levelSprite: Phaser.GameObjects.Sprite;
    private isPressed: boolean = false;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string, level: number, page: number, title: string) {

        super(scene, x, y);
        scene.add.existing(this);

        this.levelSprite = scene.add.sprite(0, 0, key).setScale(.5);

        //this.levelSprite.setTint(GameOptions.tintColors[page % GameOptions.tintColors.length]);
        this.add(this.levelSprite);

        this.levelText = scene.add.text(0, 60, title, {
            font: '18px Arial',
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
                this.emit('exampleSelected', level);
            }
        });

        this.levelSprite.on('pointerout', () => {
            this.isPressed = false;
        });
    }
}
