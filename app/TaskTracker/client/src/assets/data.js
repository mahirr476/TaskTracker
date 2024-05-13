

export const chartData = [
  {
    name: "high",
    total: 2400,
  },
  {
    name: "medium",
    total: 2210,

  },
  {
    name: "normal",
    total: 3210,

  },
  {
    name: "low",
    total: 2290,

  },
];

// Projects
export const projects = [
  {
      pid: "p1",
      projectName: "Redesign Website",
      description: "lorem Ipsum Is angry",
      dueDate: "2024-07-20",
      teamMembers: [
          "65c3176a0fd860f958baa099", // Emily Wilson
          "65c317360fd860f958baa08e", // Alex Johnson
      ],
      numberOfTasks: 12,
      isActive: true,
  },
  {
      pid: "p2",
      projectName: "API Development for Mobile",
      description: "lorem Ipsum Is annoying",
      dueDate: "2024-08-15",
      teamMembers: [
          "65c30b96e639681a13def0b5", // Jane Smith
          "65c202d4aa62f32ffd1303cc", // Codewave Asante
      ],
      numberOfTasks: 9,
      isActive: true,
  },
  {
      pid: "p3",
      projectName: "Launch Marketing Campaign",
      description: "lorem Ipsum Is stupid",
      dueDate: "2024-09-01",
      teamMembers: [
          "65c5f27fb5204a81bde86833", // New User
          "65c202d4aa62f32ffd1303cc", // Codewave Asante
      ],
      numberOfTasks: 1,
      isActive: true,
  }
];


export const users = [
  {
    _id: "65c5f27fb5204a81bde86833",
    name: "New User",
    title: "Designer",
    email: "jane.smith@example.com",
    role: "Developer",
    isActive: false,
    createdAt: "2024-02-09T09:38:07.765Z",
    pcid: 1,
  },
  {
    _id: "65c3176a0fd860f958baa099",
    name: "Emily Wilson",
    title: "Data Analyst",
    email: "jane.smith@example.com",
    role: "Analyst",
    isActive: true,
    createdAt: "2024-02-07T05:38:50.816Z",
    pcid: 4,

  },
  {
    _id: "65c317360fd860f958baa08e",
    name: "Alex Johnson",
    title: "UX Designer",
    role: "Designer",
    email: "jane.smith@example.com",
    isActive: true,
    createdAt: "2024-02-07T05:37:58.862Z",
    pcid: 6,

  },
  {
    _id: "65c30b96e639681a13def0b5",
    name: "Jane Smith",
    title: "Product Manager",
    email: "jane.smith@example.com",
    role: "Manager",
    isActive: false,
    createdAt: "2024-02-07T04:48:22.519Z",
    pcid: 6,

  },
  {
    _id: "65c202d4aa62f32ffd1303cc",
    name: "Codewave Asante",
    title: "Administrator",
    email: "jane.smith@example.com",
    role: "Admin",
    createdAt: "2024-02-06T09:58:44.794Z",
    isActive: true,
    pcid: 6,

  },
  {
    _id: "65c27a0e18c0a1b750ad5cad",
    name: "John Doe",
    title: "Developer",
    email: "jane.smith@example.com",
    role: "Cyber Security",
    createdAt: "2024-02-06T09:58:44.794Z",
    isActive: false,
    pcid: 4,

  },
]

