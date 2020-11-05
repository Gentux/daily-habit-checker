export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0
    return r.toString(16);
  });
}

export function initLocalStorage() {
  localStorage.removeItem('users')
  localStorage.removeItem('habits')
  localStorage.removeItem('history')

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
          "icon": "bootstrap-icons.svg#flower2"
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

export function dateToString(date) {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  return year.toString() + (month < 10 ? '0' + month.toString() : month.toString()) + (day < 10 ? '0' + day.toString() : day.toString());
}

export function stringToDate(dateString) {
  return new Date(
    parseInt(dateString.substr(0,4)),
    parseInt(dateString.substr(4,2)),
    parseInt(dateString.substr(6,2))
  )
}

const default_export = "this is default";
export default default_export;
