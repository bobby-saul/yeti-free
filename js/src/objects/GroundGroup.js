import Phaser from 'phaser'

const maxObjectDensity = 0.00005;
const minObjectDensity = 0.000005;
const objectTypes = [
	'rock1',
	'rock2',
	'ice',
	'tree',
	'snowman',
];

class GroundGroup extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, gameSize) {
        super(world, scene, { "immovable": true });

        const minObjects = gameSize[0] * gameSize[1] * minObjectDensity;
		const maxObjects = gameSize[0] * gameSize[1] * maxObjectDensity - minObjects;
		const numberOfObjects = Math.floor(Math.random() * maxObjects) + minObjects;

		for (let index = 0; index < numberOfObjects; index++) {
			const x = Math.floor(Math.random() * gameSize[0]) - (gameSize[0] / 2);
			const y = Math.floor(Math.random() * gameSize[1]) - (gameSize[1] / 2);
			const objectType = Math.floor(Math.random() * objectTypes.length);
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