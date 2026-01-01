# Interactive Mindmap UI

## Overview
An interactive, data-driven mindmap UI built as part of the Frontend Development Internship assignment.

## Features
- JSON-driven mindmap rendering
- Expand / collapse nodes
- Inline node editing
- Side panel with node details
- Responsive and clean UI

## Tech Stack
- React
- ReactFlow
- JavaScript
- HTML, CSS

## Architecture
- Mindmap data is stored in a structured JSON file
- UI dynamically renders based on data
- Editing uses local state and commits changes cleanly
- Side panel derives data from the same source of truth


## Repo Structure 
mindmap-ui/
├── public/                     # Static assets like favicon, index.html
├── src/
│   ├── assets/                 # Images, icons, fonts, etc.
│   │   └── screenshots/        # Move screenshots here
│   ├── components/             # All React components
│   │   └── MindmapNode.jsx
│   ├── data/                   # JSON or other static data
│   │   └── mindmap.json
│   ├── utils/                  # Utility JS functions
│   │   └── parseMindmap.js
│   ├── App.jsx                 # Root component
│   └── main.jsx                # Entry point
├── README.md
├── package.json
└── package-lock.json


---


**Subject:**
> Frontend Internship Assignment Submission – Interactive Mindmap UI

**Body:**
> Hi Team,  
>  
> I’ve completed the Frontend Development assignment for the Interactive Mindmap UI.  
>  
> The solution demonstrates a data-driven architecture, interactive node behavior, clean UI design, and scalable React code structure.  
>  
> GitHub Repo: https://github.com/shrreya24/MindMapUi/
> Demo Video: <link>  
>  
> Looking forward to your feedback.  
>  
> Best regards,  
> Shreya

---


## How to Run
```bash
npm install
npm run dev
