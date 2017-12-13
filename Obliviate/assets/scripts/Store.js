var global = require("GlobalFile")
cc.Class({
    extends: cc.Component,

    properties: {
        canvas:{
            default:null,
            type: cc.Node
        },
        btnTowers:{
            default:null,
            type: cc.Button
        },
        btnLevels:{
            default:null,
            type: cc.Button
        },
        btnAds:{
            default:null,
            type: cc.Button
        },
        btnSpeed:{
            default:null,
            type: cc.Button
        },
        btnBack:{
            default:null,
            type: cc.Button
        },
        lblTitle:{
            default:null,
            type: cc.Label
        },
        lblWorld:{
            default:null,
            type: cc.Label
        },
        section:{
            default:null,
            type: cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {
        this.pressed = "";
        this.view = false;
        this.section.setOpacity(0);
        
        this.co = [
            [
                [-140,140],[0,140],[140,140],[-140,-30],[0,-30],[140,-30]
            ],[
                [0,80.5],[0,-62.5],[0,-205.5]
            ]
        ];
        
        this.boxes = [];
        
        this.newTower = ["veggy", "stun", "poison", "death"];
    },
    
    btnClicked: function(event, customEventData) {
        if(this.view == false){
            this.pressed = customEventData;
            if(this.pressed == "towers" || this.pressed == "levels"){
                this.setup();
                this.createSection();
            }
        }
    },
    
    setup: function() {
        if(this.view == false){
            this.view = true;
            this.btnTowers.node.setOpacity(0);
            this.btnLevels.node.setOpacity(0);
            this.btnAds.node.setOpacity(0);
            this.btnSpeed.node.setOpacity(0);
            this.section.setOpacity(255);
            this.lblWorld.node.setOpacity(0);
        }else{
            this.view = false;
            this.btnTowers.node.setOpacity(255);
            this.btnLevels.node.setOpacity(255);
            this.btnAds.node.setOpacity(255);
            this.btnSpeed.node.setOpacity(255);
            this.section.setOpacity(0);
            for(let i = 0 ; i < this.boxes.length ; i++){
                this.boxes[i].destroy();
            }
            this.boxes = [];
        }
        
    },
    
    backPressed: function() {
        if(this.view == false){
            this.canvas.runAction(cc.sequence( 
                cc.fadeOut(1.0), 
                cc.callFunc(function () {
                    cc.director.loadScene('MainMenu');
                })
            ));
        }else{
            this.setup();
        }
    },
    
    createSection: function() {
        switch(this.pressed){
            case "towers":
                this.lblTitle.string = "Towers";
                for(let i = 0 ; i < this.co[0].length ; i++){
                    var box = new cc.Node();
                    var name = new cc.Node();
                    var label = name.addComponent(cc.Label);
                    box.parent = this.node;
                    name.parent = this.node;
                    box.setPosition(this.co[0][i][0], this.co[0][i][1]);
                    name.setPosition(this.co[0][i][0], this.co[0][i][1] - 80);
                    
                    if(i < this.newTower.length){
                        var fileName = "box_" + this.newTower[i];
                        
                        box.on('touchend', function(event){
                            this.buyTurret(this.newTower[i],i);
                        }, this);
                        
                    }else{
                        var fileName = "box_empty";
                    }
                    
                    var sprite = box.addComponent(cc.Sprite);
                    cc.loader.loadRes(fileName, function(err, data) {
                        this.spriteFrame = new cc.SpriteFrame(data);
                    }.bind(sprite));
                    
                    label.string = this.newTower[i];
                    name.setColor(cc.Color.BLACK)
                    name.setScale(0.8,0.8);
                    
                    box.setContentSize(cc.size(120, 120));
                    this.boxes.push(box);
                    this.boxes.push(name);
                    
                    var money = new cc.Node();
                    money.parent = box;
                    
                    var fileName = "";
                    var turrets = global.getAllBoughtTowers();
                    if(i < turrets.length){
                        if(turrets[i][0] == this.newTower[i] && turrets[i][1] == true){
                            fileName = "store_sold";
                        }else{
                            fileName = "store_buy";
                        }
                    }
                    
                    var sprite = money.addComponent(cc.Sprite);
                    cc.loader.loadRes(fileName, function(err, data) {
                        this.spriteFrame = new cc.SpriteFrame(data);
                    }.bind(sprite));
                    
                    money.setPosition(cc.p(40,-40));
                    
                    this.boxes.push(money);
                }
                break;
            case "levels":
                this.lblTitle.string = "Levels";
                this.lblWorld.node.setOpacity(255);
                
                for(let i = 0 ; i < this.co[1].length ; i++){
                    var box = new cc.Node();
                    box.parent = this.node;
                    box.setPosition(this.co[1][i][0], this.co[1][i][1]);
                    
                    var fileName = "store_" + (i + 28);
                    var sprite = box.addComponent(cc.Sprite);
                    cc.loader.loadRes(fileName, function(err, data) {
                        this.spriteFrame = new cc.SpriteFrame(data);
                    }.bind(sprite));
                    
                    this.boxes.push(box);
                    
                    box.on('touchend', function(event){
                        this.buyLevel(i + 28,i);
                    }, this);
                    
                    var money = new cc.Node();
                    money.parent = box;
                    
                    var fileName = "";
                    var levels = global.getAllBoughtLevels();
                    if(i < levels.length){
                        var level = i + 28;
                        if(levels[i][0] == level && levels[i][1] == true){
                            fileName = "store_sold";
                        }else{
                            fileName = "store_buy";
                        }
                    }
                    
                    var sprite = money.addComponent(cc.Sprite);
                    cc.loader.loadRes(fileName, function(err, data) {
                        this.spriteFrame = new cc.SpriteFrame(data);
                    }.bind(sprite));
                    
                    money.setPosition(cc.p(140,-40));
                    
                    this.boxes.push(money);
                }
                
                break;
            case "ads":
                this.lblTitle.string = "No ads";
                break;
            case "speed":
                this.lblTitle.string = "Speed up button";
                break;
        }  
    },
    
    buyTurret: function(type, i){
        var turrets = global.getAllBoughtTowers();
        for(let i = 0 ; i < turrets.length ; i++){
            if(turrets[i][0] == type && turrets[i][1] == true){
                return;
            }
        }
        // 0 1 2 3 4 5 6
        // 2 5 8 11
        var correctPlace = ((i * 2) + 2 + i);
        var money = this.boxes[correctPlace];
        var sprite = money.getComponent(cc.Sprite);
        cc.loader.loadRes("store_sold", function(err, data) {
            this.spriteFrame = new cc.SpriteFrame(data);
        }.bind(sprite));
        money.setPosition(cc.p(20,-40));
        
        global.setTowerBought(type);
        global.saveGame();
    },
    
    buyLevel: function(level, i){
        var levels = global.getAllBoughtLevels();
        for(let i = 0 ; i < levels.length ; i++){
            if(levels[i][0] == level && levels[i][1] == true){
                return;
            }
        }
        // 0 1 2 3 4 5 6
        // 1 3 5 7 9
        var correctPlace = (i * 2) + 1;
        var money = this.boxes[correctPlace];
        var sprite = money.getComponent(cc.Sprite);
        cc.loader.loadRes("store_sold", function(err, data) {
            this.spriteFrame = new cc.SpriteFrame(data);
        }.bind(sprite));
        money.setPosition(cc.p(140,-40));
        
        global.setLevelBought(level);
        global.saveGame();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
