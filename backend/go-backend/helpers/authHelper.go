package helpers

import (
	"errors"
	"log"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func CheckUserType(c *gin.Context, roll string) error {
	userType := c.GetString("user_type")
	if userType != roll {
		return errors.New("user type of the user cannot be matched by the database")
	}
	return nil
}

func MathUserTypeToUid(c *gin.Context, userId string) error {
	userType := c.GetString("user_type")
	id := c.GetString("uid")

	if userType == "USER" && id != userId {
		return errors.New("user id or uid cannot be properly matched for the user")
	}

	err := CheckUserType(c, userType)
	if err != nil {
		return err
	}
	return nil
}

func HashPassword(password string) string {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		log.Println("Error hashing password:", err)
		return ""
	}
	return string(bytes)
}