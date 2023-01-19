import "dotenv/config"
import { createTransport } from 'nodemailer'
import { AppError } from "../errors/appError"
import hbs from "nodemailer-express-handlebars"
import path from "path"

export const forgotPasswordSendEmail = async (email:string,link:string,name:string,date:string) => {
     
     const transporter = createTransport({
          host: "smtp-mail.outlook.com",
          port: 587,
          secure: false,
          auth: {
               user: process.env.SMPT_EMAIL,
               pass: process.env.SMPT_PASSWORD
          }
     })

     const options = {
          extName: ".handlebars",
          layoutsDir: path.resolve('./src/views/'),
          defaultLayout:"forgotPasswordTemplate"
     }

     transporter.use('compile', hbs({
          viewEngine: options,
          viewPath: path.resolve('./src/views/')
     }))

     const messageInfo = {
          from: process.env.SMPT_EMAIL,
          to: email,
          subject: "Você solicitou a recuperação de senha?",
          text: "recuperação de senha",
          template: "forgotPasswordTemplate",
          attachments: [{
               path: path.resolve("./src/views/assets/logo.svg"),
               cid: 'logo'
          }],
          context:{link: link, date: date, name: name}
     }

     await transporter.sendMail(messageInfo)
          .then(() => {
          console.log('Password recovery email sent')
          
      }).catch((err) => {
          console.log(err)
          throw new AppError('Error to send email, try again later')
      })
}
