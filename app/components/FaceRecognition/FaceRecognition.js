import { CircularProgress } from "@nextui-org/react"


export default function FaceRecognition({imgURL, boxes, showLoading}) {

  return (
    <div className="relative max-w-screen-sm mx-auto">
      {showLoading ? <CircularProgress label="Feeling age vibe..." className="mx-auto" /> : ""}
      
      <img id="image" src={imgURL} />
    </div>
  )
}