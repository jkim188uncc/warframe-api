import authService from "../services/authService.js";

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 400: missing fields
    if (!username || !email || !password) {
      return res.status(400).json({
        error: "Missing required fields"
      });
    }

    const user = await authService.signup(username, email, password);

    // 201 success
    return res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email
    });

  } catch (err) {
    if (err.type === "CONFLICT") {
      return res.status(409).json({
        error: err.message
      });
    }

    return res.status(500).json({
      error: "Server error"
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 400: missing credentials
    if (!email || !password) {
      return res.status(400).json({
        error: "Missing credentials"
      });
    }

    const token = await authService.login(email, password);

    // 200 success
    return res.status(200).json({
      token
    });

  } catch (err) {
    if (err.type === "UNAUTHORIZED") {
      return res.status(401).json({
        error: err.message
      });
    }

    return res.status(500).json({
      error: "Server error"
    });
  }
};

export default {
  signup,
  login
};