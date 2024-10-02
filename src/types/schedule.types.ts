interface LessonInfo {
    dayOfWeekNumber: number,
    guidId: string,
    texts: Array<string>
    timeEnd: string,
    timeStart: string,
    blockName: string,
}

export interface Schedule {
    date: {
        year: number,
        week: number,
        day: number
    },
    lessonInfo: Array<LessonInfo>,
    schoolName: string,
    lastPublished: string,
    className: string,
    municipality: string
}