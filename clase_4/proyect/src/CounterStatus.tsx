interface CounterStatusProps {
  count: number;
}

function CounterStatus({ count }: CounterStatusProps) {
  let message: string;
  let className: string;

  // count = -1
  // si contador es menor a 0
  // entra en el if y no entra a otro lado
  if (count < 0) {
    message = "Counter is negative";
    className = "status low";
  } else if (count > 0) {
    message = "Counter is positive";
    className = "status high";
  } else {
    message = "Counter is at zero";
    className = "status zero";
  }

  // count = -1
  // si contador es menor a 0
  // entra al if y despues pasa al otro if que es falso
  // por ultimo entra al else

  // este no lo podemos usar porque entraria al primer if y al ultimo else

  // if (count < 0) {
  //   //entra
  //   message = "Counter is negative"; //entra
  //   className = "status low"; //entra
  // }
  // if (count > 0) {
  //   // valida pero no entra
  //   message = "Counter is positive";
  //   className = "status high";
  // } else {
  //   //entra
  //   message = "Counter is at zero"; //entra
  //   className = "status zero"; //entra
  // }

  // cuantas validaciones podria pasar aca?
  // pregunta una vez 1 si es la primera condicion
  // if(condicion){}
  // else if (condicion){}
  // else{}

  // // cuantas validaciones podria pasar aca?
  // // pregunta 3 veces aunque sea la primera condicion
  // if(condicion){}
  // if (condicion){}
  // if (condicion){}
  // else{}

  return <div className={className}>{message}</div>;
}

export default CounterStatus;
