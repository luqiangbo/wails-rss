package main

import (
	"github.com/mmcdole/gofeed"
)

type Response struct {
	Code int         `json:"code"`
	Data interface{} `json:"data"`
	Msg  string      `json:"msg"`
}

func Result(code int, data interface{}, msg string) Response {
	return Response{
		code,
		data,
		msg,
	}
}

// RSSFeed 是解析后的 RSS 数据结构
type RSSFeed struct {
	Title string    `json:"title"`
	Items []RSSItem `json:"items"`
}

// RSSItem 是 RSS 订阅项的数据结构
type RSSItem struct {
	Title string `json:"title"`
	Link  string `json:"link"`
}

// 解析订阅源
func ParseRSSFeed(url string) (*RSSFeed, error) {
	fp := gofeed.NewParser()
	feed, err := fp.ParseURL(url)
	if err != nil {
		return nil, err
	}
	rssFeed := &RSSFeed{
		Title: feed.Title,
	}

	for _, item := range feed.Items {
		rssFeed.Items = append(rssFeed.Items, RSSItem{
			Title: item.Title,
			Link:  item.Link,
		})
	}

	return rssFeed, nil
}
