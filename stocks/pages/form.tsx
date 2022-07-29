import {FormEvent, useState} from 'react'

export default function Form() {

    const [name, setName] = useState('')
    const [teste, setTeste] = useState('')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = {
            name,
            teste,
        }

        const response = await fetch('/api/submit' , {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            } ,
            body: JSON.stringify(form)
        })

        const content = await response.json()

        alert(content)
        
        setName('')
        setTeste('')

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'> Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} type="text" name="name" id="name" />
                </div>
                <div>
                    <label htmlFor='teste'> Teste</label>
                    <input value={teste} onChange={e => setTeste(e.target.value)} type="text" name="teste" id="teste" />
                </div>
                <div>
                    <button type='submit'>Enviar</button>
                    
                </div>
            </form>
        </div>
    )
}