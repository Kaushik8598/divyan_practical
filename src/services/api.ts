export const fetchAnalyticsData = async () => {
  const [usersRes, postsRes] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users"),
    fetch("https://jsonplaceholder.typicode.com/posts"),
  ]);

  const users = await usersRes.json();
  const posts = await postsRes.json();

  return { users, posts };
};

// Users Data (DummyJSON)
export const fetchUsersData = async ({
  page = 1,
  search = "",
  sortBy = "firstName",
  order = "asc",
}: {
  page: number;
  search: string;
  sortBy: string;
  order: string;
}) => {
  const limit = 10;
  const skip = (page - 1) * limit;

  // DummyJSON handles search
  const baseUrl = search
    ? `https://dummyjson.com/users/search?q=${search}`
    : "https://dummyjson.com/users";

  const url = `${baseUrl}${search ? "&" : "?"}limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};
