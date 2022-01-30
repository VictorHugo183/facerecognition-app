# Face Recognition App
live version: https://facerecognition-app-1.herokuapp.com/<br>
Backend code: https://github.com/VictorHugo183/facerecognition-api

## Features:
<ul>
  <li>
    Secure user authentication using password hashing
  </li>
  <li>
    Facial detection in user submited pictures by using the Clarifai API
  </li>
  <li>
    Tracking number of successful facial detections per user
  </li>
</ul>

## Front end section:
The UI is built with React.js, state is handled by a few Class components which interact with a backend Node.js server, in order to perform actions such as registering a new user, handling user log in and making API calls to the Clarifai face recognition API.

## Back-end section:
<ul>
  <li>
    Uses bcrypt in order to encrypt user passwords
  </li>
  <li>
    Uses knex to facilitate SQL query building with PostgreSQL
  </li>
  <li>
    Uses Express middleware to simplify routing in our server
  </li>
  <li>
    Contains several endpoints which can be accessed by the front-end to perform actions such as fetching user data from the database, updating the database with new user information, and handling API calls based on data received from the front-end (image urls).
  </li>
  </ul>

