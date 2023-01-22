import "../lib/DayJs"

// components do react
import { View,Text,ScrollView,Alert } from "react-native"
import { useNavigation,useFocusEffect } from "@react-navigation/native"

// components
import { Header } from "../components/Header/Header"
import { HabitDay, DAY_SIZE } from "../components/HabitDay/HabitDay"
import { useEffect, useState,useCallback } from "react"

// functions
import { GenerateRangeBetweenDates } from "../utils/GenerateRangeBetweenDates"

// api
import { api } from "../lib/axios"
import { Loading } from "../components/Loading/Loading"
import dayjs from "dayjs"

const weekDays = ['D','S','T','Q','Q','S','S']

const datesFromYearStart = GenerateRangeBetweenDates()

const minimuSummaryDateSize = 18 * 7
const amoutOfDaysToFill = minimuSummaryDateSize - datesFromYearStart.length

type Summary = Array<{
    id: string
    date: string
    amout: number
    completed: number
}>

export function Home () {
    const [loading,setLoading] = useState<boolean>(true)
    const [summary,setSummary] = useState<Summary | null>(null)
    const { navigate } = useNavigation()

    async function FetchData(){
        try {

            setLoading(true)

            const response = await api.get('summary');

            console.log(response.data)
            setSummary(response.data)
            
        } catch (error) {
            Alert.alert('Ops','Não foi possível carregar os dados')
            console.log(error)

        } finally {
            setLoading(false)
        }
        
    }

    // quando o usuario voltar pra essa tela carrega novamente as informações
    // quase a mesma coisa da web
    useFocusEffect(useCallback(()=> {
        FetchData()
    },[]))



    if(loading){
        return (
            <Loading />
        )
    }

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
                {
                    summary && 
                    <View className="flex-row flex-wrap">
                    {
                        datesFromYearStart.map(date => {
                            const dayWithHabis = summary.find(day =>{
                                return dayjs(date).isSame(day.date,'day')
                            })

                            return (
                                <HabitDay
                                    key={date.toISOString()}
                                    onPress={()=> navigate('habit',{date:date.toISOString()})}
                                    date={date}
                                    amounOfHabits={dayWithHabis?.amout}
                                    amountCompleted={dayWithHabis?.completed}
                                />
                            )
                        })
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
                }
            </ScrollView>


           
        </View>
    )
}