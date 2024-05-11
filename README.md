# Fullstack Task Manager
## **Technologies Used:**
- **Frontend:**
    - React (Vite)
    - Redux Toolkit for State Management
    - Headless UI
    - Material UI
    - Tailwind CSS

- **Backend:**
    - Node.js with Express.js
    
- **Database:**
    - TBD (recommended MongoDB)

&nbsp;

## SETUP INSTRUCTIONS
# Client Side Setup

1. Navigate into the client directory `cd client`.
2. Run `npm i` or `npm install` to install the packages.
3. Run `npm run dev` to run the app on `http://localhost:3000`.
4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

&nbsp;


## Pages Component Breakdown: 

### **Pages**
1. Dashboard.jsx
    - Holds Statistical data and quick info data related to the tasks for users. 
    - Count of Tasks, Recent Tasks, Current active users
    - Overview of current projects (needs implementation)

2. Tasks.jsx
    - Holds tasks for specific user only. 
    - Can toggle between BoardView and ListView
    - Can search for tasks
    - Can filter based on progress, priority, and created at columns
    - Add task button (needs implementation)

3. GlobalTask.jsx (needs implmentation)
    - same functionality as Task.jsx but all user tasks available to view

4. TaskDetails.jsx
    - uses task ID to open a more detailed page of Task info
    - Can view general task details: Team members, sub tasks, assets for tasks
    - Adding a sub task, adding a team member, adding asset files (needs implementation)
    - Completion check for Subtasks (checkmark box for each) (needs implementation)
    - Edit task button (needs implementation)
    
5. Users.jsx -> ADMIN VIEW ONLY
    - A list of all users currently using the app, ability to edit user features (e.g roles) or delete a user

6. Projects.jsx -> MANAGER/ADMIN ROLES (Needs heavy implementation)
    - A place for managers to create and assign projects
    - If a user is assigned to a project, for task adding on task page, they should be able to select which project to assign a generated task to (use a dropdown to show which projects exists and let user select from available options, default -> NA)
    - Projects should have a unique project ID 
    - A user can have a total of 5 projects at a time, if a user is currently at max, block the option to add that user to a new project creation. 
    - represent the project data and implement more data to be shown for the project section
    
7. KPI - Key Performance Index
    - TDB
    
8. Calendar.jsx
    - Most likely google calendar API integration -> for now TBD.
    
9. Trash.jsx -> ADMIN VIEW ONLY
    - Ability to delete tasks permanently or restore deleted tasks. 
        
    
#important: 
Each page utilizes a number of different generated components. carefully study them to see how they are utilized and contact me for questions -> mahir@paragon.com.bd 


## ** Features Implementation Progress **
1. **User Management:** (0/2)
    - Create admin accounts.
    - Add and manage team members.

2. **Task Assignment:** (0/2)
    - Assign tasks to individual or multiple users.
    - Update task details and status.
    - Assign team members to tasks
    - Add column for which project task is assigned to (if no project -> "NA" indication)
    - Add a new Task button functionality

3. **Task Properties:** (2/3)
    - Label tasks as todo, in progress, or completed.
    - Assign priority levels (high, medium, normal, low).
    - Add and manage sub-tasks.

4. **Asset Management:** (0/2)
    - Upload task assets, such as images.
    - Change Task Assets view from img -> {icon} - Filename.filetype

5. **User Account Control:** (0/5)
    - Disable or activate user accounts.
    - Add a new account
    - Login and Logout Account
    - User Differentiated Data
    - Permanently delete or trash tasks.


## **User Features:**
1. **Task Interaction:**
    - Edit Task information/Delete Tasks
    - Change task status (in progress or completed)/high-med-low priority change
    - View detailed task information with Timeline


2. **Communication:**
    - Add comments or chat to task activities.
        - Edit timeline to also mention which team member posted a comment

## **General Features:**
1. **Authentication and Authorization:**
    - User login with secure authentication.
    - Role-based access control.

2. **Profile Management:**
    - Update user profiles (name, image, password)

3. **Password Management:**
    - Change passwords securely.

4. **Dashboard:**
    - Provide a summary of user activities.
    - Filter tasks into todo, in progress, or completed.
    
5. **Projects**
    - View current Projects
    - Create Manager role to assign projects
    - Create detailed ProjectDetails.jsx page
    - Project Task features 

