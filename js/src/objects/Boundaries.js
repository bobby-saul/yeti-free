import Phaser from 'phaser'

class Boundaries extends Phaser.Physics.Arcade.StaticGroup {
    constructor(world, scene, gameSize) {
        super(world, scene);

        const top = this.create(0, gameSize[1] / -2, 'line');
		top.setScale(gameSize[0] / 4, 1).refreshBody().setDepth(-gameSize[0]).setAlpha(0.5);
		const bottom = this.create(0, gameSize[1] / 2, 'line');
		bottom.setScale(gameSize[0] / 4, 1).refreshBody().setDepth(-gameSize[0]).setAlpha(0.5);
		const left = this.create(gameSize[0] / -2, 0, 'line');
		left.setScale(1, gameSize[1] / 4).refreshBody().setDepth(-gameSize[0]).setAlpha(0.5);
		const right = this.create(gameSize[0] / 2, 0, 'line');
		right.setScale(1, gameSize[1] / 4).refreshBody().setDepth(-gameSize[0]).setAlpha(0.5);
    }
}

export default Boundaries;