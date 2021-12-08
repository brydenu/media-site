export default function shortenText(input) {
    if (input.length > 50) {
        return input.substring(0, 50) + "...";
    }
    return input;
}
