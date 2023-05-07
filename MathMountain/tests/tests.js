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
const activeTest = document.getElementById('activeTest');
const completeTest = document.getElementById('completeTest');
const testResults = document.getElementById('testResults');
const newTest = document.getElementById('newTest');
const restartTest = document.getElementById('restartTest');
const showAdvancedOptions = document.getElementById('moreOptions');
const hideAdvancedOptions = document.getElementById('hideOptions');
const moreOptions = document.getElementsByClassName('moreOptions');
const presetOptions = document.getElementsByClassName('presetOptions');
const testTypeInput = document.getElementById('testType');
const grade = document.getElementById('grade');
const errorList = document.getElementById('errorList');
const modal = document.getElementById('errorModal');
const close = document.getElementById('close');


//Variables
let numQs, maxNum, minNum = 0;
let testType = 'Addition';
let userAnswer = 0;
let qCounter = 1;
let strQuestion = '';
let answer = 0;
let negA = false;
let repQ = true;
let decLen = 2;
let correctQs = 0;
let time1 = 0;
let time2 = 0;
let simpleStr = '';

//Functions
const randInt = (min, max) => {
    // A proper random integer function; min/max inclusive. 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const getTestParameters = () => {
    numQs = Number(document.getElementById('numQuestions').value);
    maxNum = Number(document.getElementById('maxNum').value);
    minNum = Number(document.getElementById('minNum').value);
    testType = document.getElementById('testType').value;


    setTestType(testType);

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
     ${strQuestion}
    `;
    document.getElementById('questionNum').innerHTML = `#${qCounter}`
}

