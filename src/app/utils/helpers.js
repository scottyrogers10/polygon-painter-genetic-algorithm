const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
};

const getNormalizedValue = (val, normalizer) => {
    return val / normalizer;
};

const getAbsoluteDifference = (a, b) => {
    return Math.abs(a - b);
};

export { getRandomInt, getNormalizedValue, getAbsoluteDifference };
