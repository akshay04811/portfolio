# Akshay B - Personal Developer Portfolio & Resume Website

A modern, responsive personal portfolio built with **React**, **TypeScript**, and **Tailwind CSS**, featuring an interactive VFX constellation canvas, project case studies for **DriveFlow**, ATS-friendly resume generation, and a functional contact form.

---

## 🚀 Quick Start Guide (How to Run on Your Computer)

Follow these simple steps after downloading and unzipping this code:

### Step 1: Install Node.js (If you haven't already)
Make sure you have **Node.js** (version 18 or higher) installed on your computer:
1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download and install the **LTS (Long Term Support)** version for Windows, macOS, or Linux.
3. Open your terminal or Command Prompt (`cmd`) and verify the installation:
   ```bash
   node -v
   npm -v
   ```

---

### Step 2: Open the Project Folder
1. Unzip the downloaded zip file into a folder (e.g., `Documents/my-portfolio`).
2. Open **VS Code** (or terminal), click **File > Open Folder**, and select the project folder.
3. Open the integrated terminal in VS Code:
   - Shortcut: `Ctrl + ~` (on Windows) or `Cmd + ~` (on Mac)
   - Or via menu: **Terminal > New Terminal**

---

### Step 3: Install Project Dependencies
Run this command in the terminal to install all required packages:
```bash
npm install
```
*(This will download React, Tailwind CSS, Lucide icons, and other dependencies into a `node_modules` folder. It usually takes 30-60 seconds.)*

---

### Step 4: Start the Development Server
Once the installation finishes, run:
```bash
npm run dev
```

You will see output similar to:
```text
  VITE v8.x.x  ready in 240 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

---

### Step 5: View the Portfolio in Your Browser
1. Open your web browser (Chrome, Edge, Brave, Firefox, etc.).
2. Navigate to:
   ```
   http://localhost:3000
   ```
3. Your portfolio is now live on your machine!

---

## 🛠️ How to Customize Your Details Permanently

You can update your personal information in two ways:

### Method 1: Using the UI (Quick & Instant)
- Click the **Edit Info** button in the top navigation bar.
- Update your Name, Email, Phone, Location, LinkedIn, GitHub, or Career Objective.
- Click **Save Details** — changes update immediately and persist in your browser!

### Method 2: In the Code (Permanent Default)
- Open `src/data/defaultProfile.ts` in your editor.
- Update any fields, such as:
  - `name`: Your name
  - `email`: Your email address (`akshaykukku25460@gmail.com`)
  - `phone`: Your contact number
  - `linkedinUrl` and `githubUrl`: Your actual profile links
  - `projects`: Add new projects or update DriveFlow details.
  - `skills`: Adjust your skill levels as you learn more.

---

## 📦 How to Build for Production / Deployment

When you are ready to publish your website to free hosting platforms like **Vercel**, **Netlify**, or **GitHub Pages**:

1. Build the optimized static files:
   ```bash
   npm run build
   ```
2. This creates a `dist/` folder containing the compiled HTML, CSS, and JavaScript.
3. You can deploy this `dist` folder directly or connect your GitHub repository to Vercel/Netlify for automatic free hosting!

---

## 🧪 Available Scripts

- `npm run dev` — Starts the local development server at port 3000.
- `npm run build` — Builds the app for production in the `dist` directory.
- `npm run preview` — Locally preview the production build.
- `npm run lint` — Runs TypeScript type checks.
