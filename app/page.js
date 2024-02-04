'use client'

import { useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react"
import ParticlesBg from "particles-bg"

export default function Home() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = (e) => {
        setUsername(e)
    }
    const handlePasswordChange = (e) => {
        setPassword(e)
    }


    return (
        <>
            <ParticlesBg type="circles" bg={true} num={0.5} color="#FFFFFF"/>
            <Card radius="lg" isBlurred className="border-none p-6 max-w-screen-sm mx-auto">
                <CardHeader>
                    <p className="text-3xl font-bold text-gray-700">Sign In</p>
                </CardHeader>
                <CardBody>
                    <Input size="lg" color="primary" isRequired value={username} onValueChange={handleUsernameChange} label="Username" className="mb-4"/>
                    <Input size="lg" color="primary" isRequired type="password" value={password} onValueChange={handlePasswordChange} label="password"  />
                </CardBody>
                <CardFooter className="">
                    <Button color='primary'>Submit</Button>
                </CardFooter>
            </Card>
        </>
    )
}