//Constants
const generateButton = document.getElementById('generateButton');
const repeatQuestion = document.getElementById('repeatQuestion');
const negAnswers = document.getElementById('negAnswers');
const showAdvancedOptions = document.getElementById('moreOptions');
const hideAdvancedOptions = document.getElementById('hideOptions');
const moreOptions = document.getElementsByClassName('moreOptions');
const presetOptions = document.getElementsByClassName('presetOptions');
const testTypeInput = document.getElementById('testType');
const grade = document.getElementById('grade');
const errorList = document.getElementById('errorList');
const modal = document.getElementById('errorModal');
const close = document.getElementById('close');
const practiceSheet = document.getElementById('practiceSheet');


//Variables
let numQs, maxNum, minNum = 0;
let testType = 'Addition';
let strQuestion = '';
let answer = 0;
let negA = false;
let repQ = true;
let decLen = 2;

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
            strParam = `${numOne} <br>
            <u>+ ${numTwo}</u><br>
            <u>__________</u> `;
            numParam = numOne + numTwo;
            return {strParam, numParam};
            
        case 'Subtraction':
            strParam = `${numOne} <br>
            <u>- ${numTwo}</u><br>
            <u>__________</u> `;
            numParam = numOne - numTwo;
            return {strParam, numParam};

        case 'Multiplication':
            strParam = `${numOne} <br>
            <u>X ${numTwo}</u><br>
            <u>__________</u> `;
            numParam = numOne * numTwo;
            return {strParam, numParam};

        case 'Division':
            while (numTwo === 0){
                numTwo = randInt(minNum,maxNum);
                
            }

            [numOne, numTwo] = simpleDivisor(numOne, numTwo); 

            strParam = `${numOne} <br>
            <u>&divide ${numTwo}</u><br>
            <u>__________</u> `;
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

    practiceSheet.innerHTML = '';
    document.getElementById("practiceSheet").style.display = 'flex';

    for (let i = 0; i < numQs; i++) {
        let {strParam,numParam} = generateQuestion();
        strQuestion = strParam;
        answer = numParam;
        
        practiceSheet.innerHTML += `
        <p class="question">
                        <span class="questionNum">#${i+1}</span> 
                        ${strParam}
                    </p>
        `


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