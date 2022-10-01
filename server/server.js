console.log('in server.js');
const express = require('express');
const bodyparser = require('body-parser');

const app = express();
app.use(express.static('server/public'));
app.use(bodyparser.urlencoded({extended:true}));
let stateOfMathEqs=[];

app.post('/mathEqns',(req,res)=>{
    stateOfMathEqs.push(req.body);
    console.log('stateOfMathEqs',stateOfMathEqs);
    res.sendStatus('201');
});
app.get('/mathEqns/Result',(req,res)=>{
    //calculate result
    let calcResult = CalculateResult(req.body);
    //TODO this is where I am, try to make calc work, havnt tested it yet
    res.send(calcResult)
});

app.listen(3000,()=>{
    console.log('server is up on port',3000);
});
 
function CalculateResult(stringOfmath){
    let numOpNumArray = [];
    numOpNumArray=stringOfmath.split('/\+\-\*\//');
    onsole.log('just tried to split',numOpNumArray);
    if(numOpNumArray[1]=='+'){
        //do addition
        return Number(numOpNumArray[0]) + Number(numOpNumArray[2]);
    }
    else if(numOpNumArray[1]=='-'){
        //do minus
        return Number(numOpNumArray[0]) - Number(numOpNumArray[2]);
    }
    else if(numOpNumArray[1]=='*'){
        //do mult
        return Number(numOpNumArray[0]) * Number(numOpNumArray[2]);
    }
    else{
        //do division
        return Number(numOpNumArray[0]) / Number(numOpNumArray[2]);
    }
}
