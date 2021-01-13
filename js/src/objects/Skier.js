import Phaser from 'phaser'

class Skier extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, skierType, speed) {
        super(scene, x, y, skierType);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.speed = speed;
	}
    
    update() {
        this.setVelocity(0, this.speed);
    }
}

export default Skier;
