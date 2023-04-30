import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import "./menuStyle.css";
import { get } from "../../servises/axios/api";
import Loading from "../Loading/Loading";
import ListGroup from "react-bootstrap/ListGroup";
import { X } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

export default function Menu({ indexOfMenu, openMenu, setOpenMenu }) {
  const [menuData, setMenuData] = useState(null);
  const [submenuUrls, setSubmenuUrls] = useState([]);

  // const [closeMenu, setCloseMenu] = useState()

  const handleCloseBtn = () => {
    setOpenMenu(false);
  };
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
      <>
        <div className="responsive-x">
          <Button
            type="button"
            variant="outline-danger"
            onClick={handleCloseBtn}
          >
            <X />
          </Button>
        </div>
        <Accordion>
          {menuData ? (
            menuData.map((item, index) => (
              <MenuItem key={item.title} item={item} eventKey={index} />
            ))
          ) : (
            <Loading />
          )}
        </Accordion>
      </>
    );
  };

  const MenuItem = ({ item, eventKey }) => {
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
                <ListGroup.Item key={subItem.title}>
                  <a href={subItem.url}>{subItem.title}</a>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Accordion.Body>
        )}
      </Accordion.Item>
    );
  };
console.log(submenuUrls)
  useEffect(() => {
    if (menuData) {
      const urls = extractSubmenuUrls(menuData);
      setSubmenuUrls(urls);
    }
  }, [menuData]);
  const extractSubmenuUrls = (menuData) => {
    let urls = [];
    menuData.forEach((item) => {
      if (item.childrens) {
        item.childrens.forEach((subItem) => {
          urls.push(subItem.url);
        });
      }
    });
    return [...new Set(urls)]; // convert to Set and back to array to remove duplicates
  };
  return (
    <div
      className={`${
        openMenu
          ? "customMenu responsive-menu"
          : "customMenu responsive-menu closed"
      }`}
    >
      <Menu />
    </div>
  );
}
