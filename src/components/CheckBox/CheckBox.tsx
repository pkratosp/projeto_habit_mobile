import { Feather } from '@expo/vector-icons' // icons
import Animated,{RotateInDownLeft} from 'react-native-reanimated'
// components
import { View,TouchableOpacity, TouchableOpacityProps, Text } from "react-native"
import colors from 'tailwindcss/colors'

interface Props extends TouchableOpacityProps {
    title: string
    checked?: boolean
}

export function CheckBox({ title, checked = false, ...rest }:Props) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row m-2 items-center"
            {...rest}
        >

            {
                checked 
                ?
                    <Animated.View 
                        className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
                        entering={RotateInDownLeft}
                        // exiting={}
                    >

                        <Feather
                            name="check"
                            size={20}
                            color={colors.white}
                        />

                    </Animated.View>
                :
                    <View className="h-8 w-8 bg-zinc-900 rounded-lg"></View>  
            }

            <Text className="text-white ml-3 font-semibold">{title}</Text>

        </TouchableOpacity>
    )
}