const generateQuestion = () => {
    let numOne = randInt(minNum, maxNum);
    let numTwo = randInt(minNum, maxNum);
    let strParam = '';
    let numParam = 0;
    let rem = 0;
    let floor = 0;
    let simpleString = '';

    switch (testType) {
        
        case 'Addition':
            strParam = `<span style="display: inline-block; text-align: right;">${numOne}<span> <br>
            <span style="display: inline-block; text-align: right;"><u>+ ${numTwo}</u></span><br>`;
            simpleString = `${numOne} + ${numTwo}`
            numParam = numOne + numTwo;
            return {strParam, numParam, simpleString};
            
        case 'Subtraction':
            strParam = `<span style="display: inline-block; text-align: right;">${numOne}<span> <br>
            <span style="display: inline-block; text-align: right;"><u>- ${numTwo}</u></span>`;
            simpleString = `${numOne} - ${numTwo}`
            numParam = numOne - numTwo;
            return {strParam, numParam, simpleString};

        case 'Multiplication':
            strParam = `<span style="display: inline-block; text-align: right;">${numOne}</span> <br>
            <span style="display: inline-block; text-align: right;"><u>X ${numTwo}</u></span>`;
            simpleString = `${numOne} X ${numTwo}`
            numParam = numOne * numTwo;
            return {strParam, numParam, simpleString};

        case 'Division':
            while (numTwo === 0){
                numTwo = randInt(minNum,maxNum);
                
            }

            [numOne, numTwo] = simpleDivisor(numOne, numTwo); 

            strParam = `<span style="display: inline-block; text-align: right;">${numOne}</span> <br>
            <span style="display: inline-block; text-align: right;"><u>&divide ${numTwo}</u></span>`;
            simpleString = `${numOne} &divide ${numTwo}`
            numParam = numOne / numTwo;
            floor = Math.floor(numParam);
            rem = numParam - floor;
            if ((rem.toString()).length > (decLen+2)) {
                numParam = parseFloat(numParam.toFixed(decLen));
            }

            return {strParam, numParam, simpleString};
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
                <span id="questionNumber">#${qCounter}</span>
                <span style="color:Green;">Your Answer: ${userAnswer} &#10003</span> <br>
                ${simpleStr} = ${answer} 
            </p>`;
            
            } else {
                logSection.innerHTML = `
            <p>
                <span id="questionNumber">#${qCounter}</span>
                <span style="color:red;">Your Answer: ${userAnswer} &#10007</span> <br>
                ${simpleStr} = ${answer} 
            </p>`;
            }
    } else {
        if (userAnswer === answer) {
            correctQs += 1;
            logSection.innerHTML = `
            <p>
                <span id="questionNumber">#${qCounter}</span>
                <span style="color:Green;">Your Answer: ${userAnswer} &#10003</span> <br>
                ${simpleStr} = ${answer}
            </p>` + logSection.innerHTML;
            } else {
                logSection.innerHTML = `
            <p>
                <span id="questionNumber">#${qCounter}</span>
                <span style="color:red;">Your Answer: ${userAnswer} &#10007</span> <br>
                ${simpleStr} = ${answer} 
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
        color = 'Green';
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
    Correct Questions: ${correctQs} / ${numQs} <br>
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

const setPresets = () => {
    switch (grade.value) {
        case '1':
            document.getElementById('numQuestions').value = '10';
            document.getElementById('maxNum').value = '10';
            document.getElementById('minNum').value = '0';           
            
            repeatQuestion.value = 'Yes';
            negAnswers.value = 'No';

            return;
        
        case '2':
            document.getElementById('numQuestions').value = '15';
            document.getElementById('maxNum').value = '15';
            document.getElementById('minNum').value = '0';           
            
            repeatQuestion.value = 'Yes';
            negAnswers.value = 'No';
            return;
        
        case '3':
            document.getElementById('numQuestions').value = '20';
            document.getElementById('maxNum').value = '25';
            document.getElementById('minNum').value = '0';           
            
            repeatQuestion.value = 'Yes';
            negAnswers.value = 'No';
            return;

        case '4':
            document.getElementById('numQuestions').value = '25';
            if (testTypeInput.value === 'Addition' || testTypeInput.value === 'Subtraction') {
                document.getElementById('maxNum').value = '50';
            } else {
                document.getElementById('maxNum').value = '25';
            }
            document.getElementById('minNum').value = '0';           
            
            repeatQuestion.value = 'Yes';
            negAnswers.value = 'Yes';
            return;

        case '5':
            document.getElementById('numQuestions').value = '25';
            if (testTypeInput.value === 'Addition' || testTypeInput.value === 'Subtraction') {
                document.getElementById('maxNum').value = '75';
            } else {
                document.getElementById('maxNum').value = '30';
            }
            document.getElementById('minNum').value = '-10';           
            
            repeatQuestion.value = 'Yes';
            negAnswers.value = 'Yes';
            return;

        case '6':
            document.getElementById('numQuestions').value = '25';
            if (testTypeInput.value === 'Addition' || testTypeInput.value === 'Subtraction') {
                document.getElementById('maxNum').value = '100';
            } else {
                document.getElementById('maxNum').value = '50';
            }
            document.getElementById('minNum').value = '-25';           
            
            repeatQuestion.value = 'Yes';
            negAnswers.value = 'Yes';
            return;
    }
}

const validateInput = () => {
    let errors = 0;

    if(numQs < 1) {
        let node = document.createElement('li');
        let textNode = document.createTextNode('Number of questions is less than 1; you must have at least one question.')
        node.appendChild(textNode);
        errorList.appendChild(node);
        errors += 1;
    }
    if(numQs > 100) {
        let node = document.createElement('li');
        let textNode = document.createTextNode('Number of questions is greater than 100; 100 is the maximum number of questions.');
        node.appendChild(textNode);
        errorList.appendChild(node);

        errors += 1;
    }
    if(maxNum <= minNum) {
        let node = document.createElement('li');
        let textNode = document.createTextNode('The highest number must be greater than the lowest number.');
        node.appendChild(textNode);
        errorList.appendChild(node);

        errors += 1;
    }
    if(maxNum > 1000) {
        let node = document.createElement('li');
        let textNode = document.createTextNode('Highest number is greater than 1000; 1000 is the highest allowed number.');
        node.appendChild(textNode);
        errorList.appendChild(node);

        errors += 1;
    }
    if(minNum < -1000) {
        let node = document.createElement('li');
        let textNode = document.createTextNode('Lowest number is less than -1000; -1000 is the lowest allowed number.');
        node.appendChild(textNode);
        errorList.appendChild(node);

        errors += 1;
    }

    if(errors > 0){
        modal.style.display = 'block';
        return true;
    } else {
        return false;
    }
}

//Event handlers
generateButton.addEventListener('click', (event) => {
    event.preventDefault();
    getTestParameters();
    if (validateInput()){
        return;
    }
    resetTest();
    document.getElementById("test-container").style.display = 'block';
    
    let {strParam,numParam, simpleString} = generateQuestion();
    strQuestion = strParam;
    answer = numParam;
    simpleStr = simpleString;

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
    event.preventDefault();
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

        enterAnswer.focus();

});

newTest.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById("test-container").style.display = 'none';

});

restartTest.addEventListener('click', (event) => {
    event.preventDefault();
    resetTest();

    let {strParam,numParam} = generateQuestion();
    strQuestion = strParam;
    answer = numParam;

    setQuestionPrompt(strQuestion, qCounter, numQs);
    if (qCounter === 1) {
        time1 = Date.now();
    }


});

showAdvancedOptions.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById("xtraOptions").style.display = 'flex';
    document.getElementById("showOptions").style.display = 'none';
    document.getElementById("lessOptions").style.display = 'block';
});

hideAdvancedOptions.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById("xtraOptions").style.display = 'none';
    document.getElementById("showOptions").style.display = 'block';
    document.getElementById("lessOptions").style.display = 'none';
});

document.getElementById('testType').addEventListener('click', (event) => {
    event.preventDefault();
    setPresets();
});

grade.addEventListener('click', (event) => {
    event.preventDefault();
    setPresets();
});

window.addEventListener('click', (event) => {
    if(event.target === modal) {
        modal.style.display = 'none';
        errorList.innerHTML = '';
    }
});

close.addEventListener('click', (event) => {
    modal.style.display = 'none';
    errorList.innerHTML = '';
});
