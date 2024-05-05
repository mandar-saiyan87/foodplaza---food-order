import React from 'react'
import ContactCard from '../../components/ContactCard'

function Contact() {
  return (
    <div className='container container_main'>
      <h1>Contact Us</h1>
      <hr />
      <div className='contact_div'>
        <div>
          <h5>Investor Queries and Grievances</h5>
          <ContactCard
            name='Someone Surname'
            post='Vice President, Investor Relations'
            email='some@email.com'
          />
          <ContactCard
            name='anothername anotherSurname'
            post='Company Secretary'
            email='some@email.com'
          />
        </div>
        <div>
          <h5>Public Relations and Media</h5>
          <ContactCard
            name='Someone Surname'
            post='Vice President, Corporate Affairs'
            email='some@email.com'
          />
          <ContactCard
            name='anothername anotherSurname'
            post='Director, Corporate Communications'
            email='some@email.com'
          />
        </div>
      </div>
      <div className='registrar_adrs'>
        <h5>Registrar and Share Transfer Agent</h5>
        <p>
          Link Intime India Private Limited<br />
          Registrar and Share Transfer Agent<br />
          543/A, 7th Main, 3rd Cross S L Bhyrappa Road, Hanumanthnagar<br />
          Bengaluru, Karnataka 560019
        </p>
        <p>Phone: <span>+91 22 421201</span></p>
      </div>
      <div className='corpo_adrs'>
        <h2>Get In Touch</h2>
        <h4>Registered and Corporate Office</h4>
        <h5>FoodPlaza Limited</h5>
        <p>
          1635, Some Block<br />
          some street, some city<br />
          123456<br />
          Corporate Identity Number: U74111MU20122PLC096530<br />
          Registration Number: 092887
        </p>
      </div>
    </div>
  )
}

export default Contact