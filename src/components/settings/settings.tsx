import { Inter_400Regular } from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Switch,
  Platform,
} from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { Audio } from "expo-av";
import { setIsSettingsRendered } from "../../redux/features/misc/miscSilce";
import { setThemeMode } from "../../redux/features/theme/themeSlice";

const Settings = () => {
  const [sound, setSound] = React.useState(null);
  const [_isPlaying, setIsPlaying] = React.useState(false);

  const dispatch = useDispatch()

  const themeMode = useSelector(
    (state: { theme: { themeMode: string } }) => state.theme.themeMode
  );

  const isSettingsRendered = useSelector((state: {misc: {isSettingsRendered: boolean}}) => state.misc.isSettingsRendered)

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
  });

  async function SetSound() {
    console.log("Loading Sound");
    const { sound }: { sound: any } = await Audio.Sound.createAsync(
      require("../../assets/sounds/SolveThePuzzle.mp3")
    );

    setSound(sound);

    await sound.setIsLoopingAsync(true);
    await sound.setVolumeAsync(0.2)
  }

  useEffect(() => {
    SetSound();
  }, []);

  const controls = async (sound: any) => {
    if (_isPlaying) {
      setIsPlaying(false);
      await sound.pauseAsync();
    } else {
      setIsPlaying(true);
      await sound.playAsync();
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const switchMode = () => {
    dispatch(setThemeMode());
  };

  return (
    <View
      style={{
        width: "100%",
        position: "absolute",
        alignItems: "center",
      }}
    >
      {isSettingsRendered && fontsLoaded ? (
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={styles.settingsHeading}>Settings</Text>

            <Pressable
              onPress={() => {
                dispatch(setIsSettingsRendered());
              }}
              style={[
                styles.settingsCloseButton,
                Platform.OS === "web" && { cursor: "pointer" },
                {
                  backgroundColor:
                    themeMode === "dark" ? "#575757" : "#212121bf",
                },
              ]}
            >
              <Text style={{display: 'flex'}}>
                <Svg fill="#EFEFEF" height="22" viewBox="0 0 24 24" width="22">
                  <Path fill="transparent" d="M0 0h24v24H0z" />
                  <Path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </Svg>
              </Text>
            </Pressable>
          </View>
          <View style={styles.settingOptionsContainer}>
            <View style={styles.settingOptionContainer}>
              <View style={styles.settingOptionTitle}>
                <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <Circle cx="16" cy="16" r="16" fill="#C4C4C4" />
                  <Path
                    d="M16 8.5C11.8583 8.5 8.5 11.8583 8.5 16C8.5 20.1417 11.8583 23.5 16 23.5C20.1417 23.5 23.5 20.1417 23.5 16C23.5 15.6167 23.4667 15.2333 23.4167 14.8667C22.6 16.0083 21.2667 16.75 19.75 16.75C17.2667 16.75 15.25 14.7333 15.25 12.25C15.25 10.7417 15.9917 9.4 17.1333 8.58333C16.7667 8.53333 16.3833 8.5 16 8.5Z"
                    fill="#171717"
                  />
                </Svg>
                <Text
                  style={{
                    color: "#ffff",
                    marginLeft: 12,
                  }}
                >
                  Dark mode
                </Text>
              </View>
              <Switch
                trackColor={{ false: "#767577", true: "#0E4DA4" }}
                thumbColor={themeMode === "dark" ? "#5EB8FF" : "#1663CF"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => switchMode()}
                value={themeMode === "dark"}
              />
            </View>
            <View style={styles.settingOptionContainer}>
              <View style={styles.settingOptionTitle}>
                <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <Circle cx="16" cy="16" r="16" fill="#C4C4C4" />
                  <Path
                    d="M15.9245 7V17.4172C15.3419 17.0815 14.6705 16.8741 13.9497 16.8741C11.7675 16.8741 10 18.6416 10 20.8238C10 23.006 11.7675 24.7734 13.9497 24.7734C16.1318 24.7734 17.8993 23.006 17.8993 20.8238V10.9497H21.849V7H15.9245Z"
                    fill="#171717"
                  />
                </Svg>

                <Text
                  style={{
                    color: "#ffff",
                    marginLeft: 12,
                  }}
                >
                  Music
                </Text>
              </View>
              <Switch
                trackColor={{ false: "#767577", true: "#0E4DA4" }}
                thumbColor={_isPlaying ? "#5EB8FF" : "#1663CF"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => controls(sound)}
                value={_isPlaying}
              />
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: 300,
    height: 300,
    backgroundColor: "#353535",
    zIndex: 3,
    borderRadius: 30,
    padding: 30,
    top: 50,
    shadowColor: 'rgba(244, 245, 255, 0.816)',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowRadius: 10
  },
  baseFont: {
    fontFamily: "Inter_400Regular",
    // display: "flex",
    // width: "100%",
    // justifyContent: "center",
    // position: "absolute",
    // height: '100%'
    fontSize: 16,
  },
  settingsCloseButton: {
    borderRadius: 100,
    display: "flex",
    width: 40,
    justifyContent: "center",
    height: 40,
    alignItems: "center",
    // shadowColor: '#202020',
    // shadowOpacity: 20,
    // shadowOffset: {
    //   height: 3,
    //   width: 0,
    // },
    // shadowRadius: 20
  },
  settingsHeading: {
    fontSize: 28,
    color: "#ffffff",
    lineHeight: 33,
  },
  settingOptionsContainer: {
    marginTop: 34,
    // rowGap: 25,
  },
  settingOptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  settingOptionTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Settings;
