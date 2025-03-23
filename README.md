This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Django Backend Setup

## Prerequisites
- Python 3.x
- pip
- virtualenv

## Installation

### 1. Create virtual environment
```bash
virtualenv env
```
### 2. Activate virtual environment
```
 env\Scripts\activate

```
### 2) cd to backend folder and run the following command to install all the dependencies-
```
pip install -r requirements.txt

### 3) cd to core folder and then run the following command to start the server-
```
python manage.py runserver


Working of the project:

Retrieval-Augmented Generation (RAG) Pipeline Explanation
A. Preprocessing and Embedding Generation (Indexing Phase)
1. Text Chunking
All .txt files in a folder are read. Text is split into overlapping chunks to retain context. Each chunk is checked to ensure it stays within token limits supported by the embedding model.
•	Breaks large documents into smaller parts to fit model limits.
•	Overlapping chunks preserve context across paragraphs or sections.
•	Enables more accurate and relevant retrieval later.
________________________________________
2. Embedding Creation

Each chunk is passed in batches to OpenAI's text-embedding-ada-002 model to get its vector embedding. Batches help avoid rate limits.
•	Embeddings convert text into dense numeric vectors capturing meaning.
•	Enables semantic comparison: similar meanings → similar vectors.
•	Batch processing improves speed and avoids hitting API limits.
________________________________________
3. FAISS Indexing

A FAISS index is either created or loaded. Embeddings are added with unique IDs and the updated index is saved to disk.
•	FAISS (Facebook AI Similarity Search) enables fast and scalable similarity search.
•	Allows quick retrieval of relevant chunks for a given query.
•	Indexing saves time by avoiding repeated processing.
________________________________________
4. Saving Chunks

All text chunks are written to a .txt file, maintaining order for ID-based retrieval later.
•	Each embedding ID maps to a specific chunk.
•	Enables access to the actual content during query-time generation.
•	Makes prompt construction possible later on.
________________________________________
B. Querying and Retrieval (Inference Phase)
1. Query Embedding
The user’s natural language query is converted to a vector embedding using the same OpenAI model.
•	Ensures the query and document chunks are in the same semantic space.
•	Allows for accurate similarity comparisons using FAISS.
________________________________________
2. FAISS Search

FAISS compares the query embedding to stored embeddings and returns the top-k closest matches.
•	Retrieves the most relevant text chunks based on semantic similarity.
•	Ensures efficient and scalable document search.
________________________________________
3. Prompt Construction

The top-k retrieved chunks are combined with the user’s query to form a single prompt, which will be sent to GPT-4.
•	Gives the model enough background context to answer the query accurately.
•	Ensures the generation is grounded in actual retrieved data.
________________________________________
4. GPT-4 Answer Generation

