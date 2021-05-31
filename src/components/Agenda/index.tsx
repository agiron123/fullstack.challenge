import React, {
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { DateTime } from 'luxon'

import greeting from 'lib/greeting'

import Calendar from 'src/models/Calendar'
import Event from 'src/models/Event'
import AccountContext from 'src/context/accountContext'

import List from './List'
import EventCell from './EventCell'

import style from './style.scss'
import runEvery from 'lib/runEvery'

type AgendaItem = {
  calendar: Calendar
  event: Event
}

const compareByDateTime = (a: AgendaItem, b: AgendaItem) =>
  a.event.date.diff(b.event.date).valueOf()

/**
 * Agenda component
 * Displays greeting (depending on time of day)
 * and list of calendar events
 */

const REFRESH_INTERVAL = 10000

const Agenda = (): ReactElement => {
  const accountContext = useContext(AccountContext)

  const calendars: string[] = useMemo(
    () => accountContext.account.calendars.map((calendar) => calendar.color),
    [accountContext.account],
  )

  const events: AgendaItem[] = useMemo(
    () =>
      accountContext.account.calendars
        .flatMap((calendar) => {
          return calendar.events.map((event) => ({ calendar, event }))
        })
        .sort(compareByDateTime),
    [accountContext.account],
  )

  const [currentHour, setCurrentHour] = useState(DateTime.local().hour)
  useEffect(() =>
    runEvery(REFRESH_INTERVAL, () => {
      setCurrentHour(DateTime.local().hour), []
    }),
  )

  const title = useMemo(() => greeting(currentHour), [currentHour])

  const [selectedCalendar, setSelectedCalendar] = useState(null)

  const onCalendarSelected = (e: React.FormEvent<HTMLSelectElement>) => {
    setSelectedCalendar(e.currentTarget.value)
  }

  return (
    <div className={style.outer}>
      <div className={style.container}>
        <div className={style.header}>
          <span className={style.title}>{title}</span>
        </div>

        {accountContext.hasError && (
          <div className={style.errorContainer}>
            <div className={style.errorTextWrapper}>
              <div className={style.errorText}>
                We're having trouble refreshing account information.
              </div>
              <div
                className={style.dismissText}
                onClick={() => {
                  accountContext.hideErrorMessage()
                }}
              >
                Dismiss
              </div>
            </div>
          </div>
        )}

        <label htmlFor="calendarSelector">Calendar</label>
        <select
          name="calendarSelector"
          id="calendar-select-dropdown"
          onChange={onCalendarSelected}
        >
          <>
            <option value={'None'}>None</option>
            {calendars.map((calendar) => (
              <option value={calendar}>{calendar}</option>
            ))}
          </>
        </select>

        <List>
          {events
            .filter(({ calendar, event }) => {
              if (!selectedCalendar || selectedCalendar === 'None') {
                return true
              }

              return selectedCalendar === calendar.color
            })
            .map(({ calendar, event }) => (
              <EventCell key={event.id} calendar={calendar} event={event} />
            ))}
        </List>
      </div>
    </div>
  )
}

export default Agenda
