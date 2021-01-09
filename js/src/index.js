import Phaser from "phaser";
import Preload from "./scenes/Preload"
import Game from "./scenes/Game"

const windowWidth = window.innerWidth * window.devicePixelRatio;
const windowHeight = window.innerHeight * window.devicePixelRatio;
// Since Apple devices don't work well with WebGL.
const isIOS = [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
].includes(navigator.platform) || navigator.userAgent.includes("Mac");

const config = {
    type: isIOS ? Phaser.CANVAS : Phaser.AUTO,
    title: 'Yeti Free',
    url: 'https://bobby-saul.itch.io/yeti-free',
    version: '1.0-ALPHA',
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
