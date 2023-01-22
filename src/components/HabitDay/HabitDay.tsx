// components do react
import clsx from 'clsx'
import dayjs from 'dayjs'
import { TouchableOpacity,Dimensions,TouchableOpacityProps } from 'react-native'


// functions
import { GenereteProgressPercentege } from '../../utils/GenereteProgressPercentege'


const WEEK_DAYS = 7
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5

export const DAY_MARGIN_BETWEEN = 8
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5)

interface Props extends TouchableOpacityProps {
    amounOfHabits?: number
    amountCompleted?: number
    date: Date
}

export function HabitDay({ amounOfHabits = 0, amountCompleted = 0, date, ...rest}:Props) {

    const amountAccomplisheedPercentage = amounOfHabits > 0 ? GenereteProgressPercentege(amounOfHabits, amountCompleted) : 0

    const today = dayjs().startOf('day').toDate()
    const isCurrentDay = dayjs(date).isSame(today)

    return (
        <TouchableOpacity 
            // bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800
            className={clsx("rounded-lg border-2 m-1",{
                ["bg-zinc-900 border-zinc-800"] : amountAccomplisheedPercentage === 0,
                ["bg-violet-900 border-violet-700"] : amountAccomplisheedPercentage > 0 && amountAccomplisheedPercentage < 20,
                ["bg-violet-800 border-violet-600"] : amountAccomplisheedPercentage >= 20 && amountAccomplisheedPercentage < 40,
                ["bg-violet-700 border-violet-500"] : amountAccomplisheedPercentage >= 40 && amountAccomplisheedPercentage < 60,
                ["bg-violet-600 border-violet-500"] : amountAccomplisheedPercentage >= 60 && amountAccomplisheedPercentage < 80,
                ["bg-violet-500 border-violet-400"] : amountAccomplisheedPercentage >= 80,
                ["border-white border-4"] : isCurrentDay
            })} 
            style={{ width: DAY_SIZE, height: DAY_SIZE }}
            activeOpacity={0.7}
            {...rest}
        />
    )
}