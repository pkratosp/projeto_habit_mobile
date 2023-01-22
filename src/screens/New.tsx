import { useState } from 'react'
import { ScrollView, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { BackButton } from '../components/BackButton/BackButton'
import { CheckBox } from '../components/CheckBox/CheckBox'
import colors from 'tailwindcss/colors'

const avaliableWeekDays = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado']

export function New () {

    const [weekDays,setWeekDays] = useState<number[]>([])

    function handleToggleWeekDay(weekDayIndex:number){
        if(weekDays.includes(weekDayIndex)){
            // desmarca
            // basicamente remove do useState
            setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))

        }else{
            // marca
            setWeekDays(prevState => [...prevState, weekDayIndex])
        }
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16"> 
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <BackButton />

                <Text 
                    className="mt-6 text-white font-extrabold text-3xl"
                >
                    Criar habito
                </Text>

                <Text 
                    className="mt-6 text-white font-semibold text-base"
                >
                    Qual seu comprometimento?
                </Text>

                <TextInput 
                    className="h-12 pl-4 mt-3 rounded-lg bg-zinc-900 text-white border-2 border-zinc-800
                    focus:border-green-600"
                    placeholder="Exercícios, dormir bem, etc.."
                    placeholderTextColor={colors.zinc[400]}
                />


                <Text className="font-semibold mt-4 mb-3 text-white text-base">
                    Qual a recorrência?
                </Text>
                {
                    avaliableWeekDays.map((week,index) => (
                        <CheckBox
                            key={`${week}`}
                            title={week}
                            checked={weekDays.includes(index)}
                            onPress={()=> handleToggleWeekDay(index)}
                        />
                    ))
                }

                <TouchableOpacity
                    activeOpacity={0.7}
                    className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-lg
                    mt-5"
                >
                    <Feather 
                        name="check"
                        size={20}
                        color={colors.white}
                    />

                    <Text className="font-semibold text-white ml-2">
                        Confirmar
                    </Text>
                </TouchableOpacity>
                

            </ScrollView>
        </View>
    )
}