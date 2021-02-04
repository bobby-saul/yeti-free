import Phaser from 'phaser'

const objectTypes = [
	'rock1',
	'rock2',
	'ice',
	'tree',
	'snowman',
];
const constant = 15 / 1000000;
const coefficient = 5 / 1000000;

class GroundGroup extends Phaser.Physics.Arcade.Group {
    constructor(world, scene) {
        super(world, scene, { "immovable": true });
		const density = scene.gameSize[0] * scene.gameSize[1];
		const numberOfObjects = Math.ceil(density * (coefficient * this.scene.level + constant));

		for (let index = 0; index < numberOfObjects; index++) {
			const x = Phaser.Math.Between((-scene.gameSize[0] / 2), (scene.gameSize[0] / 2));
			const y = Phaser.Math.Between((-scene.gameSize[1] /2), (scene.gameSize[1] / 2));
			const objectType = Phaser.Math.Between(0, objectTypes.length - 1);
			const obj = this.create(x, y, objectTypes[objectType]);
			obj.setDepth(y);
			switch (objectType) {
				case 0:
				case 1:
					obj.body.height = 6;
					obj.body.offset.y = 10;
					break;
				case 2:
					obj.body.height = 14;
					obj.body.offset.y = 10;
					obj.setDepth(y - 8);
					break;
				case 3:
				case 4:
					obj.body.height = 6;
					obj.body.offset.y = 26;
				default:
					break;
			}
		}
    }
}

export default GroundGroup;