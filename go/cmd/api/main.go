package main

import (
	"log"
	"os"
	"io/fs"
	"embed"
	"net/http"
	"strings"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

//go:embed web
var staticFS embed.FS

func main() {
	err := godotenv.Load("./.env")
    if err != nil {
        log.Println("No .env file found or could not be loaded, using system env variables")
    }

    port := os.Getenv("PORT")
    if port == "" {
        port = "7666"
    }
	
	router := gin.Default()
	
	trustedProxies := []string{
		// localhost
		"127.0.0.1",
		"::1",

		// Cloudflare IPv4
		"173.245.48.0/20",
		"103.21.244.0/22",
		"103.22.200.0/22",
		"103.31.4.0/22",
		"141.101.64.0/18",
		"108.162.192.0/18",
		"190.93.240.0/20",
		"188.114.96.0/20",
		"197.234.240.0/22",
		"198.41.128.0/17",
		"162.158.0.0/15",
		"104.16.0.0/13",
		"104.24.0.0/14",
		"172.64.0.0/13",
		"131.0.72.0/22",

		// Cloudflare IPv6
		"2400:cb00::/32",
		"2606:4700::/32",
		"2803:f800::/32",
		"2405:b500::/32",
		"2405:8100::/32",
		"2a06:98c0::/29",
		"2c0f:f248::/32",
	}
	
	if err := router.SetTrustedProxies(trustedProxies); err != nil {
		panic(err)
	}
	
	router.GET("/api/token", func(c *gin.Context) {
		auth := c.GetHeader("Authorization")
		if auth == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "missing auth header",
			})
			return
		}

		token := strings.TrimPrefix(auth, "Bearer ")
		log.Println("JWT received:", token)

		c.JSON(200, gin.H{
			"ok": true,
		})
	})

	// 1. Prepare the File Systems
	// Root FS (to get index.html)
	webFS, err := fs.Sub(staticFS, "web")
	if err != nil {
		panic(err)
	}
	
	// Assets FS (to serve css/js/svg)
	// We create a specific subtree for /assets so requests like /assets/logo.svg map correctly
	assetsFS, err := fs.Sub(webFS, "assets")
	if err != nil {
		panic(err)
	}

	// 2. Load index.html into MEMORY.
	// This prevents the FileServer from ever seeing the root path request.
	// It guarantees a 200 OK response.
	indexHTML, err := fs.ReadFile(webFS, "index.html")
	if err != nil {
		panic("Failed to read index.html from embedded FS. Did you build the frontend?")
	}

	// 3. API Routes
	router.GET("/api/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "alive"})
	})

	// 4. Static Assets Route
	// This handles /assets/index-123.css, /assets/logo.svg, etc.
	// We use /assets/*filepath to capture everything after /assets
	router.GET("/assets/*filepath", func(c *gin.Context) {
		c.FileFromFS(c.Param("filepath"), http.FS(assetsFS))
	})

	// 5. Explicit Root Handler (Serve from Memory)
	router.GET("/", func(c *gin.Context) {
		c.Data(200, "text/html", indexHTML)
	})

	// 6. SPA Catch-All Handler (Serve from Memory)
	// Any route not matched above (like /login, /dashboard) gets index.html
	router.NoRoute(func(c *gin.Context) {
		// Optional: 404 for api routes
		if len(c.Request.URL.Path) >= 4 && c.Request.URL.Path[0:4] == "/api" {
			c.JSON(404, gin.H{"error": "not found"})
			return
		}
		c.Data(200, "text/html", indexHTML)
	})

	router.Run(":7666")
}