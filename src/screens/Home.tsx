import "../lib/DayJs"

// components do react
import { View,Text,ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"

// components
import { Header } from "../components/Header/Header"
import { HabitDay, DAY_SIZE } from "../components/HabitDay/HabitDay"

// functions
import { GenerateRangeBetweenDates } from "../utils/GenerateRangeBetweenDates"

const weekDays = ['D','S','T','Q','Q','S','S']

const datesFromYearStart = GenerateRangeBetweenDates()

const minimuSummaryDateSize = 18 * 7
const amoutOfDaysToFill = minimuSummaryDateSize - datesFromYearStart.length

export function Home () {
    const { navigate } = useNavigation()

    return (
        <View className="flex-1 px-8 pt-16 bg-background">
            <Header />

            <View className="flex-row mt-6 mb-2">

                {
                    weekDays.map((weekDay,index)=> (
                        <Text 
                            key={`${weekDay}-${index}`}
                            className="text-zinc-400 text-xl font-bold text-center mx-1"
                            style={{ width: DAY_SIZE }}
                        >
                            {weekDay}
                        </Text>
                    ))
                }

            </View>
           

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom:100 }}
            >
                <View className="flex-row flex-wrap">
                    {
                        datesFromYearStart.map(date => (
                            <HabitDay
                                key={date.toISOString()}
                                onPress={()=> navigate('habit',{date:date.toISOString()})}
                            
                            />
                        ))
                    }

                    {
                        amoutOfDaysToFill > 0 && Array.from({ length: amoutOfDaysToFill }).map((_, index) => (
                            <View
                                key={index}
                                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                                style={{ width: DAY_SIZE, height: DAY_SIZE }}
                            />
                        ))
                    }
                </View>
            </ScrollView>


           
        </View>
    )
}