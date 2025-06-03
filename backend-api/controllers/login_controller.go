package controllers

import (
	"net/http"
	"react-go/backend-api/database"
	"react-go/backend-api/helpers"
	"react-go/backend-api/models"
	"react-go/backend-api/structs"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Login(c *gin.Context) {
	req := structs.UserLoginRequest{}
	user := models.User{}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{
			Success: false,
			Message: "Validation Err",
			Errors:  helpers.TranslateErrMsg(err),
		})
		return
	}
	if err := database.DB.Where("username = ?", req.Username).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, structs.ErrorResponse{
			Success: false,
			Message: "User Not found",
			Errors:  helpers.TranslateErrMsg(err),
		})
		return
	}
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, structs.ErrorResponse{
			Success: false,
			Message: "Pass doesnt match",
			Errors:  helpers.TranslateErrMsg(err),
		})
		return
	}
	token := helpers.GenerateToken(user.Username)
	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "login success",
		Data: structs.UserResponse{
			Id:        user.Id,
			Name:      user.Name,
			Username:  user.Username,
			Email:     user.Email,
			CreatedAt: user.CreatedAt.String(),
			UpdatedAt: user.UpdatedAt.String(),
			Token:     &token,
		},
	})
}
