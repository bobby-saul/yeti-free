import Phaser from 'phaser';

const heightOffset = 12;
const widthOffset = 48;

class PauseButton extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 0, 0, 'button', 3);
        this.scene = scene;
        scene.add.existing(this);
        this.setInteractive();
        this.on('pointerdown', this.scene.pauseGame, this.scene);
    }
    
    update() {
        var x = this.scene.yeti.body.x + (window.innerWidth * window.devicePixelRatio / 2) - widthOffset;
        var y = this.scene.yeti.body.y - (window.innerHeight * window.devicePixelRatio / 2) + heightOffset;
        this.x = x;
        this.y = y;
    }
}

export default PauseButton;
