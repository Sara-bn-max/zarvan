
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

export default function CustomToolTip({toottipBtnText,popoverBody,popoverHeader,popoverId}) {
  const popover = (
    <Popover id={`${popoverId}`}>
      <Popover.Header as="h3">{popoverHeader}</Popover.Header>
      <Popover.Body>
        {popoverBody}
      </Popover.Body>
    </Popover>
  );
  return (
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
      <Button variant="success">{toottipBtnText}</Button>
    </OverlayTrigger>
  );
}
