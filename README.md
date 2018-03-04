# weblightProject
This is a sketch for controlling our 2nd year project. Not everything is optimised in this version, but will be in the next.

To get this thing running you will need 'node.js' with 'npm' and 'mongodb' installed on your computer, then follow these steps:
1. In MongoDB create a database called 'weblightDatabase' and make 3 collections inside called: 'lightBulb', 'plug' and 'switch'.
2. Insert data in those according to the structure of models in models folder.
3. Run 'mongod' in shell.
4. After that you may run 'index.js' file from node.
5. If everything works as expected, open web browser and enter: 'http://localhost:3000/'

KNOWN ISSUES:
none for now

FUTURE FUNCTIONALITY:
-Scheduler to turn devices on or off depending on time.