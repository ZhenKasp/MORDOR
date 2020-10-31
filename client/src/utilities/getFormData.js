const getFormData = (event) => {
  const data = new FormData(event.target);
  let object = {};
  data.forEach((value, key) => {object[key] = value});

  return object;
}

export default getFormData;
