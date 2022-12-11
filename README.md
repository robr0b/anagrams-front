This is the frontend for https://github.com/robr0b/anagrams-back

This is a React app for finding anagrams based on a word and a given wordbase.

To install the dependencies run:

npm i

To run the app:

npm start

How to use the app:

1. Create an account by navigating to the Register page on the navigation bar
2. Pick an email (does not have to be a real email, only the format has do be valid: email@email.com)
3. Pick a password (8 characters, one lowercase, one uppercase and a number)
4. Click register. You will be redirected to the index page
5. To start looking for anagrams, import a wordbase first by navigating to the Import wordbase page on the navigation bar
6. In the form, paste a valid link to a textfile similar to the example provided. Each word in the wordbase should be on a separate line
7. Click import wordbase. After seeing a success message, navigate back to the index page by clicking Find anagrams on the navigation bar
8. In the form, enter a word of your choice to look for anagrams. Click Find anagrams and see if there are any anagrams for that word. Notice that your token will expire in 20 minutes. To use the app after that you will be asked to log in into your account
9. After you are done, you may log out of the app by clicking log out in the top right corner
