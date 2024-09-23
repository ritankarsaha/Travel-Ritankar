package routes

import (
    "github.com/gin-gonic/gin"
    "github.com/ritankarsaha/travel/controllers"
    "github.com/ritankarsaha/travel/middleware"
)


func ItineraryRoutes(router *gin.Engine) {

    itineraryGroup := router.Group("/itinerary")
    itineraryGroup.Use(middleware.AuthMiddleware)
    itineraryGroup.POST("/generate", controllers.GenerateItinerary)
    itineraryGroup.GET("/user/:userID", controllers.GetItineraries)
}