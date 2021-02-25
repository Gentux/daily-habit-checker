import { dateToString, stringToDate, uuidv4 } from 'utils/utils.js'

function getTestUser() {
  return {
    1: {
      "name": "Caroline",
      "currentStrike": 2
    }
  };
}

function getHabits() {
  return {
    1: {
      "name": "Yoga",
      "habit_id": 1,
      "countable": true,
      "icon": "yoga.svg#yoga"
    },
    2: {
      "name": "Read",
      "habit_id": 2,
      "countable": true,
      "icon": "bootstrap-icons.svg#book"
    },
    3: {
      "name": "Plants care",
      "habit_id": 3,
      "countable": true,
      "icon": "plant.svg#plant"
    },
    4: {
      "name": "Draw",
      "habit_id": 4,
      "icon": "drawing.svg#drawing",
      "not_after": dateToString(new Date(2020, 12, 1))
    },
    5: {
      "name": "walk outside",
      "habit_id": 5,
      "countable": true,
      "icon": "walk.svg#walk"
    },
    6: {
      "name": "Brush",
      "habit_id": 6,
      "countable": true,
      "icon": "tooth.svg#tooth"
    },
    7: {
      "name": "Visage healthcare",
      "habit_id": 7,
      "countable": true,
      "icon": "cream.svg#cream"
    },
    8: {
      "name": "Vitamin",
      "habit_id": 8,
      "countable": true,
      "icon": "vitamin.svg#vitamin",
      "not_after": dateToString(new Date(2020, 12, 1))
    },
    9: {
      "name": "Instagram",
      "habit_id": 9,
      "countable": false,
      "icon": "instagram.svg#instagram"
    }
  };
}

function storeTestHistory() {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const today = new Date();
  const habits = getHabits();


  let history = [];
  for (const habit_id in habits) {
    history.push({
      "id": uuidv4(),
      "user_id": 1,
      "habit_id": habit_id
    })
  }
  localStorage.setItem("history-" + dateToString(new Date(today - oneDay)), JSON.stringify(history))

  for (let i = 2; i < 10; i++) {
    const date = new Date(today - oneDay * i);
    const localStorageKey = "history-" + dateToString(date);

    let history = [];
    for (const habit_id in habits) {
      let random = Math.random() * 2 | 0
      if (random === 1) {
        history.push({
          "id": uuidv4(),
          "user_id": 1,
          "habit_id": habit_id
        })
      }
    }

    localStorage.setItem(localStorageKey, JSON.stringify(history))
  }
}

export function getCompletion(icons, day) {
  const habits = getHabits();
  const habitsCount = Object.keys(habits).filter((habit_id) => {
    if (day && habits[habit_id].not_after && day > stringToDate(habits[habit_id].not_after)) {
      return false;
    }

    if (day && habits[habit_id].not_before && day < stringToDate(habits[habit_id].not_before)) {
      return false
    }

    return habits[habit_id].countable
  }).length;
  const iconsCount = Object.keys(icons.filter((icon ) => icon.countable)).length;

  if (iconsCount >= habitsCount) {
    return habitsCount * 100 / habitsCount
  } else {
    return iconsCount * 100 / habitsCount;
  }
}

export default function initLocalStorage() {
  localStorage.removeItem('users')
  localStorage.removeItem('habits')

  if (localStorage.users === undefined) {
      localStorage.users = JSON.stringify(getTestUser());
  }
  if (localStorage.habits === undefined) {
      localStorage.habits = JSON.stringify(getHabits());
  }
  if (localStorage.history === undefined) {
    storeTestHistory();
    localStorage.history = true;
  }
}
