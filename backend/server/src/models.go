package src

type User struct {
	ID       uint64 `gorm:"primary_key" json:"id,omitempty"`
	Username string `json:"username"`
	Password string `json:"password"`
}
