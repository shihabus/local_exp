import React, { useEffect, useRef } from "react";
import axios from "axios";

export default function IO() {
  const [loading, setLoading] = React.useState(false);
  const [dataState, setData] = React.useState([]);
  const [pageState, setPage] = React.useState(0);
  const [isMoreState, setIsMore] = React.useState(true);
  const parentDiv = useRef(null);
  const EOL = useRef(null);

  const getUsers = (p = 0) => {
    setLoading(true);
    axios
      .get(`https://reqres.in/api/users?page=${p + 1}&per_page=5`)
      .then(res => {
        const {
          data: { page, total_pages, data }
        } = res;
        dataState.push(...data);
        setData(dataState);
        setPage(page);
        setIsMore(pageState + 1 !== total_pages);
        setLoading(false);
      });
  };

  const Observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        getUsers(pageState);
      }
    },
    {
      root: parentDiv.current
    }
  );
  useEffect(() => {
    if (EOL.current) {
      Observer.observe(EOL.current);
    }
  }, [EOL, Observer]);

  return (
    <div>
      <ul
        style={{ backgroundColor: "yellow", height: "200px", overflow: "auto" }}
        ref={parentDiv}
      >
        {dataState.map(x => (
          <li
            style={{
              width: "100px",
              height: "50px",
              backgroundColor: "#e1e1e1",
              borderRadius: "4px",
              listStyle: "none",
              margin: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {x.first_name}
          </li>
        ))}
        {loading && <div>Loading...</div>}
        {!loading && isMoreState && <div ref={EOL}>More</div>}
      </ul>
    </div>
  );
}
