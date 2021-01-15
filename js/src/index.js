import Phaser from "phaser";
import Preload from "./scenes/Preload"
import Game from "./scenes/Game"

const windowWidth = window.innerWidth * window.devicePixelRatio;
const windowHeight = window.innerHeight * window.devicePixelRatio;
const config = {
    type: Phaser.CANVAS,
    title: 'Yeti Free',
    url: 'https://bobby-saul.itch.io/yeti-free',
    version: '1.0-ALPHA1',
    width: windowWidth,
    height: windowHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            // debug: true
        }
    },
    scene: [Preload, Game]
};
const game = new Phaser.Game(config);

window.onresize = function () {
    const windowWidth = window.innerWidth * window.devicePixelRatio;
    const windowHeight = window.innerHeight * window.devicePixelRatio;
    game.scale.setGameSize(windowWidth, windowHeight);
}
