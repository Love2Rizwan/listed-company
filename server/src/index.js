


// app.js
const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");

const port = 8080; // or any other port you prefer

// Set up your Gmail API credentials
const { google } = require("googleapis");
const credentials = require("./credentials.json");
const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

// Set up your app routes and endpoints
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Register authentication routes
app.use("/", authRoutes);

// Use the Gmail API to fetch emails
app.get("/emails", async (req, res) => {
  // Set up the Gmail API client
  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

  // Fetch the list of emails from the inbox
  const result = await gmail.users.messages.list({ userId: "me" });

  // Extract the email IDs from the list
  const emailIds = result.data.messages.map((message) => message.id);

  // Fetch the full email details for each ID
  const emails = await Promise.all(
    emailIds.map(async (id) => {
      const email = await gmail.users.messages.get({ userId: "me", id });
      return email.data;
    })
  );

  // Send the list of emails as JSON response
  res.json(emails);
});

// Start the app
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});









// const express = require("express");
// const app = express();
// const authRoutes = require("./routes/auth");

// const port = 8080; // or any other port you prefer

// // Set up your Gmail API credentials
// const { google } = require("googleapis");
// const credentials = require("./credentials.json");
// const { client_secret, client_id, redirect_uris } = credentials.installed;
// const oAuth2Client = new google.auth.OAuth2(
//   client_id,
//   client_secret,
//   redirect_uris[0]
// );

// // Set up your app routes and endpoints
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// // Register authentication routes
// app.use("/", authRoutes(oAuth2Client));

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

// // Start the app
// app.listen(port, () => {
//   console.log(`App running at http://localhost:${port}`);
// });

// // app.js

// const express = require("express");
// const app = express();
// const route = require("./routes/auth");

// const port = 8080; // or any other port you prefer

// // Set up your Gmail API credentials
// const { google } = require("googleapis");
// const credentials = require("./credentials.json");
// const { client_secret, client_id, redirect_uris } = credentials.installed;
// const oAuth2Client = new google.auth.OAuth2(
//   client_id,
//   client_secret,
//   redirect_uris[0]
// );

// // Set up your app routes and endpoints
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// // route
// app.use("/", route(oAuth2Client));

// // Start the app
// app.listen(port, () => {
//   console.log(`App running at http://localhost:${port}`);
// });

// // const express = require("express");
// // const app = express();
// // const route = require("./routes/auth")

// // const port = 8080; // or any other port you prefer

// // // Set up your Gmail API credentials
// // const { google } = require("googleapis");
// // const credentials = require("./credentials.json");
// // const { client_secret, client_id, redirect_uris } = credentials.installed;
// // const oAuth2Client = new google.auth.OAuth2(
// //   client_id,
// //   client_secret,
// //   redirect_uris[0]
// // );

// // // Set up your app routes and endpoints
// // app.get("/", (req, res) => {
// //   res.send("Hello World!");
// // });

// // // route
// // app.use("/", route)

// // // Start the app
// // app.listen(port, () => {
// //   console.log(`App running at http://localhost:${port}`);
// // });
