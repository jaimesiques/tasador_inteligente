import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";

import "../../styles.css";

export default function FormBox() {
  const { register, handleSubmit, watch } = useForm();

  const [result, setResult] = useState("");

  const onSubmit = async (data) => {
    await checkData(data);
  }; // your form submit function which will invoke after successful validation

  let checkData = async (data) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var body = JSON.stringify({
      // id: data.id,
      // dormitorios: data.dormitorios,
      // banos: data.banos,
      // estacionamientos: data.estacionamientos,
      // comuna: data.comuna,
      // area_total: data.area_total,
      // area_construida: data.area_construida,
      // longitud: data.longitud,
      // latitud: data.latitud,
      // condicion: data.condicion,

      id: 30108,
      dormitorios: 3,
      banos: 2,
      estacionamientos: 2,
      comuna: 2,
      area_total: 1000,
      area_construida: 190,
      longitud: -71.2743606567382,
      latitud: -32.9077262878417,
      condicion: 1,
    });

    console.log("body");
    console.log(body);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: body,
      redirect: "follow",
    };

    try {
      let response = await fetch(
        "http://52.21.223.162:8012/prediction_j",
        requestOptions
      );

      // console.log(JSON.stringify(response.statusText));
      let responseJSON = await response.json();
      console.log("responseJSON");
      console.log(responseJSON);
      let resultin = responseJSON.resultado;
      resultin = resultin.split("[")[1];
      resultin = resultin.split("]")[0];

      setResult(parseFloat(resultin).toFixed(2) + " UF");
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Propiedad</label>
        <input {...register("id")} />
        <label>Dormitorio(s)</label>
        <input {...register("dormitorios")} />
        <label>Baño(s)</label>
        <input {...register("banos")} />
        <label>Estacionamiento(s)</label>
        <input {...register("estacionamientos")} />
        <label>Comuna</label>
        <input {...register("comuna")} />
        <label>Área total</label>
        <input {...register("area_total")} />
        <label>Área construida</label>
        <input {...register("area_construida")} />
        <label>Longitud</label>
        <input {...register("longitud")} />
        <label>Latitud</label>
        <input {...register("latitud")} />
        <label>Condición</label>
        <input {...register("condicion")} />

        <div className="m-5">
          <h2>Resultado: {result}</h2>
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}
