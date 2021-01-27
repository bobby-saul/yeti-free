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
    anims.create({
        key: 'yeti-front-eat-1',
        frames: anims.generateFrameNumbers('yeti', {
            frames: [11, 12, 13, 14, 15, 16]
        }),
        frameRate: frameRate,
    });
    anims.create({
        key: 'yeti-front-eat-2',
        frames: anims.generateFrameNumbers('yeti', {
            frames: [17, 18, 19, 20, 21, 16]
        }),
        frameRate: frameRate,
    });
    anims.create({
        key: 'yeti-back-eat-1',
        frames: anims.generateFrameNumbers('yeti', {
            frames: [22, 23, 24, 25, 26, 27]
        }),
        frameRate: frameRate,
    });
    anims.create({
        key: 'yeti-back-eat-2',
        frames: anims.generateFrameNumbers('yeti', {
            frames: [28, 29, 30, 31, 32, 27]
        }),
        frameRate: frameRate,
    });
}

export default yetiAnims;