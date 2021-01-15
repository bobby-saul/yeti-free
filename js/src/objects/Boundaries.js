import Phaser from 'phaser'

class Boundaries extends Phaser.Physics.Arcade.StaticGroup {
    constructor(world, scene) {
        super(world, scene);

        const top = this.create(0, scene.gameSize[1] / -2, 'line');
		top.setScale(scene.gameSize[0] / 4, 1).refreshBody().setDepth(-scene.gameSize[0]).setAlpha(0.5);
		const bottom = this.create(0, scene.gameSize[1] / 2, 'line');
		bottom.setScale(scene.gameSize[0] / 4, 1).refreshBody().setDepth(-scene.gameSize[0]).setAlpha(0.5);
		const left = this.create(scene.gameSize[0] / -2, 0, 'line');
		left.setScale(1, scene.gameSize[1] / 4).refreshBody().setDepth(-scene.gameSize[0]).setAlpha(0.5);
		const right = this.create(scene.gameSize[0] / 2, 0, 'line');
		right.setScale(1, scene.gameSize[1] / 4).refreshBody().setDepth(-scene.gameSize[0]).setAlpha(0.5);
    }
}

export default Boundaries;