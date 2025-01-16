// Step 1: Access command-line arguments
const args = process.argv.slice(2);

// Step 2: Parse flags from arguments
let length = 8; // Default length
if (args.includes('--help')) {
  console.log(`
Usage:
  node index.js [--length <number>] [--uppercase] [--numbers] [--symbols]

Options:
  --length <number>    Specify the length of the password (default: 8)
  --uppercase          Include uppercase letters in the password
  --numbers            Include numbers in the password
  --symbols            Include symbols in the password
  `);
  process.exit(0); // Exit the program after showing help
}

if (args.includes('--length')) {
  const lengthIndex = args.indexOf('--length') + 1;
  const lengthValue = parseInt(args[lengthIndex], 10);

  if (isNaN(lengthValue) || lengthValue <= 0) {
    console.error('Invalid length specified. Please provide a positive number.');
    process.exit(1);
  }

  length = lengthValue; // Update password length
}

console.log(`Password length: ${length}`);

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
  
  // Step 4: Parse additional flags
  const options = {
    uppercase: args.includes('--uppercase'),
    numbers: args.includes('--numbers'),
    symbols: args.includes('--symbols'),
  };
  
  try {
    const password = generatePassword(length, options);
    console.log(`Generated Password: ${password}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }

  