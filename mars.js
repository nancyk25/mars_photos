const cameraList = [
  "FHAZ",
  "NAVCAM",
  "MAST",
  "CHEMCAM",
  "MAHLI",
  "MARDI",
  "RHAZ"
];

cameraList.map(cameraName => {
  let cameraElement = document.getElementById(cameraName);
  cameraElement.onclick = () => fetchMars(cameraName);
});

const proxySite = "https://cors-anywhere.herokuapp.com/";
const API_KEY = "s94rYwGjvernqYg95rl7GiEKDzwayAB6JFmh5get";
const sol = "1000";
const endpoint =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?";
const imageNotFound = "http://www.51allout.co.uk/wp-content/uploads/2012/02/Image-not-found.gif";

const clearoutGrid = parents => {
  parents.map( parent => {
    while (parent.firstChild) {
      parent.firstChild.remove();
    }
  })
};

const fetchMars = cameraName => {
  const api = `${endpoint}sol=${sol}&camera=${cameraName}&api_key=${API_KEY}`;
  fetch(proxySite + api, {
      headers: {
        "content-type": "application/json"
      }
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      const col1 = document.getElementById("col1");
      const col2 = document.getElementById("col2");
      const col3 = document.getElementById("col3");
      clearoutGrid([col1, col2, col3]);
      
      const images = json.photos.map(photo => {
        const imgSrc = photo.img_src;
        if (imgSrc.length > 0) {
          return imgSrc;
        }
      });

      if (images.length === 0) {
        let img = document.createElement("img");
        img.src = imageNotFound
        col1.appendChild(img);
      } else {
        images.forEach((url, index) => {
          let img = document.createElement("img");
          let docFrag = document.createDocumentFragment();
          img.src = url;
          docFrag.appendChild(img);

          if (index < 2 ) {
            col1.appendChild(docFrag)
          } else if (index >= 2 && index < 4) {
            col2.appendChild(docFrag)
          } else if (index >=4 && index < 6) {
            col3.appendChild(docFrag)
          }
        });
      }
    });
};