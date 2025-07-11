function GameObjectives({ objectives }) {
  return (
    <div>
      {objectives.map((objective) => (
        <div key={objective.index}>
          <p>{objective.name}</p>
          <img src={`${objective.image}`} />
        </div>
      ))}
    </div>
  );
}

export default GameObjectives;
