'use client'

import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Logo from "./components/Logo/logo";
import Rank from "./components/Rank/rank";
import { useEffect, useState } from "react";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

export default function Home() {

  const [input, setInput] = useState('')
  const [boxRegions, setBoxes] = useState([])
  const [imgURL, setImgURL] = useState()
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    var docWidth = document.documentElement.offsetWidth;

    [].forEach.call(
      document.querySelectorAll('*'),
      function(el) {
        if (el.offsetWidth > docWidth) {
          console.log(el);
        }
      }
    );
  })
  
  const calculateFaceBox = ({ topRow, leftCol, bottomRow, rightCol }) => {
    const image = document.getElementById('image')
    const width = Number(image?.width)
    const height = Number(image?.height)
    return {
      topRow: Number(topRow) * height,
      leftCol: Number(leftCol) * width,
      bottomRow: height - (Number(bottomRow) * height),
      rightCol: width - (Number(rightCol) * width)
    }
  }

  const onButtonSubmit = () => {
    console.log('Click!')
    setLoading(true)
    const PAT = '4f74d126bc3d47778d17f7708b8747b9';
    const USER_ID = 'clarifai';
    const APP_ID = 'main';
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
    const IMAGE_URL = input;
    setImgURL(IMAGE_URL);
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

        const regions = result.outputs[0].data.regions;

        const boxes = []

        regions.forEach(region => {
            // Accessing and rounding the bounding box values
            const boundingBox = region.region_info.bounding_box;
            const topRow = boundingBox.top_row.toFixed(3);
            const leftCol = boundingBox.left_col.toFixed(3);
            const bottomRow = boundingBox.bottom_row.toFixed(3);
            const rightCol = boundingBox.right_col.toFixed(3);

            region.data.concepts.forEach(concept => {
                // Accessing and rounding the concept value
                const name = concept.name;
                const value = concept.value.toFixed(4);

                console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
                
                const result = calculateFaceBox({topRow, leftCol, bottomRow, rightCol})
                
                boxes.push({name: name, conceptVal: value, boundary: result})
            });
        });
        setBoxes(boxes)
        setLoading(false)
    })
    .catch(error => console.log('error', error));
  }

  return (
    <main className="w-screen flex flex-col p-24 gap-10">
      <div className="w-full flex flex-row justify-between">
        <Logo />
        <Navigation />
      </div>
      <Rank />
      <ImageLinkForm setInput={setInput} onButtonSubmit={onButtonSubmit} />
      <FaceRecognition imgURL={imgURL} boxes={boxRegions} showLoading={isLoading} />
    </main>
  );
}



