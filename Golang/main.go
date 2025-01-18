package main

import (
	"bufio"
	"fmt"
	"os"
)

func add(a int, b int) int {
	return a + b
}

func main() {
	fmt.Println("Hello, Go!")

	var name string = "Gopher"
	age := 10 // Short variable declaration
	fmt.Printf("Hello, %s! You are %d years old.\n", name, age)

	result := add(3, 5)
	fmt.Println("Sum:", result)

	if age >= 18 {
		fmt.Println("Adult")
	} else {
		fmt.Println("Minor")
	}

	for i := 0; i < 5; i++ {
		fmt.Println(i)
	}

	// Define the day variable
	day := "Monday" // Set a value for the day
	switch day {
	case "Monday":
		fmt.Println("Start of the week")
	case "Friday":
		fmt.Println("Almost weekend!")
	default:
		fmt.Println("Midweek days")
	}

	var arr [5]int
	arr[0] = 1
	fmt.Println(arr)

	nums := []int{2, 4, 6}
	nums = append(nums, 8)
	fmt.Println(nums)

	m := map[string]int{"Alice": 25, "Bob": 30}
	fmt.Println(m["Alice"])

	go func() {
		fmt.Println("Running in a goroutine")
	}()

	ch := make(chan int)
	go func() { ch <- 42 }()
	fmt.Println(<-ch) // Receive from channel

	// Wait for user input before exiting
	fmt.Println("Press Enter to exit...")
	bufio.NewReader(os.Stdin).ReadBytes('\n')
}