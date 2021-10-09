"use strict";
//TODO: Manual override, condition tracking
let charQueue = [];

class Character{
    constructor(name, hp, init){
        this.name = name;
        this.hp = hp;
        this.init = init;
        this.charBox = this.makeCharBox();
    }
    makeCharBox(){
        let charBox = document.createElement('div');
        charBox.insertAdjacentHTML('beforeend', '<strong>'+this.name+'</strong><br>\
        <strong>HP: </strong>'+this.hp+'<br>\
        <strong>Initiative: </strong>'+this.init+'<br>');
        let charButton = document.createElement('button');
        charButton.type = 'button';
        charButton.append('Remove');
        charBox.append(charButton);
        charBox.style.backgroundColor = 'hsl('+Math.floor(Math.random()*361)+', 39%, 69%)';
        charBox.className = 'char-box';
        let boundRemove = this.removeCharBox.bind(this);
        charButton.addEventListener('click', boundRemove);
        return charBox;
    }
    removeCharBox(){
        let selfIndex = charQueue.indexOf(this);
        this.charBox.remove();
        charQueue.splice(selfIndex, 1)
    }
}

function addCharToQueue(char){
    let charBox = char.charBox;
    for(let i = 0; i <charQueue.length; i++){
        if(charQueue[i].init<=char.init){
            document.getElementById('char-list').childNodes[i].before(charBox);
            charQueue.splice(i, 0, char);
            return;
        }
    }
    document.getElementById('char-list').append(charBox);
    charQueue.push(char);
}

function addChar(){
    let charName = document.getElementById('char-name').value;
    let charHP = parseInt(document.getElementById('char-hp').value);
    let charInit = parseInt(document.getElementById('char-init').value);
    if(!isNaN(charHP) && !isNaN(charInit)){
        document.getElementById('char-name').value = '';
        document.getElementById('char-hp').value = '';
        document.getElementById('char-init').value = '';
        addCharToQueue(new Character(charName, charHP, charInit));
    }
    else{
        alert('HP or initiative cannot be empty');
    }

}

function checkIntKey(event){
    if(event.key=='Enter'){
        addChar()
    }
    return (event.key >= '0' && event.key <= '9') || event.key=='Tab' || event.key == 'Backspace' || event.key == 'Enter';
}
document.getElementById('char-hp').onkeydown = checkIntKey;
document.getElementById('char-init').onkeydown = checkIntKey;
document.getElementById('char-name').addEventListener('keydown', event => {if(event.key=='Enter')addChar();});
document.getElementById('add-char-button').addEventListener('click', addChar);
