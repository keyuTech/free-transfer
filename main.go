package main

import (
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/gin-gonic/gin"
	"github.com/zserge/lorca"
)

func main() {
	go func() {
		gin.SetMode(gin.DebugMode)
		router := gin.Default()
		router.GET("/", func(c *gin.Context) {
			c.String(http.StatusOK, "<h1>Free-Transfer</h1>")
		})
		router.Run(":8080")
	}()
	fmt.Println("here--------------")
	ui, _ := lorca.New("http://127.0.0.1:8080", "", 800, 600, "--disable-sync", "--disable-translate")
	chSignal := make(chan os.Signal, 1)
	signal.Notify(chSignal, syscall.SIGINT, syscall.SIGTERM)
	select {
	case <-ui.Done():
	case <-chSignal:
	}

	ui.Close()
}
