function addPermutations(prefix, input, results, minLength, mustContain) {
    if (prefix.length > 0 &&
        prefix.length >= minLength &&
        (mustContain.length === 0 || prefix.includes(mustContain)) &&
        !results.has(prefix) &&
        dictionary.has(prefix)) {
        results.add(prefix);
    }

    if (input.length > 0) {
        for (let i = 0; i < input.length; i++) {
            let newPrefix = prefix + input[i];
            let remainingInput = input.substring(0, i) + input.substring(i + 1);
            addPermutations(newPrefix, remainingInput, results, minLength, mustContain);
        }
    }
}

function generatePermutations(input, minLength, mustContain) {
    const results = new Set();
    let lowerCaseInput = input.toLowerCase();
    let lowercaseMustContain = mustContain.toLowerCase();
    addPermutations("", lowerCaseInput, results, minLength, lowercaseMustContain);
    return results;
}

let dictionary;

function readDictionary() {
    const rawFile = new XMLHttpRequest();
    rawFile.open("GET", "./en_US-large.txt", true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            const allText = rawFile.responseText;
            let textArray = allText.split("\r\n")
            dictionary = new Set(textArray);
        }
    }
    rawFile.send();
}

readDictionary();