export const tasks = [
  {
    _id: "65c5f12ab5204a81bde866a9",
    title: "Test task",
    description: "Task Description",
    startDate: "2024-05-10",
    endDate: "2024-05-20",
    duration: 10, // Duration in days
    dependencies: ["65c5d547660756f6fd453a7a"], // Array of task IDs that this task depends on
    date: "2024-02-09T00:00:00.000Z",
    date: "2024-02-09T00:00:00.000Z",
    priority: "high",
    stage: "todo",
    assets: [
      "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707471138863original-a005132062ca5bafc505c4c74f0e1865.jpg?alt=media&token=55f909f2-7f05-42f3-af4f-dc7f87cdea1d",
      "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707471144712PsZch9E1_400x400.jpg?alt=media&token=7ce62c7e-c240-4032-83c6-bb6c9cdc0d4b",
    ],
    team: [
        "65c202d4aa62f32ffd1303cc",
        "65c30b96e639681a13def0b5",
        "65c317360fd860f958baa08e",
      ],
    isTrashed: false,
    activities: [],
    subTasks: [
      {
        title: "Task manager youtube tutorial",
        date: "2024-02-09T00:00:00.000Z",
        tag: "tutorial",
        _id: "65c5f153b5204a81bde866c8",
      },
    ],
    createdAt: "2024-02-09T09:32:26.574Z",
    updatedAt: "2024-02-09T09:36:53.339Z",
    __v: 1, // versioning
  },
  {
    _id: "65c5d547660756f6fd453a7a",
    title: "Duplicate - Duplicate - Review Code Changes",
    description: "Task Description",
    startDate: "2024-05-10",
    endDate: "2024-05-20",
    duration: 10, // Duration in days
    dependencies: ["65c5d547660756f6fd453a7a"], // Array of task IDs that this task depends on
    date: "2024-02-09T00:00:00.000Z",
    pid: "p3",
    date: "2024-02-09T00:00:00.000Z",
    priority: "medium",
    stage: "in progress",
    assets: [],
    team: [
      "65c202d4aa62f32ffd1303cc",
      "65c30b96e639681a13def0b5",
      "65c317360fd860f958baa08e",
    ],
    isTrashed: false,
    activities: [
      {
        type: "started",
        activity: "Project started",
        date: "2024-02-09T09:16:56.623Z",
        by: "65c202d4aa62f32ffd1303cc",
        _id: "65c5f18bb5204a81bde866d1",
      },
      {
        type: "commented",
        activity: "i like coding!!",
        date: "2024-02-09T09:16:56.623Z",
        by: "65c202d4aa62f32ffd1303cc",
        _id: "65c5f19eb5204a81bde866dd",
      },
      {
        type: "bug",
        activity: "bug found",
        date: "2024-02-09T09:16:56.623Z",
        by: "65c202d4aa62f32ffd1303cc",
        _id: "65c5f1abb5204a81bde866eb",
      },
    ],
    subTasks: [
      {
        title: "Blog App Admin Dashboard",
        date: "2024-02-08T00:00:00.000Z",
        tag: "Website App",
        _id: "65c3535476ed5c48f9440973",
      },
    ],
    createdAt: "2024-02-09T07:33:27.590Z",
    updatedAt: "2024-02-09T09:36:10.386Z",
    __v: 4,
  },
  {
    _id: "65c46026af6ec0118be9407a",
    title: "Website Project Proposal Review",
    description: "Task Description",
    startDate: "2024-05-10",
    endDate: "2024-05-20",
    duration: 10, // Duration in days
    dependencies: ["65c5d547660756f6fd453a7a"], // Array of task IDs that this task depends on
    date: "2024-02-09T00:00:00.000Z",
    pid: "p3",
    date: "2024-02-07T00:00:00.000Z",
    priority: "high",
    stage: "todo",
    assets: [
      "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707410130023hand-holding-writing-checklist-application-form-document-clipboard-white-background-3d-illustration.jpg?alt=media&token=08de4848-517f-48ca-a9b4-624744d5ddb0",
      "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707412301523image_processing20220706-26930-ktfgon.png?alt=media&token=6cd185c1-9fc3-4f52-bb0b-0d4a29e65b85",
      "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707412306237image_processing20220706-11953-1f826f4.png?alt=media&token=7270475f-a994-41fd-8ae6-62e00f72b0b3",
    ],
    team: [
      "65c202d4aa62f32ffd1303cc",
      "65c30b96e639681a13def0b5",
      "65c317360fd860f958baa08e",
    ],
    isTrashed: false,
    activities: [
      {
        type: "assigned",
        activity: "Test activity. Let's go!!!",
        date: "2024-02-08T17:55:34.353Z",
        by: "65c202d4aa62f32ffd1303cc",
        _id: "65c5188be1585cfa650b79c4",
      },
      {
        type: "in progress",
        activity: "Project is progress. Hiope to fin=ish soon!!",
        date: "2024-02-08T17:55:34.353Z",
        by: "65c202d4aa62f32ffd1303cc",
        _id: "65c518dce1585cfa650b79da",
      },
      {
        type: "bug",
        activity: "Bug found in the code. Kindly check and fixed ASAP!!!",
        date: "2024-02-08T18:13:14.717Z",
        by: "65c202d4aa62f32ffd1303cc",
        _id: "65c51a5e8064df97d208b392",
      },
      {
        type: "commented",
        activity: "Nice work. Let's finished hard!!!",
        date: "2024-02-08T18:13:14.717Z",
        by: "65c202d4aa62f32ffd1303cc",
        _id: "65c51af08064df97d208b3b0",
      },
    ],
    subTasks: [
      {
        title: "Blog App Dashboard",
        date: "2024-02-06T00:00:00.000Z",
        tag: "Design",
        _id: "65c352e776ed5c48f944095c",
      },
      {
        title: "Blog App Admin Dashboard",
        date: "2024-02-07T00:00:00.000Z",
        tag: "Design",
        _id: "65c3531476ed5c48f9440965",
      },
    ],
    createdAt: "2024-02-08T05:01:26.983Z",
    updatedAt: "2024-02-09T06:51:15.005Z",
    __v: 8,
  },
  {
    _id: "65c45fb6af6ec0118be94052",
    title: "Task Manager Youtube Video",
    description: "Task Description",
    startDate: "2024-05-10",
    endDate: "2024-05-20",
    duration: 10, // Duration in days
    dependencies: ["65c5d547660756f6fd453a7a"], // Array of task IDs that this task depends on
    date: "2024-02-09T00:00:00.000Z",
    pid: "p3",
    date: "2024-02-11T00:00:00.000Z",
    priority: "medium",
    stage: "completed",
    assets: [
      "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707412043078report.jpg?alt=media&token=41d02b42-c25c-4fbb-90a9-340a45f4bbe1",
      "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707412052287hand-holding-writing-checklist-application-form-document-clipboard-white-background-3d-illustration.jpg?alt=media&token=98b360b4-954c-47e3-8283-8228a54a327c",
    ],
    team: [
      "65c202d4aa62f32ffd1303cc",
      "65c30b96e639681a13def0b5",
      "65c317360fd860f958baa08e",
    ],
    isTrashed: false,
    activities: [
      {
        type: "started",
        activity: "Project completed!!",
        date: "2024-02-08T18:13:14.717Z",
        by: { _id: "65c202d4aa62f32ffd1303cc", name: "Codewave" },
        _id: "65c51b998064dfd208b3f9",
      },
      {
        type: "commented",
        activity: "Project completed!!",
        date: "2024-02-08T18:13:14.717Z",
        by: { _id: "65c202d4aa62f32ffd1303cc", name: "Codewave" },
        _id: "65c51b98064df97d208b3f9",
      },
      {
        type: "completed",
        activity: "Project completed!!",
        date: "2024-02-08T18:13:14.717Z",
        by: { _id: "65c202d4aa62f32ffd1303cc", name: "Codewave" },
        _id: "65c51b998064df97d208b3f9",
      },
    ],
    subTasks: [
      {
        title: "Blog App Admin Dashboard",
        date: "2024-02-08T00:00:00.000Z",
        tag: "Website App",
        _id: "65c3535476ed5c48f9440973",
      },
    ],
    createdAt: "2024-02-08T04:59:34.826Z",
    updatedAt: "2024-02-09T06:51:15.005Z",
    __v: 3,
  },
  {
    _id: "65c4586f0548279012f8c256",
    title: "Bug Fixing",
    description: "Task Description",
    startDate: "2024-05-10",
    endDate: "2024-05-20",
    duration: 10, // Duration in days
    dependencies: ["65c5d547660756f6fd453a7a"], // Array of task IDs that this task depends on
    date: "2024-02-09T00:00:00.000Z",
    pid: "p2",
    date: "2024-02-07T00:00:00.000Z",
    priority: "high",
    stage: "todo",
    assets: [
      "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707412457946Wed%20Dev%20Course.png?alt=media&token=028416bf-88c6-4738-9a5a-d90e6d53b202",
      "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707412466672original-380755132e03e80a9fa3ef1203219cf3.png?alt=media&token=10d96b0d-feea-4627-aa1e-9b8f87cf7500",
      "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707412469358original-a738b8d0cbced29ae8609072d006fbcb.jpg?alt=media&token=9a6cc56f-63ff-4405-b978-d962c3c1f1d0",
      "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707412472346cosial.png?alt=media&token=b6e427b3-bc36-4fa2-a8f9-438f9ebf93e2",
      "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707412478590original-a005132062ca5bafc505c4c74f0e1865.jpg?alt=media&token=e81047bd-a1e2-49e5-85f5-feda31c423f2",
    ],
    team: [
      "65c202d4aa62f32ffd1303cc",
      "65c30b96e639681a13def0b5",
      "65c317360fd860f958baa08e",
    ],
    isTrashed: false,
    activities: [
      {
        type: "commented",
        activity: "Great!!!",
        date: "2024-02-08T18:13:14.717Z",
        by: "65c202d4aa62f32ffd1303cc",
        _id: "65c51b678064df97d208b3d6",
      },
    ],
    subTasks: [
      {
        title: "Check Login code and fix bugs asap",
        date: "2024-02-08T00:00:00.000Z",
        tag: "Bug Fixing",
        _id: "65c46074af6ec0118be94094",
      },
    ],
    createdAt: "2024-02-08T04:28:31.966Z",
    updatedAt: "2024-02-09T06:51:15.005Z",
    __v: 3,
  },
  {
    _id: "65c3c457fb9c6768ce4bc31a",
    title: "Duplicate - Website Project Proposal",
    description: "Task Description",
    startDate: "2024-05-10",
    endDate: "2024-05-20",
    duration: 10, // Duration in days
    dependencies: ["65c5d547660756f6fd453a7a"], // Array of task IDs that this task depends on
    date: "2024-02-09T00:00:00.000Z",
    pid: "p1",
    date: "2024-02-07T17:55:13.218Z",
    priority: "high",
    stage: "todo",
    assets: [],
    team: [
      "65c202d4aa62f32ffd1303cc",
      "65c30b96e639681a13def0b5",
      "65c317360fd860f958baa08e",
    ],
    isTrashed: false,
    activities: [],
    subTasks: [
      {
        title: "Blog App Dashboard",
        date: "2024-02-06T00:00:00.000Z",
        tag: "Design",
        _id: "65c352e776ed5c48f944095c",
      },
      {
        title: "Blog App Admin Dashboard",
        date: "2024-02-07T00:00:00.000Z",
        tag: "Design",
        _id: "65c3531476ed5c48f9440965",
      },
    ],
    createdAt: "2024-02-07T17:56:39.969Z",
    updatedAt: "2024-02-09T06:51:15.005Z",
    __v: 1,
  },
  {
    _id: "65c3c439fb9c6768ce4bc308",
    title: "Duplicate - Review Code Changes",
    description: "Task Description",
    startDate: "2024-05-10",
    endDate: "2024-05-20",
    duration: 10, // Duration in days
    dependencies: ["65c5d547660756f6fd453a7a"], // Array of task IDs that this task depends on
    date: "2024-02-09T00:00:00.000Z",
    pid: "p3",
    date: "2024-02-07T17:55:13.218Z",
    priority: "medium",
    stage: "in progress",
    assets: [],
    team: [
      "65c202d4aa62f32ffd1303cc",
      "65c30b96e639681a13def0b5",
      "65c317360fd860f958baa08e",
    ],
    isTrashed: false,
    activities: [],
    subTasks: [
      {
        title: "Blog App Admin Dashboard",
        date: "2024-02-08T00:00:00.000Z",
        tag: "Website App",
        _id: "65c3535476ed5c48f9440973",
      },
    ],
    createdAt: "2024-02-07T17:56:09.174Z",
    updatedAt: "2024-02-07T17:56:09.456Z",
    __v: 1,
  },
  {
    _id: "65c3c21f55ae9b2f7666e86c",
    title: "Duplicate - Website Project Proposal",
    description: "Task Description",
    startDate: "2024-05-10",
    endDate: "2024-05-20",
    duration: 10, // Duration in days
    dependencies: ["65c5d547660756f6fd453a7a"], // Array of task IDs that this task depends on
    date: "2024-02-09T00:00:00.000Z",
    pid: "p1",
    date: "2024-02-07T17:46:56.040Z",
    priority: "normal",
    stage: "todo",
    assets: [],
    team: [
      "65c202d4aa62f32ffd1303cc",
      "65c30b96e639681a13def0b5",
      "65c317360fd860f958baa08e",
    ],
    isTrashed: false,
    activities: [],
    subTasks: [
      {
        title: "Blog App Dashboard",
        date: "2024-02-06T00:00:00.000Z",
        tag: "Design",
        _id: "65c352e776ed5c48f944095c",
      },
      {
        title: "Blog App Admin Dashboard",
        date: "2024-02-07T00:00:00.000Z",
        tag: "Design",
        _id: "65c3531476ed5c48f9440965",
      },
    ],
    createdAt: "2024-02-07T17:47:11.560Z",
    updatedAt: "2024-02-07T17:47:11.972Z",
    __v: 1,
  },
  {
    _id: "65c352b376ed5c48f9440955",
    title: "Review Code Changes",
    description: "Task Description",
    startDate: "2024-05-10",
    endDate: "2024-05-20",
    duration: 10, // Duration in days
    dependencies: ["65c5d547660756f6fd453a7a"], // Array of task IDs that this task depends on
    date: "2024-02-09T00:00:00.000Z",
    pid: "p3",
    date: "2024-02-05T00:00:00.000Z",
    priority: "medium",
    stage: "in progress",
    assets: [],
    team: [
      "65c202d4aa62f32ffd1303cc",
      "65c30b96e639681a13def0b5",
      "65c317360fd860f958baa08e",
    ],
    isTrashed: false,
    activities: [],
    subTasks: [
      {
        title: "Blog App Admin Dashboard",
        date: "2024-02-08T00:00:00.000Z",
        tag: "Website App",
        _id: "65c3535476ed5c48f9440973",
      },
    ],
    createdAt: "2024-02-07T09:51:47.149Z",
    updatedAt: "2024-02-07T09:54:28.645Z",
    __v: 1,
  },
  {
    _id: "65c351b976ed5c48f9440947",
    title: "Website Project Proposal",
    description: "Task Description",
    startDate: "2024-05-10",
    endDate: "2024-05-20",
    duration: 10, // Duration in days
    dependencies: ["65c5d547660756f6fd453a7a"], // Array of task IDs that this task depends on
    date: "2024-02-09T00:00:00.000Z",
    pid: "p1",
    date: "2024-02-07T00:00:00.000Z",
    priority: "high",
    stage: "todo",
    assets: [],
    team: [
      "65c202d4aa62f32ffd1303cc",
      "65c30b96e639681a13def0b5",
      "65c317360fd860f958baa08e",
    ],
    isTrashed: false,
    activities: [],
    subTasks: [
      {
        title: "Blog App Dashboard",
        date: "2024-02-06T00:00:00.000Z",
        tag: "Design",
        _id: "65c352e776ed5c48f944095c",
      },
      {
        title: "Blog App Admin Dashboard",
        date: "2024-02-07T00:00:00.000Z",
        tag: "Design",
        _id: "65c3531476ed5c48f9440965",
      },
    ],
    createdAt: "2024-02-07T09:47:37.337Z",
    updatedAt: "2024-02-07T09:53:24.079Z",
    __v: 2,
  },
  {
    _id: "65c5f12ab5204a81bde866d4",
    title: "Final Project Integration",
    description: "Integrate all project modules and perform comprehensive testing.",
    startDate: "2024-06-01",
    endDate: "2024-06-15",
    dependencies: ["65c5d547660756f6fd453a7a", "65c46026af6ec0118be9407a"],
    date: "2024-06-01T00:00:00.000Z",
    priority: "high",
    stage: "in progress",
    assets: [],
    team: [
      "65c202d4aa62f32ffd1303cc",
      "65c30b96e639681a13def0b5",
      "65c317360fd860f958baa08e",
    ],
    isTrashed: false,
    activities: [],
    subTasks: [],
    createdAt: "2024-05-20T09:00:00.000Z",
    updatedAt: "2024-05-25T09:00:00.000Z",
    __v: 0,
  },
  {
    _id: "65c5d547660756f6fd453b7b",
    title: "Database Optimization",
    description: "Optimize database queries and schemas for better performance.",
    startDate: "2024-06-16",
    endDate: "2024-06-30",
    dependencies: ["65c5f12ab5204a81bde866d4", "65c46026af6ec0118be9407a"],
    date: "2024-06-16T00:00:00.000Z",
    priority: "medium",
    stage: "todo",
    assets: [],
    team: [
      "65c30b96e639681a13def0b5",
      "65c317360fd860f958baa08e",
    ],
    isTrashed: false,
    activities: [],
    subTasks: [],
    createdAt: "2024-05-25T10:00:00.000Z",
    updatedAt: "2024-05-30T10:00:00.000Z",
    __v: 0,
  },
  {
    _id: "65c46026af6ec0118be9408b",
    title: "User Interface Revamp",
    description: "Redesign the user interface to enhance user experience.",
    startDate: "2024-06-05",
    endDate: "2024-06-19",
    dependencies: ["65c5f12ab5204a81bde866d4", "65c5d547660756f6fd453b7b"],
    date: "2024-06-05T00:00:00.000Z",
    priority: "high",
    stage: "todo",
    assets: [],
    team: [
      "65c202d4aa62f32ffd1303cc",
      "65c30b96e639681a13def0b5",
    ],
    isTrashed: false,
    activities: [],
    subTasks: [],
    createdAt: "2024-05-25T11:00:00.000Z",
    updatedAt: "2024-05-30T11:00:00.000Z",
    __v: 0, 
  },
  {
    _id: "65c45fb6af6ec0118be94059",
    title: "API Development for New Modules",
    description: "Develop APIs for newly integrated modules.",
    startDate: "2024-06-10",
    endDate: "2024-06-24",
    dependencies: ["65c46026af6ec0118be9408b", "65c5d547660756f6fd453b7b"],
    date: "2024-06-10T00:00:00.000Z",
    priority: "medium",
    stage: "todo",
    assets: [],
    team: [
      "65c317360fd860f958baa08e",
    ],
    isTrashed: false,
    activities: [],
    subTasks: [],
    createdAt: "2024-05-30T12:00:00.000Z",
    updatedAt: "2024-05-35T12:00:00.000Z",
    __v: 0,
  }
];

