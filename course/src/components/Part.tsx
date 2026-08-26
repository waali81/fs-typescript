import type { CoursePart } from '../types';

interface PartProps {
    part: CoursePart;
}

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = (props: PartProps) => {
  switch (props.part.kind) {
    case "basic":
        return (
            <div>
                <br />
                <strong>{props.part.name} {props.part.exerciseCount}</strong>
                <div><em>{props.part.description}</em></div>
            </div>
        );

    case "group":
        return (
            <div>
                <br />
                <strong>{props.part.name} {props.part.exerciseCount}</strong>
                <div><em>Group projects: {props.part.groupProjectCount}</em></div>
            </div>
        );

    case "background":
        return (
            <div>
                <br />
                <strong>{props.part.name} {props.part.exerciseCount}</strong>
                <div><em>{props.part.description}<br />
                Submit to {props.part.backgroundMaterial}</em></div>
            </div>
        );

    case "special":
        return (
            <div>
                <br />
                <strong>{props.part.name} {props.part.exerciseCount}</strong>
                <div><em>{props.part.description}<br />
                Requirements: {props.part.requirements.join(", ")}</em></div>
            </div>
        );

    default:
        return assertNever(props.part);
  }
};

export default Part;