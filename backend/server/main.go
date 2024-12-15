package main

import (
	. "Chess/src"
	"encoding/json"
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("POST /create", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("request received /create")
		var user *User = &User{}
		decoder := json.NewDecoder(r.Body)

		if err := decoder.Decode(user); err != nil {
			fmt.Println(err)
		}
		if err := AddUser(user); err != nil {
			fmt.Println(err)
		}
		w.WriteHeader(201)
	})
	http.HandleFunc("POST /", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("request received to /")
		var user *User = &User{}
		decoder := json.NewDecoder(r.Body)

		if err := decoder.Decode(user); err != nil {
			fmt.Println(err)
		}
		isLogedIn := GetUser(user.Username, user.Password)
		if isLogedIn {
			w.WriteHeader(200)
			data, err := json.Marshal(user)
			if err == nil {
				w.Write(data)
			} else {
				fmt.Println(err)
			}
		} else {
			w.WriteHeader(404)

		}
	})
	fmt.Println("Opening Server on port 8000")
	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		fmt.Println("Error starting server ", err)
	}

}