export const TrashedTasks = [
  {
    _id: "65c5f12ab5204a81bde866b1",
    title: "Archived Test Task",
    description: "This task has been archived and is no longer active.",
    startDate: "2024-03-01",
    endDate: "2024-03-15",
    dependencies: [],
    date: "2024-02-15T00:00:00.000Z",
    priority: "low",
    stage: "completed",
    assets: [],
    team: [
      "65c202d4aa62f32ffd1303cc",
      "65c30b96e639681a13def0b5",
    ],
    isTrashed: true,
    activities: [],
    subTasks: [],
    createdAt: "2024-02-01T09:32:26.574Z",
    updatedAt: "2024-02-15T09:36:53.339Z",
    __v: 0,
  },
  {
    _id: "65c5d547660756f6fd453a7b",
    title: "Old Review Code Task",
    description: "Review for older version of the project.",
    startDate: "2024-02-01",
    endDate: "2024-02-15",
    dependencies: ["65c5f12ab5204a81bde866b1"],
    date: "2024-01-10T00:00:00.000Z",
    priority: "medium",
    stage: "completed",
    assets: [],
    team: [
      "65c317360fd860f958baa08e",
    ],
    isTrashed: true,
    activities: [],
    subTasks: [],
    createdAt: "2024-01-10T07:33:27.590Z",
    updatedAt: "2024-01-15T09:36:10.386Z",
    __v: 2,
  },
  {
    _id: "65c46026af6ec0118be9407b",
    title: "Website Review Proposal",
    description: "Review of website proposals from different teams.",
    startDate: "2024-03-20",
    endDate: "2024-04-05",
    dependencies: [],
    date: "2024-03-01T00:00:00.000Z",
    priority: "high",
    stage: "todo",
    assets: [],
    team: [
      "65c202d4aa62f32ffd1303cc",
      "65c30b96e639681a13def0b5",
      "65c317360fd860f958baa08e",
    ],
    isTrashed: true,
    activities: [],
    subTasks: [],
    createdAt: "2024-02-20T05:01:26.983Z",
    updatedAt: "2024-03-01T06:51:15.005Z",
    __v: 5,
  },
  {
    _id: "65c45fb6af6ec0118be94053",
    title: "Old Project Dashboard Setup",
    description: "Setting up dashboards for an outdated project.",
    startDate: "2024-02-20",
    endDate: "2024-03-05",
    dependencies: ["65c46026af6ec0118be9407b"],
    date: "2024-02-11T00:00:00.000Z",
    priority: "medium",
    stage: "completed",
    assets: [],
    team: [
      "65c202d4aa62f32ffd1303cc",
      "65c30b96e639681a13def0b5",
    ],
    isTrashed: true,
    activities: [],
    subTasks: [],
    createdAt: "2024-02-11T04:59:34.826Z",
    updatedAt: "2024-02-25T06:51:15.005Z",
    __v: 1,
  }
];

