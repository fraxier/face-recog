import {Input, Button} from "@nextui-org/react"
import { useState } from "react"

export default function ImageLinkForm ({ input, setInput, onButtonSubmit }) {

  const handleChange = (event) => {
    setInput(event.target.value)
  }

  const handleClear = () => {
    setInput('')
  }
  
  return (
    <div>
      <div className="flex w-full flex-nowrap gap-4 items-center">
        <Input value={input} color="default" type="text" label="Image URL" onChange={handleChange} isClearable onClear={handleClear} />
        <Button color="primary" size="lg" variant="shadow" onClick={onButtonSubmit}>Detect</Button>
      </div>
    </div>
  )
}