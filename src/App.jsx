
import React, { useState, useEffect } from 'react';
import { Heart, Star, Trash2, Plus, Sparkles, Calendar, Bell, Tag, Trophy, Zap, Moon, Sun, Gift, Check, ChevronDown, ChevronRight, Share2, Download, Settings } from 'lucide-react';

export default function UltimateSparkleToDoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [category, setCategory] = useState('all');
  const [priority, setPriority] = useState('normal');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [theme, setTheme] = useState('bubblegum');
  const [emojiSet, setEmojiSet] = useState('mix');
  const [showSettings, setShowSettings] = useState(false);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [lastCompleted, setLastCompleted] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [expandedTodo, setExpandedTodo] = useState(null);
  const [quote, setQuote] = useState('');
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  const themes = {
    bubblegum: { bg: 'from-pink-100 via-pink-200 to-rose-100', accent: 'from-pink-400 to-rose-400', border: 'border-pink-200' },
    lavender: { bg: 'from-purple-100 via-lavender-100 to-blue-100', accent: 'from-purple-400 to-blue-400', border: 'border-purple-200' },
    mint: { bg: 'from-green-100 via-teal-100 to-cyan-100', accent: 'from-green-400 to-teal-400', border: 'border-green-200' },
    peachy: { bg: 'from-orange-100 via-peach-100 to-yellow-100', accent: 'from-orange-400 to-yellow-400', border: 'border-orange-200' },
    holographic: { bg: 'from-pink-200 via-purple-200 to-blue-200', accent: 'from-pink-500 via-purple-500 to-blue-500', border: 'border-purple-300' }
  };

  const categories = {
    selfcare: { name: 'Self-Care', emoji: '💕', color: 'pink' },
    study: { name: 'Study', emoji: '📚', color: 'blue' },
    creative: { name: 'Creative', emoji: '🎨', color: 'purple' },
    fitness: { name: 'Fitness', emoji: '🏃‍♀️', color: 'green' },
    shopping: { name: 'Shopping', emoji: '🛍️', color: 'rose' },
    work: { name: 'Work', emoji: '💼', color: 'indigo' }
  };

  const emojiSets = {
    mix: ['💕', '✨', '🌸', '🦋', '🎀', '🌟', '💖', '🌈'],
    animals: ['🐱', '🐰', '🦄', '🐻', '🐼', '🦊', '🐨', '🦌'],
    flowers: ['🌸', '🌺', '🌷', '🌹', '🌻', '💐', '🌼', '🏵️'],
    food: ['🍓', '🍰', '🧁', '🍡', '🍦', '🍩', '🍪', '🎂'],
    sparkles: ['✨', '⭐', '🌟', '💫', '🔮', '💎', '👑', '🎀']
  };

  const quotes = [
    "You're doing amazing, sweetie! 💕",
    "Sparkle on, dream big! ✨",
    "You've got this, superstar! 🌟",
    "One task at a time, beautiful! 🌸",
    "Keep shining, you're incredible! 💖",
    "You're unstoppable! 🦋",
    "Making magic happen! 🎀",
    "So proud of you! 💕✨"
  ];

  const achievementsList = [
    { id: 'first', name: 'First Step', desc: 'Complete your first task', icon: '🌟', requirement: 1 },
    { id: 'streak3', name: 'On Fire', desc: '3 day streak', icon: '🔥', requirement: 3 },
    { id: 'streak7', name: 'Unstoppable', desc: '7 day streak', icon: '✨', requirement: 7 },
    { id: 'tasks10', name: 'Task Master', desc: 'Complete 10 tasks', icon: '👑', requirement: 10 },
    { id: 'tasks50', name: 'Sparkle Queen', desc: 'Complete 50 tasks', icon: '💎', requirement: 50 },
    { id: 'level5', name: 'Dream Chaser', desc: 'Reach level 5', icon: '🦋', requirement: 5 }
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await window.storage.get('sparkle-user-data');
        if (result) {
          const data = JSON.parse(result.value);
          setTodos(data.todos || []);
          setXp(data.xp || 0);
          setLevel(data.level || 1);
          setStreak(data.streak || 0);
          setLastCompleted(data.lastCompleted);
          setTheme(data.theme || 'bubblegum');
          setEmojiSet(data.emojiSet || 'mix');
          setAchievements(data.achievements || []);
        }
      } catch (error) {
        console.log('No saved data yet, starting fresh! ✨');
      }
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!loading) {
      const saveData = async () => {
        try {
          await window.storage.set('sparkle-user-data', JSON.stringify({
            todos, xp, level, streak, lastCompleted, theme, emojiSet, achievements
          }));
        } catch (error) {
          console.error('Failed to save data:', error);
        }
      };
      saveData();
    }
  }, [todos, xp, level, streak, lastCompleted, theme, emojiSet, achievements, loading]);

  useEffect(() => {
    const xpForNextLevel = level * 100;
    if (xp >= xpForNextLevel) {
      setLevel(level + 1);
      triggerConfetti();
      checkAchievement('level5', level + 1);
    }
  }, [xp, level]);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const checkAchievement = (id, value) => {
    const achievement = achievementsList.find(a => a.id === id);
    if (achievement && value >= achievement.requirement && !achievements.includes(id)) {
      setAchievements([...achievements, id]);
      setTimeout(() => alert(`🎉 Achievement Unlocked: ${achievement.name} ${achievement.icon}`), 100);
    }
  };

  const addTodo = () => {
    if (input.trim()) {
      const emojis = emojiSets[emojiSet];
      setTodos([...todos, {
        id: Date.now(),
        text: input,
        completed: false,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        category: category === 'all' ? 'selfcare' : category,
        priority,
        dueDate,
        notes,
        subtasks: [],
        createdAt: new Date().toISOString()
      }]);
      setInput('');
      setNotes('');
      setDueDate('');
      setPriority('normal');
    }
  };

  const toggleTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo.completed) {
      const today = new Date().toDateString();
      if (lastCompleted === today) {
        setStreak(streak + 1);
        checkAchievement('streak3', streak + 1);
        checkAchievement('streak7', streak + 1);
      } else if (lastCompleted !== today) {
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (lastCompleted === yesterday) {
          setStreak(streak + 1);
        } else {
          setStreak(1);
        }
      }
      setLastCompleted(today);
      
      const xpGain = priority === 'urgent' ? 30 : priority === 'high' ? 20 : 10;
      setXp(xp + xpGain);
      triggerConfetti();
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
      
      const completedCount = todos.filter(t => t.completed).length + 1;
      checkAchievement('first', completedCount);
      checkAchievement('tasks10', completedCount);
      checkAchievement('tasks50', completedCount);
    }
    
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const addSubtask = (todoId, subtaskText) => {
    setTodos(todos.map(todo =>
      todo.id === todoId
        ? { ...todo, subtasks: [...todo.subtasks, { id: Date.now(), text: subtaskText, completed: false }] }
        : todo
    ));
  };

  const toggleSubtask = (todoId, subtaskId) => {
    setTodos(todos.map(todo =>
      todo.id === todoId
        ? {
            ...todo,
            subtasks: todo.subtasks.map(st =>
              st.id === subtaskId ? { ...st, completed: !st.completed } : st
            )
          }
        : todo
    ));
  };

  const getPriorityStyles = (p) => {
    if (p === 'urgent') return 'border-red-400 bg-red-50';
    if (p === 'high') return 'border-orange-400 bg-orange-50';
    return 'border-blue-200 bg-white';
  };

  const filteredTodos = todos.filter(todo => {
    const statusMatch = filter === 'all' || (filter === 'active' && !todo.completed) || (filter === 'completed' && todo.completed);
    const categoryMatch = category === 'all' || todo.category === category;
    return statusMatch && categoryMatch;
  });

  const exportToPDF = () => {
    const content = filteredTodos.map(t => 
      `${t.completed ? '✓' : '○'} ${t.emoji} ${t.text} [${categories[t.category].name}]`
    ).join('\n');
    // Create a downloadable text file
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sparkle-todo-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareProgress = () => {
    const completed = todos.filter(t => t.completed).length;
    const text = `✨ I completed ${completed} tasks today! Level ${level} 🌟 Streak: ${streak} days 🔥\n\n#SparkleToDo #ProductivityQueen`;
  
    // Use Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: 'My Sparkle To-Do Progress',
        text: text
      }).catch(err => console.log('Share cancelled'));
    } else {
      navigator.clipboard.writeText(text).then(() => {
        alert('✨ Copied to clipboard! Paste it anywhere to share! 💕');
      });
    }
  };
  const currentTheme = themes[theme];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">✨</div>
          <p className="text-2xl font-bold text-purple-400">Loading your sparkles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.bg} p-4 sm:p-8 relative overflow-hidden`}>
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: '2s'
              }}
            >
              {['✨', '💕', '⭐', '🌟', '💖', '🎀'][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header with Stats */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="text-pink-400" size={32} />
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
              Sparkle To-Do Ultimate
            </h1>
            <Star className="text-yellow-300 fill-yellow-300" size={32} />
          </div>
          <p className="text-purple-400 text-sm mb-4">{quote}</p>
          
          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            <div className={`bg-gradient-to-r ${currentTheme.accent} text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2`}>
              <Zap size={16} /> Level {level}
            </div>
            <div className="bg-white/80 px-4 py-2 rounded-full font-semibold flex items-center gap-2">
              <Trophy className="text-yellow-500" size={16} /> {xp} XP
            </div>
            <div className="bg-white/80 px-4 py-2 rounded-full font-semibold flex items-center gap-2">
              🔥 {streak} Day Streak
            </div>
            <div className="bg-white/80 px-4 py-2 rounded-full font-semibold flex items-center gap-2">
              <Gift className="text-pink-500" size={16} /> {achievements.length}/{achievementsList.length}
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="bg-white/60 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${currentTheme.accent} transition-all duration-500`}
                style={{ width: `${(xp % (level * 100)) / (level * 100) * 100}%` }}
              />
            </div>
            <p className="text-xs text-purple-400 mt-1">{xp % (level * 100)}/{level * 100} XP to Level {level + 1}</p>
          </div>
        </div>

        {/* Settings Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`bg-white/80 p-2 rounded-full hover:bg-white transition-all`}
          >
            <Settings className="text-purple-400" size={20} />
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className={`bg-white/90 backdrop-blur-sm rounded-3xl p-6 mb-6 border-4 ${currentTheme.border}`}>
            <h3 className="text-xl font-bold text-purple-600 mb-4">⚙️ Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-purple-600 mb-2">Theme</label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(themes).map(t => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`px-4 py-2 rounded-full capitalize ${theme === t ? `bg-gradient-to-r ${themes[t].accent} text-white` : 'bg-gray-200'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-purple-600 mb-2">Emoji Set</label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(emojiSets).map(e => (
                    <button
                      key={e}
                      onClick={() => setEmojiSet(e)}
                      className={`px-4 py-2 rounded-full capitalize ${emojiSet === e ? `bg-gradient-to-r ${currentTheme.accent} text-white` : 'bg-gray-200'}`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Input Card */}
        <div className={`bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-6 mb-6 border-4 ${currentTheme.border}`}>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                placeholder="Add a cute task... 🌸"
                className="flex-1 px-4 py-3 rounded-full border-2 border-purple-200 focus:border-pink-300 focus:outline-none text-gray-700 bg-white"
              />
              <button
                onClick={addTodo}
                className={`bg-gradient-to-r ${currentTheme.accent} text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 flex items-center gap-2 font-semibold`}
              >
                <Plus size={20} />
                Add
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 rounded-full border-2 border-purple-200 focus:outline-none text-gray-700"
              >
                <option value="all">All Categories</option>
                {Object.entries(categories).map(([key, cat]) => (
                  <option key={key} value={key}>{cat.emoji} {cat.name}</option>
                ))}
              </select>
              
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="px-4 py-2 rounded-full border-2 border-purple-200 focus:outline-none text-gray-700"
              >
                <option value="normal">Normal</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
              
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="px-4 py-2 rounded-full border-2 border-purple-200 focus:outline-none text-gray-700"
              />
              
              <button
                onClick={shareProgress}
                className="bg-purple-200 px-4 py-2 rounded-full hover:bg-purple-300 transition-all flex items-center justify-center gap-2"
              >
                <Share2 size={16} /> Share
              </button>
            </div>
            
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes... ✏️"
              className="w-full px-4 py-2 rounded-full border-2 border-purple-200 focus:border-pink-300 focus:outline-none text-gray-700 bg-white"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === f
                  ? `bg-gradient-to-r ${currentTheme.accent} text-white shadow-md`
                  : 'bg-white/70 text-purple-400 hover:bg-white/90'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
          <button
            onClick={exportToPDF}
            className="bg-white/70 px-6 py-2 rounded-full font-semibold hover:bg-white/90 transition-all flex items-center gap-2"
          >
            <Download size={16} /> Export
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <button
            onClick={() => setCategory('all')}
            className={`px-4 py-2 rounded-full ${category === 'all' ? 'bg-purple-300 text-white' : 'bg-white/70'}`}
          >
            All
          </button>
          {Object.entries(categories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              className={`px-4 py-2 rounded-full ${category === key ? `bg-${cat.color}-300 text-white` : 'bg-white/70'}`}
            >
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className={`bg-white/60 backdrop-blur-sm rounded-3xl p-12 text-center border-4 border-dashed ${currentTheme.border}`}>
              <div className="text-6xl mb-4">🌈</div>
              <p className="text-purple-400 text-lg font-semibold">
                {filter === 'completed' ? 'No completed tasks yet! Keep going! 💪' : 'No tasks yet! Time to add some sparkle! ✨'}
              </p>
            </div>
          ) : (
            filteredTodos.map((todo) => {
              const cat = categories[todo.category];
              const isExpanded = expandedTodo === todo.id;
              
              return (
                <div
                  key={todo.id}
                  className={`bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border-2 ${
                    todo.completed ? 'border-green-300' : getPriorityStyles(todo.priority)
                  } group`}
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        todo.completed
                          ? 'bg-gradient-to-r from-green-300 to-teal-300 border-green-400'
                          : 'border-pink-300 hover:border-pink-400'
                      }`}
                    >
                      {todo.completed && <Heart className="text-white fill-white" size={16} />}
                    </button>
                    
                    <span className="text-2xl">{todo.emoji}</span>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-gray-700 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                          {todo.text}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full bg-${cat.color}-100 text-${cat.color}-600`}>
                          {cat.emoji} {cat.name}
                        </span>
                        {todo.priority !== 'normal' && (
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            todo.priority === 'urgent' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                          }`}>
                            {todo.priority === 'urgent' ? '🔥 Urgent' : '⚡ High'}
                          </span>
                        )}
                        {todo.dueDate && (
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600 flex items-center gap-1">
                            <Calendar size={12} /> {new Date(todo.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setExpandedTodo(isExpanded ? null : todo.id)}
                      className="text-purple-400 hover:text-purple-600"
                    >
                      {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </button>
                    
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-pink-400 hover:text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  
                  {isExpanded && (
                    <div className="mt-4 pl-12 space-y-3 border-t-2 border-purple-100 pt-3">
                      {todo.notes && (
                        <p className="text-sm text-gray-600 italic">📝 {todo.notes}</p>
                      )}
                      
                      <div>
                        <p className="text-sm font-semibold text-purple-600 mb-2">Subtasks:</p>
                        {todo.subtasks.map(st => (
                          <div key={st.id} className="flex items-center gap-2 mb-1">
                            <button
                              onClick={() => toggleSubtask(todo.id, st.id)}
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                st.completed ? 'bg-green-200 border-green-400' : 'border-purple-300'
                              }`}
                            >
                              {st.completed && <Check size={12} />}
                            </button>
                            <span className={`text-sm ${st.completed ? 'line-through text-gray-400' : ''}`}>
                              {st.text}
                            </span>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const subtask = prompt('Add subtask:');
                            if (subtask) addSubtask(todo.id, subtask);
                          }}
                          className="text-xs text-purple-400 hover:text-purple-600 mt-2"
                        >
                          + Add Subtask
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Stats Footer */}
        {todos.length > 0 && (
          <div className="mt-6 text-center space-y-3">
            <div className="bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 inline-block border-2 border-purple-200">
              <span className="text-purple-400 font-semibold">
                ✨ {todos.filter(t => t.completed).length} of {todos.length} completed ✨
              </span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {achievementsList.map(achievement => {
                const unlocked = achievements.includes(achievement.id);
                return (
                  <div
                    key={achievement.id}
                    className={`px-3 py-2 rounded-lg ${
                      unlocked ? 'bg-gradient-to-r from-yellow-200 to-orange-200' : 'bg-gray-200 opacity-50'
                    }`}
                    title={achievement.desc}
                  >
                    <span className="text-2xl">{achievement.icon}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Floating Decorations */}
      <div className="fixed top-10 left-10 text-4xl animate-bounce pointer-events-none">🦋</div>
      <div className="fixed top-20 right-20 text-3xl animate-pulse pointer-events-none">🌸</div>
      <div className="fixed bottom-20 left-20 text-4xl animate-bounce pointer-events-none" style={{ animationDelay: '1s' }}>🎀</div>
      <div className="fixed bottom-10 right-10 text-3xl animate-pulse pointer-events-none" style={{ animationDelay: '0.5s' }}>⭐</div>
    </div>
  );
}