export const user = { //admin
  _id: "662f32ffd1303cc",
  name: "Codewave",
  title: "Administrator",
  role: "Admin",
  email: "admin@mts.com",
  isAdmin: true,
  tasks: [],
  createdAt: "2024-02-06T09:58:44.794Z",
  updatedAt: "2024-02-07T06:13:26.757Z",
  __v: 0,
  isActive: true,
};

export const activitiesData = [
  {
    _id: "0",
    type: "started",
    activity: "started this task.",
    date: new Date("2023-01-15").toISOString(),
    by: "Akwasi Asante",
  },
  {
    _id: "1",
    type: "commented",
    activity:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam.",
    date: new Date("2023-01-15").toISOString(),
    by: "Eduardo Benz",
  },
  {
    _id: "2",
    type: "assigned",
    activity: "task to Codewave Asante",
    date: new Date("2023-01-15").toISOString(),
    by: "Akwasi Asante",
  },

  {
    _id: "3",
    type: "in progress",
    activity:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum.",
    date: new Date("2024-01-15").toISOString(),
    by: "Jason Meyers",
  },
  {
    _id: "5",
    type: "bug",
    activity: "bug to Codewave Asante",
    date: new Date("2023-01-15").toISOString(),
    by: "Akwasi Asante",
  },
  {
    _id: "4",
    type: "completed",
    activity: "Codewave Asante has completed the task assigned",
    date: new Date("2023-01-15").toISOString(),
    by: "Akwasi Asante",
  },
];

