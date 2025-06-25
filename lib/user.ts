// This is a mock implementation for demonstration purposes

export async function getUserProfile() {
  // Simulate API request delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Return mock user data
  return {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    image: "",
    problemsSolved: 42,
    recentlySolved: 5,
    globalRank: 128,
    rankChange: 15,
    contestsWon: 2,
    totalContests: 8,
    rating: 1850,
    ratingChange: 75,
  }
}

