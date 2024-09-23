package main

import (
	"github.com/ritankarsaha/travel/config"
	"github.com/ritankarsaha/travel/database"
	"github.com/ritankarsaha/travel/middleware"
	"github.com/ritankarsaha/travel/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadConfig()
	database.InitDatabase()
	router := gin.Default()
	router.Use(middleware.CORSMiddleware())
	routes.ItineraryRoutes(router)
	routes.UserRoutes(router)
	router.Run(":" + config.AppConfig.Port)
}
