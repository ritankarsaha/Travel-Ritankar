package controllers

import (
	"context"
	"net/http"
	"time"
	"github.com/gin-gonic/gin"
	"github.com/ritankarsaha/travel/database"
	helper "github.com/ritankarsaha/travel/helpers"
	"github.com/ritankarsaha/travel/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var userCollection *mongo.Collection = database.OpenCollection(database.Client, "user")



func GetUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userId := ctx.Param("user_id")

		if err := helper.MathUserTypeToUid(ctx, userId); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		c, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		var user models.User
		objID, _ := primitive.ObjectIDFromHex(userId)
		err := userCollection.FindOne(c, bson.M{"_id": objID}).Decode(&user)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				ctx.JSON(http.StatusNotFound, gin.H{
					"error": "User not found",
				})
			} else {
				ctx.JSON(http.StatusInternalServerError, gin.H{
					"error": err.Error(),
				})
			}
			return
		}
		ctx.JSON(http.StatusOK, gin.H{
			"user": user,
		})
	}
}


func RegisterUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {

		var newUser struct {

			Fullname string `json:"fullname" binding:"required,min=2,max=100"`
			Email    string `json:"email" binding:"required,email"`
			Avatar   string `json:"avatar" binding:"required"`
			Username string `json:"username" binding:"required,min=3,max=100"`
		}

		if err := ctx.ShouldBindJSON(&newUser); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid input data",
			})
			return
		}

		c, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		var existingUser models.User
		err := userCollection.FindOne(c, bson.M{"email": newUser.Email}).Decode(&existingUser)
		if err == nil {
			ctx.JSON(http.StatusConflict, gin.H{
				"error": "User with similar email id is already present. Please login to continue.",
			})
			return
		} else if err != mongo.ErrNoDocuments {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		user := models.User{
			ID:        primitive.NewObjectID(),
			Fullname:  &newUser.Fullname,
			Email:     &newUser.Email,
			Avatar:    &newUser.Avatar,
			Phone:     nil,
			Role:      nil,
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		}

		_, err = userCollection.InsertOne(c, user)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"error": "User can't be registered in the database successfully! ",
			})
			return
		}

		ctx.JSON(http.StatusCreated, gin.H{
			"message": "User has been registered successfully",
			"user_id": user.ID.Hex(),
		})
	}
}



func UpdateUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userId := ctx.Param("user_id")

		if err := helper.MathUserTypeToUid(ctx, userId); 
		err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		var updateData bson.M
		if err := ctx.BindJSON(&updateData); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid input",
			})
			return
		}

		userRole, _ := ctx.Get("user_role") 
		if _, exists := updateData["address"]; exists && userRole != "MANAGER" {
			ctx.JSON(http.StatusForbidden, gin.H{
				"error": "User has been unauthorized to change/modify.",
			})
			return
		}

		delete(updateData, "_id")
		delete(updateData, "email") 
		delete(updateData, "role")  

		if len(updateData) == 0 {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error": "Please enter a valid field to update the user data",
			})
			return
		}

		updateData["updated_at"] = time.Now()

		c, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		objID, _ := primitive.ObjectIDFromHex(userId)
		filter := bson.M{"_id": objID}

		update := bson.M{
			"$set": updateData,
		}

		result, err := userCollection.UpdateOne(c, filter, update)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		if result.MatchedCount == 0 {
			ctx.JSON(http.StatusNotFound, gin.H{
				"error": "User not found or doesn't exist.",
			})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{
			"message": "User data has been updated successfully!",
		})
	}
}


func DeleteUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userId := ctx.Param("user_id")
		if err := helper.MathUserTypeToUid(ctx, userId); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		c, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()
		objID, _ := primitive.ObjectIDFromHex(userId)
		filter := bson.M{"_id": objID}
		result, err := userCollection.DeleteOne(c, filter)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}
		if result.DeletedCount == 0 {
			ctx.JSON(http.StatusNotFound, gin.H{
				"error": "User doesn't exist in the database.",
			})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{
			"message": "User has been removed successfully! ",
		})
	}
}


func ListUsers() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		c, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		cursor, err := userCollection.Find(c, bson.M{})
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}
		defer cursor.Close(c)

		var users []models.User
		if err = cursor.All(c, &users); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{
			"users": users,
		})
	}
}




func ChangeUserRole() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userId := ctx.Param("user_id")

		var roleChange struct {
			Role string `json:"role" binding:"required,eq=JOURNALIST|eq=CONSUMER|eq=AUDITOR"`
		}

		if err := ctx.ShouldBindJSON(&roleChange); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid input",
			})
			return
		}

		c, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		objID, _ := primitive.ObjectIDFromHex(userId)
		filter := bson.M{"_id": objID}

		update := bson.M{
			"$set": bson.M{
				"role":       roleChange.Role,
				"updated_at": time.Now(),
			},
		}

		result, err := userCollection.UpdateOne(c, filter, update)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		if result.MatchedCount == 0 {
			ctx.JSON(http.StatusNotFound, gin.H{
				"error": "User not found or doesn't exist.",
			})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{
			"message": "User role updated successfully!",
		})
	}
}



func GetUserProfile() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userId := ctx.Param("user_id")

		c, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		var user models.User
		objID, _ := primitive.ObjectIDFromHex(userId)
		err := userCollection.FindOne(c, bson.M{"_id": objID}).Decode(&user)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				ctx.JSON(http.StatusNotFound, gin.H{
					"error": "User not found",
				})
			} else {
				ctx.JSON(http.StatusInternalServerError, gin.H{
					"error": err.Error(),
				})
			}
			return
		}

		ctx.JSON(http.StatusOK, gin.H{
			"user": user,
		})
	}
}
