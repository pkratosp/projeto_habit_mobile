import { ActivityIndicator, View } from "react-native";
import { style } from './loading.style'

export function Loading() {
    return (
        <View style={style.container}>
            <ActivityIndicator color="#7C3AED" />
        </View>
    )
}