function skierAnims(anims) {
    // Skier 1 animations
    anims.create({
        key: 'skier-1-front',
        frames: [{ key: 'skier1', frame: 0 }],
    });
    anims.create({
        key: 'skier-1-side',
        frames: [{ key: 'skier1', frame: 1 }],
    });
    // Skier 2 animations
    anims.create({
        key: 'skier-2-front',
        frames: [{ key: 'skier2', frame: 0 }],
    });
    anims.create({
        key: 'skier-2-front-pizza',
        frames: [{ key: 'skier2', frame: 1 }],
    });
    anims.create({
        key: 'skier-2-side',
        frames: [{ key: 'skier2', frame: 2 }],
    });
}

export default skierAnims;