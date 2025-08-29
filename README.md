
    Make recipe book look like it’s sitting on counter
    Change mini cards, not green, square, image instead of ingredients
    Five rows of 5 mini cards (maybe 10)
    Include image frame with image at bottom of big cards
    Add scroll to top and bottom buttons in database
    Each part of the kitchen should be its own component 
    Recipe book looks like a book, small buttons in corner of screen that are flip page buttons, 
        button at top right to close book and top left to change to grid view, 
        small word “Expand” in bold at bottom of both pages that when clicked on takes to full recipe card
    Grid view will look like recipe database, should have a search bar at top
    Change how search looks, dropdown menu especially 
    Add filter by form
    Change prompt box so it handles its own display
    Recipes table needs to have an img_url field
    Pages table needs to be renamed to RecipePages
    RecipePages table should have a date saved as well as notes
    Kitchen table with field for primary user and four extra users and a field that indicates if the kitchen has more than one person in it 
    Each user should have a foreign key with the kitchen they’re in 
    Instead of querying for users likes when looking at saved recipes should query for kitchen likes, with toggle to show just your likes
    Each user needs personal randomly generated kitchen code (person can use this to add you to their kitchen)
    Achievements Table and User Achievements Table
    Get actual good assets for kitchen
    Scrapbook (users should be able to post pictures of their food with links to the recipes they used, notes, and a rating, others in the kitchen can also rate the food and write notes)
    Let users add recipes to personal kitchen
    Let users leave others kitchens 


    Refactor website code
    Improve/test recipe parsing
    Look into making sure database is secure
    Tweak layout/colors
    About Us
    Account management page (change username/password/email, set first and last name, set birthday, delete account)
    Figure out email verification 
    Figure out process for letting users upload to site database 


    then figure out how to properly deploy a code base and database and we r cooking (literally)


SITES THAT WORK (AS FAR AS IVE TESTED):
	allrecipes
	pinchofyum
	modernhoney
	sallysbakingaddiction
	inquiringchef
	livewellbakeoften

SITES THAT DONT WORK
	inspiredtaste


KNOWN ISSUES:
	publish date in other info column isn't formatted
	some sites (sallysbakingaddiction, inquiringchef, livewellbakeoften) have the author listed as a long url, which is both not helpful and also messes up the look of the column
		I think this has something to do with the way we parse the author name, it needs to use the @id field as a last resort if name field is not available
	yield sometimes just shows a number, with no indication of what the number means
	cooktime is formatted wrong
	if parsing fails recipepython should send back a message of "FAILURE" but currently if it does homepage doesn't prompt the user or do anything about it
		also there are def some cases where recipepython will encounter unhandled errors, which won't shut the server or site down, but the user won't be notified
    a lot of recipes don't correclty parse cuisine or category for some reason











~~Current things we need to do:~~

~~Need to make a dialog modal that prompts the user to signup/login and save their recipe to their account or tells the user if something went wrong when saving a recipe
	(i.e., they've already saved that recipe). When this is finished it would be good to have cookies saved of the current generated recipe so it doesn't disappear when the user clicks off
	the page, though I feel like this is going to be an annoying process and maybe we skip it for now????~~

~~When users sign up it prompts them if the information they provided is invalid, but it should tell them which information is invalid, like if the username has been taken, the email
	is wrong, or their password is too short.~~

~~When users log in it should prompt them if their information is incorrect~~

~~After this need to start work on refactoring some of the React components, as the code needs cleaned up~~
~~Then, need to work on cleaning up the parsing of recipes and confirming that it works with all/most sites~~

~~THEN, can start on kitchen~~




~~What needs to happen when parsing recipes is:~~

~~First we check if the recipe is already in the database, if it is we set up the return_dictionary from there
	If it isn't, we parse it from the data we got from the website and set up the return_dictionary
	Then, we put it in the database
	*The userLiked field is always set to the string 'false'*~~

~~If the recipe was already in the database, we check the username of the user requesting to save
	If the user is logged in, we query the database for the user and get their savedrecipes string
	Then, we check to see if the current recipe is in the savedrecipes string.
		If it is, we set the userLiked field to the string 'true'~~

Need error handling in python code for parsing!!!!!!!!!!!!
	~~To start, if you enter a nonsensical url...~~
	~~Need to make sure that parsing doesn't error out if a key doesn't exist~~
	~~Need to get rid of doublesave and invaluser in saverecipe as it shouldn't be able to happen anymore~~
