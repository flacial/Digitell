import { useSelector } from "react-redux" 
export default function isDarkTheme() { 
  const themeMode = useSelector(
    (state: { theme: { themeMode: string } }) => state.theme.themeMode
    );
    return themeMode === 'dark'
}
 