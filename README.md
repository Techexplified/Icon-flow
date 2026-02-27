# IconFlow Penpot Plugin (V1)

> Clean, minimal, brand-aware icon discovery and insertion plugin inside Penpot.

## Features (V1)

- **Smart Search**: Quickly find icons using keyword filtering.
- **Icon Grid**: Fixed, scrollable icon preview grid.
- **Sizing**: Pre-insert resize logic (12px, 16px, 24px, 48px, or Auto).
- **Coloring**: Easy color picker to apply brand colors before insertion (replaces `currentColor`).
- **Insertion Targeting**: Inserts directly into a selected board/frame or at the center of the viewport.
- **Multi-select**: Hold `Shift` or `Ctrl/Cmd` to select multiple icons and insert them as a group.
- **Copy SVG**: Quickly copy the customized raw SVG code to your clipboard.

## Project Structure

```
iconflow/
 ├── public/
 │   ├── manifest.json
 │   ├── icon.svg
 ├── src/
 │   ├── data/
 │   │   └── icons.ts         # Dummy icon dataset
 │   ├── plugin/
 │   │   └── plugin.ts        # Main Penpot backend logic
 │   ├── ui/
 │   │   ├── components/      # React UI components
 │   │   ├── App.tsx          # Main React logic
 │   │   ├── main.tsx
 │   │   └── styles.css       # Theme-aware CSS
 ├── index.html
 ├── vite.config.ts
 ├── package.json
```

## Local Testing Setup

To test this plugin directly inside your local or cloud Penpot workspace:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the local development server:**
   ```bash
   npm run dev
   ```
   *The server runs on port 5173 by default.*

3. **Available Local URLs:**
   - Manifest: `http://localhost:5173/manifest.json`
   - UI Interface: `http://localhost:5173/`

4. **Install in Penpot:**
   - Open a Penpot workspace.
   - Press `Ctrl + Alt + P` (or Cmd + Option + P on Mac) to open the Plugin Manager.
   - Click the **+** icon (or "Add plugin by URL").
   - Paste the local manifest URL: `http://localhost:5173/manifest.json`
   - Click **Install**.
   - Your plugin will appear under the installed list. Click it to run `IconFlow`.

5. **Debugging Errors:**
   - **UI Errors:** Right-click inside the plugin iframe in Penpot and click `Inspect Element` to open browser DevTools. Check the Console tab.
   - **Plugin Main Thread Errors:** Penpot plugin core logic logs straight to the main browser Console. Open your browser DevTools (F12) outside the iframe to see `plugin.ts` errors.

## Deployment

1. Make sure to update the manifest file paths if switching domains.
2. Build the plugin:
   ```bash
   npm run build
   ```
3. Use a static hosting provider (like Vercel, Netlify, or GitHub Pages) to host the Output `dist/` directory. Send users the `https://your-domain.com/manifest.json` link.

*Icons provided in this dummy dataset are licensed under the MIT License.*
