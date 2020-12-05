# Yeti Free

A browser game built on Phaser.io that resembles SkiFree except instead of the skiers, you play as the monster (yeti).

# Game Play

Catch and eat skiers by moving around the mountain slopes to gain points. Avoid harmful objects to lose health. See how many points you can rack up!

## Developer Notes

For developing run ```npm i``` to install the proper node packages. The scripts to build in the development mode is ```npm run dev``` and to watch is ```npm run watch```. To build in production mode run ```npm run prod```. This project is currently using the latest long term support version of node (14.15.1).

This project contains the index.html file to load the js built by webpack from the source javascript located in js/src/index.js and placed in js/dist/index.js. The webpack build uses the babel loader for more browser support.