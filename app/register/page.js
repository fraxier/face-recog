'use client'

import { useState, useEffect } from 'react'
import { Button, Input } from "@nextui-org/react"
import ParticlesBg from "particles-bg"

export default function Register() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isSame, setIsSame] = useState(null)
    const [btnActive, setBtnActive] = useState(false)

    const handlePasswordChange = (value) => {
        setIsSame(null)
        setPassword(value)
    }

    const confirmPassword = (value) => {
        if (value.length === 0) {
            setIsSame(null)
        } else {
            setIsSame(value === password)
        }
    }

    const activateButtonCheck = () => {
        if (username.length > 0 && isSame === true) {
            console.log('good to go')
            setBtnActive(true)
        } else {
            console.log('not good to go')
            setBtnActive(false)
        }
    }
    
    useEffect(() => {
        activateButtonCheck()
    }, [username, password, isSame])

    return (
        <>
            <ParticlesBg type="circles" bg={true} num={0.5} color="#FFFFFF"/>
            <div className="flex flex-col gap-4 w-1/2 min-w-screen-sm mx-auto">
                <Input className='mb-4' label='Username' isRequired color='primary' value={username} onValueChange={setUsername} />
                <Input 
                    label='Password' 
                    isRequired
                    type='password'
                    color={isSame === null ? 'primary' : isSame ? 'success' : ''} 
                    value={password} 
                    onValueChange={handlePasswordChange} 
                    />
                <Input 
                    label='Confirm Password' 
                    isRequired
                    type='password'
                    color={isSame === null ? 'primary' : isSame ? 'success' : ''} 
                    onValueChange={confirmPassword} 
                    isInvalid={isSame != null && !isSame}
                    errorMessage={isSame != null && !isSame ? 'passwords do not match' : ''}
                    />
                <Button isDisabled={!btnActive} color='primary'>Register</Button>
            </div>
        </>
    )
}