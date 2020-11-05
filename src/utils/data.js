import { uuidv4 } from 'utils/utils.js'

export default function initLocalStorage() {
  localStorage.removeItem('users')
  localStorage.removeItem('habits')

  if (localStorage.users === undefined) {
      localStorage.users = JSON.stringify({
        1: {
          "name": "Caroline",
          "currentStrike": 2
        }
      });
  }
  if (localStorage.habits === undefined) {
      localStorage.habits = JSON.stringify({
        1: {
          "name": "Yoga",
          "habit_id": 1,
          "icon": "yoga.svg#yoga"
        },
        2: {
          "name": "Read",
          "habit_id": 2,
          "icon": "bootstrap-icons.svg#book"
        },
        3: {
          "name": "Plants care",
          "habit_id": 3,
          "icon": "plant.svg#plant"
        },
        4: {
          "name": "Draw",
          "habit_id": 4,
          "icon": "drawing.svg#drawing"
        },
        5: {
          "name": "walk outside",
          "habit_id": 5,
          "icon": "walk.svg#walk"
        },
        6: {
          "name": "Brush",
          "habit_id": 6,
          "icon": "tooth.svg#tooth"
        },
        7: {
          "name": "Visage healthcare",
          "habit_id": 7,
          "icon": "cream.svg#cream"
        },
        8: {
          "name": "Vitamin",
          "habit_id": 8,
          "icon": "vitamin.svg#vitamin"
        }
      });
  }
  if (localStorage.history === undefined) {
    localStorage.setItem(
      'history-20200929', JSON.stringify([
        { "id": uuidv4(), "user_id": 1, "habit_id": 1 },
        { "id": uuidv4(), "user_id": 1, "habit_id": 3 }
      ])
    );
    localStorage.setItem(
      'history-20200930', JSON.stringify([
        { "id": uuidv4(), "user_id": 1, "habit_id": 1 },
        { "id": uuidv4(), "user_id": 1, "habit_id": 1 }
      ])
    );
    localStorage.setItem(
      'history-20200931', JSON.stringify([
        { "id": uuidv4(), "user_id": 1, "habit_id": 1 },
        { "id": uuidv4(), "user_id": 1, "habit_id": 2 },
        { "id": uuidv4(), "user_id": 1, "habit_id": 3 }
      ])
    );
    localStorage.setItem(
      'history-20201001', JSON.stringify([
        { "id": uuidv4(), "user_id": 1, "habit_id": 1 },
        { "id": uuidv4(), "user_id": 1, "habit_id": 2 },
        { "id": uuidv4(), "user_id": 1, "habit_id": 3 }
      ])
    );
    localStorage.setItem(
      'history-20201002', JSON.stringify([
        { "id": uuidv4(), "user_id": 1, "habit_id": 1 },
        { "id": uuidv4(), "user_id": 1, "habit_id": 2 },
        { "id": uuidv4(), "user_id": 1, "habit_id": 3 }
      ])
    );
    localStorage.setItem(
      'history-20201003', JSON.stringify([
        { "id": uuidv4(), "user_id": 1, "habit_id": 2 }
      ])
    );
    localStorage.setItem(
      'history-20201004', JSON.stringify([
        { "id": uuidv4(), "user_id": 1, "habit_id": 1 },
        { "id": uuidv4(), "user_id": 1, "habit_id": 2 },
        { "id": uuidv4(), "user_id": 1, "habit_id": 3 }
      ])
    );
  }
}
