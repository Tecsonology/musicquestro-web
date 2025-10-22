import axios from "axios";

const VITE_NETWORK_HOST = import.meta.env.VITE_NETWORK_HOST || "http://localhost:5000";

export async function authenticateToken() {
  try {
    const token = localStorage.getItem("token"); 

    if (!token) {
      console.log("No token found.");
      return false;
    }

    const response = await axios.post(`${VITE_NETWORK_HOST}/authenticateToken`, { token });

    if (response.data.message === "Token valid") {
      console.log("Token valid")
      return response.data.user.userids;
    }
  } catch (error) {
    if(error.response?.data?.message === 'unauthorized'){
      alert('Session expired. Login first.')
      localStorage.clear()
      window.location.href = '/login'
    }
    console.error("❌ Invalid token:", error.response?.data?.message || error.message);
    return false;
  }
}
