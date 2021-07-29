import { Inter_400Regular } from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Switch,
  Platform,
  Animated,
  Vibration,
} from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { Audio } from "expo-av";
import {
  setIsSettingsRendered,
  setVibrationEnabled,
} from "../../redux/features/misc/miscSilce";
import { setThemeMode } from "../../redux/features/theme/themeSlice";
import { WhichOS } from "../../utils/basedMethods";
import styled from "styled-components/native";

const StyledText = styled.Text`
  color: ${(props: { theme: { TextColor: string } }) => props.theme.TextColor};
  margin-left: 12px;
`;

const StyledHeading = styled.Text`
  font-size: 28;
  color: ${(props: { theme: { TextColor: string } }) => props.theme.TextColor};
  line-height: 33;
`;

const Settings = () => {
  const [sound, setSound] = React.useState(null);
  const [_isPlaying, setIsPlaying] = React.useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const dispatch = useDispatch();

  const themeMode = useSelector(
    (state: { theme: { themeMode: string } }) => state.theme.themeMode
  );

  const isSettingsRendered = useSelector(
    (state: { misc: { isSettingsRendered: boolean } }) =>
      state.misc.isSettingsRendered
  );

  const vibrationEnabled: boolean = useSelector(
    (state: { misc: { vibrationEnabled: boolean } }) =>
      state.misc.vibrationEnabled
  );

  const changeVibrationMode = () => {
    if (!vibrationEnabled) {
      Vibration.vibrate(10 * 13);
    }
    dispatch(setVibrationEnabled());
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    if (isSettingsRendered) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [isSettingsRendered]);

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
    await sound.setVolumeAsync(0.5);
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

  const optionCircleColor = (): string => {
    return themeMode === "light" ? "#c5deff" : "#C4C4C4";
  };

  const containerBgColor = (): string => {
    return themeMode === "light" ? "#ffff" : "#131313";
  };

  const containerCloneBgColor = (): string => {
    return themeMode === "light" ? "#686EFF" : "#ffffffa6";
  };

  const switchThumbColor = (condition: boolean): string => {
    return condition ? "#c5deff" : "#5aa1ff"
  }

  return (
    <Animated.View
      style={{
        width: "100%",
        position: "absolute",
        alignItems: "center",
        top: 120,
      }}
    >
      {/* {isSettingsRendered && fontsLoaded ? ( */}
      <Animated.View
        style={[
          styles.containerClone,
          {
            transform: [
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [600, 0], // 0 : 150, 0.5 : 75, 1 : 0
                }),
              },
            ],
          },
          {
            backgroundColor: containerCloneBgColor(),
          },
        ]}
      ></Animated.View>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [600, 0], // 0 : 150, 0.5 : 75, 1 : 0
                }),
              },
            ],
          },
          {
            backgroundColor: containerBgColor(),
          },
        ]}
      >
        <View style={styles.headingContainer}>
          <StyledHeading>Settings</StyledHeading>

          <Pressable
            onPress={() => {
              dispatch(setIsSettingsRendered());
            }}
            style={[
              styles.settingsCloseButton,
              Platform.OS === "web" && { cursor: "pointer" },
              {
                backgroundColor: themeMode === "dark" ? "#575757" : "#212121bf",
              },
            ]}
          >
            <Text style={{ display: "flex" }}>
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
                <Circle cx="16" cy="16" r="16" fill={optionCircleColor()} />
                <Path
                  d="M16 8.5C11.8583 8.5 8.5 11.8583 8.5 16C8.5 20.1417 11.8583 23.5 16 23.5C20.1417 23.5 23.5 20.1417 23.5 16C23.5 15.6167 23.4667 15.2333 23.4167 14.8667C22.6 16.0083 21.2667 16.75 19.75 16.75C17.2667 16.75 15.25 14.7333 15.25 12.25C15.25 10.7417 15.9917 9.4 17.1333 8.58333C16.7667 8.53333 16.3833 8.5 16 8.5Z"
                  fill="#171717"
                />
              </Svg>
              <StyledText>Dark mode</StyledText>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#0E4DA4" }}
              thumbColor={switchThumbColor(themeMode === "dark")}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => switchMode()}
              value={themeMode === "dark"}
            />
          </View>
          <View style={styles.settingOptionContainer}>
            <View style={styles.settingOptionTitle}>
              <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <Circle cx="16" cy="16" r="16" fill={optionCircleColor()} />
                <Path
                  d="M15.9245 7V17.4172C15.3419 17.0815 14.6705 16.8741 13.9497 16.8741C11.7675 16.8741 10 18.6416 10 20.8238C10 23.006 11.7675 24.7734 13.9497 24.7734C16.1318 24.7734 17.8993 23.006 17.8993 20.8238V10.9497H21.849V7H15.9245Z"
                  fill="#171717"
                />
              </Svg>

              <StyledText>Music</StyledText>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#0E4DA4" }}
              thumbColor={switchThumbColor(_isPlaying)}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => controls(sound)}
              value={_isPlaying}
            />
          </View>
          <View style={styles.settingOptionContainer}>
            <View style={styles.settingOptionTitle}>
              <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <Circle cx="16" cy="16" r="16" fill={optionCircleColor()} />
                <Path
                  d="M6 17.5H7.66667V12.5H6V17.5ZM8.5 19.1667H10.1667V10.8333H8.5V19.1667ZM24.3333 12.5V17.5H26V12.5H24.3333ZM21.8333 19.1667H23.5V10.8333H21.8333V19.1667ZM19.75 7.5H12.25C11.5583 7.5 11 8.05833 11 8.75V21.25C11 21.9417 11.5583 22.5 12.25 22.5H19.75C20.4417 22.5 21 21.9417 21 21.25V8.75C21 8.05833 20.4417 7.5 19.75 7.5ZM19.3333 20.8333H12.6667V9.16667H19.3333V20.8333Z"
                  fill="#171717"
                />
              </Svg>

              <StyledText>Vibration</StyledText>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#0E4DA4" }}
              thumbColor={switchThumbColor(vibrationEnabled)}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => changeVibrationMode()}
              value={vibrationEnabled}
              disabled={WhichOS.isLargeScreenOS() ? true : false}
            />
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: 300,
    height: 300,
    zIndex: 3,
    borderRadius: 30,
    padding: 30,
    top: 50,
    shadowColor: "#f4f5ff2d",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  containerClone: {
    position: "absolute",
    width: 320,
    height: 320,
    zIndex: 3,
    borderRadius: 40,
    padding: 30,
    top: 40,
    opacity: 0.1,
  },
  baseFont: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
  },
  settingsCloseButton: {
    borderRadius: 100,
    display: "flex",
    width: 40,
    justifyContent: "center",
    height: 40,
    alignItems: "center",
    shadowColor: "#37373716",
    shadowOpacity: 7,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowRadius: 7,
  },
  settingsHeading: {
    fontSize: 28,
    color: "#ffffff",
    lineHeight: 33,
  },
  settingOptionsContainer: {
    marginTop: 34,
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
