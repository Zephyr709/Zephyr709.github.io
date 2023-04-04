//Contstants
const generateButton = document.getElementById('generateButton');
const QNASection = document.getElementById('QNA');
const logSection = document.getElementById('log');
const questionPrompt = document.getElementById('questionPrompt');
const testHeader = document.getElementById('testHeader');
const enterAnswer = document.getElementById('enterAnswer');
const errorPrompt = document.getElementById('errorPrompt');
const submitButton = document.getElementById('submitButton');
const repeatQuestion = document.getElementById('repeatQuestion');
const negAnswers = document.getElementById('negAnswers');
const decPlaces = document.getElementById('decPlaces');
const activeTest = document.getElementById('activeTest');
const completeTest = document.getElementById('completeTest');
const testResults = document.getElementById('testResults');
const newTest = document.getElementById('newTest');
const restartTest = document.getElementById('restartTest');

//Variables
let numQs, maxNum, minNum = 0;
let testType = 'Addition';
let userAnswer = 0;
let qCounter = 1;
let strQuestion = '';
let answer = 0;
let negA = false;
let repQ = true;
let decLen = 0;
let correctQs = 0;
let time1 = 0;
let time2 = 0;

//Functions
const randInt = (min, max) => {
    // A proper random integer function; min/max inclusive. credit: W3Schools.com
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const getTestParameters = () => {
    numQs = Number(document.getElementById('numQuestions').value);
    maxNum = Number(document.getElementById('maxNum').value);
    minNum = Number(document.getElementById('minNum').value);
    testType = document.getElementById('testType').value;
    setTestType(testType);
    decLen = Number(document.getElementById('decimalLength').value);
    if (repeatQuestion.value === 'Yes') {
        repQ = true;
    } else {
        repQ = false;
    }

    if (negAnswers.value === 'Yes') {
        negA = true;
    } else {
        negA = false;
    }

}

const setTestType = (type) => {
    testType = type;
    testHeader.innerHTML = testType;
}

const setQuestionPrompt = (strQuestion, qNum, numQs) => {
    questionPrompt.innerHTML = `
        Question #${qNum}/${numQs}: ${strQuestion}
    `;
}

const generateQuestion = () => {
    let numOne = randInt(minNum, maxNum);
    let numTwo = randInt(minNum, maxNum);
    let strParam = '';
    let numParam = 0;
    let rem = 0;
    let floor = 0;

    switch (testType) {
        
        case 'Addition':
            strParam = `${numOne} + ${numTwo}`;
            numParam = numOne + numTwo;
            return {strParam, numParam};
            
        case 'Subtraction':
            strParam = `${numOne} - ${numTwo}`;
            numParam = numOne - numTwo;
            return {strParam, numParam};

        case 'Multiplication':
            strParam = `${numOne} x ${numTwo}`;
            numParam = numOne * numTwo;
            return {strParam, numParam};

        case 'Division':
            while (numTwo === 0){
                numTwo = randInt(minNum,maxNum);
                
            }

            [numOne, numTwo] = simpleDivisor(numOne, numTwo); 

            strParam = `${numOne} / ${numTwo}`;
            numParam = numOne / numTwo;
            floor = Math.floor(numParam);
            rem = numParam - floor;
            if ((rem.toString()).length > (decLen+2)) {
                numParam = parseFloat(numParam.toFixed(decLen));
            }

            return {strParam, numParam};
    }
}

const simpleDivisor = (numOne, numTwo) => {
    let a = numOne/numTwo;
    let b = Math.floor(a);
    let c = (a-b).toString();
    //Check to allow repeating decimals if length of number is greater than 3 eg. 0.3333, 0.8222 etc.
    if (decLen+2 > 3){
        if ( (c[3]===c[4] && c[3]===c[5] && c[3]===c[6]) || (c[4]===c[5] && c[4]===c[6] && c[4]===c[7]) ) {
            c = c.slice(0,decLen+2);
        }
    }
    while (c.length > decLen+2) {
        numOne = randInt(minNum, maxNum);
        numTwo = randInt(minNum, maxNum);
        if (numTwo === 0){
            continue;
        }
        a = numOne/numTwo;
        b = Math.floor(a);
        c = (a-b).toString();

    }

    return [numOne,numTwo];
}

const updateLog = () => {
    if (qCounter === 1) {
        if (userAnswer === answer) {
            correctQs += 1;
            logSection.innerHTML = `
            <p>
                Question ${qCounter}/${numQs}: ${strQuestion} <br>
                <span style="color:LightGreen;">Your Answer: ${userAnswer}</span> <br>
                Correct Answer: ${answer} 
            </p>`;
            
            } else {
                logSection.innerHTML = `
            <p>
                Question ${qCounter}/${numQs}: ${strQuestion} <br>
                <span style="color:IndianRed;">Your Answer: ${userAnswer}</span> <br>
                Correct Answer: ${answer} 
            </p>`;
            }
    } else {
        if (userAnswer === answer) {
            correctQs += 1;
            logSection.innerHTML = `
            <p>
                Question ${qCounter}/${numQs}: ${strQuestion} <br>
                <span style="color:LightGreen;">Your Answer: ${userAnswer}</span> <br>
                Correct Answer: ${answer} 
            </p>` + logSection.innerHTML;
            } else {
                logSection.innerHTML = `
            <p>
                Question ${qCounter}/${numQs}: ${strQuestion} <br>
                <span style="color:IndianRed;">Your Answer: ${userAnswer}</span> <br>
                Correct Answer: ${answer} 
            </p>` + logSection.innerHTML;
            }
    }

}

const resetTest = () => {
    logSection.innerHTML = `
    <p> Your Question results will appear here.</p>
    `;
    questionPrompt.innerHTML = '';
    qCounter = 1;
    correctQs = 0;
    activeTest.style.display = 'block';
    completeTest.style.display = 'none';
}

const generateTestResults = () => {
    percentScore = parseFloat(((correctQs/numQs) * 100).toFixed(1));
    activeTest.style.display = 'none';
    completeTest.style.display = 'flex';
    if (percentScore >= 90) {
        color = 'LightGreen';
    } else if (percentScore >= 80) {
        color = 'GreenYellow';
    } else if (percentScore >= 70) {
        color = 'gold';
    } else if (percentScore >= 60) {
        color = 'OrangeRed';
    } else if (percentScore >= 50) {
        color = 'IndianRed';
    } else {
        color = 'Red';
    }
    testResults.innerHTML = `
    You Scored: % <span style="color:${color}">${percentScore}</span> <br>
    Correct Questions: ${correctQs}/${numQs} <br>
    Time to Complete: ${calcTime()} <br>
    `

}

const calcTime = () => {
    elapsed = Math.floor((time2 - time1)/1000);
    minutes = Math.floor(elapsed / 60);
    seconds = elapsed % 60;
    if (minutes > 0) {
        return `${minutes} Minutes ${seconds} Seconds`
    } else {
        return `${seconds} Seconds`
    }
    
}

//Event handlers
generateButton.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById("test-container").style.display = 'block';
    getTestParameters();
    resetTest();
    let {strParam,numParam} = generateQuestion();
    strQuestion = strParam;
    answer = numParam;
    setQuestionPrompt(strQuestion, qCounter, numQs);
    if (qCounter === 1) {
        time1 = Date.now();
    }
   
});

