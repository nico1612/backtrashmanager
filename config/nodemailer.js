import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nicogonzalezraggi123@gmail.com',
        pass: 'qsbu gjkk uzfm wcaj'
    }
})

transporter.verify().then(()=>{
    console.log('Ready for send mail')
})