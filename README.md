# Enterprise Label Designer (Loftware-like)

Production-ready starter for a label designer built with React + TypeScript + Vite + Yarn.

## Tech Stack
- React + TypeScript
- Vite
- Yarn
- react-dnd
- react-rnd
- Zustand

## Setup Commands
```bash
# 1) (Original requested bootstrap command)
yarn create vite . --template react-ts

# 2) Install dependencies
yarn install

# 3) Run development server
yarn dev

# 4) Type-check + production build
yarn build

# 5) Serve production build preview
yarn preview
```

## How to See Preview
### Option A: Dev Preview (recommended while building)
```bash
yarn install
yarn dev
```
Then open the URL shown in terminal (usually `http://localhost:5173`).

### Option B: Production Preview
```bash
yarn install
yarn build
yarn preview
```
Then open the preview URL printed by Vite (usually `http://localhost:4173`).

### If preview does not start
- Ensure dependencies are installed (`yarn install`).
- If your environment blocks package registry access (403), run these commands on a machine with npm/yarn registry access.
- Verify Node.js is installed (`node -v`) and Yarn is available (`yarn -v`).


## Open this Project in VS Code
### 1) Open from terminal
```bash
cd /workspace/DragnDrop
code .
```

### 2) Open from VS Code UI
1. Start VS Code.
2. Click **File → Open Folder...**
3. Select the project folder: `/workspace/DragnDrop`
4. Click **Open**.

### 3) Recommended VS Code extensions
- ESLint
- Prettier - Code formatter
- TypeScript and JavaScript Language Features (built-in)

### 4) Run the app in VS Code terminal
Open terminal in VS Code (**Terminal → New Terminal**) and run:
```bash
yarn install
yarn dev
```
Then open the local URL printed by Vite (usually `http://localhost:5173`).

> If `code .` is not recognized, install the VS Code shell command from the Command Palette:  
> **Shell Command: Install 'code' command in PATH**


## Troubleshooting: Only `.gitkeep` is visible after clone
If you clone the repo and only see `.gitkeep`, you likely opened a branch that has only the initial placeholder commit.

Check branches and switch:
```bash
git branch -a
git fetch --all
git checkout work
# or: git checkout <feature-branch-with-code>
```

If `work` is not available remotely, the code branch was not pushed yet. Push from the source machine:
```bash
git push -u origin work
```
Then on your machine:
```bash
git fetch --all
git checkout work
```

Also verify VS Code opened the correct folder path (the repo root, not an empty parent folder).


## Get Latest Changes in VS Code (after I update code)
Use either VS Code UI or terminal.

### Option A: VS Code UI (Source Control)
1. Open the repo folder in VS Code.
2. Go to **Source Control** panel.
3. Click **...** (more actions) → **Pull** (or **Pull, Rebase**).
4. If prompted, pick the branch that contains updates (for this repo, usually `work`).

### Option B: VS Code Terminal (recommended)
```bash
cd /path/to/DragnDrop
git fetch --all
git checkout work
git pull origin work
```

### If your local branch is behind and you have local edits
```bash
git status
git stash
git pull origin work
git stash pop
```

### Verify you received latest changes
```bash
git log --oneline -n 5
git branch --show-current
```
You should see the newest commit hash at the top and branch `work` checked out.

## Folder Structure
```text
src/
  components/
    Canvas/
      Canvas.tsx
      CanvasElement.tsx
      ElementRenderer.tsx
    Toolbox/
      Toolbox.tsx
      ToolboxItem.tsx
    Properties/
      PropertiesPanel.tsx
  store/
    designerStore.ts
  types/
    designer.ts
  utils/
    elementFactory.ts
  App.tsx
  main.tsx
  styles.css
```

## Features
- Labelary API Preview button that generates URL: `http://api.labelary.com/v1/printers/{dpmm}/labels/{width}x{height}/{index}/{zpl}`
- 3-panel layout: Toolbox / Canvas / Properties
- Drag from Toolbox to Canvas
- Multi-element support with absolute positioning
- Drag/resize/select elements on canvas
- Zustand store actions:
  - `addElement`
  - `updateElement`
  - `deleteElement`
  - `selectElement`
- Supported element types:
  - Text
  - Barcode placeholder
  - Image placeholder
- Properties editing:
  - value
  - x, y
  - width, height

## Bonus-ready Architecture
- Zoom support (`zoom` + slider)
- Grid snapping (`snapToGrid` + `gridSize`)
- ZPL export scaffold (`exportToZPL`)
- JSON save/load (`exportToJSON`, `loadFromJSON`)


## Label Preview (ZPL -> Image)
1. Place elements on the canvas.
2. In the left panel, set **DPMM / Width / Height / Index**.
3. Click **Preview Label (Generate URL)**.
4. The app renders a live image preview and exposes the generated Labelary URL.
