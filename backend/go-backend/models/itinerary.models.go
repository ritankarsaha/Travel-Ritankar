package models

import "time"

type Itinerary struct {
    ID                 string      `json:"id" bson:"id"`                               
    UserID             string      `json:"userId" bson:"userId"`                         
    Budget             float64     `json:"budget" bson:"budget"`                        
    Interests          []string    `json:"interests" bson:"interests"`                   
    Duration           int         `json:"duration" bson:"duration"`                     
    Location           string      `json:"location" bson:"location"`                    
    GeneratedItinerary interface{} `json:"generatedItinerary" bson:"generatedItinerary"` 
    CreatedAt          time.Time   `json:"createdAt" bson:"created_at"`                  
    UpdatedAt          time.Time   `json:"updatedAt" bson:"updated_at"`                 
}


type DayPlan struct {

    Day        int      `json:"day" bson:"day"`
    Activities []string `json:"activities" bson:"activities"`

}


type Activity struct {

    Name          string  `bson:"name" json:"name"`
    Location      string  `bson:"location" json:"location"`
    Category      string  `bson:"category" json:"category"`
    Cost          int     `bson:"cost" json:"cost"`
    DurationHours float64 `bson:"duration_hours" json:"duration_hours"`

}


type ItineraryInput struct {

    UserID    string   `json:"user_id"`
    Budget    int      `json:"budget"`
    Location  string   `json:"location"`
    Duration  int      `json:"duration"`
    Interests []string `json:"interests"`

}


type Post struct {
    ID        string      `json:"id" bson:"id"`                         // Unique ID for the post
    Title     string      `json:"title" bson:"title"`                   // Post title
    Content   interface{} `json:"content" bson:"content,omitempty"`     // Content in JSON format (can be structured data)
    Published bool        `json:"published" bson:"published"`           // Published status
    CreatedAt time.Time   `json:"createdAt" bson:"created_at"`          // Timestamp for creation
    UpdatedAt time.Time   `json:"updatedAt" bson:"updated_at"`          // Timestamp for updates
    AuthorID  string      `json:"authorId" bson:"authorId"`             // User ID of the author
}