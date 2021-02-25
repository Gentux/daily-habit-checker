export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0
    return r.toString(16);
  });
}

export function dateToString(date) {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  return year.toString() + (month < 10 ? '0' + month.toString() : month.toString()) + (day < 10 ? '0' + day.toString() : day.toString());
}

export function stringToDate(dateString) {
  if (dateString === null || dateString === undefined) {
    return null
  }
  return new Date(
    parseInt(dateString.substr(0,4)),
    parseInt(dateString.substr(4,2)),
    parseInt(dateString.substr(6,2))
  )
}

const default_export = "this is default";
export default default_export;
