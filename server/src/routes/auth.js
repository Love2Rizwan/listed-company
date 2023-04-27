const express = require("express");
const router = express.Router();

module.exports = (oAuth2Client) => {
  // Create an authentication URL for your app
  router.get("/login", (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      // scope: ["https://www.googleapis.com/auth/gmail.readonly"], // or any other scopes you need
      scope: ["https://mail.google.com/"], // or any other scopes you need
    });
    res.redirect(authUrl);
  });

  // Set up the callback route for authorization code
  router.get("/callback", async (req, res) => {
    const code = req.query.code;
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    // Store the access token and refresh token for future use
    // You can save it in a database, a file, or any other secure storage
    // tokens.access_token and tokens.refresh_token are the values you need
    res.send(
      "Authorization successful! You can now use the Gmail API in your app."
    );
  });

  return router;
};



// const express = require("express");
// const router = express.Router();

// module.exports = (oAuth2Client) => {
//   // Create an authentication URL for your app
//   router.get("/login", (req, res) => {
//     const authUrl = oAuth2Client.generateAuthUrl({
//       access_type: "offline",
//       scope: ["https://www.googleapis.com/auth/gmail.readonly"], // or any other scopes you need
//     });
//     res.redirect(authUrl);
//   });

//   // Set up the callback route for authorization code
//   router.get("/callback", async (req, res) => {
//     const code = req.query.code;
//     const { tokens } = await oAuth2Client.getToken(code);
//     oAuth2Client.setCredentials(tokens);
//     // Store the access token and refresh token for future use
//     // You can save it in a database, a file, or any other secure storage
//     // tokens.access_token and tokens.refresh_token are the values you need
//     res.send(
//       "Authorization successful! You can now use the Gmail API in your app."
//     );
//   });

//   return router;
// };

// // auth.js

// const express = require("express");
// const router = express.Router();

// module.exports = (oAuth2Client) => {
//   router.get("/oauth2callback", (req, res) => {
//     const code = req.query.code;
//     oAuth2Client.getToken(code, (err, token) => {
//       if (err) return console.error("Error retrieving access token", err);
//       oAuth2Client.setCredentials(token);
//       res.redirect("/");
//     });
//   });

//   return router;
// };

// const express = require("express");
// const app = express();

// // Create an authentication URL for your app
// app.get("/auth", (req, res) => {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: ["https://www.googleapis.com/auth/gmail.readonly"], // or any other scopes you need
//   });
//   res.redirect(authUrl);
// });

// // Set up the callback route for authorization code
// app.get("/auth/callback", async (req, res) => {
//   const code = req.query.code;
//   const { tokens } = await oAuth2Client.getToken(code);
//   oAuth2Client.setCredentials(tokens);
//   // Store the access token and refresh token for future use
//   // You can save it in a database, a file, or any other secure storage
//   // tokens.access_token and tokens.refresh_token are the values you need
//   res.send(
//     "Authorization successful! You can now use the Gmail API in your app."
//   );
// });

// // Use the Gmail API to fetch emails
// app.get("/emails", async (req, res) => {
//   // Set up the Gmail API client
//   const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

//   // Fetch the list of emails from the inbox
//   const result = await gmail.users.messages.list({ userId: "me" });

//   // Extract the email IDs from the list
//   const emailIds = result.data.messages.map((message) => message.id);

//   // Fetch the full email details for each ID
//   const emails = await Promise.all(
//     emailIds.map(async (id) => {
//       const email = await gmail.users.messages.get({ userId: "me", id });
//       return email.data;
//     })
//   );

//   // Send the list of emails as JSON response
//   res.json(emails);
// });

// module.exports = app;
