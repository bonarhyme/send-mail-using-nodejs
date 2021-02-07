**Hello everyone!!!**

Sending mails to your users is like a must do for every developer; it can be a verification mail, a password reset mail, or maybe a simple reminder mail for a service.

The good news is that with NodeJS it is very easy to setup.

So, in this post, I will show you how to send emails using NodeJS in less than 5 minutes.

_\*\*PS: follow the instructions below to complete the setup. If you are familiar with nodejs, skip to step 4._

### Step 1 (Setup a new NodeJS project)

To setup your NodeJS , do the following:

1. Create an empty folder, such as send-mail-using-nodejs
2. Open the folder in your code editor, such as vscode.
3. Open the terminal. [you can use (``ctrl + shift + ` ``) to open terminal if you are on windows. ]
4. Run `npm init`. [input the necessary stuff] or just run `npm init -y` to skip. You should see that package.json was created. Inside the package.json, you change the value of main to "server.js".
5. Replace the test with `"start": "node server.js"`
6. Create a server.js file.
   Your package.json should now contain something that looks like this:
   ![how-package-json-should-look-on-setup.PNG](https://cdn.hashnode.com/res/hashnode/image/upload/v1612188177328/IoXS2sV_m.png)

### Step 2 (Install necessary dependencies)

To Install the necessary dependencies, do the following.

1. Open the terminal and Run `npm install express nodemailer` to install express and nodemailer.
   _note: expressJS is nodejs framework that helps us create a server really fast. nodemailer is a client that helps us send emails._

2. Run `npm install -D nodemon dotenv` to install nodemon and dotenv as a dev dependency. _note: nodemon helps us restart our server on every file change. Add `"dev": "nodemon server.js"` to the package.json. Also, dotenv helps us access our .env variables_

Your package.json should now look like this:
![how-package-json-should-look-after-adding-nodemon.PNG](https://cdn.hashnode.com/res/hashnode/image/upload/v1612189137986/K7QeziEEB.png)

### Step 3 (Setup a server with ExpressJS)

To setup an express server do the following

1. Open the server.js file.

2. Import and setup ExpressJs server:

```
const express = require("express")
const app = require("express")

app.listen(5000, () => console.log("Server running on port 5000"))
```

&#x33;. Open the terminal and run `npm run dev` to start your server.
_note: you should see a message saying "Server running on port 5000"_

### Step 4 (Set up nodemailer)

To set up nodemailer and send mails, do the following:

1. Import nodemailer: `const nodemailer = require("nodemailer")`

2. Create a transporter:

```
    //The service can be gmail or whatever you choose. I am using
        outlook or better hotmail.

     const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: { rejectUnauthorized: false },
      })
```

3.  Import dotenv: `require("dotenv/config")`

4.  Create a .env file and put in two key value pair like this:

```
EMAIL_USERNAME="your_email@outlook.com"
EMAIL_PASSWORD="your_password"
```

5. Create the body of the email:

```
const body = {
    from: process.env.EMAIL_USERNAME,
    to: "email_address_to_be_sent_to_",
    subject: "Testing node mailer",
    html: `
          <h1>This is an email to test run nodemailer</h1>
          <p>So, This is it guys!!! We have done it</p>
          `,
  }
```

6. Send the email:

```
  transporter.sendMail(body, function (error, info) {
    if (error) {
      console.log(error)
      res.send("An error occured. Try again.")
    } else {
      console.log(info)
      res.json({ info })
    }
  })
```

7. Save your work! You should see that the email has been sent.

8. if you run into this error below, do the following:
   set this key/value `NODE_EXTRA_CA_CERTS=A_FILE_IN_OUR_PROJECT` in your .env file
   ![send-mail-using-nodejs-possible-error.PNG](https://cdn.hashnode.com/res/hashnode/image/upload/v1612188152924/eHQFYvZU2.png)

Final code should be:

```
const express = require("express")
const nodemailer = require("nodemailer")
require("dotenv/config")

const app = express()

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: { rejectUnauthorized: false },
})

const body = {
  from: process.env.EMAIL_USERNAME,
  to: "bonarhyme@gmail.com",
  subject: "Testing node mailer",
  html: `
          <h1>This is an email to test run nodemailer</h1>
          <p>So, This is it guys!!! We have done it</p>
          `,
}

transporter.sendMail(body, function (error, info) {
  if (error) {
    console.log(error)
  } else {
    console.log(info)
  }
})


app.listen(5000, () => console.log("Server running on port 5000"))
```

We did it guys!! Next post will be improving this code to send the email using an html form.

_Hit the like button and comment to boost my morale_
