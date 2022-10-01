//console.log('in server.js');
const express = require('express');
const bodyparser = require('body-parser');

const app = express();
app.use(express.static('server/public'));
app.use(bodyparser.urlencoded({extended:true}));

let stateOfMathEqs=[];

app.post('/mathEqns',(req,res)=>{
    let myObj ={};
    myObj = req.body;
    myObj.result = CalculateResult(myObj.matheqnstring);
    stateOfMathEqs.push(myObj);
    //console.log('stateOfMathEqs',stateOfMathEqs);
    res.sendStatus('201');
});
app.get('/mathEqns/Result',(req,res)=>{
   
    res.send(stateOfMathEqs);
});

app.listen(3000,()=>{
    console.log('server is up on port',3000);
});
 
function CalculateResult(stringOfmath){
    let numOpNumArray = [];
    let regExp = /\+|\-|\/|\*/;

    numOpNumArray=stringOfmath.split(regExp);
    let Operator = stringOfmath.match(regExp);
    
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
