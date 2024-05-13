import React, { useEffect, useRef } from 'react';
import { Timeline } from 'vis-timeline';
import {DataSet} from "vis-data";
import 'vis-timeline/styles/vis-timeline-graph2d.min.css';

const Gantt = ({ tasks, users }) => {
  const timelineRef = useRef(null);

  useEffect(() => {
    if (timelineRef.current) {
      const container = timelineRef.current;

      const items = new DataSet(
        tasks.map(task => ({
          id: task._id,
          content: task.title,
          start: new Date(task.startDate),
          end: new Date(task.endDate),
          type: 'range',
          className: `bg-${task.priority === "high" ? "red" : task.priority === "medium" ? "yellow" : task.priority === "normal" ? "blue" : "green"}-100 text-black`
        }))
      );

      const options = {
        height: '500px',
        stack: true,
        horizontalScroll: true,
        verticalScroll: true,
        zoomKey: 'ctrlKey',
        orientation: 'bottom',
        showCurrentTime: true,
        showMajorLabels: true,
        showMinorLabels: true,
        selectable: true,
        editable: {
          updateTime: true, // Allows moving items
          updateGroup: false, // Does not allow changing of groups
          add: false, // Does not allow adding new items
          remove: false // Does not allow deleting items
        },
        zoomable: true,
        moveable: true
      };

      const timeline = new Timeline(container, items, options);

      // Cleanup function to destroy the timeline when the component unmounts
      return () => {
        timeline.destroy();
      };
    }
  }, [tasks]); // Re-run the effect if tasks change

  return (
    <div ref={timelineRef} className="vis-timeline bg-white" />
  );
};

export default Gantt;
