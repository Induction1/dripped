
function getMessageUpToString(message, searchString) {
    const index = message.indexOf(searchString);
    if (index !== -1) {
        return message.substring(0, index + searchString.length);
    }
    return message;
}

function getMessageAfterString(message, searchString) {
    const index = message.indexOf(searchString);
    if (index !== -1) {
        return message.substring(index + searchString.length);
    }
    return message;
}

export function amazonMessage(message, starting, stopping) {
    return getMessageUpToString(getMessageAfterString(message, starting, stopping));
}