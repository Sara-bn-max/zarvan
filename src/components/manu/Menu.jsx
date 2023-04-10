import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import "./menuStyle.css";
import { get } from "../../servises/axios/api";
import Loading from "../Loading/Loading";
import ListGroup from "react-bootstrap/ListGroup";

export default function Menu({ indexOfMenu }) {
  const [menuData, setMenuData] = useState(null);

  useEffect(() => {
    if (indexOfMenu == null) {
      get(`/Form/MENU?id=1`)
        .then((response) => {
          setMenuData(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (indexOfMenu != null) {
      get(`/Form/MENU?id=${indexOfMenu}`)
        .then((response) => {
          setMenuData(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [indexOfMenu]);

  const Menu = () => {
    return (
      <Accordion>
        {menuData ? (
          menuData.map((item, index) => (
            <MenuItem key={item.title} item={item} eventKey={`${indexOfMenu}`} />
          ))
        ) : (
          <Loading />
        )}
      </Accordion>
    );
  };

  const MenuItem = ({ item, eventKey }) => {
    return (
      <Accordion.Item eventKey={indexOfMenu}>
        <Accordion.Header href={item.url}>
          <i></i>
          <span>{item.title}</span>
        </Accordion.Header>
        {item.childrens && (
          <ListGroup>
            {item.childrens.map((subItem, index) => (
              <ListGroup.Item
                key={subItem.title}
                eventKey={`${eventKey}-${index}`}
              >
                <a href={subItem.url}>{subItem.title}</a>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Accordion.Item>
    );
  };

  return (
    <div className="customMenu">
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Accordion Item #1</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
      <Menu />
    </div>
  );
}
