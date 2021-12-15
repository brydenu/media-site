/**
 * Used in the search page to not let any cards be too long
 * and make them look distorted/mess up the styling.
 */

export default function shortenText(input) {
    if (input.length > 50) {
        return input.substring(0, 50) + "...";
    }
    return input;
}
