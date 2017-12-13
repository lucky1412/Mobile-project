var global = require("GlobalFile")
cc.Class({
    extends: cc.Component,

    properties: {
        canvas:{
            default:null,
            type: cc.Node
        },
        btnBack:{
            default:null,
            type: cc.Button
        },
        btnTowers:{
            default:null,
            type: cc.Button
        },
        btnEnemies:{
            default:null,
            type: cc.Button
        },
        lblTitle:{
            default:null,
            type: cc.Label
        },
        lblNormal:{
            default:null,
            type: cc.Label
        },
        lblBought:{
            default:null,
            type: cc.Label
        },
    },

    // use this for initialization
    onLoad: function () {
        this.section = null;
        this.co = [
            [
                [-222,182],[-74,182],[74,182],[222,182],
                [-222,32],[-74,32],[74,32],[222,32]
            ],[
                [-222,-218],[-74,-218],[74,-218],[222,-218]
            ]
        ];
        this.btnEnemies.node.setOpacity(255);
        this.btnTowers.node.setOpacity(255);
        this.lblNormal.node.setOpacity(0);
        this.lblBought.node.setOpacity(0);
        this.view = false;
        this.boxes = [];
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
            this.goBackToBeginning();
        }
        
    },
    
    towerSectionPressed: function() {
        if(this.view == false){
            this.section = "Towers";
            this.setup();
            this.createSection();
        }
    },
    
    enemiesSectionPressed: function() {
        if(this.view == false){
            this.section = "Enemies";
            this.setup();
            this.createSection();
        }
    },
    
    setup: function() {
        this.view = true;
        this.btnEnemies.node.setOpacity(0);
        this.btnTowers.node.setOpacity(0);
        this.lblTitle.string = this.section;
        this.lblNormal.node.setOpacity(255);
        this.lblNormal.string = "Normal " + this.section + ":";
        
        if(this.section == "Towers"){
            this.lblBought.node.setOpacity(255);
        }
    },
    
    createSection: function() {
        var spotted = null;
        if(this.section == "Towers"){
            spotted = global.getAllSpottedTowers();
        }else{
            spotted = global.getAllSpottedEnemies();
        }
        var length = spotted.length;
        for(let i = 0 ; i < this.co.length ; i++){
            for(let j = 0 ; j < this.co[i].length ; j++){
                if(this.section == "Enemies"){
                    if(i === 1){
                        break;
                    }
                }
                var box = new cc.Node();
                box.parent = this.node;
                box.setPosition(this.co[i][j][0], this.co[i][j][1]);
                
                var fileName = null;
                if(i == 0){
                    var spotted1 = spotted.slice(0, 4);
                    length = spotted1.length;
                    if(j < length){
                        
                        var name = new cc.Node();
                        var label = name.addComponent(cc.Label);
                        name.parent = this.node;
                        name.setPosition(this.co[i][j][0], this.co[i][j][1] - 70);
                        
                        name.setColor(cc.Color.BLACK)
                        name.setScale(0.8,0.8);
                        this.boxes.push(name);
                        
                        if(spotted1[j][1] == true){
                            var type = spotted1[j][0];
                            if(this.section == "Towers"){
                                fileName = "box_" + type;
                            }else{
                                fileName = "box_enemy_" + type;
                            }
                            
                            label.string = spotted1[j][0];
                            
                        }else{
                            fileName = "box_unknown";
                            label.string = "Unknown";
                            name.setScale(0.7,0.7);
                        }
                    }else{
                        fileName = "box_empty";
                    }
                }else{
                    var spotted2 = spotted.slice(4, 8);
                    length = spotted2.length;
                    
                    if(j < length){
                        var name = new cc.Node();
                        var label = name.addComponent(cc.Label);
                        name.parent = this.node;
                        name.setPosition(this.co[i][j][0], this.co[i][j][1] - 70);

                        name.setColor(cc.Color.BLACK)
                        name.setScale(0.8,0.8);
                        this.boxes.push(name);

                        if(spotted2[j][1] == true){
                            var type = spotted2[j][0];
                            if(this.section == "Towers"){
                                fileName = "box_" + type;
                            }else{
                                fileName = "box_enemy_" + type;
                            }

                            label.string = spotted2[j][0];

                        }else{
                            fileName = "box_unknown";
                            label.string = "Unknown";
                            name.setScale(0.7,0.7);
                        }
                    }else{
                        fileName = "box_empty";
                    }
                }
                
                var sprite = box.addComponent(cc.Sprite);
                cc.loader.loadRes(fileName, function(err, data) {
                    this.spriteFrame = new cc.SpriteFrame(data);
                }.bind(sprite));
                
                this.boxes.push(box);
            }
        }
    },
    
    goBackToBeginning: function() {
        this.view = false;
        for(let i = 0 ; i < this.boxes.length ; i++){
            this.boxes[i].destroy();
        }
        this.btnEnemies.node.setOpacity(255);
        this.btnTowers.node.setOpacity(255);
        this.lblNormal.node.setOpacity(0);
        this.lblBought.node.setOpacity(0);
        this.boxes = [];
        this.section = null;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
