
    Add scroll to top and bottom buttons in database
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
    butternutbakeryblog
    preppykitchen
    maplewoodroad

SITES THAT DONT WORK
	inspiredtaste
    simplyrecipes


KNOWN ISSUES:
	publish date in other info column isn't formatted (sometimes)
	yield sometimes just shows a number, with no indication of what the number means
    sign up page looks wonky



Recipebookpages - Stores the pages that each individual user has liked as a foreign key to the userID and foreign key to the recipeID
Kitchen - Stores the kitchenID, primaryUser (fk to a userID), secondaryUser1 secondaryUser2 secondaryUser3 secondaryUser4 (fks to userIDs), and oneUser (bool that indicates whether the kitchen has only one user or not)
KRBP (Kitchen Recipe Book Pages) - Stores the info about what kitchens have saved what recipes as a fk to kitchenID and a fk to recipeID

Scrapbook: up to 10 images, recipe used, users who made it, notes and rating from users who made it, comments from others


userliked should be likedstate w/ 4 states
    none, user, kitchen, all