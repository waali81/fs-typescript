interface TotalProps {
  exercises: number;
}

const Total = (props: TotalProps) => {
  return <p>Number of exercises: <em><strong>{props.exercises}</strong></em></p>;
};

export default Total;