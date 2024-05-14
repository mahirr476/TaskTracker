export const calculateKPIs = (userId, tasks, totalUtilization) => {
    const userTasks = tasks.filter(task => task.team.includes(userId) && !task.isTrashed);
    const completedTasks = userTasks.filter(task => task.stage === "completed");
    const overdueTasks = userTasks.filter(task => new Date(task.endDate) < new Date() && task.stage !== "completed");
  
    const taskCompletionRate = completedTasks.length / (userTasks.length || 1);
    const timeliness = 1 - (overdueTasks.length / (userTasks.length || 1));
  
    // const userActivities = totalUtilization.filter(activity => user.by === userId);
    const engagementLevel = totalUtilization;
  
    return {
      numberOfTasks: userTasks.length,
      completedTasks: completedTasks.length,
      taskCompletionRate: taskCompletionRate * 100,
      timeliness: timeliness * 100,
      engagementLevel,
    };
  };
  
export const calculateOverallGrade = ({ taskCompletionRate, timeliness, engagementLevel }) => {
    const weightedTaskCompletion = taskCompletionRate * 0.5; // 50% weight
    const weightedTimeliness = timeliness * 0.3; // 30% weight
    const weightedEngagement = engagementLevel * 0.2; // 20% weight
    return Math.round(weightedTaskCompletion + weightedTimeliness + weightedEngagement);
  };
  