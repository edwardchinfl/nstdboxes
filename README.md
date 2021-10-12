# nstdboxes
Code base for nstdBoxes

Architecture overview:
The objective is to enable users to click on any part of a HTML document to edit it directly.
To achieve this, a single html document is used as the container (index.html of nstdboxes.com) and within the body is a single div element which contains other div and p elements. (No other block elements are allowed in the current version).
Each box is made of a div element which contains a single p element. A box may also be added inside an existing box, making it a nested box.
The technical challenges are :
(a)  to enable boxes to be created, moved, deleted, cloned and styled using all the posssible style options recognised by the browser. This is achieved using basic javascript and CSS.
(b) to enable the nested box in the body to be saved to the an external storage (Cloud, browser storage) and to control view and edit access. This is done using Google Firebase Firestore services.
(c) to authenticate users with minimal friction. This is done using Google Firebase authentication services.
  
  
  
The main index.html file loads:
- a couple of javascript files (myfunweb.js which contains most the javscript functions; nstdbxs-data.js which contains the one-time definition of constants);
- third-party javascript files (xlsx.full.min.js and jszip.js) for processing excel spreadsheets
- several firebase js files  
- a couple of css files (nstdboxes.css and nstdboxes-circles.css)
- several fonts from fonts.google.com

When nstdboxes.com is launched, the first function that is loaded is drawAll() which
- sets up certain static objects
- defines certain global parameters
- builds the menu
- loads the Nested Box if one is specified eg https://nstdboxes.com?myfirstbox

If no Nested Box is specified, an empty box with the title "My New Nested Box" is presented.
  
From this point onwards, the user can add, move, clone, delete, sort, hide/reveal boxes using the icons on the B submenu.
- The best way to find out how each of these functions is implemented is to navigate fom the buildmenu function and study the javascript of each of the functions called.

More detailed explanation will be added shortly.
  
Edward Chin
12th Oct 2021.
  
  
