package main

import (
	"crypto/sha256"
	"fmt"

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

func GetIdString(req string) string {
	// 将输入字符串与盐值连接
	data := []byte(req)

	// 计算 SHA-256 哈希值
	hash := sha256.Sum256(data)

	// 将哈希值转换为十六进制字符串
	hashStr := fmt.Sprintf("%x", hash)

	return hashStr
}

// RSSFeed 是解析后的 RSS 数据结构
type RSSFeed struct {
	Id    string    `json:"id"`
	Title string    `json:"title"`
	Link  string    `json:"link"`
	Items []RSSItem `json:"items"`
}

// RSSItem 是 RSS 订阅项的数据结构
type RSSItem struct {
	Id          string  `json:"id"`
	RssId       string  `json:"rss_id"`
	Title       string  `json:"title"`
	Link        string  `json:"link"`
	Description string  `json:"description"`
	Content     *string `json:"content"`
	PubDate     string  `json:"pub_date"`
}

// 解析订阅源
func ParseRSSFeed(url string) (*RSSFeed, error) {
	fp := gofeed.NewParser()
	fp.UserAgent = "MyCustomAgent 1.0"
	feed, err := fp.ParseURL(url)
	// fmt.Println(feed)
	fmt.Println(err)
	if err != nil {
		return nil, err
	}
	rssId := GetIdString(feed.Title)
	rssFeed := &RSSFeed{
		Id:    rssId,
		Title: feed.Title,
		Link:  url,
	}

	maxItems := 99
	itemCount := 0

	for _, item := range feed.Items {
		if itemCount >= maxItems {
			break
		}

		pubDate := item.PublishedParsed
		formattedPubDate := pubDate.Format("2006-01-02 15:04:05")

		rssFeed.Items = append(rssFeed.Items, RSSItem{
			Id:          GetIdString(item.Link),
			RssId:       rssId,
			Title:       item.Title,
			Link:        item.Link,
			Description: item.Description,
			Content:     &item.Content,
			PubDate:     formattedPubDate,
		})
		itemCount++
	}

	return rssFeed, nil
}
