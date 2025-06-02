package main

import (
	"react-go/backend-api/config"
	"react-go/backend-api/database"
	"react-go/backend-api/routes"
)

func main() {
	//dump env
	config.LoadEnv()
	//init DB
	database.InitDB()
	//inisialiasai Gin
	r := routes.SetupRouter()

	r.Run(":" + config.GetEnv("APP_PORT", "3000"))
}