enterAnswer.addEventListener('keyup', (event) => {
    if (event.key === "Enter") { 
        errorPrompt.innerHTML = '';

        if (enterAnswer.value === ''){
            errorPrompt.innerHTML = `
            You have tried to submit an empty answer, Please enter a number.`
            return;
        }
        
        if (qCounter <= numQs){
            userAnswer = Number(enterAnswer.value);
            enterAnswer.value = '';
            updateLog();
            qCounter++;

            if (qCounter > numQs){
                questionPrompt.innerHTML = ``;
                time2 = Date.now();
                generateTestResults();
                return;
            }
           
            let {strParam,numParam} = generateQuestion();
            strQuestion = strParam;
            answer = numParam;
            setQuestionPrompt(strQuestion, qCounter, numQs);
        }
    }


});

submitButton.addEventListener('click', (event) => {
    errorPrompt.innerHTML = '';

        if (enterAnswer.value === ''){
            errorPrompt.innerHTML = `
            You have tried to submit an empty answer, Please enter a number.`
            return;
        }
        
        if (qCounter <= numQs){
            userAnswer = Number(enterAnswer.value);
            enterAnswer.value = '';
            updateLog();
            qCounter++;
            if (qCounter > numQs){
                questionPrompt.innerHTML = ``;
                time2 = Date.now();
                generateTestResults();
                return;
            }
           
            let {strParam,numParam} = generateQuestion();
            strQuestion = strParam;
            answer = numParam;
            setQuestionPrompt(strQuestion, qCounter, numQs);
        }

});