export const getDateWeek = (date: Date, scheduleDay: number): number => {
    const currentDate = (typeof date === 'object') ? date : new Date();
    const januaryFirst = new Date(currentDate.getFullYear(), 0, 1);
    
    // Calculate days to the next Monday from January 1st
    const daysToNextMonday = (januaryFirst.getDay() === 1) ? 0 : (8 - januaryFirst.getDay()) % 7;
    const nextMonday = new Date(currentDate.getFullYear(), 0, januaryFirst.getDate() + daysToNextMonday);

    // Calculate the week number
    let week = (currentDate < nextMonday) ? 52 : Math.ceil((currentDate.getTime() - nextMonday.getTime()) / (24 * 3600 * 1000) / 7);

    // Adjust week number if the schedule day is Saturday (6) or Sunday (7)
    if (scheduleDay === 7 || scheduleDay === 6) {
        week = (week === 52 && currentDate.getMonth() === 0) ? 1 : week + 1;
    }
    return week;
};