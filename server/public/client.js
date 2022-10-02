
//console.log('in client.js');
let regexp = /^(\b0\.0*)*?[1-9]\d*(\.\d+)?[\+\*\/\-](\b0\.0*)*?[1-9]\d*(\.\d+)?$/;

$(document).ready(onReady);

let mathInputString='';
let clientResultsAndEqns=[];

function onReady(){
    //console.log('onReady');
    $("input").focusout(function(e) { 
        if(regexp.test($(this).val())==false) { 
            //$(this).css('border', 'solid 2px red'); 
            e.target.setCustomValidity('');
            if(!e.target.validity.valid){
                e.target.setCustomValidity("Examples:8+2 or 5.6/4.7 or 0.1-1 or 3*5.2");
            }
        }
        else {
              
            // If it is not blank.
            //$(this).css('border', 'solid 2px green'); 
            e.target.setCustomValidity('');   
        }    
    }) .trigger("focusout");
    
//eventhandlers
    $('#calcForm').on('submit',onEqualBtn);
    $('.fourbyfour').on('click',on4by4Click);
    $('#clearBtn').on('click',onClearBtn);
    //runthisOnload();
}
function runthisOnload(){
    var elements = document.getElementsByTagName('#mathInput');
    
        elements.oninvalid = function(e) {
            e.target.setCustomValidity("");
            if (!e.target.validity.valid) {
                e.target.setCustomValidity("sdfasdfasdfasd");
            }
        };
        elements.oninput = function(e) {
            e.target.setCustomValidity("");
        };
    
}
function on4by4Click(evt){
    evt.preventDefault();
    //console.log('on4by4Click');
    mathInputString+=$(this).text();
    render();
}
function testOfString(stringToTest){
    
    console.log(stringToTest);
    let doesItfollowThisPattern = regexp.test(stringToTest);
    console.log(doesItfollowThisPattern);
    if(doesItfollowThisPattern){
        return true;
    }
    return false;
}
function onClearBtn(evt){
    evt.preventDefault();
    //console.log('in onClearBtn');
    mathInputString='';
    $('#mathInput').val('');
    $('#errorLabel').text('');

}
function onEqualBtn(evt){
    evt.preventDefault();
    mathInputString=$('#mathInput').val();
    //test input before anything else is allowed to happen
    let testThisString = mathInputString;
    console.log('in onEqualBtn what is testStrng',testThisString);
    if(testOfString(testThisString)===false){
        //$('#errorLabel').text('Please input a number then an operator then another number. Do not input numbers starting with . or use e as exponent')
        return;
    }


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
    $('#mathInput').val($('#mathInput').val()+mathInputString);
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