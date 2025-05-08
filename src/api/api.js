let authToken = null;

const BASE_URL = "http://20.244.56.144/evaluation-service";

// ✅ Replace with your actual credentials
const credentials = {
  companyName: "YourCompany",
  clientID: "your-client-id",
  clientSecret: "your-client-secret",
  ownerName: "Your Name",
  ownerEmail: "your@email.com",
  rollNo: "YourRollNo"
};

/**
 * Register your app — you only need this once.
 * You can comment this out after first use.
 */
export const registerApp = async () => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    });

    const data = await response.json();
    console.log("✅ Registration success:", data);
    return data;
  } catch (err) {
    console.error("❌ Registration failed:", err);
    throw err;
  }
};

/**
 * Get an auth token and store it
 */
export const getAuthToken = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientID: credentials.clientID,
        clientSecret: credentials.clientSecret
      })
    });

    const data = await response.json();
    authToken = data.access_token;
    console.log("✅ Token acquired:", authToken);
    return authToken;
  } catch (err) {
    console.error("❌ Token fetch failed:", err);
    throw err;
  }
};

/**
 * Helper: Returns headers with auth
 */
const getHeaders = () => ({
  Authorization: `Bearer ${authToken}`,
  "Content-Type": "application/json"
});

/**
 * Fetch all users
 */
export const fetchUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "GET",
    headers: getHeaders()
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return await res.json();
};

/**
 * Fetch all posts
 */
export const fetchPosts = async () => {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "GET",
    headers: getHeaders()
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return await res.json();
};

/**
 * Fetch all comments
 */
export const fetchComments = async () => {
  const res = await fetch(`${BASE_URL}/comments`, {
    method: "GET",
    headers: getHeaders()
  });
  if (!res.ok) throw new Error("Failed to fetch comments");
  return await res.json();
};

/**
 * Optional: expose the token (e.g., for debug)
 */
export const getToken = () => authToken;
