import api from "../api/api";

// export const signUp = async (userData) => {
//   try {
//     const response = await api.post("signup", userData);
//     return response.data;
//   } catch (error) {
//     console.error("Sign Up Error:", error.response?.data || error.message);
//     throw error;
//   }
// };

// export const login = async (credentials) => {
//   try {
//     const response = await api.post("/login", credentials);
//     const { token } = response.data;

//     if (token) {
//       localStorage.setItem("token", token);
//     }

//     return response.data;
//   } catch (error) {
//     console.error("Login Error:", error.response?.data || error.message);
//     throw error;
//   }
// };

export const logout = async () => {
  try {
    await api.post("/logout");
  } catch (error) {
    console.warn("Logout request failed, but clearing token anyway.");
  }

  localStorage.removeItem("acceccToken");
  console.log("User logged out.");
};
