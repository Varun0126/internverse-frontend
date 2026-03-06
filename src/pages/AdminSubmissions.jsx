import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function AdminSubmissions(){

  const [submissions,setSubmissions] = useState([]);
  const navigate = useNavigate();

 const fetchSubmissions = async () => {
  try {
    const res = await API.get("/submissions");
    // ✅ ensure it's always an array
    const data = Array.isArray(res.data) ? res.data : [];
    setSubmissions(data);
  } catch (err) {
    console.log(err);
  }
};

  useEffect(()=>{
    fetchSubmissions();
  },[]);

  return(

    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4">
        Intern Submissions
      </h2>

      <table className="w-full border">

        <thead className="bg-gray-200">

          <tr>
            <th className="border p-2">Intern</th>
            <th className="border p-2">Task</th>
            <th className="border p-2">Github</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Evaluate</th>
          </tr>

        </thead>

        <tbody>

          {submissions.map((s)=>(
            <tr key={s.id}>

              <td className="border p-2">
                {s.intern?.name || "Intern"}
              </td>

              <td className="border p-2">
                {s.task?.title}
              </td>

              <td className="border p-2">
                <a href={s.githubLink} target="_blank" rel ="noreferrrer">
                  View
                </a>
              </td>

              <td className="border p-2 font-bold text-blue-600">
                {s.status}
              </td>

              <td className="border p-2">

                <button
                  onClick={()=>navigate(`/evaluate/${s.id}`)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Evaluate
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>

  )

}


export default AdminSubmissions;
