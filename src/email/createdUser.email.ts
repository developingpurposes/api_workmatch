import "dotenv/config"
import { createTransport } from 'nodemailer'
import { AppError } from "../errors/appError"
import hbs from "nodemailer-express-handlebars"
import path from "path"

export const createdUserSendEmail = async (name:string, email:string) => {
     
     const transporter = createTransport({
          host: "smtp-mail.outlook.com",
          port: 587,
          secure: false,
          auth: {
               user: process.env.SMPT_EMAIL,
               pass: process.env.SMPT_PASSWORD,
          }
     })

     const options = {
          extName: ".handlebars",
          layoutsDir: path.resolve('./src/views/'),
          defaultLayout:"createUserTemplate"
     }

     transporter.use("compile", hbs({
          viewEngine: options,
          viewPath: path.resolve('./src/views/'),
     }))
    

     const messageInfo = {
          from: process.env.SMPT_EMAIL,
          to: email,
          subject: "Usuario Criado - Não tenho ideia do assunto para esse e-mail",
          text: "colocar alguma informação aqui",
          template: "createUserTemplate",
          attachments: [{
               filename: 'imagename.svg',
               path: path.resolve("./src/views/assets/logo.svg"),
               cid: 'logo'
         }],
          context: {name: name}
     }



     await transporter.sendMail(messageInfo)
     .then(() => {
          console.log('Email send')
      }).catch((err) => {
          console.log(err)
          throw new AppError('Error sending email, try again later')
      })
}
