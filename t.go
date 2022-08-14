package main

import (
	"fmt"
	"regexp"
)

func main() {
	s := "「[難]^(にく)い」和「[難]^(がた)い」[難]^(むずか)しい前者表示难以达到物理上的某种程度)，偏口语，后者表示抽象层面上的难，偏书面。总是搭配其他动词使用。"
	c, _ := regexp.Compile(`\[([^]]+)]\^\(([^)]+)\)`)
	r := c.ReplaceAllString(s, "<ruby>$1<rt>$2</rt></ruby>")
	fmt.Println(r)
}
