const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

function addPermutations(prefix, input, results, minLength, mustContain) {
    if (prefix.length > 0
        && prefix.length >= minLength
        && (mustContain.length === 0 || prefix.includes(mustContain))
        && !results.has(prefix)
        && dictionary.has(prefix)
    ) {
        results.add(prefix);
    }

    if (input.length > 0) {
        for (let i = 0; i < input.length; i++) {
            let nextCharacter = input[i];
            let nextCharacters = nextCharacter === "*" ? alphabet : [nextCharacter];
            for (let j = 0; j < nextCharacters.length; j++) {
                let newPrefix = prefix + nextCharacters[j];
                let remainingInput = input.substring(0, i) + input.substring(i + 1);
                addPermutations(newPrefix, remainingInput, results, minLength, mustContain);
            }
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
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            const allText = rawFile.responseText;
            let textArray = allText.split("\r\n")
            dictionary = new Set(textArray);
        }
    }
    rawFile.send();
}

readDictionary();
