

// const numberValidator = (value) => {
//   // Use a regular expression to check if the input contains only numbers
//   const regex = /^[0-9]*$/;
//   if (!regex.test(value)) {
//     return 'Please enter only numbers';
//   }
//   return null; // No error
// }

export const numberValidator = (value: any, minimumValue = 0) => {
    // Use a regular expression to check if the input contains only numbers
    const regex = /^[0-9]*$/
    if (!regex.test(value)) {
        return 'Please enter only numbers'
    }

    // Check if the input value is less than 1
    if (minimumValue > 0) {
        if (parseInt(value, 10) < minimumValue) {
            return 'Minimum value is 1'
        }
    }

    return null // No error
}
