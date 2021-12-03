export default function shortenText(input) {
    if (input.length > 30) {
        return input.substring(0, 30) + "...";
    }
    return input;
}
