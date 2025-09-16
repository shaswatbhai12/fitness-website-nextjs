"use client";

export default function ResultCard({ result }) {
  if (!result) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md text-center text-gray-500 border border-gray-200">
        <h2 className="text-lg font-semibold mb-2">No Results Yet</h2>
        <p>Please enter your details and generate a fitness plan.</p>
      </div>
    );
  }

  const {
    bmi = "N/A",
    category = "N/A",
    calories = "N/A",
    protein = "N/A",
    carbs = "N/A",
    fat = "N/A",
    aiPlan = "No plan generated.",
  } = result;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-400 space-y-6">
      <h2 className="text-xl font-bold text-green-700 text-center">✅ Your Fitness Results</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
        <div className="bg-gray-50 p-4 rounded-lg border">
          <p><strong>BMI:</strong> {bmi} ({category})</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border">
          <p><strong>Calories:</strong> {calories} kcal/day</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border">
          <p><strong>Protein:</strong> {protein}g 🍗</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border">
          <p><strong>Carbs:</strong> {carbs}g 🍞</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border">
          <p><strong>Fat:</strong> {fat}g 🥑</p>
        </div>
      </div>

      <div className="mt-6 bg-indigo-50 p-4 rounded-lg border border-indigo-200 whitespace-pre-line">
        <h3 className="text-lg font-semibold text-indigo-700 mb-2">🧠 Generated Plan</h3>
        <p className="text-sm leading-relaxed">{aiPlan}</p>
      </div>
    </div>
  );
}