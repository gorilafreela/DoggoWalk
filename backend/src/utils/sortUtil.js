/**
 * Order um array por índice (crescente)
 * @param {*} array 
 * @returns array ordenado (crescente)
 */
function sortByIndexRising (array) {
    return array.sort((a, b) => {
        return a.index - b.index;
    });
}

/**
 * Order um array por índice (decrescente)
 * @param {*} array 
 * @returns array ordenado (decrescente)
 */
function sortByIndexFalling (array) {
    return array.sort((a, b) => {
        return   b.index - a.index;
    });
}

/**
 * Order um array por um campo (decrescente)
 * @param {*} array 
 * @returns array ordenado (decrescente)
 */
function sortByFieldFalling (array,field) {
    return array.sort((a, b) => {
        return  parseInt(b[field]) - parseInt(a[field]);
    });
}

module.exports = {
    sortByIndexRising,
    sortByIndexFalling,
    sortByFieldFalling
};
