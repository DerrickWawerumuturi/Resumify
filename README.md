# Resumify

An intuitive, customizable AI-powered resume-building web application designed to help users create professional resumes with ease. The application offers features like drag-and-drop customization, AI-generated content suggestions, and seamless PDF export functionality.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Development](#development)
- [Challenges and Solutions](#challenges-and-solutions)
- [Lessons Learned](#lessons-learned)
- [Next Steps](#next-steps)
- [Conclusion](#conclusion)

## Overview

The AI Resume Builder simplifies the resume creation process by leveraging AI to suggest content for different sections of a resume, such as work experience, education, and skills. It allows users to customize their resumes through a user-friendly interface and export the final result as a PDF.

## Features

- **AI-Generated Suggestions**: Automatically generate tailored bullet points for work experience, skills, and summaries.
- **Drag-and-Drop Customization**: Easily rearrange different sections of the resume using a drag-and-drop interface.
- **Live Preview**: Real-time preview of the resume as users make changes.
- **PDF Export**: Export the resume to a PDF with a single click.
- **User Authentication**: Secure login and signup using Clerk's authentication system.

## Architecture

The project is structured as a modern web application, with the following components:

- **Frontend**: Built with Next.js and Tailwind CSS for a responsive and dynamic user interface.
- **Backend**: Managed by Strapi and PostgreSQL through Neon, providing APIs for storing user data, resumes, and authentication.
- **AI Services**: Integrates with OpenAI for generating personalized resume content.
- **State Management**: Uses React Context for managing shared state between components, like `ResumeInfoContext`.

## Technologies Used

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Strapi, PostgreSQL (hosted on Neon)
- **Authentication**: Clerk OAuth2 for secure user authentication
- **AI**: Gemini's GPT for generating content suggestions
- **State Management**: React Context API
- **PDF Generation**: ``window's print``

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js (v16+)
- PostgreSQL database
- Strapi backend with a PostgreSQL connection

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ai-resume-builder.git
   cd ai-resume-builder

2. Install dependencies
   ```bash
   npm i
   
4. Start the server:
   ```bash
   npm run dev
