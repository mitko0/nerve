# Mitko Miloshovski, 173015 
### 'Web programming' project, FINKI
`This project represents simple social media app on which users can post challenges, reply to those challenges with a 
picture or a video. A challenge can be public, which everyone can see and reply to, or private in form of direct 
messages.`

# _Important_: A user can only get the `Sign in` and `Sign up` page if they are not authenticated, every invalid url leads to the `Error` page.

 - # Sign in
 After entering the URL of the page (localhost:3000), the user can see a sign in form. The site comes with 2 test 
 users and a `public user`:
 - User 1
    - username: `admin`
    - password: `6483`
    - `admin privileges`
 - User 2
     - username: `user`
     - password: `6483`
     - `simple user`
 - Public user
    - username: `public_user`
    - password: `6483`
    - `user for public posts`
    
 By clicking on the link `sign up`, the user gets a sign up form in which a new user can be created with the 
 `simple user` role. After signing in with the `admin` user, the user gets the `Homepage`.
 
 - # Homepage
 On the homepage there are 3 sections:
 1. Navigation section
 2. Posts section
 3. Advertising section
 
 
1. ## Navigation section
    Every button in this section takes the user to different part of the app:
    - Admin (available only to users with `admin privilages`) - admin tools page
    - Home - homepage
    - Direct neurons - direct messages/challenges page
    - Profile - page on which the user can update their own personal info
    - Sign out - sign out
    
2. ## Posts section
    This section contains all the non-expired public posts with their replies. This section is a `infinite scroll` 
    section.
   
3. ## Advertising section
    In here, we advertise the latest members to our page.
    
## `Post`  button
By clicking this button, the user gets a form with which they can post a new public challenge. The form consists of a
description field and a due date field for the challenge. Both fields are required. Each new post by the current user 
is displayed at the beginning of the post list. Each new post by other users, the current user gets by a `web socket`,
at the end of the current posts page.

## Challenges
A single challenge is constructed of 3 parts:
1. challenge details
2. replies
3. footer


1. ### Challenge details
    This part of a challenge has the details for the challenge, the description, the date the challenge was created, 
    the end date date of the challenge, and a `more` button/link that opens a modal with the same challenge details.

2. ### Replies
    Every challenge can have multiple photo/video replies and each reply consists of the replier's profile picture, 
    rating for the reply, delete button and the actual reply. Each reply can be rated by the challenge owner as a 
    measurement whether it was good or completely disastrous or deleted be the the challenge owner or the reply owner.
    
3. ### Footer
    Here a user can add a reply to a challenge. After replying to a challenge, the challenge is added to the end of 
    the current challenge list for all the users (except the challenge owner). This makes sure that everyone gets the 
    latest reply for the challenge.
     
- # Direct neurons
This section contains the private messages for the current user. On the top of the section there is a giant button 
that opens a form in which the user can search and select the users they want to send a private message to, along with
 the description for the message/challenge and the due date field (try searching for `user` or `admin`). By clicking 
 on a 'message row', the user can see all the messages/challenges they shared with that user. Each day two users share
 a private challenge AND respond to each others's challenges, they gain 1 streak point. Those points are lost even if 
 they miss a single day of not challenging or replying to each other. But after that, they can start a new streak, so
 its okay :). The streak updates every 24h if the users don't forget to reply to each other.

- # Profile
This section of the app allows users to update their profile picture, username, email address and password. At the top
 of the page the users can see the points gained by replying to public challenges. The more you reply, the more points
 you get. By clicking on the camera icon, the user can select a new profile picture (the picture can be 'full 
 screened' by clicking on it), but it is updated only if the user clicks on the save button. For every other personal
 info the user can fill the form bellow the profile picture. If a field is left blank, that field isn't updated. But 
 to update their info, the old password is required.
 
- # Admin
This section is only visible to users with `admin privileges`. An admin can create a new role. In here an admin can 
search for a role (try `ADMIN` or `USER`) and select it to see all the users with that specific role. Another thing is
 that an admin can promote a user to the selected role, which automatically removes that user from their previous 
 role. An admin can also delete a role (every other role than `ADMIN`) and a user.