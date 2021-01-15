import Phaser from 'phaser';

const minInterval = 10;
const maxInterval = 100;
const minSpeed  = 50;
const maxSpeed  = 200;
const skierTypes = [
    'skier1',
    'skier2',
];


class Skier extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        // Get random starting position
        const startingX = Phaser.Math.Between(
            Math.max((-scene.gameSize[0] / 2), scene.yeti.body.x - (window.innerWidth * window.devicePixelRatio / 2)),
            Math.min((scene.gameSize[0] / 2), scene.yeti.body.x + (window.innerWidth * window.devicePixelRatio / 2))
        );
        const startingY = scene.yeti.body.y - (window.innerHeight * window.devicePixelRatio / 2);

        // Add to scene
        const skierType = Phaser.Math.Between(0, skierTypes.length - 1);
        super(scene, startingX, startingY, skierTypes[skierType]);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        // Sizing
        this.body.width = 20;
        this.body.height = 12;
        this.body.offset.x = 6;
        this.body.offset.y = 20;
        this.setDepth(this.body.y - 12);
        // Custom use
        this.skierType = skierType;
        this.speed = Phaser.Math.Between(minSpeed, maxSpeed);
        this.interval = Phaser.Math.Between(minInterval, maxInterval);
	}
    
    update() {
        if (this.body.y > this.scene.yeti.body.y + (window.innerHeight * window.devicePixelRatio / 2) + this.body.height) {
            this.destroy();
            return;
        }
        if (this.interval < 1) {
            this.speed = Phaser.Math.Between(minSpeed, maxSpeed);
            this.interval = Phaser.Math.Between(minInterval, maxInterval);
            if (this.skierType === 1) {
                if (this.speed < 120) {
                    this.anims.play('skier-2-front-pizza', true);
                } else {
                    this.anims.play('skier-2-front', true);
                }
            }
        } else {
            this.interval = this.interval -1;
        }
        this.setVelocity(0, this.speed);
        this.setDepth(this.body.y - 12);
    }
}

export default Skier;