import dayjs from "dayjs"

export function GenerateRangeBetweenDates() {
    const startDate = dayjs().startOf('year')
    const endDate = new Date()

    let date = []
    let compareDate = startDate

    while (compareDate.isBefore(endDate)) {

        date.push(compareDate.toDate())
        compareDate = compareDate.add(1,'day')

    }

    return date
}