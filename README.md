INTRODUCTION:
For this project, I used Vite+React, and the dependencies I installed are: react-icons and uuid.
I did not use redux because the project is a small one, and it would ve too excessive. I settled for contextAPI, although I did not use it much.

DESIGN EXPLANATION:
I did not want the project to just look bland, so I decided to include the navbar, just like the one in the teachmateAi site, although I had to use css to replicate the logo since I couldn't download it.

For the dashboard, I decided to use a grid system of two children, one for the dash navigation, and the other for the dashboard's table (although the nav did not contain much, since it's just a test project and only one page was built). For smaller screens, the grid will have only one child, and the dash nav will become fixed to the screen, with a toggle button at the top (in the header element) for showing or hiding the dash nav

I made used of the table element for the dashboard, and had to set specific "min-width" for its columns, so that the table's content will appear well on smaller screens. Then to avoid the data from being truncated, I set the table's container to an overflow value of "auto", so has to allow the user to scroll the table to view the overflowing columns.

HOW DASHBOARD WORKS:
Since there was no fetching of tasks, I created dummy tasks in the data.js file, and once the user opens the dashboard, the tasks are saved to the local storage, so that it will persist. Also, any change to the tasks list is upadated in the local storage. 

For creating of tasks, I initially planned on using a modal for that, but then I got a more better idea, allow the users to edit straight from the table, instead of using a modal. To make this happening, I placed a button for making the content in the individual rows edittable. Once the user hits that button, the contents becomes edittable. Once the user is done editting, the changes are saved. The row can then be locked back to prevent accidental editting.

Before a user can delete task, a dropdown drops to confirm the choice of deleting. If confirmed, the task is permanently deleted.

Also, filters and pagination was also implemented. Pagination is also based on the filtered items. Each page displays 10 tasks at a time. This is to prevent th user's window from filled with too many tasks at once.


