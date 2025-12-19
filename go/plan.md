# gemini output on combining preact and go

This is an excellent and common setup for modern Go web applications. The strategy you described—combining the backend and frontend into a single, static executable—is the ideal way to simplify deployment.

While your current approach of using a **symlink** works great for **development**, it **will fail** when you try to compile everything into a single executable, as the Go compiler only embeds real files, not symlinks.

The correct, modern Go solution is the **`embed` package** (introduced in Go 1.16). It allows you to package all your frontend build artifacts (HTML, CSS, JS) directly into the Go binary.

Here is the step-by-step process for a Gin/Preact Single Page Application (SPA) with a single executable deployment goal.

## 1. Project Structure

First, define a clean separation for your source code.

```
/my-project
├── /frontend/           # Your Preact/TS source code
│   ├── /src
│   └── package.json
├── /web/dist/           # Frontend BUILD OUTPUT (This folder gets embedded)
│   ├── index.html
│   ├── /assets/
│   └── main.js
├── go.mod
└── main.go              # Your Gin server code
```

## 2. Frontend Build Step

**Goal:** Ensure your Preact project builds all its static files into the dedicated `web/dist` directory *before* you run `go build`.

1.  Navigate into your Preact directory (`/frontend`).
2.  Configure your Preact build tool (e.g., Vite, Webpack) to output all static files to the **`../web/dist`** directory (relative to your `main.go`).
3.  Run the production build:
    ```bash
    # From inside the /frontend directory
    npm run build
    # This command populates the /my-project/web/dist folder
    ```

## 3. Gin Server Setup with `embed`

Now, you will use Go's standard `embed` package to pull the contents of the `web/dist` folder into your Gin application at compile time.

### Update `main.go`

Paste the following code into your `main.go` file.

```go
package main

import (
	"embed"
	"io/fs"
	"net/http"
	
	"github.com/gin-gonic/gin"
)

// The magical line that embeds the web/dist directory contents.
// The file path here is relative to the directory containing main.go.
// NOTE: The `*` ensures sub-directories and all files are included.
//go:embed web/dist/* web/dist/assets/*
var embeddedFiles embed.FS

func main() {
	// 1. Create the Gin router
	router := gin.Default()

	// 2. Define your API routes first
	router.GET("/api/status", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "API is online"})
	})

	// --- STATIC FILE SERVING / EMBEDDING ---

	// The 'embed.FS' holds the contents, but the paths inside are prefixed with "web/dist".
	// We need to strip that prefix so Gin can serve the files correctly from the root.
	// For example, embedFiles contains "web/dist/index.html", but we want to serve it at "/index.html".
	distFS, err := fs.Sub(embeddedFiles, "web/dist")
	if err != nil {
		panic(err)
	}

	// 3. Serve the static files (JS, CSS, images, etc.)
	// The `http.FS()` wrapper converts the stripped fs.FS into an http.FileSystem.
	router.StaticFS("/", http.FS(distFS))

	// 4. SPA Fallback (Crucial for Preact Routing)
	// For any route not matched by the API (e.g., /dashboard, /profile),
	// we must serve the main index.html file so the Preact router can take over.
	router.NoRoute(func(c *gin.Context) {
		// Serve the embedded index.html
		c.FileFromFS("index.html", http.FS(distFS))
	})

	// 5. Run the server
	router.Run(":8080")
}
```

## 4. Final Compilation and Deployment

With the `embed` package, your static files are now part of the Go source code.

### **Compilation**

1.  Make sure you have run your frontend build step: `npm run build` (from `/frontend`).
2.  Run the Go build command.

    ```bash
    # Build the executable (e.g., named 'web-app')
    go build -o web-app
    ```
    This command produces a single, fully self-contained binary file named `web-app` (or whatever you named it), which includes:
    *   The entire Gin server logic (backend).
    *   All embedded Preact HTML, CSS, and JavaScript (frontend).

### **Deployment**

The deployment is exactly as you planned:

1.  **Transfer Files:** SSH the single binary and the `.env` file to your server.

    ```bash
    scp web-app user@yourserver:/path/to/deploy/
    scp .env user@yourserver:/path/to/deploy/
    ```

2.  **Run:** Start the server on your remote machine.

    ```bash
    ssh user@yourserver
    /path/to/deploy/web-app
    ```
    The server is now running on the remote machine, listening on port `8080` (or whatever you configured).