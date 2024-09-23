package middleware

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/ritankarsaha/travel/helpers"
)

func Authenticate() gin.HandlerFunc {
	return func(c *gin.Context) {
		clientToken := c.Request.Header.Get("Authorization")
		if clientToken == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "No authorization header provided"})
			c.Abort()
			return
		}

		claims, err := helpers.ValidateToken(clientToken)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			c.Abort()
			return
		}

		c.Set("email", claims.Email)
		c.Set("first_name", claims.FirstName)
		c.Set("last_name", claims.LastName)
		c.Set("uid", claims.Uid)
		c.Set("user_type", claims.UserType)
		c.Next()
	}
}
func AuthMiddleware(c *gin.Context) {
    tokenString := c.GetHeader("Authorization")

    if tokenString == "" {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header missing"})
        c.Abort()
        return
    }

    valid, err := helpers.ValidateJWT(tokenString)
	if err != nil || valid == nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
        c.Abort()
        return
    }

    c.Next() 
}

