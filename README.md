# [Double](https://withdouble.com) · Full-stack engineering challenge

:wave: If you're looking for an adventure, [look no further](https://withdouble.com/jobs).

## Instructions

- To complete this challenge, you will need `npm`, `node` and `git` installed locally
- Solve each level in order
- Include the `.git` directory when submitting your solution
- Don't spend more than **4 hours** on this test
- To start the app:
  - run `npm i`
  - run `npm start`
  - open `http://localhost:8080/`
- If needed, here are the documentation links of: [React](https://reactjs.org/) and [Luxon](https://moment.github.io/luxon/index.html)

### Pointers

- Keep in mind that you are working on an existing code-base.
- Code should be clean, extensible and robust. Don't overlook edge cases.
- You will have to create some basic UI. While we're not expecting you to be a skilled designer, it should come close to the look and feel of the app. We _are_ looking for engineers with some product-sense.
- We like [emojis](https://gitmoji.carloscuesta.me/) :wink:

### Submitting your results

- Fork this repository
- Open a PR on your fork (please do not open a PR on this repo)
- Share your forked repo with [@pierre-elie](https://github.com/pierre-elie), [@augustinr](https://github.com/augustinr) and [@flobories](https://github.com/flobories)

We will review your code within 3 days and will be in touch via email

Let's do this! :muscle:

## Challenge

**Double helps executives and their assistants work better together**. Managing agendas is an important part of an assistant's job, and we're inviting you to join our mission of making assistants's lives easier.

### Level 1: Agenda's title bug fix

One of our users just submitted a bug report: the agenda's title ("Good morning", "Good afternoon", etc.) does not always update as the day goes by.
Identify the source of this behavior and fix it.

### Level 2: Handle errors

It seems that, occasionally, an uncatched error happens when the account is refreshed. Make sure the error is caught and that the user is aware that the refresh failed.

### Level 3: Filter agenda events by calendar

We want to add a filtering mechanism on agenda events. The requirements for this feature are:

1. Add a select menu that will filter events by `calendar`
2. When a calendar is selected, only events from that calendar are displayed
3. By default `all` calendars are displayed

### Level 4: Group agenda events by department

Another enhancement would be to show all calendar events in one page, grouping them by `department`. Here is a quick mock-up of what the feature could look like:

<img src="https://user-images.githubusercontent.com/45558407/61964225-5f967b80-af9b-11e9-9e39-b201a5644bf9.png" width="300" />

The requirements for this feature are:

1. Add a button to toggle groups by `department`
2. When enabled, events will be grouped and each group will be clearly identified
3. In each group, events will be sorted by ascending date-time

### Questions

Please add your answers to the questions below:

1. How long did you spend on this challenge?

- This challenge took me a little over four and a half hours to complete. Last week I went through a breakup which left me a little preoccupied this weekend, which I think is understandable. Had I been 100%, I could totally see this test doable in four hours.

2. In your opinion, what are features that Double could work on that would be helpful for assistants when managing agendas?

- Managing agendas is a very complicated topic! While I have not done user research myself on how people plan their agendas, I can imagine that people in general would have different approaches for managing an agenda. With that in mind, a solution that is very flexible and easy to learn would allow the most users to be served.
- When managing my calendar, I like to ask the following questions: 
- Who? - With whom am I meeting with
- What? - What is this meeting going to be about
- Where? - Where will we be meeting, also, where does this meeting fit into the bigger picture?
- When? - What time will we be meeting and for how long?
- Why? - What is the purpose of this meeting and what do the stakeholders wish to get out of it?

- Today's tools on the market do a good job at helping users schedule their days or keep track of what needs to be done. To really stand out, I can see Double innovating in the space of helping users analyze their calendars and learn about how they spend each day, week and month. I personally would love an assistant who kept my goals in mind while managing my calendar.  Two apps that can be looked to for examples here are WakaTime and Clockwise. Both apps have nice reporting emails that are sent out weekly.

3. If you had more time, what would you add or change in the codebase?
- First, I would focus on functionality and small usability wins. I'd start by improving the error modal, which can be done by adding an x at the top left hand corner to dismiss.
- Code wise, I would spend some time refactoring the Agenda component into smaller components.
- I would also look into adding some unit tests for my code. There are a lot of things that can be tested here, but I would make sure to start out by testing that the filtering logic works when filtering by calendar and by department, and then I'd write some tests for filtering by both calendar and department. After testing the filtering and sorting logic, I would probably focus on testing the error modal and making sure it shows and hides appropriately.
4. Do you have any constructive feedback that you would like to share with our team?
- Overall, I felt that this was a great way to test react concepts. I did find the code where the error message is thrown every so often to be a little confusing to deal with. I would have preferred to handle a situation that was a little more relavant to the real world. One such example that comes to mind would be:
  - Adding a search text input to allow users to search by event name or department. Throw an error when no text is entered in the text input and the user clicks submit.
- Otherwise, I felt that this was a great coding challenge for a frontend developer to take on.