const axios = require('axios');

async function test() {
  try {
    const payload = {
      name: "Test",
      email: "test@example.com",
      profilePic: "a".repeat(2 * 1024 * 1024) // 2MB string
    };
    const res = await axios.put('http://localhost:5000/api/auth/profile', payload);
    console.log("Success:", res.data);
  } catch (err) {
    console.error("Error:", err.response ? err.response.data : err.message);
  }
}

test();
