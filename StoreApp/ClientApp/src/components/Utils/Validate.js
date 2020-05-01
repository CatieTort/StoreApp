
const prepNameString = (name) => {
    if (isNaN(name)) {
        let nameCopy = name.trim().split("");
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

export const validateName = (props, input) => {
    let nameInput = prepNameString(input);
    if (nameInput === false) {
        props.hasError(true);
        props.setErrType("Name");
        props.setErrorMsg(`Item Name must contain letters`);
        return false
    }

    if (isNaN(parseInt(nameInput[nameInput.length - 1]))) {
        props.hasError(true);
        props.setErrType("Name");
        props.setErrorMsg("Item Name must end with a number");
        return false
    } else {
        let numIndex = numberIndex(nameInput)
        if (numIndex !== -1) {
            let inputString = nameInput.split("");
            if (inputString[numIndex] !== " ") {
                inputString.splice(numIndex, 0, " ");
            }
            return inputString.join("")
        } else {
            props.hasError(true);
            props.setErrType("Name");
            props.setErrorMsg( "Item Name must end with a number");
            return false
        }
    }
}

const validatePrice = (props, input) => {
    let priceInput = parseInt(input);

    if (isNaN(priceInput)) {
        props.hasError(true);
        props.setErrType("Price");
        props.setErrorMsg("Price must be a number");
        return false
    } else if (priceInput <= 0) {
        props.hasError(true);
        props.setErrType("Price");
        props.setErrorMsg("Price must greater than 0");
        return false
    } else {
        return priceInput
    }
}

export const validateInput = (props, input1, input2) => {
    let validData = { name: "", price: "" }

    if (input1 === "" && input2 === "") {
        props.hasError(true);
        props.setErrType("both");
        props.setErrorMsg(`Item Name & Price cannot be blank`);
    } else {
        if (input1 !== "") {
            validData.name = validateName(props, input1)
        } else {
            props.hasError(true);
            props.setErrType("Name");
            props.setErrorMsg(`Item Name cannot be blank`);
        }

        if (input2 !== "") {
            validData.price = validatePrice(props, input2)
        } else {
            props.hasError(true);
            props.setErrType("Price");
            props.setErrorMsg(`Item Price cannot be blank`);
            return false
        }
    }
    props.validateDone(true);
    return validData
}
