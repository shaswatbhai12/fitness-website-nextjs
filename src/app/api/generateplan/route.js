// app/api/generateplan/route.js
export async function POST(req) {
  try {
    const body = await req.json();
    const { age, gender, height, weight, activity, goal } = body;

    if (
      !age || !height || !weight ||
      isNaN(age) || isNaN(height) || isNaN(weight)
    ) {
      throw new Error("Invalid input: age, height, and weight must be numbers");
    }

    const heightM = height / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(1);

    let bmiCategory = "";
    if (bmi < 18.5) bmiCategory = "Underweight";
    else if (bmi < 24.9) bmiCategory = "Normal weight";
    else if (bmi < 29.9) bmiCategory = "Overweight";
    else bmiCategory = "Obesity";

    const bmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    const calories = Math.round(bmr * parseFloat(activity));
    const protein = Math.round((calories * 0.3) / 4);
    const carbs = Math.round((calories * 0.4) / 4);
    const fat = Math.round((calories * 0.3) / 9);

    // Mock diet & workout plans
    const diet = {
      lose: [
        "Breakfast: Scrambled eggs + spinach",
        "Lunch: Grilled chicken salad",
        "Dinner: Steamed veggies + tofu",
        "Snacks: Nuts + fruit",
        "Hydration: 8 glasses of water"
      ],
      maintain: [
        "Breakfast: Oats + banana + peanut butter",
        "Lunch: Rice + dal + paneer",
        "Dinner: Roti + sabzi + curd",
        "Snacks: Yogurt + seeds",
        "Hydration: 8 glasses of water"
      ],
      gain: [
        "Breakfast: Protein shake + toast + eggs",
        "Lunch: Chicken curry + rice + ghee",
        "Dinner: Pasta + cheese + salad",
        "Snacks: Dry fruits + milk",
        "Hydration: 10 glasses of water"
      ]
    };

    const workout = {
      lose: [
        "Day 1: 30 min cardio + squats",
        "Day 2: HIIT + planks",
        "Day 3: Rest or yoga",
        "Day 4: Jump rope + push-ups",
        "Day 5: Cycling + crunches",
        "Day 6: Full-body circuit",
        "Day 7: Stretch + walk"
      ],
      maintain: [
        "Day 1: Jog + squats + push-ups",
        "Day 2: Dumbbell workout",
        "Day 3: Rest",
        "Day 4: Core training",
        "Day 5: Cardio + yoga",
        "Day 6: Upper body strength",
        "Day 7: Walk + mobility"
      ],
      gain: [
        "Day 1: Chest + triceps (bench, dips)",
        "Day 2: Back + biceps (rows, curls)",
        "Day 3: Legs (squats, lunges)",
        "Day 4: Shoulders + core",
        "Day 5: Rest",
        "Day 6: Full-body strength",
        "Day 7: Active recovery"
      ]
    };

    // Construct a readable AI plan
    const aiPlan = `
🍽️ **7-Day Diet Suggestion**
${diet[goal].map((meal, i) => `Day ${i + 1}: ${meal}`).join("\n")}

🏋️ **7-Day Workout Suggestion**
${workout[goal].map((w) => w).join("\n")}
    `;

    return new Response(
      JSON.stringify({
        bmi,
        category: bmiCategory,
        calories,
        protein,
        carbs,
        fat,
        aiPlan,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating plan:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate plan" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
