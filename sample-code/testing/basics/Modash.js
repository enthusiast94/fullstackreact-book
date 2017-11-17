// We write the Modash library in this file in the Unit Testing chapter

const truncate = (content, length) => {
    if (content.length <= length) {
        return content;
    } else {
        return content.substring(0, length) + "...";
    }
};

const capitalize = (content) => {
    if (content.length == 0) {
        return content;
    }

    return content.charAt(0).toUpperCase() + content.substring(1, content.length).toLowerCase();
};

const camelCase = (content) => {
    const words = content.split(/[\s\-_]/);
    return words
        .map(word => word.charAt(0).toUpperCase() + word.substring(1, word.length).toLowerCase())
        .reduce((word1, word2) => word1 + word2);
};

const Modash = {
    truncate,
    capitalize,
    camelCase
};

export default Modash;