import Phaser from 'phaser';
import Skier from './Skier';

class SkierGroup extends Phaser.Physics.Arcade.Group {
    constructor (world, scene) {
        super(world, scene);

        this.add( new Skier(scene, 100, 100, 'skier1', 5));
    }

    update() {
        this.getChildren().forEach(skier => {
            skier.update();
        });
    }
}

export default SkierGroup;