import { Text, View,ScrollView } from "react-native"
import { useRoute } from "@react-navigation/native"
import dayjs from "dayjs"

// components
import { BackButton } from "../components/BackButton/BackButton"
import { ProgressBar } from "../components/ProgressBar/ProgressBar"
import { CheckBox } from "../components/CheckBox/CheckBox"


interface Params {
    date: string
}

export function Habit() {
    const route = useRoute()
    const { date } = route.params as Params

    const parseDate = dayjs(date)
    const dayOfWeek = parseDate.format('dddd')
    const dayAndMoth = parseDate.format('DD/MM')

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            
           <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom:100 }}
           >
            <BackButton />

            <Text 
                className="mt-6 font-semibold text-base lowercase text-zinc-400"
            >
                {dayOfWeek}
            </Text>

            <Text 
                className="text-white font-extrabold text-3xl"
            >
                {dayAndMoth}
            </Text>
            
            <ProgressBar progress={0}/>

            <View className="mt-6">
                <CheckBox 
                    title="beber"
                    checked={false}
                />
                <CheckBox 
                    title="Cair"
                    checked={false}
                />
                <CheckBox 
                    title="Levatar"
                    checked={true}
                />
            </View>

           </ScrollView>

        </View>
    )
}