

console.log('in client.js');
let regexp = /^(\b0\.0*)*?[1-9]\d*(\.\d+)?[\+\*\/\-](\b0\.0*)*?[1-9]\d*(\.\d+)?$/;

$(document).ready(onReady);

let mathInputString='';

function onReady(){
    console.log('onReady');
//eventhandlers
    $('#calcForm').on('submit',onEqualBtn);
    $('.fourbyfour').on('click',on4by4Click);
    $('#clearBtn').on('click',onClearBtn);
    
}

function on4by4Click(evt){
    evt.preventDefault();
    //console.log('on4by4Click');
    mathInputString+=$(this).text();
    render();
}
function onClearBtn(evt){
    evt.preventDefault();
    console.log('in onClearBtn');
    mathInputString='';
    $('#mathInput').val('');
}
function onEqualBtn(evt){
    evt.preventDefault();
    console.log('in onEqualBtn');
    let matheqn = {
        matheqnstring: mathInputString
    };
    $.ajax({
        url:'/mathEqns/Result',
        method:'GET',
        data: matheqn
    })
    .then((response)=>{
        console.log('in /mathEqns POST',response);
        if(response === 'Created'){
            console.log('Created worked');
        }
    })
    .catch((err)=>{
        console.log('en /mathEqns err',err);
    });
}
function render(){
    $('#mathInput').val(mathInputString);
}