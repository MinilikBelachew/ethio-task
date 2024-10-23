import TaskManagement from "../comonents/task-manager";

async function FetchTaskData() {
  try {
    const apiResponse = await fetch("http://localhost:3000/api/get-tasks", {
      method: "GET",
      cache: "no-store",
    });
    const result = await apiResponse.json();
    return result?.data;
  } catch (error) {
    throw new Error(error);
  }
}

async function Task() {
  const fetcheddata = await FetchTaskData();
  console.log(fetcheddata);

  return <TaskManagement fetcheddata={fetcheddata} />;
}
export default Task;
