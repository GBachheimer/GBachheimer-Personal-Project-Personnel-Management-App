import { useRef, useEffect } from "react";
import Axios from "axios";
import "./googleMaps.css";

export default function GoogleMapsInfo(props) {
    const ref = useRef();

    const data = props.data;
    const center = props.center;
    const zoom = props.zoom;

    useEffect(() => {
      const map = new window.google.maps.Map(ref.current, {
        center,
        zoom,
      });

      let activeInfoWindow;

      for(let i = 0; i < data.length; ++i) {
        const myLatlng = new window.google.maps.LatLng(data[i].co_lat, data[i].co_lng);
        const title = data[i].co_name;

        const marker = new window.google.maps.Marker({
          position: myLatlng,
          title: title,
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/3504/3504458.png", 
            scaledSize: new window.google.maps.Size(35, 35),
          },
          map: map
        });

        marker.addListener("click", () => {
          let stringX = "";
          let positions;
          let contentString;
          Axios.get("http://localhost:5000/positions/list/" + data[i].co_name.replace(/\s/g, "_")).then((res) => {
            positions = res.data;
            if(positions != "Failed!" && stringX === "") {
              for(let j = 0; j < positions.rows.length; ++j) {
                stringX += "<p class = 'infoWindowPos'>💻 " + positions.rows[j].pos_name + "</p>";
              };
            }

            contentString = 
            `<div>
                <a href = "http://localhost:3000/positions" id = "infoWindowTitle">${title.replace(/_/g, " ")}</a>
                <p id = "infoWindowPosNr">Open positions: ${data[i].co_initial_free_positions}</p>
                ${stringX}
            </div>`;
  
            let infowindow = new window.google.maps.InfoWindow({
              content: contentString,
              ariaLabel: title,
            });
  
            if (activeInfoWindow) { 
              activeInfoWindow.close();
            };
  
            infowindow.open({
              anchor: marker,
              map,
            });
  
            activeInfoWindow = infowindow;
          }).catch((error) => {
            console.log(error);
          });
        });
      }
    }, [data]);

    return <div ref = {ref} id = "map" style = {{ flexGrow: "1", height: "100%" }}></div>
}