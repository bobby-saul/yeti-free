import Phaser from 'phaser';

const minInterval = 10;
const maxInterval = 100;
const skierTypes = [
    'skier1',
    'skier2',
];
const constant = 38;
const coefficient = 12;
const range = 1.5;

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
        this.body.offset.y = 20;
        this.setDepth(this.body.y - 12);
        // Custom use
        this.minSpeed = coefficient * this.scene.level + constant;
        this.maxSpeed = this.minSpeed * range;
        this.skierType = skierType;
        this.speed = Phaser.Math.Between(this.minSpeed, this.maxSpeed);
        this.speedInterval = Phaser.Math.Between(minInterval, maxInterval);
        this.direction = Phaser.Math.Between(-1, 1);
        this.directionInterval = Phaser.Math.Between(minInterval, maxInterval);
        this.updateDisplay();
    }
    
    updateDisplay() {
        // Left
        if (this.direction === -1) {
            if (this.skierType === 0) {
                this.anims.play('skier-1-side', true);
            } else {
                this.anims.play('skier-2-side', true);
            }
            this.scaleX = -1;
            this.body.offset.x = 26;
        }
        // Right
        else if (this.direction === 1) {
            if (this.skierType === 0) {
                this.anims.play('skier-1-side', true);
            } else {
                this.anims.play('skier-2-side', true);
            }
            this.scaleX = 1;
            this.body.offset.x = 6;
        }
        // Center
        else {
            if (this.skierType === 1) {
                if (this.speed < 120) {
                    this.anims.play('skier-2-front-pizza', true);
                } else {
                    this.anims.play('skier-2-front', true);
                }
            } else {
                this.anims.play('skier-1-front', true);
            }
            this.scaleX = 1;
            this.body.offset.x = 6;
        }
    }

    collision () {
        if (this.direction === 0) {
            if (Math.random() > .5) {
                this.direction = -1;
            } else {
                this.direction = 1;
            }
            this.updateDisplay();
        }
    }
    
    update() {
        // If skier off screen
        if (this.body.y > this.scene.yeti.body.y + (window.innerHeight * window.devicePixelRatio / 2) + this.body.height) {
            this.destroy();
            return;
        }
        // Change speed
        if (this.speedInterval < 1) {
            this.speed = Phaser.Math.Between(this.minSpeed, this.maxSpeed);
            this.speedInterval = Phaser.Math.Between(minInterval, maxInterval);
            this.updateDisplay();
        } else {
            this.speedInterval = this.speedInterval -1;
        }
        // Change direction
        if (this.directionInterval < 1) {
            this.direction = Phaser.Math.Between(-1, 1);
            this.directionInterval = Phaser.Math.Between(minInterval, maxInterval);
            this.updateDisplay();
        } else {
            this.directionInterval = this.directionInterval - 1;
        }
        // Update velocity
        var directionalSpeed = Math.sqrt(Math.pow(this.speed, 2) / 2);
        if (this.direction === -1) {
            this.setVelocity(-directionalSpeed, directionalSpeed);
        } else if (this.direction === 1) {
            this.setVelocity(directionalSpeed, directionalSpeed);
        } else {
            this.setVelocity(0, this.speed);
        }
        this.setDepth(this.body.y - 12);
    }
}

export default Skier;
