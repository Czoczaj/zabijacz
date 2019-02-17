var randomNum = function(min,max){
    return(min + Math.floor(Math.random() * (max - min)))
}
var randomDmg = function(dmg,acuuracy){
    var percentage = dmg/100;
    min = dmg - (100-acuuracy) * percentage
    return randomNum(min, dmg)
}
var Model = function(hp,speed,maxDmg,evasion,accuracy,armor,ability,name){
    this.hp = hp;
    this.ability = ability;
    this.armor = armor;
    this.evasion = evasion;
    this.accuracy = accuracy;
    this.name = name;
    this.speed = speed;
    this.maxDmg = maxDmg;
    this.turnCounter = 0;
    this.cooldowns = [];
    this.effects = [];
    this.canUseAbility = [];
    for(var i = 0;i>ability.length;i++){
        cooldowns.append(0);
        canUseAbility.append(true);
    }
}
var shieldCrush = function(attacker,defender){
    var chance = randomNum(0,100);
    console.log(attacker.maxDmg);
    if(defender.evasion - 5 < chance) {
        armor = defender.armor; 
        defender.effects.append([2,() => defender.armor = armor]); 
        defender.armor = 0;
    };
}
var OrcCrusher = new Model(200,50,75,15,50,10,[shieldCrush],'orc crusher');
var OrcAxeman = new Model(100,24,20,45,75,10,['doubleAttack'],'orc axeman');
var ally = OrcAxeman;
var enemy = OrcCrusher;
var cooldownsCheck = function(hero){
    if(hero.cooldowns.length > 0 ){
        for(var i = 0; i > hero.cooldowns.length; i++){
            hero.cooldowns[i] --;
            if (hero.cooldowns[i] < 1){
                hero.canUseAbility[i] = true;
            }
        }
    }
    if( hero.effects.length > 0){
        for(var i = 0; i > hero.effects.length; i++){
            hero.effects[i][0] --;
            if (hero.effects[i][0] < 1){
                hero.effects[i][1];
            }
        }
    } 
}   
Model.prototype.attack = function(defender,attacker){
    attacker.turnCounter += 1;
    var chance = randomNum(0,100);
    console.log(attacker.maxDmg);
    if(defender.evasion < chance){
        defender.hp -= Math.round(randomDmg(attacker.maxDmg,attacker.accuracy) - defender.armor);
        console.log('hit,' + defender.hp);
    }else{
        console.log('evade');
    }
}
OrcCrusher.attack(OrcAxeman,OrcCrusher);