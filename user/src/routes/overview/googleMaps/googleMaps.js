import { useRef, useEffect } from "react";
import Axios from "axios";
import "./googleMaps.css";
import { useLocation } from "react-router";

export default function GoogleMapsInfo(props) {
    const ref = useRef();
    const location = useLocation();

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

        if (marker.getAnimation() != null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(window.google.maps.Animation.DROP);
        };

        let stringX = "";
        let positions;
        let contentString;
        let occupiedPositions = 0;
        let progress = 0;
        let infowindow;
        
        Axios.get("http://localhost:5000/positions/list/" + data[i].co_id).then((res) => {
          positions = res.data;
          if(res.data != "Failed!" && stringX === "") {
            for(let j = 0; j < res.data.rows.length; ++j) {
              if(res.data.rows[j].pos_occupied === "No") {
                stringX += "<p class = 'infoWindowFreePos'>💻 " + res.data.rows[j].pos_name + "</p>";
              } else {
                stringX += "<p class = 'infoWindowOccupiedPos'>💻 " + res.data.rows[j].pos_name + "</p>";
                ++occupiedPositions;
              }
            };
            progress = parseInt(100 * occupiedPositions / res.data.rows.length);
          };

          contentString = 
          `<div class = "infoWindowContainer">
              <a href = "http://localhost:3000/positions" id = "infoWindowTitle">${title}</a>
              <p id = "infoWindowPosNr">Open positions: ${data[i].co_initial_free_positions - occupiedPositions} / ${data[i].co_initial_free_positions}</p>
              <div class='progress'><div class='progress-bar progress-bar-striped bg-success' role='progressbar' aria-label='Success striped example' style='width: ${progress}%' aria-valuenow='25' aria-valuemin='0' aria-valuemax='100'>${progress}%</div></div>
              ${stringX}
          </div>`;

          infowindow = new window.google.maps.InfoWindow({
            content: contentString,
            ariaLabel: title,
          });

          if(location.state === data[i].co_name) {
            infowindow.open({
              anchor: marker,
              map,
            });
            activeInfoWindow = infowindow;
          };
        }).catch((error) => {
          console.log(error);
        });

        marker.addListener("click", () => {
            if (activeInfoWindow) { 
              activeInfoWindow.close();
            };
  
            infowindow.open({
              anchor: marker,
              map,
            });
            
            activeInfoWindow = infowindow;
        });
      };
    }, [props]);

    return <div ref = {ref} id = "map" style = {{ flexGrow: "1", height: "100%" }} className = "fade-in-down"></div>
}