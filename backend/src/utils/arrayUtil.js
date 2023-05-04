/**
 * Vetor de filtrado.
 * @param {*} values Valores
 * @param {*} filter Valores a serem removidos
 * @returns Vetor de filtrado.
 */
function filterValues(values, filter) {
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < filter.length; j++) {
            if (values[i] == filter[j]) {
                values.splice(i, 1);
            }
        }
    }
    return values;
}

/**
 * Juntar dois arrays
 * @param {*} parentArray Array pai  
 * @param {*} childArray Array child
 * @returns Array pai junto com o array do filho.
 */
function appendArrayToAnother(parentArray, childArray) {
    // parentArray.concat(childArray);

    let notDuplicate = [];

    for (let i = 0; i < childArray.length; i++) {

        if (!parentArray.includes(childArray[i])) {
            notDuplicate.push(childArray[i]);
        }
    }

    parentArray = parentArray.concat(notDuplicate);
    return parentArray;
}

/**
 * Remover itens duplicados.
 * @param {*} array Array alvo.
 * @returns Array sem itens duplicados.
 */
function removeDuplicatesById(array) {

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (i != j && array[i]._id == array[j]._id) {
                array.splice(j, 1);
            }
        }
    }
    return array;
}

/**
 * Transformar array mongoObj para json.
 * @param {*} array Array alvo.
 * @returns json
 */
function toObject(array) {
    for (let i = 0; i < array.length; i++) {
        let obj = array[i].toObject();
        let str = JSON.stringify(obj);
        array[i] = JSON.parse(str);
    }
    return array;
}

/**
 * Exportação.
 */
module.exports = {
    filterValues,
    appendArrayToAnother,
    removeDuplicatesById,
    toObject
};
