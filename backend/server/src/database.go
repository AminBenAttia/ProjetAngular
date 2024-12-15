package src

import (
	"fmt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func LoadDb() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("../db/Users.db"), &gorm.Config{})
	if err != nil {
		fmt.Println("couldnt connect to db")
	}
	db.AutoMigrate(&User{})
	return db
}

func AddUser(user *User) error {
	db := LoadDb()
	id := db.Create(user)
	if id.Error != nil {
		fmt.Println("Error adding user ", id.Error)
		return id.Error
	}
	return nil
}

func GetUser(username, password string) bool {
	db := LoadDb()
	user := User{}
	db.Where("username = ? and password= ?", username, password).Find(&user)
	return user.Password == username
}
