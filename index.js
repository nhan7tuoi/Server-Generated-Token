import express from "express";
import { JWT } from "google-auth-library";
const PORT = 3000;

const app = express();
app.use(express.json());

app.post("/getAccessToken", (req, res) => {
  const body = req.body;

  new Promise(() => {
    const jwtClient = new JWT({
      email: body.email,
      key: body.key,
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    });

    jwtClient.authorize((error, tokens) => {
      if (error) {
        throw new Error(error);
      }
      console.log(`Token: ${tokens.access_token}`);
      res.status(200).json({
        message: "Token generated successfully",
        data: tokens.access_token,
      });
    });
  });
});

app.listen(PORT, (error) => {
  if (error) {
    console.log(`Error: ${error}`);
  }
  console.log(`Server is running on port ${PORT}`);
});
