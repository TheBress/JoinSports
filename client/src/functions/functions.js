export const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const validateDate = (valuesDate) => {
  let isValidate = false;
  if (valuesDate !== "") {
    let today = new Date();
    let date = new Date(valuesDate);
    if (date.valueOf() > today.valueOf()) isValidate = true;
  }

  return isValidate;
};

export const sanitizeDate = (date) => {
  const positionT = date?.indexOf("T");
  const newDate =
    date?.substring(0, positionT) + " " + date?.substring(positionT + 1);
  return newDate;
};

export const sanitizeCompleteDate = (date) => {
  const positionT = date?.indexOf("T");
  const positionDot = date?.indexOf(".");

  const goodHour = parseInt(date?.substring(positionT + 1, positionT + 3)) + 1;

  const newDate =
    date?.substring(0, positionT) +
    " " +
    goodHour +
    date?.substring(positionT + 3, positionDot);
  return newDate;
};

export const calculateDate = (date) => {
  var today = new Date();
  var birthDate = new Date(date);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};
