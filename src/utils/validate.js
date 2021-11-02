
export const validateRegForm = (data) => {
    
}

export const checkEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
        return true
    }
    
    return false
}

export const checkPassword = password => {
    if (!password) return "required"

    const lengthIsValid = password.length > 4 && password.length < 10
    if (!lengthIsValid) return "password length must be >4 <10"

    let hasBigLetter = false
    password.split("").forEach(letter => {
        if (!isNaN(+letter)) return
        const isUpperCase = letter.toUpperCase() === letter;
        if (!!isUpperCase) hasBigLetter = true
    })

    if (!hasBigLetter) return "password must contain capital letter"

    return true
}

export const required = (value) => (value ? undefined : "Required");