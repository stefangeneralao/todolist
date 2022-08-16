# Todo list

## Install and run backend

Install all dependencies by navigating to `server` and execute `yarn`.

In order to connect to the database, i.e. MongoDB, you're required to obtain the appropriate access keys. You may use your own keys and configuration, alternatively contact stefan.generalao@gmail.com to receive access using a test account.

The database credentials should be placed in `.env` within the `server` directory in the following format:

```
DB_USER=<this_is_a_user>
DB_PASSWORD=<this_is_a_password>
```

Now you're ready to start the development server, just execute `yarn dev` and off you go 🚀

## Install and run frontend

Install all dependencies by navigating to `app` and execute `yarn`.

The frontend will attempt to call the backend at `http://localhost:3001`. You may define your own address by creating a `.env` file within the `app` directory and using the following format:

```
VITE_SERVER_URL=<the_address_of_your_choice>
```

Execute `yarn dev` to start the development server. Have fun!

## Checklist
- [X] Add new lists
- [X] Add a task with a name and a description to specific lists
- [X] Delete a task
- [X] I can view all lists in different columns
- [X] Name a list
- [X] Update the name and description of a tasks within a list
- [X] Delete a list

+Points
- [ ] Sort specific lists
- [ ] Filter in all tasks in all lists based on name
- [X] “Transfer” an item between lists. Ex in a Todo list, from undone -> done
- [X] Drag and drop an item between lists
- [X] State management
- [X] Modern design
- [ ] Reasonable unit tests

++++++++Points (for fun)
- [X] Save tasks to a user in a db
- [ ] Create a login and show tasks based on the user
- [X] Fancy animations
- [X] Responsive design
