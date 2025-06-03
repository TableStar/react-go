package routes

import (
	"react-go/backend-api/controllers"
	"react-go/backend-api/middlewares"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	router.POST("/api/register", controllers.Register)
	router.POST("/api/login", controllers.Login)
	router.GET("/api/users", middlewares.AuthMiddleware(), controllers.GetUsers)

	return router
}
