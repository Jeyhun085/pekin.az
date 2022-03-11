import mailjet1 from 'node-mailjet'
const mailjet = mailjet1
.connect('a17761d51a0e8aa93d1b0f400af4feac', '9d6698e25edf371dd948a2082edc79a6')
const request = mailjet
.post("send", {'version': 'v3.1'})
.request({
  "Messages":[
    {
      "From": {
        "Email": "asgarov.jeyhun@mail.ru",
        "Name": "Jeyhun"
      },
      "To": [
        {
          "Email": "asgarov.jeyhun@mail.ru",
          "Name": "Jeyhun"
        }
      ],
      "Subject": "Greetings from Mailjet.",
      "TextPart": "My second Mailjet email"
    }
  ]
})
request
  .then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    console.log(err.statusCode)
  })
