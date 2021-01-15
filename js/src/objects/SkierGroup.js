import Phaser from 'phaser';
import Skier from './Skier';

const maxInterval = 100;

class SkierGroup extends Phaser.Physics.Arcade.Group {
    constructor (world, scene, maxSkiers) {
        super(world, scene, {maxSize: maxSkiers});
        // Add initial skier
        this.add(new Skier(scene));
        // Custom use
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