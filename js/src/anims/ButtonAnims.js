function buttonAnims(anims) {
    anims.create({
        key: 'button-clear',
        frames: [{ key: 'button', frame: 0 }],
    });
    anims.create({
        key: 'button-hover',
        frames: [{ key: 'button', frame: 1 }],
    });
    anims.create({
        key: 'button-checked',
        frames: [{ key: 'button', frame: 2 }],
    });
    anims.create({
        key: 'button-pause',
        frames: [{ key: 'button', frame: 3 }],
    });
}

export default buttonAnims;