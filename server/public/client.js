console.log('in client.js');

$(document).ready(onReady);

let mathInputString='';

function onReady(){
    console.log('onReady');
//eventhandlers
    $('.fourbyfour').on('click',on4by4Click);

}

function on4by4Click(evt){
    evt.preventDefault();
    console.log('on4by4Click');

   mathInputString+=$(this).text();
   render();
    //$(this).text();
}
function render(){
    $('#mathInput').val(mathInputString);
}