import React from "react";
import axios from "axios";

function App() {
  const [_page, setPage] = React.useState(1);
  const [_data, _setData] = React.useState([]);
  const [_loading, _setLoading] = React.useState(false);
  const [_more, _setMore] = React.useState(true);

  // const loader = React.useRef(load);
  // const { data, loading, more, load } = React.useContext(MyContext);
  const getUsers = async p => {
    console.log("getUsers", p);
    let res = await axios.get(
      `https://reqres.in/api/users?page=${p}&per_page=5`
    );
    let { data, page, total_pages } = res.data;
    console.log("USER", page !== total_pages);
    _setData(data);
    _setLoading(false);
    _setMore(page !== total_pages);
  };
  const getMore = React.useRef(getUsers);
  const parentDiv = React.useRef();
  const observer = React.useRef(
    new IntersectionObserver(
      entries => {
        const first = entries[0];
        if (first.isIntersecting) {
          getMore.current(_page);
        }
      },
      { threshold: 1, root: parentDiv.current }
    )
  );
  const [element, setElement] = React.useState(null);

  // React.useEffect(() => {
  //   loader.current = load;
  // }, []);

  React.useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        height: "100%",
        backgroundColor: "yellow",
        overflow: "auto"
      }}
    >
      <div
        style={{
          height: "400px",
          width: "100%",
          justifyContent: "center",
          alignItems: "center"
        }}
        ref={parentDiv}
      >
        <ul>
          {_data.map(row => (
            <li
              key={row}
              style={{
                background: "orange",
                height: "100px",
                margin: "10px",
                width: "50%"
              }}
            >
              <div>ID: {row.id}</div>
              <div>
                Name: {row.first_name} {row.last_name}
              </div>
            </li>
          ))}
          {_loading && <li>Loading...</li>}
          {!_loading && _more && (
            <li ref={setElement} style={{ background: "transparent" }}></li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default () => {
  return <App />;
};
