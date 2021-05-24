import Phaser, { Game } from 'phaser';

window.onload = function() {
    const config = {
        type: Phaser.AUTO,
        width: 1075,
        height: 767,
        parent: 'wrap_canvas',
        scene: {
            preload: preload,
            create: create
        }
    };

    const game = new Phaser.Game(config);
    const CountDogs = 5;
    let counterClick = 0;
    const positionsDogs = [
        { x: 550, y: 330, scale: .7, flipX: true },
        { x: 370, y: 340, scale: .9 },
        { x: 700, y: 370, scale: .6 },
        { x: 300, y: 570, flipX: true },
        { x: 730, y: 570 }
    ];
    const circleAnimation = [
        'circle_1',
        'circle_2',
        'circle_3',
        'circle_4',
        'circle_5',
        'circle_6',
        'circle_7',
        'circle_8'
    ]

    function preload() {
        this.load.image('background', './assets/back_five_dogs.jpg');
        this.load.image('buttonPlay', './assets/btn.png');
        this.load.image('char', './assets/char.png');
        this.load.image('logo', './assets/logo.png');

        for (let i = 0; i < CountDogs; i++) {
            this.load.image('dog' + i, './assets/doggy.png');
        }
        for (let i = 0; i < circleAnimation.length; i++) {
            this.load.image(circleAnimation[i], `./assets/${circleAnimation[i]}.png`);
        }
        this.load.image('dogText', './assets/doggy.png')
    }

    function create() {
        const windowWidth = window.innerWidth;
        const bgrd = this.add.image(0, 0, 'background');
        bgrd.setOrigin(0, 0);

        this.anims.create({
            key: 'circle_around',
            frames: [
                { key: 'circle_1' },
                { key: 'circle_2' },
                { key: 'circle_3' },
                { key: 'circle_4' },
                { key: 'circle_5' },
                { key: 'circle_6' },
                { key: 'circle_7' },
                { key: 'circle_8', duration: 40 }
            ],
            frameRate: 20,
            repeat: 0
        });
        const animationAround = (x, y) => {
            this.add.sprite(x, y, 'circle_1').play('circle_around');
        }

        for (let i = 0; i < CountDogs; i++) {
            let dog = this.add.image(positionsDogs[i].x, positionsDogs[i].y, 'dog' + i)
                .setInteractive()
                .on('pointerdown', function(pointer) {
                    animationAround(positionsDogs[i].x, positionsDogs[i].y);
                    this.disableInteractive();
                    counterClick += 1;
                    if (counterClick === CountDogs) {
                        curtain()
                    }
                })

            let scaleImg = positionsDogs[i].scale;
            let flipXImg = positionsDogs[i].flipX;
            if (scaleImg) dog.setScale(scaleImg);
            if (flipXImg) dog.setFlipX(flipXImg);
        }
        const startBlackout = this.add.rectangle((game.config.width / 2), (game.config.height / 2), game.config.width, game.config.height, 0x000000, 0.9);
        startBlackout.setDepth(1);
        startBlackout.setInteractive()

        const style = { font: "Bold 65px Arial", fill: "#fff", align: "left" };
        const text = this.add.text((game.config.width / 2), (game.config.height / 2), "5 Hidden dogs \nCan you spot them?", style);
        text.setOrigin(.5, .5);
        text.setDepth(1);

        const dogT = this.add.image(800, 320, 'dogText')
        dogT.setDepth(1);
        dogT.setFlipX(true);

        let timeline = this.tweens.timeline()
        timeline.add({
            targets: [startBlackout, text, dogT],
            alpha: 0,
            offset: 3000
        });
        timeline.play();

        const curtain = () => {
            const char = this.add.image(-50, game.config.height, 'char');
            char.setOrigin(0, 1);
            char.setDepth(1);
            char.setScale(.8);
            char.alpha = 0;

            const logo = this.add.image((game.config.width / 2), (game.config.height / 5), 'logo');
            logo.setDepth(1);
            logo.alpha = 0;

            const styleTextGradient = { font: "Bold 75px Arial", fill: "#fff", align: "center" };
            const textGradient = this.add.text((game.config.width / 2), (game.config.height / 1.8), "Great Job", styleTextGradient);
            textGradient.setOrigin(.5, .5);
            textGradient.setDepth(1);
            const grd = textGradient.context.createLinearGradient(0, 0, 0, 60);
            grd.addColorStop(0, '#EBDC8E');
            grd.addColorStop(1, '#D9AA50');
            textGradient.setFill(grd);
            textGradient.alpha = 0;

            const styleEndText = { font: "Bold 45px Arial", fill: "#fff", align: "center" };
            const textEnd = this.add.text((game.config.width / 2), (game.config.height / 1.5), "Can you solve \nevery mistery?", styleEndText);
            textEnd.setOrigin(.5, .5);
            textEnd.setDepth(1);
            textEnd.alpha = 0;

            if (windowWidth < 900) {
                char.setPosition(game.config.width / 2, 590)
                    .setOrigin(.5, 1)
                    .setFlipX(true)
                    .setScale(.4);
            }

            timeline = this.tweens.timeline();
            timeline.add({
                targets: [startBlackout, char, logo, textEnd, textGradient],
                alpha: 1
            });
            timeline.play();
        };

        const buttonPlay = this.add.image((game.config.width / 2), (game.config.height / 1.2), 'buttonPlay');
        buttonPlay.setInteractive()
        buttonPlay.setDepth(2);
        buttonPlay.on('pointerdown', function(pointer) {
            window.open('https://www.g5e.com/', '_blank');
        })

        const styleTextBtn = {
            font: "Bold 45px Arial",
            fill: "#FCF2ACFF",
            align: "center",
            shadow: {
                offsetX: 2,
                offsetY: 1,
                color: '#000',
                blur: 3,
                stroke: true,
                fill: true
            },
        };

        const textButton = this.add.text((game.config.width / 2), (game.config.height / 1.2), "Play Now", styleTextBtn);
        textButton.setOrigin(.5, .5);
        textButton.setDepth(2);

        if (windowWidth < 700) {
            text.setFontSize(40);
            dogT.setScale(.6);
            dogT.setPosition(690, 340);
        }
    }
}