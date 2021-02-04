import Phaser from "phaser";
import Preload from "./scenes/Preload";
import Title from "./scenes/Title";
import Game from "./scenes/Game";
import Pause from "./scenes/Pause";
import GameOver from "./scenes/GameOver";
import NextLevel from "./scenes/NextLevel";

const windowWidth = window.innerWidth * window.devicePixelRatio;
const windowHeight = window.innerHeight * window.devicePixelRatio;
const config = {
    type: Phaser.CANVAS,
    title: 'Yeti Free',
    url: 'https://bobby-saul.itch.io/yeti-free',
    version: '1.0',
    width: windowWidth,
    height: windowHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
        }
    },
    scene: [Preload, Title, Game, Pause, GameOver, NextLevel]
};
const game = new Phaser.Game(config);

window.onresize = function () {
    const windowWidth = window.innerWidth * window.devicePixelRatio;
    const windowHeight = window.innerHeight * window.devicePixelRatio;
    game.scale.setGameSize(windowWidth, windowHeight);
}
