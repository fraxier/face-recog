import { useEffect, useRef, useState } from "react";

import { Noto_Sans_Mono } from "next/font/google";
const noto = Noto_Sans_Mono({ subsets: ["latin"] });

export default function Rank({ concept }) {
  
  const digits = '0123456789'
  const [value, setValue] = useState('99999')
  const [display, setDisplay] = useState(false)
  let iterations = 0;


  useEffect(() => {
    const timer = setInterval(() => {
      setValue(value.split("")
        .map((digit, index) => {
          if (index === 2) return '-'
          if ((index + 1) * 30 < (iterations / (30))) {
            console.log(index * 30)
            console.log(iterations)
            return concept.name[index];
          }
          return digits[Math.floor(Math.random() * 10)]}).join("")
      )
        iterations += 1
        if (iterations > 200) {
          clearInterval(timer)
          setValue(concept.name)
          setDisplay(true)
          return () => {
            if (timer) clearInterval(timer)
          }
        }
    }, 30)
    
  }, [])

  return (
    <div>
      <p className="text-center text-2xl my-4">This age is...</p>
      <p className={noto.className + " text-center text-5xl"}>{value}</p>
      {display ? (
        <p>Smart Brain is pretty sure to about ${(concept.value * 100).toFixed(2)}% certainty!</p>
      ) : ""}
      
    </div>
  )
}

// app_id : // "demographics-age-new"
// id : // "20-29"
// name // : // "19-29"
// value // : // 0.99628854