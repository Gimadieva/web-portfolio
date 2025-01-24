import React from "react";
import "./timeline.css";

export type TimeLineItem = {
  startYear: string;
  endYear?: string;
  title: string;
  description: string;
};

export type TimeLineProps = {
  items?: TimeLineItem[];
};

const TimeLine = ({ items }: TimeLineProps) => {

  // Сортировка по возрастанию по значениям startYear и endYear
  const sortedItems = items && [...items].sort((a, b) => {
    const startYearA = parseInt(a.startYear);
    const startYearB = parseInt(b.startYear);
    const endYearA = a.endYear ? parseInt(a.endYear) : Infinity; 
    const endYearB = b.endYear ? parseInt(b.endYear) : Infinity;

    if (startYearA === startYearB) {
      return endYearA - endYearB;
    }
    return startYearA - startYearB;
  });

  return (
    <div className="timeline">
      {sortedItems?.map((item, index) => (
        <div key={index} className="timeline-item">
          <div className="timeline-marker" />
          <div className="timeline-content">
            <div className="timeline-date opacity-40">
              {item?.endYear
                ? `${item.startYear} - ${item.endYear}`
                : `${item.startYear}`}
            </div>
            <h3 className="timeline-title">{item.title}</h3>
            <p className="timeline-description opacity-40">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimeLine;
