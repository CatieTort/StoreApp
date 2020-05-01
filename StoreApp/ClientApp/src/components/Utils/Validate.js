
const prepNameString = (name) => {
    if (isNaN(name)) {
        let nameCopy = name.split("");
        nameCopy.splice(0, 1, nameCopy[0].toUpperCase());
        return nameCopy.join("");
    } else {
        return false
    }
    
}

const numberIndex = (name) => {
    let strArr = name.split("");
    let isNumber = (el) => isNaN(el) === false;
    let index = strArr.findIndex(isNumber);
    return index > 0 ? index : -1
}


export const validateInput = (props, input, type) => {

    if (input === "") {
        props.hasError(true);
        props.setErrType("both");
        props.setErrorMsg(`Item ${type} cannot be blank`);
    } else {
        if (type === "Name") {
            let nameInput = prepNameString(input);
            if (nameInput === false) {
                props.hasError(true);
                props.setErrType(type);
                props.setErrorMsg(`Item ${type} must contain letters`);
            }

            if (isNaN(parseInt(nameInput[nameInput.length - 1]))) {
                props.hasError(true);
                props.setErrType(type);
                props.setErrorMsg("Item Name must end with a number");
            } else {
                let numIndex = numberIndex(nameInput)
                if (numIndex !== -1) {
                    let inputString = nameInput.split("");
                    inputString.splice(numIndex - 1, 0, " ");
                    console.log("Validated Name:", inputString.join(""))
                    return inputString.join("")
                } else {
                    props.hasError(true);
                    props.setErrType(type);
                    props.setErrorMsg("Item Name must end with a number");
                }
            }
        } else if (type === "Price") {
            let priceInput = parseInt(input);

            if (isNaN(priceInput)) {
                props.hasError(true);
                props.setErrType(type);
                props.setErrorMsg("Price must be a number");
            } else if (priceInput <= 0) {
                props.hasError(true);
                props.setErrType(type);
                props.setErrorMsg("Price must greater than 0");
            } else {
                return priceInput
            }
        } else {
            return false
        }
        props.validateDone(true);
    }
}
