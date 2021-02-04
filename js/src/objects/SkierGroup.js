import Phaser from 'phaser';
import Skier from './Skier';

const maxInterval = 100;
const baseWidth = 1200;
const constant = 6.5;
const coefficient = -0.5;

class SkierGroup extends Phaser.Physics.Arcade.Group {
    constructor (world, scene) {
        super(world, scene);
        // Add initial skier
        this.add(new Skier(scene));
        // Custom use
        let density = window.innerWidth / baseWidth;
        this.maxSize = Math.ceil(density * (coefficient * this.scene.level + constant));
        this.interval = Phaser.Math.Between(0, maxInterval);
    }

    update() {
        this.getChildren().forEach(skier => {
            skier.update();
        });
        if (this.getTotalFree() > 0) {
            if (this.interval < 1) {
                this.interval = Phaser.Math.Between(0, maxInterval);
                this.add(new Skier(this.scene));
            } else {
                this.interval = this.interval - 1;
            }
        }
    }
}

export default SkierGroup;