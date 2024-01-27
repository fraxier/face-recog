import {Input, Button} from "@nextui-org/react"

export default function ImageLinkForm ({ setInput, onButtonSubmit }) {
  
  const handleChange = (event) => {
    setInput(event.target.value)
  }
  
  return (
    <div>
      <p className="text-center mb-3">This Magic Brain will detect faces in your pictures. Give it a try.</p>
      <div className="flex w-full flex-nowrap gap-4 items-center">
        <Input color="primary" type="text" label="Image URL" onChange={handleChange} isClearable/>
        <Button color="primary" size="lg" variant="shadow" onClick={onButtonSubmit}>Detect</Button>
      </div>
    </div>
  )
}