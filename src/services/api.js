import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }
  return req;
});

export default API;
```

---

### Step 2 — Create `.env` in frontend root folder
```
REACT_APP_API_URL=https://internverse-backend-prag.onrender.com
