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

  // Filter events by calendar.
  const filteredEvents = useMemo(
    () =>
      events.filter(({ calendar }) => {
        if (!selectedCalendar || selectedCalendar === 'All') {
          return true
        }

        return selectedCalendar === calendar.id
      }),
    [events, selectedCalendar],
  )

  const departmentMapMemo: { [key: string]: [AgendaItem] } = useMemo(() => {
    const departmentMap: { [key: string]: [AgendaItem] } = {}
    for (let i = 0; i < filteredEvents.length; i++) {
      const department = filteredEvents[i].event.department
      if (!departmentMap[department]) {
        departmentMap[department] = [filteredEvents[i]]
      } else {
        departmentMap[department].push(filteredEvents[i])
      }
    }

    return departmentMap
  }, [filteredEvents])

  const [filterByDepartment, shouldFilterByDepartment] = useState(false)
  const toggleDepartmentFilterSelected = () => {
    shouldFilterByDepartment(!filterByDepartment)
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

        <div className={style.sectionContainer}>
          <div className={style.sectionHeading}>Filters:</div>
          <div className={style.filtersWrapper}>
            <div>
              <label htmlFor="calendarSelector" className={style.inputLabel}>
                Calendar:{' '}
              </label>
              <select
                name="calendarSelector"
                id="calendar-select-dropdown"
                onChange={onCalendarSelected}
              >
                <>
                  <option value={'All'}>All</option>
                  {accountContext.account.calendars.map((calendar) => (
                    <option value={calendar.id}>{calendar.color}</option>
                  ))}
                </>
              </select>
            </div>
            <div>
              <label htmlFor="departmentFilter" className={style.inputLabel}>
                Department:
              </label>
              <input
                type="checkbox"
                id="departmentFilter"
                name="departmentFilter"
                value="filterByDepartment"
                onChange={toggleDepartmentFilterSelected}
                checked={filterByDepartment}
              />
            </div>
          </div>
        </div>

        {filterByDepartment ? (
          Object.keys(departmentMapMemo).map((departmentKey) => (
            <div className={style.sectionContainer}>
              <div className={style.sectionHeading}>
                {departmentKey === 'undefined' ? 'None' : departmentKey}
              </div>
              <List>
                {departmentMapMemo[departmentKey].map(({ calendar, event }) => (
                  <EventCell key={event.id} calendar={calendar} event={event} />
                ))}
              </List>
            </div>
          ))
        ) : (
          <List>
            {filteredEvents.map(({ calendar, event }) => (
              <EventCell key={event.id} calendar={calendar} event={event} />
            ))}
          </List>
        )}
      </div>
    </div>
  )
}

export default Agenda
