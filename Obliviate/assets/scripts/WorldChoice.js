var global = require("GlobalFile")
cc.Class({
    extends: cc.Component,

    properties: {
        canvas:{
            default:null,
            type: cc.Node
        },
        back:{
            default:null,
            type: cc.Button
        },
        notUnlockedYet:{
            default:null,
            type: cc.Label
        },
        pageView: cc.PageView,
    },

    // use this for initialization
    onLoad: function () {
        this.pageView.node.on('touch-up', this.callback, this);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    
    backPressed : function(){
        this.canvas.runAction(cc.sequence( 
            cc.fadeOut(1.0), 
            cc.callFunc(function () {
                cc.director.loadScene('PackChoice');
            })
        ));
    },
    
    callback : function(event) {
        var pageNumber = this.pageView.getCurrentPageIndex();
        switch(pageNumber){
            case 0:
                this.canvas.runAction(cc.sequence( 
                    cc.fadeOut(1.0), 
                    cc.callFunc(function () {
                        cc.director.loadScene('TutorialLevel');
                    })
                ));
                break;
            case 1:
                if(global.getWorld1UnL() == false){
                    this.notUnlockedYet.node.runAction(cc.sequence(cc.fadeIn(0.5), new cc.DelayTime(2), cc.fadeOut(2.0)));
                }else{
                    global.setWorldPressed(1);
                    this.canvas.runAction(cc.sequence( 
                        cc.fadeOut(1.0), 
                        cc.callFunc(function () {
                            cc.director.loadScene('LevelChoice');
                        })
                    ));
                }
                break;
            case 2:
                if(global.getWorld2UnL() == false){
                    this.notUnlockedYet.node.runAction(cc.sequence(cc.fadeIn(0.5), new cc.DelayTime(2), cc.fadeOut(2.0)));
                }else{
                    global.setWorldPressed(2);
                }
                break;
            case 3:
                if(global.getWorld3UnL() == false){
                    this.notUnlockedYet.node.runAction(cc.sequence(cc.fadeIn(0.5), new cc.DelayTime(2), cc.fadeOut(2.0)));
                }else{
                    global.setWorldPressed(3);
                }
                break;
        }
    },
});
