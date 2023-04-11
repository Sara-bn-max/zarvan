import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import "./menuStyle.css";
import { get } from "../../servises/axios/api";
import Loading from "../Loading/Loading";
import ListGroup from "react-bootstrap/ListGroup";
import AccordionBody from "react-bootstrap/esm/AccordionBody";

export default function Menu({ indexOfMenu }) {
  const [menuData, setMenuData] = useState(null);

  useEffect(() => {
    if (indexOfMenu == null) {
      get(`/api/Form/MENU?id=0`)
        .then((response) => {
          setMenuData(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (indexOfMenu != null) {
      get(`/api/Form/MENU?id=${indexOfMenu}`)
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
            <MenuItem
              key={item.title}
              item={item}
              eventKey={index}
            />
          ))
        ) : (
          <Loading />
        )}
      </Accordion>
    );
  };

  const MenuItem = ({ item, eventKey }) => {
    console.log(eventKey)
    return (
      <Accordion.Item eventKey={eventKey}>
        <Accordion.Header href={item.url}>
          <i></i>
          <span>{item.title}</span>
        </Accordion.Header>
        {item.childrens && (
          <Accordion.Body>
            <ListGroup>
              {item.childrens.map((subItem, index) => (
                <ListGroup.Item
                  key={subItem.title}
                >
                  <a href={subItem.url}>{subItem.title}</a>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Accordion.Body>
        )}
      </Accordion.Item>
    );
  };

  return (
    <div className="customMenu">
      <Menu />
    </div>
  );
}