A system prompt is used to guide GPT-4's behavior. The model generates a response based only on the retrieved context and query.
•	GPT-4 uses provided context to generate relevant and grounded answers.
•	System prompt enforces safety rules, especially important in medical use cases.
•	Prevents hallucinations and ensures factual consistency.
Below are two report sections—one for the backend and another for the frontend—that mirror the style of the RAG pipeline report. You can include these sections in your final project report.
Backend Architecture and Implementation
Overview and Technology Stack
The backend is built using the Django framework, which provides a robust and secure environment for managing healthcare data and API endpoints. It leverages Django’s MVC (Model-View-Controller) architecture along with Django REST capabilities to expose endpoints for user authentication, patient and doctor data management, and diagnosis submissions. The system integrates with a Retrieval-Augmented Generation (RAG) pipeline for generating AI-assisted diagnosis responses.
API Endpoints and Business Logic
•	Authentication and User Management:
Endpoints such as /api/login/ and /api/get-patient-id/ handle user verification, cookie-based session management, and provide a secure way to obtain the unique patient identifier.
•	Diagnosis Functionality:
The /api/diagnosis/add/ endpoint accepts patient-submitted data (e.g., symptoms, severity, duration) and uses the RAG pipeline to generate a diagnosis response. The logic carefully checks for the existence of the patient in the database, integrates with FAISS indexing (for text retrieval) and OpenAI’s GPT-4 for response generation, and finally persists the diagnosis record in the database.
•	Data Retrieval:
Additional endpoints like /api/patient/diagnosis/history/ enable retrieval of diagnosis records. These endpoints convert database query results into JSON responses and support filtering based on patient IDs derived from login details rather than exposing raw user IDs.
Data Models and Database Interaction
•	ORM-Based Models:
The data models (such as Login, Patient, Doctor, and Diagnosis) are implemented using Django’s ORM, ensuring data integrity and relational mapping.
•	Stored Relationships:
The relationships between patients, doctors, and diagnoses are strictly enforced. For example, the Diagnosis model references both Patient and Doctor models, which guarantees that each diagnosis is linked to valid user records.
•	Scalability Considerations:
Batch processing, indexed searches via FAISS, and efficient query shaping ensure the backend can scale and perform even under heavy loads.
Security, Performance, and Deployment
•	Security:
Built-in CSRF protection, secure cookie attributes, and hashed passwords ensure that sensitive healthcare data remains secure.
•	Performance:
The backend optimizes response handling by using caching mechanisms and asynchronous task queues where necessary. Error monitoring and logging are integrated for prompt debugging.
•	Deployment:
The backend is containerized where applicable and deployed on cloud infrastructure with continuous integration/continuous deployment (CI/CD) pipelines to ensure rapid deployment cycles while maintaining high availability.
Frontend Architecture and Implementation
Overview and Technology Stack
The frontend is developed using Next.js, a React-based framework, to deliver a dynamic and responsive user experience tailored for healthcare users (patients and doctors). It handles routing, API interactions, real-time data updates, and responsive UI designs, all while interfacing securely with the Django backend. Tailwind CSS is used for rapid styling and layout adjustments.
User Interface and Routing
•	Dynamic Pages and Components:
The application provides dedicated pages for login, patient dashboards, clinician reports, and diagnosis results. Dynamic routing (e.g., /dashboard/patient/myreports/[id]/) allows for personalized content tailored to individual users.
•	Component-Based Architecture:
Reusable components for forms, data tables, and modals ensure consistency in design and allow for efficient front-end development. Each component implements React hooks (like useState and useEffect) for managing state and effects.
API Integration and State Management
•	Seamless Connectivity:
The frontend leverages the native Fetch API (or Axios) for sending requests to the Django backend. Requests are proxied via Next.js rewrites to abstract the backend URL and to manage CORS issues effectively.
•	Dynamic Patient ID Retrieval:
On initial load, the application reads a cookie (set during login) to determine the currently logged-in user’s email, then fetches the actual patient_id through a dedicated API endpoint (/api/get-patient-id/). This patient_id is then used in all subsequent API calls.
•	Form Handling and Error Management:
User inputs (for login, new diagnosis, or feedback) are validated on the client side. Loading states, error messages, and successful confirmations are handled with responsive feedback to enhance user experience.
User Experience and Responsive Design
•	Intuitive Layouts:
By using Tailwind CSS, the interface features a clean, modern design with mobile responsiveness, ensuring that users have a seamless experience whether they are on desktop or mobile devices.
•	Real-Time Updates:
The fetch logic in components (such as the Diagnosis Report page) ensures that users see updated data instantly after performing CRUD operations via the backend.
•	Navigation and Redirection:
With Next.js’ built-in router and dynamic routing capabilities, users are automatically redirected based on authentication status, role (doctor or patient), and their specific actions (e.g., viewing a diagnosis report).
Build Process, Deployment, and Monitoring
•	Optimization:
The Next.js build process leverages static site generation (SSG) and server-side rendering (SSR) as needed to ensure high performance and SEO-friendly pages.
•	Continuous Improvement:
Monitoring tools integrated into the frontend (such as browser error tracking and analytics) help in gathering real-time usage data, which in turn is used to further optimize the user experience.
These sections, when combined with your RAG pipeline explanation, provide a comprehensive overview of your entire project’s architecture and implementation—from how natural language queries are transformed into vector embeddings and processed via FAISS and GPT-4, to how the backend secures and processes API requests, and finally how the frontend delivers a seamless, responsive experience to end users.


```


```
