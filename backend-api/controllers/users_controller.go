package controllers

import (
	"net/http"
	"react-go/backend-api/database"
	"react-go/backend-api/models"
	"react-go/backend-api/structs"

	"github.com/gin-gonic/gin"
)

func GetUsers(c *gin.Context) {
	var users []models.User

	database.DB.Find(&users)

	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Lists Data Users",
		Data:    users,
	})
}
