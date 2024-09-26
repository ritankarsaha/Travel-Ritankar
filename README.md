### OVERVIEW OF THE APPLICATION:- 

Personalized Travel Itinerary Generator:-

INTRODUCTION:-

The application is designed to generate highly dynamic travel itineraries based on user preferences such as budget, interests, trip duration, and location. Users can update their preferences in real-time, and the backend responds by dynamically generating new itineraries. One standout feature is a custom-built workspace, similar to Notion, where users can add and manage personal notes about their travel plans and itineraries.

Key Technologies Used & Justifications:

Frontend:-

 Next.js: Utilized for its server-side rendering and static site generation, making the application fast and SEO-friendly. It also provides better performance for dynamic content like travel itineraries. Its support for static generation ensures that the website remains responsive under heavy traffic.
Prisma: Chosen as the ORM to interact with the Postgres database. Prisma simplifies database operations with its type-safe queries and migrations.
Zod: Used for schema validation to ensure that user input and data exchange between the frontend and backend are well-structured and error-free.
NextAuth: Implemented for custom authentication, allowing users to securely log in and access their itineraries. This provides a smooth user experience with a custom login flow.

Backend:- 

Golang with Gin Gonic: The high-performance backend is built using Go for its concurrency features and Gin for its lightweight routing. This ensures fast API responses, even under heavy traffic. 
Golang’s fast execution speed, minimal runtime and efficient memory management is crucial for handling multiple user requests simultaneously. It is highly efficient in terms of performance and memory management, making it an ideal choice for production-grade backends. 
Gin is a minimalistic framework that provides only the necessary tools without excessive overhead. Its excellent performance and clean syntax make it suitable for building RESTful APIs that handle a large number of requests with low latency.
The backend is robust and is properly segregated into different folders for proper understanding and offers the right balance of performance, scalability and simplicity.

The entire application is completely dockerized and Makefile has also been created for the website for smooth developer experience.


Databases:-

MongoDB’s NoSQL architecture is ideal for handling the dynamic nature of data in this project.
MongoDB is used for storing flexible data, such as user itineraries and activities.
Postgres serves as a secondary relational database to store structured data, like user profiles and history. The combination ensures optimal performance depending on the data structure, also scales and optimizes the application to the next level.


Dynamic Itinerary Generation:

Users can update their preferences (e.g., budget, interests, trip duration) at any time, and the backend generates a new, personalized itinerary in real-time. Features for updating the personalized notes are also available with a top-notch UI/UX.

Load Balancer in Golang:

Integrated to ensure the application scales efficiently under increased load, distributing traffic between multiple backend instances. 
The use of a load balancer ensures fault tolerance and high availability. 
This guarantees that users can interact with the platform without any downtime, even during high traffic peaks especially keeping the travel seasons.
The Load Balancer distributes the load evenly between the frontend and backend servers, as well as between the two databases, ensuring optimal performance and resource utilization.

Special Features of the Website:

The user has access to a custom built Notion-like workspace where they can add personal notes about their trip. This custom-built feature enhances the user experience by offering a centralized space for managing their plans beyond the automated itineraries.
Custom Middleware: We developed custom middleware for handling authentication, error responses, and request logging, ensuring that the application is both secure and easy to monitor during production.
Load Balancer in Golang to ensure optimal user performance even during peak hours.
The application integrates Stripe to manage a subscription model, offering premium features like exclusive itineraries or additional storage for personal notes after the user has generated 3 automated itineraries. This allows for seamless payment processing and recurring billing, enhancing the user experience with monetization options.

Challenges & Solutions:

Handling dynamic data updates: When users modify their preferences, the backend dynamically generates a new itinerary by querying the activity database in real-time, optimizing based on budget and interests. To solve this, the backend handles concurrent requests and uses efficient data fetching techniques (like indexed queries in MongoDB).
Custom Authentication: Creating a seamless custom login using NextAuth involved 
           the default behavior to match the user experience. 
SEO and Performance: The choice of Next.js made it easier to optimize for SEO, but integrating it with the backend while maintaining performance for both SSR and CSR (client-side rendering) required fine-tuning. This was addressed by leveraging Next.js’s API routes and caching techniques.
Creating the Notion Inspired Workspace for Notes Keeping - The entire workspace has been completely built from scratch and is one of the best features integrated in this website which provides the user with a sense of personalisation and helps in efficient tour-management.
Creating the LoadBalancer In Golang:- Used the Round-Robin Algorithm over here. The Round Robin method evenly distributes the requests in a cyclic manner across available servers. Additionally, goroutines are used to handle each request concurrently, allowing the Load Balancer to process multiple requests simultaneously without blocking. This ensures smooth load distribution, enhanced scalability, and performance under heavy traffic.


 Improvements & Future Plannings for the Website:

AI-driven Suggestions: A potential improvement could involve implementing an AI model that analyzes the user’s preferences and past itineraries to suggest destinations and activities automatically. When a user selects a destination, the AI could suggest places and activities based on similar user profiles or historical data.
Enhanced Collaboration Features: Expanding the Notion-like workspace to allow multiple users to collaborate on a shared itinerary, such as group travel planning, could further enhance the user experience.
Data Analytics: Implementing an analytics dashboard for users to visualize their past travel preferences, budgets, and destinations could help with better decision-making for future trips.
Caching: Implementing Redis caching for frequently accessed data can further optimize response times and reduce load on the database.
Event-Driven Architecture: As the project scales, we could shift to an event-driven architecture using message brokers like Kafka to handle booking confirmations and payment processing asynchronously.
Two Way Backend:- Creating a two way backend (preferably in Rust) and run the backend in parallel to the Golang Backend via parsing it through the Load-Balancer.



This architecture syncs the frontend servers, backend servers and the databases with the help of the load balancer running in sync to them and  balances scalability with user-centric features.


### Steps to Reproduce:-

To Reproduce the effects you need to start and connect all the servers at first.

# Backend
First you need to setup the .env files and the env variables.

```bash
SECRET_KEY="ritankar"
DEBUG=True
MONGO_DATABASE="your mongodb url"
PORT=8000
```


```bash
cd backend
go run cmd/main.go
```

This starts the backend server. Golang needs to be installed on your PC for successfully running the backend.


# LoadBalancer

```bash
cd loadbalancer
go run main.go
```

This starts the loadbalancer. You need to mention the URLS in the loadbalancer of the respective backend and frontend servers.

# Frontend


First you need to setup the .env variables for the frontend

```bash

NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="somesecret"
DATABASE_URL="your postgres database url"
GITHUB_CLIENT_ID="your github client id"
GITHUB_CLIENT_SECRET="your github client secret"

GOOGLE_CLIENT_ID="your google client id"
GOOGLE_CLIENT_SECRET="your google client secret"
```

Then follow these steps:- 

```bash
cd frontend
npm install
make
npx prisma db push
```




The entire code is completely dockerized. Postgres 16 image should be present for the second way backend. If you don't have Postgres16 docker will start downloading the image. The necessary makefile has also been created.


The site will be finally up and running. If you face any issues feel free to communicate / open up a discussion.