export const weekData = [
  {
    day: 'Monday',
    date: '10',
    slots: [
      { isActive: true, task: { timeStart: '09:00', timeEnd: '10:30', title: 'Weekly Planning', description: 'Office' } },
      { isActive: false, task: null },
      { isActive: true, task: { timeStart: '11:00', timeEnd: '12:00', title: 'Project Discussion', description: 'Conference Room B' } },
      { isActive: false, task: null },
      { isActive: true, task: { timeStart: '14:00', timeEnd: '15:30', title: 'Client Call', description: 'Remote' } },
      { isActive: false, task: null },
    ]
  },
  {
    day: 'Tuesday',
    date: 'December 11, 2018',
    slots: [
      { isActive: true, task: { timeStart: '10:00', timeEnd: '11:30', title: 'Meeting with Lazarus Group', description: 'Marketing Meeting' } },
      { isActive: true, task: { timeStart: '12:45', timeEnd: '14:00', title: 'Lunch with Dad', description: 'City Diner' } },
      { isActive: false, task: null },
      { isActive: true, task: { timeStart: '15:00', timeEnd: '16:00', title: 'Team Update', description: 'Online via Teams' } },
    ]
  },
  {
    day: 'Wednesday',
    date: 'December 12, 2018',
    slots: [
      { isActive: true, task: { timeStart: '09:00', timeEnd: '10:00', title: 'Team Breakfast', description: 'Time Management Training' } },
      { isActive: true, task: { timeStart: '11:00', timeEnd: '12:30', title: 'New Design Ideas', description: 'Design Session' } },
      { isActive: false, task: null },
      { isActive: true, task: { timeStart: '13:30', timeEnd: '15:00', title: 'Webinar', description: 'Online Marketing Trends' } },
    ]
  },
  {
    day: 'Thursday',
    date: 'December 13, 2018',
    slots: [
      { isActive: true, task: { timeStart: '11:00', timeEnd: '12:00', title: 'Team Brainstorm', description: 'Product Ideas' } },
      { isActive: false, task: null },
      { isActive: false, task: null },
      { isActive: true, task: { timeStart: '15:00', timeEnd: '17:00', title: 'Quarterly Review', description: 'All Hands Meeting' } },
    ]
  },
  {
    day: 'Friday',
    date: 'December 14, 2018',
    slots: [
      { isActive: true, task: { timeStart: '09:00', timeEnd: '10:30', title: 'Code Review', description: 'Development Team' } },
      { isActive: true, task: { timeStart: '12:00', timeEnd: '13:00', title: 'Lunch & Learn', description: 'Learning new Technologies' } },
      { isActive: false, task: null },
      { isActive: false, task: null },
    ]
  }
];
