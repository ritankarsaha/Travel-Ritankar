package controllers

import (
	"context"
	"fmt"
	"math/rand"
	"net/http"
	"time"
	"github.com/gin-gonic/gin"
	"github.com/ritankarsaha/travel/database"
	"github.com/ritankarsaha/travel/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GenerateItinerary(c *gin.Context) {
    var input models.ItineraryInput
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    activities, err := fetchActivities(input.Location, input.Interests, input.Budget)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch activities"})
        return
    }

    itinerary, err := createItinerary(input.UserID, input.Budget, input.Location, input.Duration, activities)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create itinerary"})
        return
    }

    collection := database.OpenCollection(database.Client, "itineraries")
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    _, err = collection.InsertOne(ctx, itinerary)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save itinerary"})
        return
    }

    c.JSON(http.StatusOK, itinerary)
}

func GetItineraries(c *gin.Context) {
    userID := c.Param("userID")
    collection := database.OpenCollection(database.Client, "itineraries")
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    filter := bson.M{"user_id": userID}
    var itineraries []models.Itinerary

    cursor, err := collection.Find(ctx, filter)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch itineraries"})
        return
    }

    if err := cursor.All(ctx, &itineraries); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode itineraries"})
        return
    }

    c.JSON(http.StatusOK, itineraries)
}

func DeleteItinerary(c *gin.Context) {
    itineraryID := c.Param("itineraryID")
    objID, err := primitive.ObjectIDFromHex(itineraryID)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid itinerary ID"})
        return
    }

    collection := database.OpenCollection(database.Client, "itineraries")
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    result, err := collection.DeleteOne(ctx, bson.M{"_id": objID})
    if err != nil || result.DeletedCount == 0 {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete itinerary"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Itinerary deleted successfully"})
}

func UpdateItinerary(c *gin.Context) {
    itineraryID := c.Param("itineraryID")
    var updateInput models.ItineraryInput
    if err := c.ShouldBindJSON(&updateInput); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    objID, err := primitive.ObjectIDFromHex(itineraryID)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid itinerary ID"})
        return
    }

    collection := database.OpenCollection(database.Client, "itineraries")
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    update := bson.M{
        "$set": bson.M{
            "budget":     updateInput.Budget,
            "location":   updateInput.Location,
            "duration":   updateInput.Duration,
            "interests":  updateInput.Interests,
            "updated_at": time.Now(),
        },
    }

    _, err = collection.UpdateOne(ctx, bson.M{"_id": objID}, update, options.Update().SetUpsert(false))
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update itinerary"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Itinerary updated successfully"})
}

func fetchActivities(location string, interests []string, budget int) ([]models.Activity, error) {
    collection := database.OpenCollection(database.Client, "activities")
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

   
    query := bson.M{
        "location": location,
        "category": bson.M{"$in": interests}, 
        "cost": bson.M{"$lte": budget / 3},  
    }

    var activities []models.Activity
    cursor, err := collection.Find(ctx, query)
    if err != nil {
        return nil, err
    }

    if err = cursor.All(ctx, &activities); err != nil {
        return nil, err
    }

    return activities, nil
}


func createItinerary(userID string, budget int, location string, duration int, activities []models.Activity) (models.Itinerary, error) {
    rand.Seed(time.Now().UnixNano()) 

  
    rand.Shuffle(len(activities), func(i, j int) {
        activities[i], activities[j] = activities[j], activities[i]
    })

    
    dayPlans := make([]models.DayPlan, 0)
    activitiesPerDay := len(activities) / duration

    for i := 0; i < duration; i++ {
        dayStart := i * activitiesPerDay
        dayEnd := (i + 1) * activitiesPerDay

        if i == duration-1 {
            dayEnd = len(activities)
        }

        dayActivities := activities[dayStart:dayEnd]
        activityNames := make([]string, len(dayActivities))

        for j, activity := range dayActivities {
            activityNames[j] = fmt.Sprintf("%s (%.2f hours)", activity.Name, activity.DurationHours)
        }

        dayPlan := models.DayPlan{
            Day:        i + 1,
            Activities: activityNames,
        }

        dayPlans = append(dayPlans, dayPlan)
    }


    itinerary := models.Itinerary{
        UserID:             userID,
        Budget:             float64(budget),
        Location:           location,
        Duration:           duration,
        GeneratedItinerary: dayPlans,
    }

    return itinerary, nil
}