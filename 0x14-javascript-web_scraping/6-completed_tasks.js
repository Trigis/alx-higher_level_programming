onst request = require('request');

const apiUrl = process.argv[2];

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }

  const tasks = JSON.parse(body);

  const completedTasks = tasks.filter((task) => task.completed);

  const completedTasksByUser = completedTasks.reduce((acc, task) => {
    const userId = task.userId;
    if (acc[userId] === undefined) {
      acc[userId] = 1;
    } else {
      acc[userId]++;
    }
    return acc;
  }, {});

  console.log(completedTasksByUser);
});
Explanation:

We import the request module.
We get the API URL from the first command-line argument.
We make a request to the API URL using request module and get the response in the body variable.
We parse the response JSON into an array of task objects.
We filter the tasks that are completed.
We use the reduce() method to count the completed tasks by user id. We initialize an empty object {} as the initial value of the accumulator (acc). For each task, we check if the user id is already in the accumulator. If it is, we increment the count. If not, we initialize the count to 1.
We print the completed tasks by user id as a JSON object.





