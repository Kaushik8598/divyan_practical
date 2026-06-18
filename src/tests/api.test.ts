import { fetchAnalyticsData, fetchUsersData } from "@/services/api";

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

  it("successfully fetches user data from DummyJSON", async () => {
    const mockResponse = { users: [{ id: 1, firstName: "John" }], total: 1 };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const data = await fetchUsersData({
      page: 1,
      search: "",
      sortBy: "firstName",
      order: "asc",
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://dummyjson.com/users?limit=10&skip=0&sortBy=firstName&order=asc",
    );
    expect(data).toEqual(mockResponse);
  });

  it("handles search queries correctly for DummyJSON", async () => {
    const mockResponse = { users: [{ id: 2, firstName: "Jane" }], total: 1 };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    await fetchUsersData({
      page: 1,
      search: "Jane",
      sortBy: "firstName",
      order: "asc",
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://dummyjson.com/users/search?q=Jane&limit=10&skip=0&sortBy=firstName&order=asc",
    );
  });

  it("throws an error when fetchUsersData fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false, // Simulating a 404 or 500 error
    });

    await expect(
      fetchUsersData({
        page: 1,
        search: "",
        sortBy: "firstName",
        order: "asc",
      }),
    ).rejects.toThrow("Network response was not ok");
  });
});
