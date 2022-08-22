const checkSpecialCharExpression  = (str) => !!str.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/)

const checkIsEmailExpression = (str) => !!str.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

const checkLength = (str, max = 255, min = 4) => !!(str.length > max || str.length < min)

const validateFieldText = (value) => {
  if (checkSpecialCharExpression(value) || checkLength(value, 40)) {
    return true
  }

  return false
}

const validateFieldEmail = (value) => {
  if (!checkIsEmailExpression(value) || checkLength(value, 255, 8)) {
    return true
  }

  return false
}

export {
  checkSpecialCharExpression,
  checkIsEmailExpression,
  checkLength,
  validateFieldText,
  validateFieldEmail
}
