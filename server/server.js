
const express = require('express');
const bodyparser = require('body-parser');

const app = express();

//make sure server has access to the public folder
app.use(express.static('server/public'));
app.use(bodyparser.urlencoded({extended:true}));

//main state 
let stateOfMathEqs=[];

//app.post '/mathEqns'
//client has sent an equation, calculate the result and push it to the state
app.post('/mathEqns',(req,res)=>{
    let myObj ={};
    myObj = req.body;

    myObj.result = CalculateResult(myObj.matheqnstring);
    stateOfMathEqs.push(myObj);
    
    

    //inform client that server has posted what was sent
    res.sendStatus('201');
});

//app.get /mathEqns/Result
//send the client the state
app.get('/mathEqns/Result',(req,res)=>{
   
    res.send(stateOfMathEqs);
});

//app.listen
//start server and listen on port 3000
app.listen(3000,()=>{
    console.log('server is up on port',3000);
});

//app.delete
//handles delete request from client, set state to empty arrray, then return that empty array
app.delete('/mathEqns/Delete',(req,res)=>{
    stateOfMathEqs=[];
    //return current state
    res.send(stateOfMathEqs);
});
 
//CalculateResult
//split the equation string into 2 number based on which operator was used. Do calculation based on which operator was used, return result
function CalculateResult(stringOfmath){
    //will hold an array of 2 items number and number
    let numOpNumArray = [];

    //used in .split and .match
    let regExp = /\+|\-|\/|\*/;

    //find the 2 numbers in the string
    numOpNumArray=stringOfmath.split(regExp);
    //find the operator in the string
    let Operator = stringOfmath.match(regExp);
    
    //select which operation to perform
    if(Operator[0]=='+'){
        //do addition
        return Number(numOpNumArray[0]) + Number(numOpNumArray[1]);
    }
    else if(Operator[0]=='-'){
        //do minus
        return Number(numOpNumArray[0]) - Number(numOpNumArray[1]);
    }
    else if(Operator[0]=='*'){
        //do mult
        return Number(numOpNumArray[0]) * Number(numOpNumArray[1]);
    }
    else{
        //do division
        return Number(numOpNumArray[0]) / Number(numOpNumArray[1]);
    }
}
