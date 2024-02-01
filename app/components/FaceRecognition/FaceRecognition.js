import { useRouter } from "next/navigation"
import { useEffect } from "react"


export default function FaceRecognition({imgURL}) {

  const router = useRouter()

  useEffect(() => {
    router.push('#pg-bottom')
    
  }, [])

  return (
    <div className="relative max-w-screen-sm mx-auto my-4">      
      <img className="my-4" id="image" src={imgURL} />
    </div>
  )
}