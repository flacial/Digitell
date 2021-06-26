import { useColorScheme } from 'react-native'

const isDarkTheme = () => {
    const currentScheme = useColorScheme()
    return (currentScheme === 'dark') ? true : false
}
export default isDarkTheme