# Task Manager - Powder

## Hello
This repository contains a front-end React webapp - a task manager.

The front-end framework used is `Next.js` with `TSX`, but there is no advantage over using a plain `npx create-react-app`,
considering that everything is running locally on a single page

I've voluntarily kept the dependencies to a bare minimum :\
`Next` + `React` ( + `react-icons` ) + `Tailwind`

## Live Demo
A running demo can be seen [here](https://test-technique-powder.vercel.app/).

![screenshot](https://github.com/wSzki/test_technique/assets/59784520/95ea5579-ab37-4f7d-bf31-6903bd0f8a03)

## Build and run

#### Dependencies
`make`\
`docker`\
`docker-compose`

The deployment of this app has only been tested on Linux NixOS 23.05


#### Building the app
```
git clone https://github.com/wszki/test_technique test_technique_wsz
cd test_technique_wsz
make
```
The app is set to run on `port 9999`.

http://localhost:9999

If your port 9999 is not available, you can change it by modifying the `NEXT_PORT`
in `/Makefile` to `NEXT_PORT = YOUR_PORT:9999`

#### Rebuild and run the app
```
make re
```

#### Build and run the app in production mode (`NODE_ENV=production`)
```
make re -e PROD=1
```

#### Shutdown the app
```
make down
```
Remember to explicitly kill the container as it is kept running in the background

#### Removing the containers and the downloaded docker images
```
make clean
```


#### Clearing localStorage
Visit http://localhost:9999/?clear=1 and refresh the page
Note that it only works in dev mode.

---

## Assignment
To evaluate your understanding of ReactJS, component structuring, state management, and your ability to create responsive and user-friendly interfaces.\
Create a simple React application called "Task Manager" that allows users to add, delete, and mark tasks as completed.\
Code Structure: Proper component structuring, modularity, and clean code.

Functionality: Ensure all requirements are met and the application works without bugs.\
UI/UX: Intuitive design, ease of use, and mobile-responsiveness.

Bonus: Implementation of optional features.

You have 48 hours from the time of receiving this test to submit your solution.

```
# Requirements:

Main Page:

# Display a list of tasks.
[✅] Each task should have a title, description, and a status (Pending or Completed).
[✅] Provide a button or icon to delete a task.
[✅] Provide a button or checkbox to mark a task as completed.

# Add Task Form:
[✅] Create a form to add new tasks.
[✅] The form should have input fields for the task title and description.
[✅] Validate the form to ensure that the title and description are not empty.
[❗] Display a success message upon successful addition and an error message for any validation failures.
 ->  Success message has a bug, so it has been deactivated

# Responsive Design:
[✅] Ensure the application is mobile-responsive. It should look and function well on both desktop and mobile devices.

# State Management:
[✅] Use React's built-in state management (useState, useContext, etc.) to manage the tasks.


# Bonus (Optional):
[✅] Implement a search functionality to filter tasks based on their title or description.
[✅] Use localStorage to save the tasks and ensure they persist even after a browser refresh.


# Submission:
[✅] Push your code to a public GitHub repository.
[✅] Include a README file with instructions on how to set up and run the project.
[✅] Share the link to the repository with us for review.

```
