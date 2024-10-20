export function validateLimit(value) {
    const numberValue = Number(value);
    return !isNaN(numberValue) && numberValue >= 0 && numberValue <= 1000;
}

export function validateInn(inn) {
    const regex = /^\d{10}$/;
    return regex.test(inn);
}