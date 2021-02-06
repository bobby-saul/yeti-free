import Phaser from "phaser";
import Preload from "./scenes/Preload";
import Title from "./scenes/Title";
import Game from "./scenes/Game";
import Pause from "./scenes/Pause";
import GameOver from "./scenes/GameOver";
import NextLevel from "./scenes/NextLevel";

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const config = {
    type: Phaser.CANVAS,
    title: 'Yeti Free',
    url: 'https://bobby-saul.itch.io/yeti-free',
    version: '1.2',
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
game.eventEmitter = new Phaser.Events.EventEmitter();

window.onresize = function () {
    game.scale.setGameSize(window.innerWidth, window.innerHeight);
    game.eventEmitter.emit('resize');
}
