import React, { useState } from 'react'
import "./style.css"

export default function Formule() {
    const [formData, setFormData] = useState({
        nom: "",
        email: "",
        message: "",
    })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
    }

    return (
        <section className='CardContainer' style={{width:'100%'}}>
            <div className='Card' style={{width:'99%'}}>
                <h1>Contact</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name='nom'
                        placeholder='Nom Complet'
                        value={formData.nom}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <textarea
                        name="message"
                        placeholder='Type your message...'
                        value={formData.message}
                        onChange={handleChange}
                    />
                    <button style={{margin:"10px",width:"50%"}} className='buy' type='submit'>Envoyer</button>
                </form>

                {submitted && (
                    <div>
                        <span>Nom : {formData.nom}</span><br />
                        <span>Email : {formData.email}</span><br />
                        <span>Message : {formData.message}</span><br />
                        <h2 style={{color:"greenyellow"}}>Message sent successfully</h2>
                    </div>
                )}
            </div>
        </section>
    )
}
