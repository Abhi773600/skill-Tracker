import { useEffect, useState } from "react";
import SkillChart from "./components/SkillChart";

function App() {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState("");
  const [goalHours, setGoalHours] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const API_BASE_URL = "http://localhost:5000/api/skills";

  // ✅ Always get fresh token
  const getToken = () => localStorage.getItem("token");

  // ==============================
  // ✅ FETCH SKILLS
  // ==============================
  const fetchSkills = async () => {
    const token = getToken();

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const res = await fetch(API_BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      const data = await res.json();
      setSkills(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // ==============================
  // ✅ ADD SKILL
  // ==============================
  const addSkill = async () => {
    if (!name || !goalHours) {
      alert("Fill all fields");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/skills/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          goalHours: Number(goalHours),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setName("");
      setGoalHours("");
      fetchSkills();
    } catch (err) {
      console.error("Add Skill Error:", err);
    }
  };

  // ==============================
  // ✅ UPDATE HOURS
  // ==============================
  const updateHours = async (id, hours) => {
    const token = getToken();

    await fetch(`${API_BASE_URL}/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ hours }),
    });

    fetchSkills();
  };

  // ==============================
  // ✅ DELETE SKILL
  // ==============================
  const deleteSkill = async (id) => {
    const token = getToken();

    await fetch(`${API_BASE_URL}/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchSkills();
  };

  // 📊 Chart Data
  const chartData = skills.map(skill => ({
    name: skill.name,
    Goal: skill.goalHours,
    Practiced: skill.hoursPracticed,
    Progress: skill.progress
  }));

  // 📈 Monthly Growth Data
  const monthlyData = {};
  skills.forEach(skill => {
    const month = new Date(skill.createdAt).toLocaleString("default", { month: "short" });

    if (!monthlyData[month]) monthlyData[month] = 0;
    monthlyData[month] += skill.hoursPracticed;
  });

  const monthlyChartData = Object.keys(monthlyData).map(month => ({
    month,
    hours: monthlyData[month]
  }));


  // ==============================
  // ✅ LOGOUT
  // ==============================
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };



  return (
    <div
  style={{
    maxWidth: "800px",
    margin: "auto",
    padding: "20px",
    background: darkMode ? "#121212" : "#ffffff",
    color: darkMode ? "#ffffff" : "#000000",
    minHeight: "100vh",
    transition: "0.3s"
  }}
>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Skill Tracker Dashboard 🚀</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <h3>Add Skill</h3>
      <input
        placeholder="Skill Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Goal Hours"
        value={goalHours}
        onChange={(e) => setGoalHours(e.target.value)}
      />
      <button onClick={addSkill}>Add</button>

      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
      </button>

      <hr />


      {skills.length === 0 ? (
        <p>No skills found</p>
      ) : (
        skills.map((skill) => (
          <div key={skill._id} style={{ marginBottom: "20px" }}>
            <h3>{skill.name}</h3>
            <p>
              {skill.hoursPracticed} / {skill.goalHours} hours
            </p>

            <button onClick={() => updateHours(skill._id, 1)}>
              +1 Hr
            </button>
            <button onClick={() => updateHours(skill._id, 5)}>
              +5 Hr
            </button>
            <button onClick={() => deleteSkill(skill._id)}>
              Delete
            </button>
          </div>
        ))
      )}
      <SkillChart data={chartData} />
    </div>



  );
}

export default App;