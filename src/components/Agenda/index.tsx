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
  const account = useContext(AccountContext)

  const events: AgendaItem[] = useMemo(
    () =>
      account.calendars
        .flatMap((calendar) =>
          calendar.events.map((event) => ({ calendar, event })),
        )
        .sort(compareByDateTime),
    [account],
  )

  const [currentHour, setCurrentHour] = useState(DateTime.local().hour)
  useEffect(() =>
    runEvery(REFRESH_INTERVAL, () => {
      setCurrentHour(DateTime.local().hour), []
    }),
  )

  const title = useMemo(() => greeting(currentHour), [currentHour])

  return (
    <div className={style.outer}>
      <div className={style.container}>
        <div className={style.header}>
          <span className={style.title}>{title}</span>
        </div>

        <List>
          {events.map(({ calendar, event }) => (
            <EventCell key={event.id} calendar={calendar} event={event} />
          ))}
        </List>
      </div>
    </div>
  )
}

export default Agenda
