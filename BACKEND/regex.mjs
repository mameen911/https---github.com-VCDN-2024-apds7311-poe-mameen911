export class RegEx {
    // Method to test if a string contains only numbers
    static testNumbers(string) {
        const pattern = '^[0-9]+$';  // Pattern matches only digits
        const regex = new RegExp(pattern);
        return regex.test(string);  // Return true if string matches the pattern
    }

    // Method to test password strength (must include uppercase, lowercase, digit, and special char)
    static testPassword(string) {
        const pattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'; 
        const regex = new RegExp(pattern);
        return regex.test(string);  // Return true if string matches the password strength pattern
    }

    // Method to test if a string contains only alphanumeric characters or spaces
    static testAlphanumerical(string) {
        const pattern = '^[a-zA-Z0-9 _]+$';  // Pattern allows letters, numbers, and spaces/underscores
        const regex = new RegExp(pattern);
        return regex.test(string);  // Return true if string matches the pattern
    }

    // Method to test if a string contains only alphabetic characters and spaces
    static testAlphabet(string) {
        const pattern = '^[a-zA-Z ]+$';  // Pattern allows only letters and spaces
        const regex = new RegExp(pattern);
        return regex.test(string);  // Return true if string matches the pattern
    }

    // Method to test if a string contains special characters (anything other than letters and numbers)
    static testSpecialCharacters(string) {
        const pattern = `[^a-zA-Z0-9'"]+`;  // Pattern matches any non-alphanumeric characters
        const regex = new RegExp(pattern);
        return regex.test(string);  // Return true if string matches the pattern
    }

    // Method to test if a string represents a valid currency code (3 uppercase letters)
    static testCurrency(string) {
        const pattern = '^[A-Z]{3}$';  // Pattern matches exactly 3 uppercase letters
        const regex = new RegExp(pattern);
        return regex.test(string);  // Return true if string matches the currency code pattern
    }
}
