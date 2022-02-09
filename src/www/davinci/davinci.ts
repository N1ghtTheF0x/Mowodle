import MD5 from "../md5"

namespace Davinci
{
    export namespace Respond
    {
        export interface About
        {
            eTag: string
            schemaVersion: string
            server: string
            serverVersion: string
            serverTimeStamp: string
        }
        export interface User
        {
            profile: string
            homeId: string
            homeType: string
            policy: number
            logbutton: boolean
        }
        export namespace Result
        {
            export type AbsenceReasons = AbsenceReason[]
            export interface AbsenceReason
            {
                id: string
                code: string
                description: string
            }
            export namespace TimeFrame
            {
                export type Slots = Slot[]
                export interface Slot
                {
                    label: string
                    startTime: string
                    endTime: string
                }
            }
            export interface TimeFrame
            {
                code: string
                timeslotFragmentation: number
                timeslots: TimeFrame.Slots
            }
            export type TimeFrames = TimeFrame[]
            export namespace DisplaySchedule
            {
                export interface DateRange
                {
                    startDate: string
                    endDate: string
                }
                export interface Weekspan
                {
                    weekdayStart: number
                    weekdayEnd: number
                }
                export interface Display
                {
                    posLabel: number
                    lessonColor: number
                    lessonGradient: number
                    alwaysLessonTime: number
                    absenceReasons: number
                    absReasonCaption: number
                    lessonLayout: number
                    lessonWeeks: string
                    publishDays: number
                    publishSubstMessage: boolean
                    backgroundColor: string
                    eventColor: string
                    supervisionColor: string
                    supervisionChangeColor: string
                    lessonChangeColor: string
                    headerBgColor: string
                    roomChangeColor: string
                    messageColor: string
                    additionalLessonColor: string
                    absenceColor: string
                    todayColor: string
                    todayHeaderColor: string
                }
                export type LessonTimes = LessonTime[]
                export namespace LessonTime
                {
                    export type Changes = (RoomChange | StandIn | FreeClass | AddionalClass)[]
                    export interface Change
                    {
                        caption: string
                        changeType: number
                        lessonTitle: string
                        modified: string
                    }
                    export interface RoomChange extends Change
                    {
                        newRoomCodes: string[]
                        absentRoomCodes: string[]
                    }
                    export interface FreeClass extends Change
                    {
                        absentTeacherCodes: string[]
                        reasonType: string
                        reasonCode: string
                        cancelled: string
                    }
                    export interface StandIn extends Change
                    {
                        newTeacherCodes: string[]
                        absentTeacherCodes: string[]
                        reasonType: string
                        reasonCode: string
                    }
                    export interface AddionalClass extends Change
                    {
                        information: string
                    }
                }
                export interface LessonTime
                {
                    courseTitle: string
                    lessonRef: string
                    level?: number
                    lessonBlock: string
                    courseRef: string
                    dates: string[]
                    startTime: string
                    endTime: string
                    subjectCode: string
                    classCodes: string[]
                    teacherCodes: string[]
                    roomCodes: string[]
                    buildingCodes: string[]
                    changes?: LessonTime.Changes
                }
                export interface EventTime
                {
                    eventRef: string
                    startDate: string
                    startTime: string
                    endDate: string
                    endTime: string
                    eventCaption: string
                    eventStatus: number
                    noLessons: boolean
                    wholeDay: boolean
                }
                export type EventTimes = EventTime[]
            }
            export interface DisplaySchedule
            {
                scheduleID: string
                scheduleDescription: string
                session: DisplaySchedule.DateRange
                effectivity: DisplaySchedule.DateRange
                weekspan: DisplaySchedule.Weekspan
                display: DisplaySchedule.Display
                lessonTimes: DisplaySchedule.LessonTimes
                eventTimes: DisplaySchedule.EventTimes
            }
            export interface Course
            {
                id: string
                title: string
                subjectRef: string
            }
            export type Courses = Course[]
            export interface Teacher
            {
                id: string
                code: string
                teamRefs: string[]
            }
            export type Teachers = Teacher[]
            export interface Room
            {
                id: string
                code: string
                description: string
                buildingRef: string
                teamRefs?: string[]
                color: string
            }
            export type Rooms = Room[]
            export interface Subject
            {
                id: string
                code: string
                description: string
            }
            export type Subjects = Subject[]
            export interface Team
            {
                id: string
                code: string
            }
            export type Teams = Team[]
            export interface Building
            {
                id: string
                code: string
                description: string
            }
            export type Buildings = Building[]
            export interface Class
            {
                id: string
                code: string
                school: string
                teamRefs: string[]
            }
            export type Classes = Class[]
        }
        export interface Result
        {
            classAbsenceReasons: Result.AbsenceReasons
            roomAbsenceReasons: Result.AbsenceReasons
            timesframes: Result.TimeFrames
            firstLesson: string
            displaySchedule: Result.DisplaySchedule
            classAbsences: any[]
            roomAbsences: any[]
            teacherAbsences: any[]
            courses: Result.Courses
            teachers: Result.Teachers
            rooms: Result.Rooms
            subjects: Result.Subjects
            teams: Result.Teams
            buildings: Result.Buildings
            class: Result.Classes
        }
    }
    export interface Respond
    {
        about: Respond.About
        result: Respond.Result
        user: Respond.User
    }
    export class Client
    {
        private key: string
        private username: string
        private url: URL
        constructor(url: string)
        {
            this.url = new URL(url)
        }
        login(username: string,password: string)
        {
            this.username = username
            MD5(password,this.setPassword.bind(this))
        }
        private setPassword(str: string)
        {
            this.key = str
        }
        request(cb: (res: Respond) => void)
        {
            const form = new FormData()
            form.append("content","json")
            form.append("username",this.username)
            form.append("key",this.key)
            form.append("_",Date.now().toString())
            fetch(`${this.url.origin}/davinciIS.dll`,{method:"POST",body:form})
            .then(function(res)
            {
                res.json()
                .then(function(obj)
                {
                    cb(obj)
                })
                .catch(console.error)
            })
            .catch(console.error)
        }
    }
}

export default Davinci