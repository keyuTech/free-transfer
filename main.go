package main

import (
	"embed"
	"fmt"
	"io/fs"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"strings"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/zserge/lorca"
)

//go:embed frontend/dist/*
var FS embed.FS

func main() {
	go func() {
		gin.SetMode(gin.DebugMode)
		router := gin.Default()
		staticFiles, err := fs.Sub(FS, "frontend/dist")
		if err != nil {
			log.Fatal(err)
		}
		router.StaticFS("/static", http.FS(staticFiles))
		router.NoRoute(func(ctx *gin.Context) {
			path := ctx.Request.URL.Path
			if strings.HasPrefix(path, "/static") {
				reader, err := staticFiles.Open("index.html")
				if err != nil {
					log.Fatal(err)
				}
				defer reader.Close()
				stat, err := reader.Stat()
				if err != nil {
					log.Fatal(err)
				}
				ctx.DataFromReader(http.StatusOK, stat.Size(), "text/html;charset=utf-8", reader, nil)
			} else {
				ctx.Status(http.StatusNotFound)
			}
		})
		router.POST("/api/v1/texts", TextController)
		router.Run(":8080")
	}()
	ui, _ := lorca.New("http://127.0.0.1:8080/static/index.html", "", 800, 600, "--disable-sync", "--disable-translate")
	chSignal := make(chan os.Signal, 1)
	signal.Notify(chSignal, syscall.SIGINT, syscall.SIGTERM)
	select {
	case <-ui.Done():
	case <-chSignal:
	}

	ui.Close()
}

func TextController(context *gin.Context) {
	var json struct {
		Raw string `json:"raw"`
	}

	if err := context.ShouldBindBodyWith(&json, binding.JSON); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		// get the path of executable file
		exe, err := os.Executable()
		if err != nil {
			log.Fatal(err)
		}
		dir := filepath.Dir(exe)
		fmt.Println(dir)
		// create a name for text file
		filename := strings.ReplaceAll(time.Now().Format("2006-01-02 15:04:05"), " ", "-")
		// create a save path for text file
		dirPath := filepath.Join(dir, "uploads")
		// create dir for text file
		err = os.MkdirAll(dirPath, os.ModePerm)
		if err != nil {
			log.Fatal(err)
		}
		// create full path for text file
		fullpath := filepath.Join("uploads", filename+".txt")
		// write file
		err = ioutil.WriteFile(filepath.Join(dir, fullpath), []byte(json.Raw), os.ModePerm)
		if err != nil {
			log.Fatal(err)
		}
		// return the file path
		context.JSON(http.StatusOK, gin.H{"url": "/"+fullpath})
	}
}