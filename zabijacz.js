

var Model = function(hp,speed,maxDmg,evasion,accuracy,armor,basic = ()=>{},ability = false, ability2 = false,ability3 = false, passive = false,name){
    this.hp = hp;
    this.turnCounter = 0;
    this.speed = speed;
    this.maxDmg = maxDmg;
    this.minDmg = maxDmg * (accuracy/100);
    this.evasion = evasion;
    this.accuracy = accuracy;
    this.armor = armor;
    this.basic = basic;
    this.ability = ability;
    this.passive = passive;
    this.name = name;
    this.ability2 = ability2;
    this.effects = [];
    this.cooldowns = [];
    //-------------------------------------------------------------------------------------
    if(ability){
        this.cooldowns.push([0,canUseAbility]);
    }
    if(ability2){
        this.cooldowns.push([0,canUseAbility2]);
    }
    if(ability3){
        this.cooldowns.push([0,canUseAbility3]);
    }
    if(this.ability){
        this.canUseAbility = true;
    }
    if(this.ability2){
        this.canUseAbility2 = true;
    }
    if(this.ability3){
        this.canUseAbility3 = true;
    }
    //-------------------------------------------------------------------------------------
}

var calculateDmg = function(attacker){
    return attacker.minDmg + Math.floor(Math.random()*(attacker.maxDmg - attacker.minDmg));
};

var giveDmg = function(attacker,defender){
    if(Math.random() * 100 > defender.evasion){
        defender.hp -= calculateDmg(attacker);
    }
};

var checkEffects = function(object){
    if(object.effects.length > 0){
        for(i=0;i>object.effects.length;i++){
            if(object.effects[i][0] === 0){
                object.effects[i][1]();
            }else{
                object.effects[i][0] --;
            }
        }
    }
};

var addEffects = function(object,effect,cooldown,change){
    var savedVar = effect;
    var newEffect = effect + effect * (change/100);
    effect = newEffect;
    object.effects.push([cooldown,() => effect = savedVar]);
};

var checkCooldowns = function(object){
    if(object.cooldowns.length > 0){
        for(i = 0;i > object.cooldowns.length; i++){
            if(object.cooldowns[i][0] === 0){
                object.cooldowns[i][1] = true;
            }else{
                object.cooldowns[i][0] --;
            }
        }
    }
};
var check = function(object){
    checkEffects(object);
    checkCooldowns(object);
}

var useBasic = function(object,target){
    check(object);
    object.basic.user = object;
    object.basic.target = target;
    object.basic();
};

var useAbility = function(){};
//--------------------------------------------------------------------------------------------
Model.prototype.AbilityModel = function(user,target,giveDmg1 = 0,addEffectsNeg = 0,addEffectsPos = 0,cooldown = 0){
    this.user = user;
    this.target = target;
    this.giveDmg = giveDmg;
    this.addEffectsNeg = addEffectsNeg;
    this.addEffectsPos = addEffectsPos;
    this.cooldown = cooldown;
    if (giveDmg1) {
        giveDmg(user,target);
    }
    if(addEffectsPos){
        for(i = 0; i> addEffectsPos.length;i++){
            addEffects(user,addEffectsPos[i][0],addEffectsPos[i][1],addEffectsPos[i][2]);
        }
    }
    if(addEffectsNeg){
        for(i = 0; i> addEffectsNeg.length;i++){
            addEffects(target,addEffectsNeg[i][0],addEffectsNeg[i][1],addEffectsNeg[i][2]);
        }
    }
    
}