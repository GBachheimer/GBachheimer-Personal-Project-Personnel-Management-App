import { useRef, useEffect } from "react";

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

      for(let i = 0; i < data.length; ++i) {
        const myLatlng = new window.google.maps.LatLng(data[i].co_lat, data[i].co_lng);
        const title = data[i].co_name;

        const contentString = 
          `<div>
              <p>${title}</p>
              <p>Total positions: ${data[i].co_initial_total_positions}</p>
              <p>Open positions: ${data[i].co_initial_free_positions}</p>
          </div>`;

        const marker = new window.google.maps.Marker({
          position: myLatlng,
          title: title,
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/3504/3504458.png", 
            scaledSize: new window.google.maps.Size(35, 35),
          },
          map: map
        });
  
        const infowindow = new window.google.maps.InfoWindow({
          content: contentString,
          ariaLabel: title,
        });

        marker.addListener("click", () => {
          infowindow.open({
            anchor: marker,
            map,
          });
        });
      }
    }, [data]);

    return (
      <div ref = {ref} id = "map" style = {{ flexGrow: "1", height: "100%" }}></div>
      );
}