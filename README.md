Task:
    Create a notepad SPA (single page application) with a react and redux front-end and a rest API that uses a postgres, mysql, SQLite or Neo4j database to store notes. The project must meet the following requirements:

    Written in es6 (use babel)
    Use webpack for packaging client side code
    expressjs
    node
    npm/yarn
    React
    Redux
    Use postgress, MySQL or SQLite to store notes
    Deploy publicly somewhere (eg. Heroku, AWS ElasticBeanstalk, private server, etc..)
    Implement a ReST note management API with the following specification:

# Add a note
POST /note/add

# Get notes, optionally specifying GET parameters where:
# limit - indicating the maximum number of notes to get; if unspecified it gets all notes
# order - specifies what order to sort the notes, based on creation time which can be either "asc" or "desc"; if unspecified, defaults to descending
# start - specifies where in the sorted notes to begin getting notes; if unspecified, defaults to 1
# limit - specified the maximum number of notes to get
GET /note?limit=10&start=1&order=asc

# View a note with a given id
GET /note/:id

# Update a note with a given id
PUT /note/:id

# Delete a note with a given id
DELETE /note/:id

    Use the ReST API detailed above from your front-end React SPA

Bonus:

    Use graphql and relay to make requests (note a ReST api must still be provided)
    Use auth0 to provide authentication and restrict users to only being able view, add and create their own notes. This will require modifying the ReST API to allow specifying the user (eg. GET /note/:id becomes GET /:user/note/:id and so on. Additionally there must be an additional route to authenticate the user.
    Allow users to use markdown and show a live preview of the resulting document
    Allow users to download a PDF copy of their note
    Create a react-native application to manage a users notes that uses the note api that was written for this assignment
    Create a native desktop app using your application and elecron
    Use SASS for CSS
    Use CSS animations and transitions to provide a nicer user experience

Install:
    npm install
    
Run:
    npm start
