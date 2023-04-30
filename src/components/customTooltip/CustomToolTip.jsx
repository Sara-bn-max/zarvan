import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function CustomToolTip({children,tooltipBody}) {
  

const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    {tooltipBody}
  </Tooltip>
);
  return (
    <OverlayTrigger
    placement="left"
    delay={{ show: 200, hide: 1000 }}
    overlay={renderTooltip}
  >
      {children}
    </OverlayTrigger>
  )
}
