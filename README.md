# Smart Career Guidance and Learning Roadmap Assistant

## 1. Project Title
Smart Career Guidance and Learning Roadmap Assistant

## 2. Project Description
An AI-powered web application designed to help students, fresh graduates, and self-learners make informed career decisions and follow structured learning paths. The system provides personalized career guidance, identifies missing skills, generates learning roadmaps, recommends resources, and assists users in preparing for technical interviews using Artificial Intelligence.

## 3. Problem Statement
Students often follow random tutorials and do not know which skills are required for their desired careers. Existing platforms provide static roadmaps and lack personalized guidance, skill-gap analysis, and adaptive recommendations.

## 4. Objectives
* Develop an intelligent career guidance platform.
* Generate personalized learning roadmaps based on users' career goals and existing skills.
* Identify users' skill gaps and recommend improvements.
* Provide AI-generated interview questions according to skill levels.
* Recommend learning resources that align with users' career objectives.

## 5. Features
1. **Authentication System:** Register, Login, JWT Authentication, Password Hashing.
2. **Dashboard:** Progress overview, career goals, saved recommendations.
3. **Career Goal Manager:** Select career paths, update skills.
4. **AI Learning Roadmap Generator:** Month-wise roadmap, project suggestions.
5. **AI Skill Gap Analyzer:** Missing skills, learning priority.
6. **AI Interview Question Generator:** Beginner to Advanced questions.
7. **AI Resource Recommendation System:** Documentation, tutorials, projects.
8. **AI History:** Track past prompts and recommendations.
9. **Progress Tracker:** Completion tracking.

## 6. Technology Stack
* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas, Mongoose
* **Authentication:** JWT, bcrypt
* **AI Integration:** Google Gemini API

## 7. Project Architecture
The project follows a standard Client-Server architecture using the MVC (Model-View-Controller) pattern for the backend. 
Frontend (HTML/CSS/JS) <--> REST API (Node.js/Express) <--> MongoDB Database. The backend also interacts with the Google Gemini API for AI features.

## 8. Folder Structure
```text
project-root/
│── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│── frontend/
│   ├── assets/
│   ├── components/
│   ├── css/
│   ├── js/
│   └── *.html files
│── docs/
│── Week01/ to Week14/
└── README.md
```

## 9. Installation Instructions
1. Clone the repository.
2. Navigate to the `backend` folder.
3. Run `npm install` to install dependencies.
4. Set up the `.env` file based on `.env.example`.
5. Run the backend using `npm run dev`.
6. Open the `frontend/index.html` file using Live Server.

## 10. Environment Variables
Create a `.env` file in the backend folder:
```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

## 11. How to Run Frontend
Open the `frontend` folder in VS Code and launch `index.html` using the **Live Server** extension. Alternatively, deploy the `frontend` folder to Netlify.

## 12. How to Run Backend
Inside the `backend` folder, run:
```bash
npm run dev
```

## 13. MongoDB Atlas Setup
1. Create an account on MongoDB Atlas.
2. Create a new cluster and database.
3. Allow access from any IP (`0.0.0.0/0`) or your specific IP.
4. Create a database user and get the connection string.
5. Update `MONGODB_URI` in `.env`.

## 14. Gemini API Setup
1. Go to Google AI Studio.
2. Generate an API Key.
3. Add the key to `GEMINI_API_KEY` in the `.env` file.

## 15. Deployment Instructions
* **Frontend:** Drag and drop the `frontend` folder into Netlify. Update the API base URL in `config.js` to point to the deployed backend.
* **Backend:** Connect the GitHub repository to Render and deploy as a Web Service. Add Environment variables in the Render dashboard.
* **Database:** Hosted on MongoDB Atlas.

## 16. API List
* `POST /api/auth/register`
* `POST /api/auth/login`
* `POST /api/auth/logout`
* `GET /api/profile`
* `PUT /api/profile`
* `POST /api/career`
* `GET /api/career`
* `PUT /api/career`
* `POST /api/roadmap/generate`
* `GET /api/roadmap/history`
* `POST /api/skill-gap`
* `POST /api/interview`
* `POST /api/resources`
* `GET /api/history`
* `GET /api/progress`

## 17. Team Information
* **Team Name:** CSE4104-7D-T06
* **Section:** 7D
* **Members:**
  * Koushik Adhikari (11200120493) - Team Leader & AI Integration Lead
  * Md. Shahidul Islam (11190120308) - Frontend Developer
  * Shaikh Fahaduzzaman Fahad (11210320649) - Backend Developer

---

## Weekly Progress

### Week 01: Team Formation and Initial Idea
Formed the team, brainstormed ideas, and finalized "Smart Career Guidance and Learning Roadmap Assistant" as the project topic.

### Week 02: Project Proposal
Prepared and submitted the detailed project proposal including objectives, problem statement, and expected outcomes.

### Week 03: Requirements Analysis
Analyzed system requirements and drafted the SRS document.

### Week 04: Architecture and Database Design
Designed the system architecture, Use Case diagrams, ER diagrams, and planned the REST API structure.

### Week 05: UI/UX Design
Created wireframes and mockups for the user interface.

### Week 06: Backend Development
Set up Node.js/Express backend, configured MongoDB, and implemented JWT authentication.

### Week 07: Frontend Development
Developed responsive HTML/CSS layouts and integrated them with the frontend structure.

### Week 08: AI Integration
Integrated Google Gemini API to implement personalized roadmaps and AI recommendations.

### Week 09: Feature Completion
Finalized core features including the Skill Gap Analyzer and Interview Question Generator.

### Week 10: Testing and Debugging
Conducted functional and API testing to ensure system stability.

### Week 11: Deployment
Deployed the frontend to Netlify and backend to Render.

### Week 12: Documentation
Prepared Final Report, User Manual, and updated API Documentation.

### Week 13: Presentation Preparation
Created presentation slides and prepared for the final demonstration.

### Week 14: Final Presentation and Viva
Presented the finalized project to the course instructor.
