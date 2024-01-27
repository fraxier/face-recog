import { useEffect } from "react"


export default function FaceRecognition({imgURL, boxes}) {

  const borderBox = (boxProps) => (
    <div key={boxProps.conceptVal} 
         style={{
            position:"absolute", 
            border:"8px solid red", 
            zIndex: 10,
            top: boxProps.boundary.topRow, 
            right: boxProps.boundary.rightCol, 
            bottom: boxProps.boundary.bottomRow, 
            left: boxProps.boundary.leftCol
         }}>
    </div>
  )

  return (
    <div className="flex justify-center relative">
      {boxes.map((box) => {
        console.log(box)
        return borderBox(box)
      })}
      <img id="image" src={imgURL} />
    </div>
  )
}