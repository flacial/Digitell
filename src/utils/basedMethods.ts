import { Platform } from "react-native";

export class WhichOS {
  static isLargeScreenOS(): boolean {
    return (
      Platform.OS === "web" ||
      Platform.OS === "windows" ||
      Platform.OS === "macos"
    );
  }

  static isMobile (): boolean {
    return Platform.OS === "ios" || Platform.OS === "android";
  };

}

export const setCursorWeb = (): string | {} => {
  return WhichOS.isLargeScreenOS() ? { cursor: "pointer" } : {};
};
