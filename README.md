Run all commands in your terminal/powershell

# Install dependencies
This function uses an external library caled mailparser -> https://github.com/nodemailer/mailparser

For this to function you must install that dependency by doing:

`$ npm install`

You only need to do this after cloning the repo the first time.

Please ensure you only run email-parser.js from this director - moving the file around will result in it losing reference to mailparser dependency.

# How to run
After you have installed dependencies, run 

`$ node email-parser.js path/to/emls`

This will generate a text file for you. 

For more help and aditional options and examples run:

`$ node email-parser.js -h` 
