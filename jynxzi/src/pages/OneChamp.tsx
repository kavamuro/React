import { useEffect, useState } from "react";
import type { Champ } from "../types/Champ";
import { useParams } from "react-router-dom";
import apiClient, { BACKEND_URL } from "../api/apiClient";
import { Carousel } from "react-bootstrap";

const OneChamp = () => {
  const [champ, setChamp] = useState<Champ>();
  const { id } = useParams();

  useEffect(() => {
    apiClient
      .get(`/champions/${id}`)
      .then((res) => setChamp(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <>
      <div style={{ width: "600px", margin: "0 auto" }}>
        <h1>{champ?.name}</h1>
        <Carousel interval={null}>
          {champ?.images.map((e) => (
            <Carousel.Item>
              <img
                src={`${BACKEND_URL}/images/${e}`}
                style={{ width: "600px" }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <p>{champ?.description}</p>
        <h4>
          Role: {champ?.role} Lane: {champ?.lane}
        </h4>
        <h4>
          Difficulty:
          {champ?.difficulty}
        </h4>
        <h3>Damage type: {champ?.damage_type}</h3>
        <h4>Blue essence cost: {champ?.blue_essence}</h4>
      </div>
    </>
  );
};

export default OneChamp;
