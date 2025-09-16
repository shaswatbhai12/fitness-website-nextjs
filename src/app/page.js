"use client";
import { useState } from "react";
import ResultCard from "./components/ResultCard";
import { AlignCenter } from "lucide-react";

export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("Male");
  const [activity, setActivity] = useState("Moderately Active");
  const [goal, setGoal] = useState("Lose Weight");
  const [result, setResult] = useState(null);

  const handleGeneratePlan = async () => {
    if (!age || !height || !weight) {
      alert("Please fill all fields correctly!");
      return;
    }

    const heightM = height / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(1);

    let category = "";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 24.9) category = "Normal weight";
    else if (bmi < 29.9) category = "Overweight";
    else category = "Obese";

    // BMR calculation
    let bmr =
      gender === "Male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    // Activity multiplier
    const activityLevels = {
      Sedentary: 1.2,
      "Lightly Active": 1.375,
      "Moderately Active": 1.55,
      "Very Active": 1.725,
      "Super Active": 1.9,
    };
    let calories = bmr * activityLevels[activity];

    // Goal adjustment
    if (goal === "Lose Weight") calories -= 500;
    if (goal === "Gain Weight") calories += 500;

    // Macros (40% carbs, 30% protein, 30% fat)
    const protein = Math.round((calories * 0.3) / 4);
    const carbs = Math.round((calories * 0.4) / 4);
    const fat = Math.round((calories * 0.3) / 9);

    // Simple AI plan (placeholder)
    const aiPlan = `
🥗 **7-Day Diet Suggestion**
Day 1: Scrambled eggs + spinach
Day 2: Grilled chicken salad
Day 3: Steamed veggies + tofu
Day 4: Nuts + fruit snacks
Day 5: Hydration: 8 glasses of water

🏋️ **7-Day Workout Suggestion**
Day 1: 30 min cardio + squats
Day 2: HIIT + planks
Day 3: Rest or yoga
Day 4: Jump rope + push-ups
Day 5: Cycling + crunches
Day 6: Full-body circuit
Day 7: Stretch + walk
`;

    setResult({
      bmi,
      category,
      calories: Math.round(calories),
      protein,
      carbs,
      fat,
      aiPlan,
    });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>🏋️ Smart Fitness Planner</h1>

      {/* Input fields */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          min="1"
          max="120"
        />

        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          min="50"
          max="250"
        />

        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          min="10"
          max="300"
        />

        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option>Male</option>
          <option>Female</option>
        </select>

        <select value={activity} onChange={(e) => setActivity(e.target.value)}>
          <option>Sedentary</option>
          <option>Lightly Active</option>
          <option>Moderately Active</option>
          <option>Very Active</option>
          <option>Super Active</option>
        </select>

        <select value={goal} onChange={(e) => setGoal(e.target.value)}>
          <option>Lose Weight</option>
          <option>Maintain Weight</option>
          <option>Gain Weight</option>
        </select>

        <button onClick={handleGeneratePlan}>💡 Generate My Plan</button>
      </div>

      {/* Results */}
      <ResultCard result={result} />
    </div>
  );
}
