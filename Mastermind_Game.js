const baseColor = ["red", "yellow", "blue", "green", "orange", "black", "purple", "brown"];
// setUp secrectCode, need maxNumber of the code
function generateCode(arr, maxNumber) {
  let secretCode = []
  for(let i=0; i<maxNumber; i++) {
    secretCode[i] = arr[Math.floor(Math.random()*arr.length)]
  }
  console.log("secretCode:", secretCode)
  return secretCode
}



//getGuessResult 
//params(guessCode, secretCode, triesLeft) 
//return win, lose or guessResult

function getGuessResult(guessCode, secretCode, triesLeft) {
  let winner = false;
  let gameOver = false;
  if (guessCode.length == secretCode.length) {
     let guessResult = getAllMatch(guessCode, secretCode)
  
// if guessResult.number == secretCode.length  win 
  
  if (guessResult.matchNumber == secretCode.length) {
    winner = true
  } else {
    if (triesLeft == 0) {
      gameOver = true
    }
  } 
  return {
    winner,
    gameOver,
    guessResult
    }
  }
} 

console.log("result:", getGuessResult(["green","orange","black","red"], generateCode(baseColor, 4)))

// getExactResult 
// params (guessCode, secretCode) 
// return number and an array with each one show match value

function getExactMatch(guessCode, secretCode) {
 let matchResult = new Array(secretCode.length)
 let matchNumber = secretCode.reduce((sum, currentValue, index) => {
    if (guessCode[index] == currentValue) {
          sum += 1 
          matchResult[index] = true
        } else { matchResult[index] = false }
        return sum
      },0)
     return {
       matchNumber: matchNumber,
       matchResult: matchResult
    }
  }

// getParticalMatch 
// params (guessCode, secretCode) 
//return partial match number and exact match number
function getAllMatch(guessCode, secretCode) {
  // only check unmatch ones from getExactResult
  let exactResult = getExactMatch(guessCode,secretCode)
  let guessMatches = exactResult.matchResult
  let guessMatchesNumber = exactResult.matchNumber
  let secretCodeCheck = []
  for (let i=0; i<secretCode.length; i++) {
    secretCodeCheck[i] = false
  }
 let number = guessCode.reduce((sum, currentValue, index) => {
    if (guessMatches[index] == false) {
      for (let i=0; i<secretCode.length; i++) {
        if (!secretCodeCheck[i] && currentValue == secretCode[i]) {
          sum += 1
          secretCodeCheck[i] = true
        }
      }
    }
    return sum
  },0)
  return {
    particalMatchNumber: number,
    exactMatchNumner: guessMatchesNumber
  }
}


