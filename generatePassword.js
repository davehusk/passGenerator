// ✨ Password Generator CLI by David Husk ✨
// Hey there! This is a fun and simple way to make strong passwords. 🚀
// Let's make sure your accounts are super safe. 💪

// Step 1: Grab those command-line arguments 📜
const args = process.argv.slice(2); // Skipping the boring `node` and filename parts
console.log('🔐 Welcome to Password Generator CLI! 🔐\nUse [--help] if you’re stuck.\n');

// Step 2: Show help if someone asks for it 🤓
if (args.includes('--help')) {
  console.log(`
🌟 Usage:
  node generatePassword.js [--length <number>] [--uppercase] [--numbers] [--symbols]

⚙️ Options:
  --length <number>    📏 Set the length of your password (default: 8)
  --uppercase          🔠 Include uppercase letters
  --numbers            🔢 Include numbers
  --symbols            🛡️  Include special symbols
  --help               ❓ Show this help menu
  `);
  process.exit(0); // Bye-bye 👋
}

// Step 3: Default settings (because defaults are nice 😎)
let length = 8; // Default password length (short but sweet)
const options = {
  uppercase: false,
  numbers: false,
  symbols: false,
};

// Step 4: Parse the user’s options 🎛️
if (args.includes('--length')) {
  const lengthIndex = args.indexOf('--length') + 1;
  const lengthValue = parseInt(args[lengthIndex], 10);

  // Make sure the length is valid! 🧐
  if (isNaN(lengthValue) || lengthValue <= 0) {
    console.error('❌ Oops! Length must be a positive number.');
    process.exit(1);
  }

  length = lengthValue; // Update length with the user’s input
}

options.uppercase = args.includes('--uppercase'); // Add uppercase? 🔠
options.numbers = args.includes('--numbers'); // Add numbers? 🔢
options.symbols = args.includes('--symbols'); // Add symbols? 🛡️

// Step 5: Time to generate that password! ✨
const generatePassword = (length, options) => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'; // Everyone loves lowercase 🐤
  const uppercase = options.uppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : ''; // Fancy uppercase letters 💅
  const numbers = options.numbers ? '0123456789' : ''; // Good old numbers 🔢
  const symbols = options.symbols ? '!@#$%^&*()_+[]{}|;:,.<>?' : ''; // Symbols for the win! 🔐

  // Uh-oh! No characters selected? 🤔
  const characters = lowercase + uppercase + numbers + symbols;
  if (!characters) {
    throw new Error('⚠️ No character types selected! Use some flags, friend.');
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length); // Pick a random character 🎲
    password += characters[randomIndex]; // Add it to the password 🏗️
  }

  return password; // Here’s your shiny new password! ✨
};

// Step 6: Generate the password and show it! 🎉
try {
  if (!options.uppercase && !options.numbers && !options.symbols) {
    console.log('⚠️ No special options selected. Generating a lowercase-only password.');
  }

  console.log(`📏 Password length: ${length}`);
  const password = generatePassword(length, options);
  console.log(`🔐 Your password: ${password}`);
} catch (error) {
  console.error(`❌ Error: ${error.message}`);
  process.exit(1);
}
