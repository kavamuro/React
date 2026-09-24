type Props = {
    id?:number;
    nev:string;
    kor:number
}

const Bemutatkozas = (props:Props) => {
  return (
    <>
      <h1>Hello {props.nev}!</h1>
      <h2>Te {props.kor} éves vagy!</h2>
      <h3>{props.kor<18?<p style={{color:"red"}}>fiatalkoru vagy</p>:<>te felnott vagy</>}</h3>
    </>
  );
};

export default Bemutatkozas;
