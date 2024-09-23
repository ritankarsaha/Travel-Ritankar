package config

import (
	"log"
	"os"
	"github.com/joho/godotenv"
)

type Config struct {
	MongoURI  string
	Database  string
	Port      string
}

var AppConfig Config

func LoadConfig() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	AppConfig = Config{
		MongoURI:  os.Getenv("DATABASE_URL"),
		Database:  os.Getenv("MONGO_DATABASE"),
		Port:      os.Getenv("PORT"),
	}
}
