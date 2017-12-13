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
                cc.director.loadScene('MainMenu');
            })
        ));
    },
    
    callback : function(event) {
        var pageNumber = this.pageView.getCurrentPageIndex();
        if(pageNumber == 0){
            this.canvas.runAction(cc.sequence( 
            cc.fadeOut(1.0), 
            cc.callFunc(function () {
                cc.director.loadScene('WorldChoice');
            })
        ));
        }
    }
});
