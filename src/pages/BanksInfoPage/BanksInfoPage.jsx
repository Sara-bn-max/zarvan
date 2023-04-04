import { useEffect, useState } from "react";
import Content from "../../components/content/Content";
import { get } from "../../servises/axios/api";
import Form from "react-bootstrap/Form";
import Loading from "../../components/Loading/Loading";

export default function BanksInfoPage() {
  const [infos, setinfos] = useState(null);
  const [show, setShow] = useState(false);

  //////GET ALL DATA OF THE BANKS/////
  useEffect(() => {
    get(`/ACCBank/GetAllBanks`)
      .then((response) => {
        setinfos(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //////DATA VIEW TO SET COLUMNS/////
  const columns = [
    {
      customKey: "bankCode",
      title: "کد بانک",
    },
    {
      customKey: "bankName",
      title: "نام بانک",
    },
  ];

  ////// CUSTOM ADD MODAL BODY/////
  const modalbody = (
    <div className="w-100">
      <Form.Group className="mb-3">
        <Form.Label>کد بانک:</Form.Label>
        <Form.Control placeholder="کد بانک" disabled />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>نام بانک:</Form.Label>
        <Form.Control placeholder="نام بانک" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>آدرس وبسایت:</Form.Label>
        <Form.Control placeholder="آدرس وبسایت" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>توضیحات:</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="توضیحات" />
      </Form.Group>
    </div>
  );
  return (
    <div>
      {infos ? (
        <Content
          data={infos}
          columns={columns}
          modalbody={modalbody}
          show={show}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
}
