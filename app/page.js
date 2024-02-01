'use client'

import { useState } from "react";
import ParticlesBg from "particles-bg";
import { Card, CardBody, Spinner } from "@nextui-org/react";

import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Logo from "./components/Logo/logo";
import Rank from "./components/Rank/rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import InfoModal from "./components/InfoModal/InfoModal";

export default function Home() {

  const [input, setInput] = useState('')
  const [imgURL, setImgURL] = useState()
  const [concepts, setConcepts] = useState([]) //useState([{name: '20-29'}])
  const [isLoading, setLoading] = useState(false)

  const sortConcepts = (a, b) => {
    return Number(b.value) - Number(a.value)
  }

  const onFormSubmit = () => {
    console.log('Click!')
    setLoading(true)
    setImgURL(input)
    const PAT = '4f74d126bc3d47778d17f7708b8747b9';
    const USER_ID = 'clarifai';       
    const APP_ID = 'demographics-age-new';
    const MODEL_ID = 'age-demographics';
    const MODEL_VERSION_ID = '102391edafbe2c07bdbc128995b88e67';
    const IMAGE_URL = input;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    console.log(raw)

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          const sortedList = result.outputs[0].data.concepts.sort(sortConcepts)
          setConcepts(sortedList)
          setLoading(false)
        })
        .catch(error => console.log('error', error));
  }

  const clearForm = () => {
    setConcepts([])
    setImgURL('')
  }

  return (
    <main className="w-screen flex flex-col p-24 gap-10">
      <ParticlesBg type="circles" bg={true} num={0.5} color="#FFFFFF"/>
      <div className="w-full flex flex-row justify-between">
          <Logo />
          <Navigation />
      </div>
      <p className="text-center text-5xl">Smart Brain</p>
      <p className="text-center text-2xl">Use AI to determine someone's age!</p>
      <InfoModal />
      <Card className="py-8 px-4 border-none bg-background/60 dark:bg-default-100/50">
        <CardBody>
          <ImageLinkForm input={input} setInput={setInput} onButtonSubmit={onFormSubmit} clearForm={clearForm} />
          {imgURL ? <FaceRecognition imgURL={imgURL}/> : ""}
          {isLoading ? <Spinner size="lg" color="primary" label="Feeling age vibe..." className="mx-auto my-4" /> : ""}
          { concepts.length > 0 ? 
            <Rank concept={concepts[0]} /> : ""
          }
        </CardBody>
        <div id="pg-bottom"></div>
      </Card>
    </main>
  );
}

// "color"
// "ball"
// "lines"
// "thick"
// "circle"
// "cobweb"
// "polygon"
// "square"
// "tadpole"
// "fountain"
// "random"
// "custom"

