package main

import (
	"context"
	"encoding/base64"
	"fmt"
	"io"
	"net/http"
	"strings"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) RssFeedAdd(rssList string) Response {
	var responses []*RSSFeed
	list := strings.Split(rssList, ",")
	for _, name := range list {
		res, err := ParseRSSFeed(name)
		if err == nil {
			responses = append(responses, res)
		}
	}
	if len(responses) == 0 {
		return Result(1, nil, "error")
	}

	return Result(0, responses, "success")
}

func (a *App) Img2base(url string) Response {
	// 发送HTTP请求获取图片数据
	resp, err := http.Get(url)
	if err != nil {
		return Result(-1, err.Error(), "")
	}
	defer resp.Body.Close()

	// 读取响应体中的图片数据
	fmt.Println(resp.Body)
	imageData, err := io.ReadAll(resp.Body)
	if err != nil {
		return Result(-2, err.Error(), "")
	}

	// 将图片数据转换为Base64编码的字符串
	base64Image := base64.StdEncoding.EncodeToString(imageData)
	return Result(0, base64Image, "success")
}
