# DoggoWalk

React.js website: http://52.7.196.103

APK mobile:

Doggowalk is a cutting-edge solution for pet owners and dog walkers alike. With the power of mobile live tracking, our app makes it easy to keep an eye on your furry friend's walks, no matter where they are.

At the heart of our solution is the WebSocket protocol, which allows for real-time communication between our mobile app and our server. By leveraging the power of NodeJS on the server side, we can process and store all of the tracking data generated by our users' walks.

On the front-end, we use React and React Native to create a seamless user experience that's easy to use and provides all the functionality that both pet owners and dog walkers need. With our app, pet owners can view their dog's walk routes, get alerts when their dog has completed a walk, and view the status of their account, while dog walkers can easily manage their schedules, view walking routes, and track their earnings.

In short, Doggowalk is a comprehensive solution that leverages the latest in mobile tracking technology, server-side processing, and front-end development to create a powerful app that's both intuitive and easy to use.


![236717864-189552e1-64f7-4912-ae14-2a345aca2b81](https://user-images.githubusercontent.com/98602969/236718108-800d42ed-9fc3-4550-96fa-2be01b2a03f0.png)

## software engineer

### Architecture

In a Node.js architecture based on SOA ( Service-Oriented Architecture), the system is divided into several layers, each with its own set of responsibilitie to keep a clean project:

Routes (Endpoints): The first layer is responsible for handling incoming HTTP requests. Each endpoint is responsible for performing a specific action in response to a request.

Websocket/Sockets: In addition to the RESTful API, the architecture may also include a layer responsible for handling real-time communication between clients, using websockets.

Validators: The second layer is responsible for validating the incoming request data before it is passed on to the service layer. This layer ensures that the request data is valid, consistent, and meets the necessary requirements of the system.

Services: The third layer is responsible for performing business logic and interacting with other services or data stores. This layer contains all the necessary business rules and algorithms to carry out the necessary tasks.

Repository: The fourth layer is responsible for interacting with the database or other data stores. This layer contains all the necessary code to interact with data stores and perform CRUD operations.

### Non functional requirements

#### Tools and enviroment

1. React.js 
2. React Native/Expo
3. Node.js (Express.js, ws)
4. MongoDB
5. CSS/SCSS

#### Security

SHA256 - All sensitive data will be only GET providing unique Token using the SHA256 algorithm, which ensures the confidentiality and integrity of the data.

Middleware - Requests to the server require a valid token, and a middleware function is implemented to verify if the user is authorized to make the specific request. This prevents unauthorized access to the system.

Form validation - All requests made to the server are passed through a validation function to ensure that the data is consistent and to prevent injection attacks, such as SQL injection and cross-site scripting (XSS).

Websockets - The Websockets protocol is used for live tracking of pet walks. Each conversation between clients is assigned a unique key, which restricts access to the data transmitted in that conversation only to the authorized clients. This ensures the privacy and security of the data.

### Functional requirements

User Authentication: 

  - The system should allow users to create an account, and select the role of account (walker,customer).
  
  - The system should allow users to log in using their credentials.

View Available Walkers:

  - The system should provide a list of all available walkers.
  
  - The system should show the walkers' names, picture and description
 
Solicitations:

  - The system should allow users to make a solicitation to a specific walker.
   
  - The solicitation should include the if it's active, accepted, created data, fromUser, toUse
 
  - The websocket protocol needs the solicitation id which is only accessible by granted users
   
  - The walker should be able to accept or refuse the solicitation.
  
 Share Location:
  
  - The system should allow users to share their location with the walker.
 
  - The admin should be able to manage the system settings and configurations
  
#### Use Cases

  - A pet owner: visits the DoggoWalk website and signs up for an account. They provide their name, email, and password to create an account. After create the account  they can book there a Walk with a professional walker, and also the pet owner will use the website to see pet's real time location.
  
  - A walker: visits the DoggoWalk website and signs up for an account. They provide their name, email, password, picture and description to create an account. After complete their profile they will need to install the mobile app for accept and share location to pet's owener


## React.js

[Front-end folder](/frontend/)

Install dependencies:

```npm install```

Build for production:

```npm run build```

## node.js

[Back-end folder](/backend/)

Install dependencies:

```npm install```

Start Server:

```npm start```

## node.js

[Back-end folder](/backend/)

Install dependencies:

```npm install```

Start using Expo:

```npx expo start --clear```
