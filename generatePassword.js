// generatePassword.js

// Step 1: Access command-line arguments
const args = process.argv.slice(2);

// Utility to display help message
const showHelp = () => {
  console.log(`
Usage:
  node generatePassword.js [--length <number>] [--uppercase] [--numbers] [--symbols]

Options:
  --length <number>    Specify the length of the password (default: 8)
  --uppercase          Include uppercase letters in the password
  --numbers            Include numbers in the password
  --symbols            Include symbols in the password
  --help               Display this help message
`);
  process.exit(0);
};

// Show help if requested
if (args.includes('--help')) {
  showHelp();
}

// Step 2: Parse options
const parseArgs = () => {
  let length = 8; // Default password length
  const options = {
    uppercase: false,
    numbers: false,
    symbols: false,
  };

  args.forEach((arg, index) => {
    if (arg === '--length') {
      const lengthValue = parseInt(args[index + 1], 10);
      if (isNaN(lengthValue) || lengthValue <= 0) {
        console.error('Error: Invalid value for --length. Please provide a positive number.');
        process.exit(1);
      }
      length = lengthValue;
    } else if (arg === '--uppercase') {
      options.uppercase = true;
    } else if (arg === '--numbers') {
      options.numbers = true;
    } else if (arg === '--symbols') {
      options.symbols = true;
    }
  });

  return { length, options };
};

// Step 3: Generate password
const generatePassword = (length, options) => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = options.uppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '';
  const numbers = options.numbers ? '0123456789' : '';
  const symbols = options.symbols ? '!@#$%^&*()_+[]{}|;:,.<>?' : '';
  const characters = lowercase + uppercase + numbers + symbols;

  if (!characters) {
    throw new Error('No character sets selected. Use flags to include character types.');
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
};

// Main script logic
try {
  const { length, options } = parseArgs();

  // Inform users of default behavior if no special flags are provided
  if (!options.uppercase && !options.numbers && !options.symbols) {
    console.log('No special flags selected. Generating a password with lowercase letters only.');
  }

  console.log(`Password length: ${length}`);
  const password = generatePassword(length, options);
  console.log(`Generated Password: ${password}`);
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
