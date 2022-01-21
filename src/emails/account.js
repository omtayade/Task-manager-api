const sgMail=  require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeMessage=(email,name)=>{
    sgMail
    .send({
        to: email, // Change to your recipient
        from: 'omtayade160901@gmail.com', // Change to your verified sender
        subject: 'Thanks for considering Task-Manager app by Om',
        text: `Welcome to the Task-Manager, ${name}. We hope you will enjoy the services provided by our app!`
        
      })
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}

const sendCancellationMail=(email,name)=>{
    sgMail
    .send({
        to: email, // Change to your recipient
        from: 'omtayade160901@gmail.com', // Change to your verified sender
        subject: 'Sorry to see you go!',
        text: `Goodbye ${name}.We hope to see you back soon.`
        
      })
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}




 module.exports={
     sendWelcomeMessage,
     sendCancellationMail
 }