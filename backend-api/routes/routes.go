package routes

import (
	"react-go/backend-api/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	router.POST("/api/register", controllers.Register)

	return router
}
