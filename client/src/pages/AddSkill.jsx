import { useState, useEffect } from 'react';
import { Plus, Trash2, Rocket, Clock, Tag, Cpu, Search } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const AddSkill = () => {
  // 1. AI Logic Dictionary (इसे हम और बड़ा कर सकते हैं)
  const aiClassifier = (input) => {
    const text = input.toLowerCase().trim();
    
    const categories = {
      "Programming Language": ["javascript", "python", "java", "c++", "ruby", "php", "go", "swift", "c#", "rust"],
      "Frontend Technology": ["react", "nextjs", "vue", "angular", "html", "css", "sass", "bootstrap"],
      "Backend & Server": ["nodejs", "express", "django", "flask", "laravel", "spring", "api"],
      "Database": ["mongodb", "mysql", "postgresql", "firebase", "redis", "oracle", "sql"],
      "Design Tool": ["figma", "canva", "adobe xd", "photoshop", "illustrator"],
      "DevOps & Tools": ["docker", "kubernetes", "git", "github", "aws", "azure", "jenkins"]
    };

    for (let category in categories) {
      if (categories[category].some(skill => text.includes(skill))) {
        return category;
      }
    }
    return "Skill / Others"; // Default अगर कुछ मैच न हो
  };

  const [skillsList, setSkillsList] = useState(() => {
    const saved = localStorage.getItem('mySkills');
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({ name: '', category: '', hours: '', level: 'Beginner' });
  const [searchTerm, setSearchTerm] = useState(""); // Search के लिए

  useEffect(() => {
    localStorage.setItem('mySkills', JSON.stringify(skillsList));
  }, [skillsList]);

  // 2. Input Change with AI Detection
  const handleNameChange = (e) => {
    const nameValue = e.target.value;
    const detectedCat = aiClassifier(nameValue);
    
    setFormData({ 
      ...formData, 
      name: nameValue, 
      category: nameValue.length > 2 ? detectedCat : "" // 2 अक्षर से ज्यादा होने पर ही AI काम करे
    });
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.hours) {
      toast.error("नाम और घंटे भरना ज़रूरी है!");
      return;
    }
    setSkillsList([...skillsList, { ...formData, id: Date.now() }]);
    setFormData({ name: '', category: '', hours: '', level: 'Beginner' });
    toast.success("AI ने स्किल को क्लासिफाई कर दिया है! ✨");
  };

  // 3. Filtered List for Search
  const filteredSkills = skillsList.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-20 bg-[#0f172a] min-h-screen text-white px-6">
      <Toaster position="top-right" />
      
      <div className="max-w-6xl mx-auto">
        {/* Search Bar */}
        <div className="relative mb-10 max-w-md mx-auto">
          <Search className="absolute left-4 top-3.5 text-slate-500" size={20} />
          <input 
            type="text"
            placeholder="Search your skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#1e293b] rounded-full border border-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Form Section */}
          <div className="lg:col-span-1 bg-[#1e293b] p-8 rounded-3xl border border-slate-700 h-fit sticky top-10">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 italic">
              <Cpu className="text-blue-400" /> AI Skill Classifier
            </h2>
            
            <form onSubmit={handleAddSkill} className="space-y-4">
              <input
                type="text"
                value={formData.name}
                onChange={handleNameChange}
                placeholder="Type Skill (e.g. MongoDB)"
                className="w-full p-3 bg-[#0f172a] rounded-xl outline-none border border-slate-700 focus:border-blue-500"
              />
              
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <p className="text-[10px] uppercase text-blue-400 font-bold mb-1">Detected Category</p>
                <p className="text-sm font-medium">{formData.category || "Waiting for input..."}</p>
              </div>

              <div className="flex gap-2">
                {['Beginner', 'Pro'].map(l => (
                  <button 
                    key={l} type="button"
                    onClick={() => setFormData({...formData, level: l})}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${formData.level === l ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>

              <input
                type="number"
                value={formData.hours}
                onChange={(e) => setFormData({...formData, hours: e.target.value})}
                placeholder="Target Hours"
                className="w-full p-3 bg-[#0f172a] rounded-xl outline-none border border-slate-700"
              />
              
              <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20">
                Add Skill
              </button>
            </form>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {filteredSkills.map((item) => (
              <div key={item.id} className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-all">
                <div className="flex justify-between mb-4">
                  <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md font-bold">{item.category}</span>
                  <button onClick={() => setSkillsList(skillsList.filter(s => s.id !== item.id))}><Trash2 size={16} className="text-slate-600 hover:text-red-500" /></button>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-slate-400 flex items-center gap-1"><Clock size={14}/> {item.hours} Hours</span>
                  <span className="text-xs font-bold text-cyan-400">{item.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddSkill;