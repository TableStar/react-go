package main

import (
	"react-go/backend-api/config"

	"github.com/gin-gonic/gin"
)

func main() {
	//dump env
	config.LoadEnv()

	//inisialiasai Gin
	router := gin.Default()

	//membuat route dengan method GET
	router.GET("/", func(c *gin.Context) {

		//return response JSON
		c.JSON(200, gin.H{
			"message": "Hello World!",
		})
	})

	//mulai server dengan port 3000
	router.Run(":" + config.GetEnv("PORT", "3001"))
}
