import React, { useEffect } from "react";
import Header from "./src/containers/Header";
import Guesser from "./src/components/guesser/guesser";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import Cwrapper from "./src/components/components-wrapper/componentsWrapper";
import Scores from "./src/components/scores/scores";
import { Audio } from "expo-av";
import { Button } from "react-native";

const App = () => {
  const [sound, setSound] = React.useState(null);
  const [_isPlaying, setIsPlaying] = React.useState("Play");

  async function SetSound() {
    console.log("Loading Sound");
    const { sound }: { sound: any } = await Audio.Sound.createAsync(
      require("./Interstellar-Odyssey.mp3")
    );

    setSound(sound);

    await sound.setIsLoopingAsync(true);
  }

  useEffect(() => {
    SetSound();
  }, []);
  
  const controls = async (sound: any) => {
    if (_isPlaying === "Pause") {
      setIsPlaying("Play");
      await sound.pauseAsync();
    } else {
      setIsPlaying("Pause");
      await sound.playAsync();
    }
  };

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <Provider store={store}>
      <Button
        title={`${_isPlaying} Sound`}
        onPress={() => controls(sound)}
        color="#464646"
      />
      <Cwrapper>
        <Header />
        <Scores />
        <Guesser />
      </Cwrapper>
    </Provider>
  );
};

export default App;
