
//use this regular expression to test input from the calculator before its sent to server
//does not allow signed numbers
let regexp = /^(\d+)?\.?(\d+)?\d+[\+\-\/\*]{1}(\d+)?\.?(\d+)?\d+$/;

$(document).ready(onReady);

//the main display of the calculator
let mathInputString='';
//fill this with info form the server
let clientResultsAndEqns=[];

//onReady, registser all event handlers
function onReady(){
//eventhandlers
    $('#calcForm').on('submit',onEqualBtn);
    $('.fourbyfour').on('click',on4by4Click);
    $('#clearBtn').on('click',onClearBtn);
    $('#mathInput').on('focusout',updateMathString)
    $('#clearHistoryBtn').on('click',onClearHistory);
    $('#eqnsUL').on('click','.ulListItem',onItemClick);
    
    
}

//onItemClick
//shows result of the item clicked on. click on for ex 2+2 in list, it will show result =4, as if calculation took place 
function onItemClick(){
    let resultagain = $(this).data('result');
    $('#resultH2').text(resultagain);
    $('#mathInput').val($(this).text());
    
}
//updateMathString
//used to update mathInputString when user types with keyboard directly into the input element
function updateMathString(){
    mathInputString = $('#mathInput').val();
}

// onClearHistory
// Send a DELETE message to server, server set statearray =[]
// the response is the empty statearray
function onClearHistory(){
    $.ajax({
        url: '/mathEqns/Delete',
        method: 'DELETE'
    })
    .then((response)=>{
        //update local array
        clientResultsAndEqns=response;
        renderResult();
    })
    .catch((err)=>{
        console.log('in ajax delete err',err);
    });
}

//on4by4Click
// anytime 1 of the buttons in the 4 by 4 grid is clicked(except the =), append the string that represents the main display
function on4by4Click(evt){
    evt.preventDefault();
    //append the text of the button clicked to the variable mathInputString
    mathInputString+=$(this).text();
    //update the DOM since mathInputString has changed
    renderMathInput();
    
}

//testOfString
//test the string before its sent to server. its tested against the global regex
function testOfString(stringToTest){
    
    //console.log(stringToTest);
    let doesItfollowThisPattern = regexp.test(stringToTest);
    
    //console.log(doesItfollowThisPattern);
    if(doesItfollowThisPattern){
        return true;
    }
    return false;
}

//onClearBtn
//clear the global variale that represents the main display, and empty some html elements
function onClearBtn(evt){
    evt.preventDefault();
    mathInputString='';
    $('#mathInput').val('');
}

//onEqualBtn
//get equation from the dom, test it against regex, create an obj, send obj to server, get results from server,render results to the dom
function onEqualBtn(evt){
    evt.preventDefault();
    //grab the input equation from the dom
    mathInputString=$('#mathInput').val();

    //test input before anything else is allowed to happen
    let testThisString = mathInputString;
    if(testOfString(testThisString)===false){
        alert('Wrong input!!!\nExamples of good input:\n8+2\n5.6/4.7\n0.1-1\n3*5.2');
        return;
    }


    //create and obj to be sent to the server
    let matheqn = {
        matheqnstring: mathInputString
    };


    //send the equation to the server
    $.ajax({
        url:'/mathEqns',
        method:'POST',
        data: matheqn
    })
    .then((response)=>{
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
        clientResultsAndEqns = response;
        //show result and append to list
        renderResult();
        //reset input such that user dont have to click [C] to enter a new equation
        mathInputString='';
        renderMathInput();
    })
    .catch((err)=>{
        console.log('/mathEqns/Result GET err',err);
    });
    
    
}
//renderMathInput
//mathInputString has changed, render the changes to the dom
function renderMathInput(){
    $('#mathInput').val(mathInputString);
}
//renderResult
//the server has sent the results back, render the most recent equation to the result element, and render the history to the ul
function renderResult(){
    //render most recent calculation
    if(clientResultsAndEqns.length>0){
        $('#resultH2').text(clientResultsAndEqns[clientResultsAndEqns.length-1].result);
    }
    
    //empty ul first
    $('#eqnsUL').empty();
    
    //render the history
    for(let reslts of clientResultsAndEqns){
        $('#eqnsUL').append(`
        <li class="ulListItem" data-result="${reslts.result}">${reslts.matheqnstring}</li>
        `)
    }

}