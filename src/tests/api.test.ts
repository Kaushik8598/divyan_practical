import { fetchAnalyticsData } from "@/services/api";

// Mock the global fetch API
global.fetch = jest.fn();

describe("API Fetching Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("successfully fetches and formats analytics data from external APIs", async () => {
    // 1. Setup mock data responses
    const mockUsers = [{ id: 1, username: "admin_divyan" }];
    const mockPosts = [
      { id: 101, userId: 1, title: "AI Integration Strategies" },
    ];

    // 2. Mock the Promise.all responses in order
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => mockUsers }) // First call: Users
      .mockResolvedValueOnce({ ok: true, json: async () => mockPosts }); // Second call: Posts

    // 3. Execute the function
    const data = await fetchAnalyticsData();

    // 4. Assertions to prove the integration works
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenNthCalledWith(
      1,
      "https://jsonplaceholder.typicode.com/users",
    );
    expect(global.fetch).toHaveBeenNthCalledWith(
      2,
      "https://jsonplaceholder.typicode.com/posts",
    );

    expect(data.users).toEqual(mockUsers);
    expect(data.posts).toEqual(mockPosts);
  });

  it("handles API failures gracefully", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network failure"),
    );

    await expect(fetchAnalyticsData()).rejects.toThrow("Network failure");
  });
});
