export default function ResultCard({ result }) {
  if (!result) return null;

  return (
    <div>
      <h2>✅ Your Fitness Results</h2>
      <p>
        <b>BMI:</b> {result.bmi} ({result.category})
      </p>
      <p>
        <b>Calories:</b> {result.calories} kcal/day
      </p>
      <p>
        <b>Protein:</b> {result.protein}g 🍗
      </p>
      <p>
        <b>Carbs:</b> {result.carbs}g 🍞
      </p>
      <p>
        <b>Fat:</b> {result.fat}g 🥑
      </p>

      <h3>🧠 Generated Plan</h3>
      {result.aiPlan ? (
        <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
          {result.aiPlan}
        </pre>
      ) : (
        <p>No plan generated.</p>
      )}
    </div>
  );
}
