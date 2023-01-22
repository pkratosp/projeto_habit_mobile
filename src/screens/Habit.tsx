import { Text, View,ScrollView, Alert } from "react-native" // componentes do react
import { useRoute } from "@react-navigation/native" // parametros da tela
import { useEffect,useState } from "react"
import dayjs from "dayjs"
import clsx from "clsx" // usado em condicoes css

// api
import { api } from "../lib/axios"

// components
import { BackButton } from "../components/BackButton/BackButton"
import { ProgressBar } from "../components/ProgressBar/ProgressBar"
import { CheckBox } from "../components/CheckBox/CheckBox"
import { Loading } from "../components/Loading/Loading"
import { HabitsEmpty } from "../components/HabitsEmpty/HabitsEmpty"

// functions
import { GenereteProgressPercentege } from "../utils/GenereteProgressPercentege"


interface Params {
    date: string
}

interface DayInfoProps {
    completedHabits: string[]
    possibilitHabits: Array<{
        id:string
        title: string
        created_at: string
    }>
}

export function Habit() {
    const [loading,setLoading] = useState<boolean>(true)

    const [dayInfo,setDayInfo] = useState<DayInfoProps | null>(null)
    const [completedHabits,setCompletedHabits] = useState<string[]>([])

    const route = useRoute()
    const { date } = route.params as Params

    const parseDate = dayjs(date)
    const isDateInPast = parseDate.endOf('day').isBefore(new Date())
    const dayOfWeek = parseDate.format('dddd')
    const dayAndMoth = parseDate.format('DD/MM')

    // calcula o progresso da minha barra
    const habitsProgress = dayInfo?.possibilitHabits.length ? GenereteProgressPercentege(dayInfo.possibilitHabits.length, completedHabits.length) : 0

    // busca os habits daquele dia em expecifico
    async function FetchHabit(){
        try {
            setLoading(true)
            const response = await api.get('day',{
                params: {
                    date: date
                }
            })
            setDayInfo(response.data)
            setCompletedHabits(response.data.completedHabits)
        

        } catch (error) {
            Alert.alert('Ops','Ocorreu um erro ao buscar este dia!')
        } finally {
            setLoading(false)
        }
    }

    // marca e desmarca nosso checkbox
    async function handleToggleHabit(habitId:string) {
        
        try {
            await api.patch(`habits/${habitId}/toggle`)
            if(completedHabits.includes(habitId)) {
                // desmarca
                // retorna todo mundo menos o habito que o usuario quer desmarcar
                setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId))
            }else{
                // marca
                setCompletedHabits(prevState => [...prevState, habitId])
            }

        } catch (error) {
            Alert.alert('Ops','Não será possível atualizar o status do hábito')
        }
    }

    useEffect(()=>{
        FetchHabit()
    },[])

    if(loading){
        return (
            <Loading />
        )
    }



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
            
            <ProgressBar progress={habitsProgress}/>

            <View className={clsx("mt-6", {
                ["opacity-50"] : isDateInPast
            })}>
                {
                    
                    dayInfo?.possibilitHabits.length !== 0 ? 
                    dayInfo?.possibilitHabits.map((habit)=> {
                        return (
                            <CheckBox
                                key={habit.id}
                                title={habit.title}
                                checked={completedHabits.includes(habit.id)}
                                disabled={isDateInPast}
                                onPress={() => handleToggleHabit(habit.id)}
                            />
                        )
                    }) : <HabitsEmpty />
                    
                }

                {
                    isDateInPast && (
                        <Text 
                            className="text-white mt-10 text-center"
                        >
                            Você não pode mudar atualizar um hábitos de uma data passada 
                        </Text>
                    )
                }
            </View>

           </ScrollView>

        </View>
    )
}