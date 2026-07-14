import { useState } from "react";

const Pruebas = () => {
  const [valorNumero, setValorNumer] = useState<number>(0);
  const [isOdd, setIsOdd] = useState<boolean>(true);

  // isStudent >= 18 ? "Mayor de edad" : "Menor de edad"
  // if (esVerdad) {
  //   // pasa esto
  // } else {
  //   // pasa esto otro
  // }

  return (
    <div
      style={{
        marginBottom: 50,
      }}
    >
      <div>
        <button
          onClick={() => {
            setValorNumer(valorNumero + 1);
            setIsOdd(!isOdd);
          }}
        >
          el valor de valorNumero es: {valorNumero}
        </button>
      </div>

      <div>
        {valorNumero !== 0
          ? isOdd
            ? `es par ${valorNumero}`
            : `es impar ${valorNumero} `
          : ""}
      </div>
    </div>
  );
};

export default Pruebas;
