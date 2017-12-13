var global = require('GlobalFile')
cc.Class({
    extends: cc.Component,

    properties: {
        canvas:{
            default: null,
            type: cc.Node
        },
        toggles:{
            default: null,
            type: cc.ToggleGroup
        },
        slider:{
            default: null,
            type: cc.Slider
        },
        btnBack:{
            default: null,
            type: cc.Button
        },
        ipsi:{
            default: null,
            url: cc.AudioClip
        },
        arcade:{
            default: null,
            url: cc.AudioClip
        },
        platformer:{
            default: null,
            url: cc.AudioClip
        },
        star:{
            default: null,
            url: cc.AudioClip
        },
    },

    // use this for initialization
    onLoad: function () {

    },
    
    backPressed: function() {
        this.canvas.runAction(cc.sequence( 
            cc.fadeOut(1.0), 
            cc.callFunc(function () {
                cc.director.loadScene('MainMenu');
            })
        ));
    },
    
    TogglePressed: function(event, customEventData) {
        switch(customEventData){
            case "ipsi":
                cc.audioEngine.end();
                cc.audioEngine.playMusic(this.ipsi, true, 0.3);
                break;
            case "arcade":
                cc.audioEngine.end();
                cc.audioEngine.playMusic(this.arcade, true, 0.2);
                break;
            case "platformer":
                cc.audioEngine.end();
                cc.audioEngine.playMusic(this.platformer, true, 0.3);
                break;
            case "star":
                cc.audioEngine.end();
                cc.audioEngine.playMusic(this.star, true, 0.3);
                break;
        }
    },
    
    changeVolume: function() {
        var volume = this.slider.progress;
        volume = volume.toFixed(1);
        cc.log(volume);
        cc.audioEngine.setMusicVolume(volume);
    },
    
    loadGame1: function() {
        global.loadGame1();
    },
    
    loadGame2: function() {
        global.loadGame2();
    },
    
    loadGame: function() {
        global.loadGame();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
