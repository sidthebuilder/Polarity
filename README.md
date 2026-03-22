# VoxGen-AI

VoxGen-AI is an advanced web application that leverages Google's Gemini generative AI models to convert 2D images into interactive, self-contained 3D voxel art scenes.

Built with React, Vite, and Three.js, VoxGen-AI allows users to either upload an existing image or generate a new one via text prompts, and then transform that image into a 3D environment.

## Features

- **Text-to-Image Generation**: Utilize Gemini 2.5 Flash to generate base images from descriptive prompts.
- **Image-to-Voxel Transformation**: Transform 2D images into interactive 3D voxel scenes powered by Gemini 3 Pro.
- **Interactive 3D Viewer**: Preview and manipulate voxel setups within a seamless Three.js-powered iframe viewer.
- **Save & Export**: Download the intermediate generated images or the final fully-contained HTML voxel scenes.

## Prerequisites

- Node.js
- A valid Google Gemini API Key

## Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/sidthebuilder/VoxGen-AI.git
   cd VoxGen-AI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root of the project and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173/`.

## Technology Stack

- **Frontend Framework**: React, Vite
- **Styling**: Tailwind CSS integration
- **AI Integration**: `@google/genai` API suite
- **3D Rendering**: Three.js (via generated HTML environments)
