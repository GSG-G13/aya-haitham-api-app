function fetch(url, cb) {
  let xhr = new XMLHttpRequest();
  const proxyURL = `https://api.codetabs.com/v1/proxy?quest=${url}`;
  let returnedData;
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      returnedData = JSON.parse(xhr.responseText);
      console.log(returnedData, "2222");
      cb(returnedData, 20);
    }
  };
  xhr.open("GET", proxyURL, true);

  xhr.send();
}
function selectFilter(arr, cb, url, dom) {
  let activeSelectors = arr.filter((element) => element.value);
  let link = activeSelectors.reduce((acc, element, index) => {
    if (index == 0) {
      return (acc += `${element.className}=${element.value}`);
    }
    return (acc += `&${element.className}=${element.value}`);
  }, `${url}?`);

  console.log(link);
  cb(link, dom);
}
