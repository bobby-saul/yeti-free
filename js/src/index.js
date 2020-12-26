import Phaser from "phaser";

import Preload from "./scenes/Preload"
import Game from "./scenes/Game"

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [Preload, Game]
};
var game = new Phaser.Game(config);
