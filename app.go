package main

import (
	"context"
	"fmt"
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
