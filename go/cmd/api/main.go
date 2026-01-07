package main

import (
	"log"
	"os"
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	/*
	"github.com/appwrite/sdk-for-go/client"
    "github.com/appwrite/sdk-for-go/tablesdb"
    "github.com/appwrite/sdk-for-go/users"
    "github.com/appwrite/sdk-for-go/databases"*/
)

func main() {
	err := godotenv.Load("../.env")
    if err != nil {
        log.Println("No .env file found or could not be loaded, using system env variables")
    }

    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
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

	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello from Gin!",
		})
	})

	router.Run(":" + port)
}