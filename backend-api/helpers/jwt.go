package helpers

import (
	"react-go/backend-api/config"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte(config.GetEnv("JWT_SECRET", "secret"))

func GenerateToken(username string) (token string) {
	expireTime := time.Now().Add(60 * time.Minute)

	claims := &jwt.RegisteredClaims{
		Subject:   username,
		ExpiresAt: jwt.NewNumericDate(expireTime),
	}

	token, _ = jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString(jwtKey)
	return
}
