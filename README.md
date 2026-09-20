# Luma School Management

A polished, dependency-free school management dashboard designed for simple web hosting. It uses plain HTML, CSS, and JavaScript, so it can be deployed to any host that serves static files (cPanel, GitHub Pages, Netlify, or S3).

## Run locally

Open `index.html` in a browser, or serve the folder with any static server:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000. The dashboard, student search, responsive navigation, and add-student flow work without a backend. Student additions persist for the current page session; connect the form to an API/database when server-side persistence is needed.
