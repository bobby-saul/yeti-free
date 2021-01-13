const frameRate = 16;

function yetiAnims (anims) {
    anims.create({
        key: 'yeti-front-idle',
        frames: [{ key: 'yeti', frame: 0 }],
        frameRate: frameRate
    });
    anims.create({
        key: 'yeti-front-walk',
        frames: anims.generateFrameNumbers('yeti', {
            frames: [1, 2, 1, 3]
        }),
        frameRate: frameRate,
        repeat: -1
    });
    anims.create({
        key: 'yeti-side-idle',
        frames: [{ key: 'yeti', frame: 4 }],
        frameRate: frameRate
    });
    anims.create({
        key: 'yeti-side-walk',
        frames: anims.generateFrameNumbers('yeti', {
            frames: [4, 5, 4, 6]
        }),
        frameRate: frameRate,
        repeat: -1
    });
    anims.create({
        key: 'yeti-back-idle',
        frames: [{ key: 'yeti', frame: 7 }],
        frameRate: frameRate
    });
    anims.create({
        key: 'yeti-back-walk',
        frames: anims.generateFrameNumbers('yeti', {
            frames: [8, 9, 8, 10]
        }),
        frameRate: frameRate,
        repeat: -1
    });
}

export default yetiAnims;