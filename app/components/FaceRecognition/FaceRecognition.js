import { CircularProgress } from "@nextui-org/react"


export default function FaceRecognition({imgURL, boxes, showLoading}) {

  const borderBox = (boxProps) => (
    <div key={boxProps.conceptVal} 
         style={{
            position:"absolute", 
            border:"3px solid red", 
            zIndex: 10,
            top: boxProps.boundary.topRow, 
            right: boxProps.boundary.rightCol, 
            bottom: boxProps.boundary.bottomRow, 
            left: boxProps.boundary.leftCol
         }}>
    </div>
  )

  return (
    <div className="relative max-w-screen-sm mx-auto">
      {showLoading ? <CircularProgress label="Loading" /> : ""}
      {boxes.map((box) => {
        return borderBox(box)
      })}
      <img id="image" src={imgURL} />
    </div>
  )
}