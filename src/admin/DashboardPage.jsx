import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MoreHorizontal, Plus, X } from "lucide-react";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [users, setUsers] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editData, setEditData] = useState(null);
  const fileInputRef = useRef(null);
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  // Redirect to login if token missing
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchQuizzes();
    fetchUsers();
  }, [token, navigate]);

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/admin/quizzes", { headers });
      if (res.data.success) setQuizzes(res.data.quizzes);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/admin/users", { headers });
      if (res.data.success) setUsers(res.data.users);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (quizId, qIndex) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    try {
      await axios.delete(
        `http://localhost:8000/api/admin/quizzes/${quizId}/questions/${qIndex}`,
        { headers }
      );
      setQuizzes((prev) =>
        prev.map((quiz) =>
          quiz._id === quizId
            ? { ...quiz, questions: quiz.questions.filter((_, i) => i !== qIndex) }
            : quiz
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedQuizId) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("quizId", selectedQuizId);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/admin/quizzes/upload-csv",
        formData,
        { headers: { ...headers, "Content-Type": "multipart/form-data" } }
      );
      if (res.data.success) {
        setQuizzes((prev) =>
          prev.map((quiz) => (quiz._id === selectedQuizId ? res.data.quiz : quiz))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (quizId, qIndex, question) => {
    setEditData({ quizId, qIndex, ...question });
    setOpenMenuId(null);
  };

  const handleUpdate = async () => {
    try {
      const { quizId, qIndex, q, options, correctIndex } = editData;
      const res = await axios.put(
        `http://localhost:8000/api/admin/quizzes/${quizId}/questions/${qIndex}`,
        { q, options, correctIndex },
        { headers }
      );
      if (res.data.success) {
        await fetchQuizzes();
        setEditData(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalQuestions = quizzes.reduce((acc, quiz) => acc + quiz.questions.length, 0);
  const totalUsers = users.length;

  const recentQuestions = quizzes
    .flatMap((quiz) =>
      quiz.questions.map((q, idx) => ({
        id: `${quiz._id}-${idx}`,
        quizId: quiz._id?.slice(-4).toUpperCase() || "QZ",
        q: q.q,
        opts: q.options.map((o, i) => `${String.fromCharCode(65 + i)}. ${o}`).join(", "),
        ans: String.fromCharCode(65 + q.correctIndex),
        quizIdFull: quiz._id,
        qIndex: idx,
        options: q.options,
        correctIndex: q.correctIndex,
      }))
    )
    .slice(0, 5);

  return (
    <div className="overflow-x-auto text-white p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-sm text-gray-400">
            Welcome back! Here’s what’s happening with your quizzes.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => {
              if (!quizzes.length) return;
              setSelectedQuizId(quizzes[0]._id);
              fileInputRef.current.click();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black hover:bg-gray-200"
          >
            <Plus size={16} /> Import CSV
          </button>
          <input
            type="file"
            ref={fileInputRef}
            accept=".csv,.json"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            onClick={() => navigate("/admin/add-quiz")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black hover:bg-gray-200"
          >
            <Plus size={16} /> Add New Quiz
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#1f1f1f] p-6 rounded-lg">
          <p className="text-gray-400">Total Questions</p>
          <h3 className="text-2xl font-bold">{totalQuestions}</h3>
        </div>
        <div className="bg-[#1f1f1f] p-6 rounded-lg">
          <p className="text-gray-400">Users</p>
          <h3 className="text-2xl font-bold">{totalUsers}</h3>
        </div>
      </div>

      {/* Recent Questions Table */}
      <div className="bg-[#111] p-6 rounded-lg overflow-x-auto">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <h3 className="text-lg font-semibold">Recent Questions</h3>
          <button
            onClick={() => navigate("/admin/quizzes")}
            className="px-4 py-1 rounded-full text-sm font-medium bg-white text-black hover:bg-gray-200"
          >
            View All
          </button>
        </div>

        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-neutral-800 text-gray-300">
              <th className="p-3">Quiz ID</th>
              <th className="p-3">Question</th>
              <th className="p-3">Options</th>
              <th className="p-3">Answer</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {recentQuestions.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-3 text-gray-400 text-center">
                  No recent questions
                </td>
              </tr>
            ) : (
              recentQuestions.map((row) => (
                <tr key={row.id} className="border-b border-gray-700 hover:bg-neutral-800/50">
                  <td className="p-3">{row.quizId}</td>
                  <td className="p-3">{row.q}</td>
                  <td className="p-3 truncate max-w-[200px]">{row.opts}</td>
                  <td className="p-3">{row.ans}</td>
                  <td className="p-3 text-center relative">
                    <button
                      className="p-1 hover:bg-neutral-700 rounded-full"
                      onClick={() =>
                        setOpenMenuId(openMenuId === row.id ? null : row.id)
                      }
                    >
                      <MoreHorizontal size={18} />
                    </button>
                    {openMenuId === row.id && (
                      <div className="absolute right-8 mt-2 w-32 bg-[#1f1f1f] border border-gray-700 rounded-lg shadow-lg z-50">
                        <button
                          onClick={() =>
                            handleEdit(row.quizIdFull, row.qIndex, {
                              q: row.q,
                              options: row.options,
                              correctIndex: row.correctIndex,
                            })
                          }
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(row.quizIdFull, row.qIndex);
                            setOpenMenuId(null);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-700 text-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 p-4 mt-12">
          <div className="bg-[#1f1f1f] p-6 rounded-lg w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Question</h2>
              <button onClick={() => setEditData(null)}>
                <X className="text-gray-400" />
              </button>
            </div>

            <textarea
              value={editData.q}
              onChange={(e) => setEditData({ ...editData, q: e.target.value })}
              className="w-full p-2 rounded bg-[#111] border border-gray-700 mb-4 resize-none text-white"
              rows={3}
            />

            {editData.options.map((opt, i) => (
              <input
                key={i}
                type="text"
                value={opt}
                onChange={(e) => {
                  const newOptions = [...editData.options];
                  newOptions[i] = e.target.value;
                  setEditData({ ...editData, options: newOptions });
                }}
                className="w-full p-2 rounded bg-[#111] border border-gray-700 mb-2 text-white"
              />
            ))}

            <div className="mb-4 flex flex-wrap gap-4">
              <p className="text-sm">Correct Answer:</p>
              {editData.options.map((_, i) => (
                <label key={i} className="flex items-center gap-1 cursor-pointer text-white">
                  <input
                    type="radio"
                    checked={editData.correctIndex === i}
                    onChange={() => setEditData({ ...editData, correctIndex: i })}
                  />
                  {String.fromCharCode(65 + i)}
                </label>
              ))}
            </div>

            <button
              onClick={handleUpdate}
              className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
