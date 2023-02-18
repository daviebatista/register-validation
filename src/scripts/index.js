//VERIFICAÇÃO DO NOME
function validateName(name){
  if(name.length < 3){
      //LANÇAMENTO DO ERROR
    const err = new Error('Name must have at least three characters.')
    err.input = 'name'
    throw err
  }
}

//VERIFICAÇÃO DO EMAIL
function validateEmail(email) {
  if (!email.match(/\w{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/)) {
      //LANÇAMENTO DO ERROR
      const err = new Error('Email must be of a valid format and length.')
      err.input = 'email'
      throw err
  }
}

//VERIFICAÇÃO DA SENHA
function validatePassword(password) {
  if (
      password.length < 8 || 
      !password.match(/[a-z]/) || 
      !password.match(/[A-Z]/) || 
      !password.match(/[0-9]/) ||
      !password.match(/[^a-zA-Z0-9\s]/)
  ) 
  //LANÇAMENTO DO ERROR
  {
      const err = new Error('Password must have at least 8 characters, at least one uppercase and lowercase letters, at least a number, and at least a special character.')
      err.input = 'password'
      throw err
  }
}

//CLEAR DOS SPANS
function resetFormStyles() {
  Object.entries(userInputs).forEach(([key, value]) => {
      value.classList.remove('success', 'error')
      document.querySelector(`#${key}-error`).textContent = ''
  })
}

//OBJETO CONTENDO OS ITENS E VALORES DO FORMULÁRIO
const userInputs = {}

userInputs.name = document.querySelector('#name')
userInputs.email = document.querySelector('#email')
userInputs.password = document.querySelector('#password')

//FORM MAPEADO NO DOM
const form = document.querySelector('form')

form.addEventListener('submit', (ev) => {
  ev.preventDefault()
  resetFormStyles()
  try {
      validateName(userInputs.name.value)
      userInputs.name.classList.add('success')
      validateEmail(userInputs.email.value)
      userInputs.email.classList.add('success')
      validatePassword(userInputs.password.value)
      userInputs.password.classList.add('success')
  } catch (err) {
      userInputs[err.input].classList.add('error')
      document.querySelector(`#${err.input}-error`).textContent = err.message
  }
})


//VERIFICAÇÃO DA BARRA DA SENHA
const passwordInput = document.getElementById('password')

passwordInput.addEventListener('input', updateMeter)

const strengthMeter = document.querySelector('.strength-meter')
const reasons = document.querySelector('#reasons')

//LISTAGEM DE FRAQUEZAS
function passwordStrength(password){
  const weaknessess = []
  weaknessess.push(lengthWeakness(password))
  weaknessess.push(lowerCaseWeakness(password))
  weaknessess.push(upperCaseWeakness(password))
  weaknessess.push(numbersWeakness(password))
  weaknessess.push(specialsWeakness(password))
  return weaknessess
}

//LETRAS MINUSCULAS
function lowerCaseWeakness(password){
  const matches = password.match(/[a-z]/g) || []

  if(matches.length === 0){
    return{
      message: 'Your password needs at least one lower case letter.',
      deduction: 20,
    }
  }

  if(matches.length >= 1){
    return{
      message: 'Your lower-cased is ok!',
      deduction: 0,
    }
  }
}

//LETRAS MAIUSCULAS
function upperCaseWeakness(password){
  const matches = password.match(/[A-Z]/g) || []

  if(matches.length === 0){
    return{
      message: 'Your password needs at least one lower case letter.',
      deduction: 20,
    }
  }

  if(matches.length >= 1){
    return{
      message: 'Your lower-cased is ok!',
      deduction: 0,
    }
  }
}

//NUMEROS
function numbersWeakness(password){
  const matches = password.match(/\d/g) || []

  if(matches.length === 0){
    return{
      message: 'Your password needs at least a number.',
      deduction: 20,
    }
  }

  if(matches.length >= 1){
    return{
      message: 'Your number count is ok!',
      deduction: 0,
    }
  }
}

//CARACTERES ESPECIAIS
function specialsWeakness(password){
  const matches = password.match(/[^a-zA-Z0-9\s]/) || []

  if(matches.length === 0){
    return{
      message: 'Your password needs at least a special character.',
      deduction: 20
    }
  }
  if(matches.length >= 1){
    return{
      message: 'Your specials count is ok!',
      deduction: 0
    }
  }
}

//TAMANHO DA SENHA
function lengthWeakness(password){
  const length = password.length

  if(length < 8){
    return{
      message: 'Your password must have more than 8 characters.',
      deduction: 20
    }
  }
}

//ATUALIZAÇÃO DO VALOR DA FORÇA
function updateMeter(){
    const weaknessess = passwordStrength(passwordInput.value)
    let strength = 100
    weaknessess.forEach(weakness => {
      if(weakness == null) return
      strength -= weakness.deduction
    })
    strengthMeter.style.setProperty('--strength', strength)
}