const express = require("express")
const nodemailer = require("nodemailer")
require("dotenv/config")

const app = express()

app.use(express.json())
app.use(express.static("public"))
app.use(
  express.urlencoded({
    extended: true,
  })
)

// app.post("/sendmail", (req, res) => {
//   const { email } = req.body

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
    // res.send("An error occured. Try again.")
  } else {
    console.log(info)
    // res.json({ info })
  }
})
// })

app.listen(5000, () => console.log("Server running on port 5000"))
