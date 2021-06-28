import React from 'react'
import { ImageBackground } from 'react-native'

const CimageBackground = () => (
        <ImageBackground
        source={require("URL")}
        style={{
          width: "100%",
          height: "100%",
          opacity: 1,
          position: "absolute",
        }}
      ></ImageBackground>
)

export default CimageBackground