
//console.log('in client.js');
let regexp = /^(\b0\.0*)*?[1-9]\d*(\.\d+)?[\+\*\/\-](\b0\.0*)*?[1-9]\d*(\.\d+)?$/;

$(document).ready(onReady);

let mathInputString='';
let clientResultsAndEqns=[];

function onReady(){
    //console.log('onReady');
//eventhandlers
    $('#calcForm').on('submit',onEqualBtn);
    $('.fourbyfour').on('click',on4by4Click);
    $('#clearBtn').on('click',onClearBtn);
    render();
    renderResult();
}

function on4by4Click(evt){
    evt.preventDefault();
    //console.log('on4by4Click');
    mathInputString+=$(this).text();
    render();
}
function onClearBtn(evt){
    evt.preventDefault();
    //console.log('in onClearBtn');
    mathInputString='';
    $('#mathInput').val('');
}
function onEqualBtn(evt){
    evt.preventDefault();
    //console.log('in onEqualBtn');
    let matheqn = {
        matheqnstring: mathInputString
    };
    //console.log('mathstring',matheqn.matheqnstring);
    //send the equation to the server
    $.ajax({
        url:'/mathEqns',
        method:'POST',
        data: matheqn
    })
    .then((response)=>{
        //console.log('in /mathEqns GET',response);
        if(response === 'Created'){
            //console.log('Created worked');
        }
    })
    .catch((err)=>{
        console.log('en /mathEqns err',err);
    });
    //get the result from the server
    $.ajax({
        url:'/mathEqns/Result',
        method: 'GET'
    })
    .then((response)=>{
        //console.log('response is',response);
        clientResultsAndEqns = response;
        renderResult();
    })
    .catch((err)=>{
        console.log('/mathEqns/Result GET err',err);
    });
    
}
function render(){
    $('#mathInput').val(mathInputString);
}
function renderResult(){
    $('#resultH2').text(clientResultsAndEqns[clientResultsAndEqns.length-1].result);
    $('#eqnsUL').empty();
    for(let reslts of clientResultsAndEqns){
        $('#eqnsUL').append(`
        <li>${reslts.matheqnstring}</li>
        `)
    }

}