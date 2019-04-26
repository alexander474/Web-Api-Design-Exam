# Web-Api-Design-Exam

### How to run
```bash
> yarn dev
> Open localhost:8080
> Login (email: a@a.no, password: a) or make you're own user
```

### Information and extras
* Homepage "/" shows the current posts posted by you or any of you're friends. 
* Chat shows you're friends on right side and by clicking on one of them you will se the chat
and could write messages that only you and the friend can see. if you send a web-address in a message
it will automatically translate to a link element.
* Button with the user name shows you're profile, friends and you're  own posts. Here kan you also
post messages and remove friends. You can also edit you're profile by clicking the edit button and 
you can change certain personal information.
* Requests displays people who have asked to be you're friend, here kan you accept or deny
* Search-bar is where you can search for other users by for example name, email etc... 
you can select a friend and you will then se the persons profile. You can se their details if you are friend
with them, if not then only the name and a button to add them as a friend (send a request) and they
get a request under their request page.

> Every time i used some inspiration from the course repository on github i added a mark first line in 
the file.

### Requirements
- [ x ] When the application starts, you must have some existing fake/test data representing valid
    users.
    Should be possible to register new users.
- [ x ] Each user should have a page displaying his/her information (e.g., name, surname, date of birth
    and location).
- [ x ] A user should be able to post new messages on his/her “timeline”, which should be displayed in
    chronological order together in the same page with the user’s info.
- [ x ] Should be possible to search for existing users.
- [ x ] Users can send “friendship” requests to other users. This latter will decide whether to accept it or
    not.
- [ x ] Two friends can see each other timeline / user-details, but not the ones of the other users they
    are not friend with.
- [ x ] The home of a user will be the merged timeline of all of his/her friends, in chronological order,
    updated in real-time (e.g., using WebSockets).
- [ x ] Should have a live-chat (using WebSockets) for friends.
- [ x ] When a message contains a URL (e.g., link to an external web page), that should be displayed as
    an actual clickable link. Pay particular attention to the security aspects of having such a
    functionality.





