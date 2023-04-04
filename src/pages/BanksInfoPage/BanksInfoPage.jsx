import { useEffect, useState } from "react";
import Content from "../../components/content/Content";
import { get } from "../../servises/axios/api";
import Form from "react-bootstrap/Form";
import Loading from "../../components/Loading/Loading";

export default function BanksInfoPage() {
  const [infos, setinfos] = useState(null);
  const [show, setShow] = useState(false);
  const [bankCodes, setBankCodeArray] = useState([]);

  //////GET ALL DATA OF THE BANKS/////
  useEffect(() => {
    get(`/ACCBank/GetAllBanks`)
      .then((response) => {
        setinfos(response);
        setBankCodeArray(response.bankCode)
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
//   if (infos) {
//   const newBankCodeArray = infos.map((info) => {
//     if (Array.isArray(info.bankCode)) {
//       const newBankCode = [...info.bankCode, ...bankCodes];
//       return newBankCode;
//     } else {
//       // handle the case where info.bankCode is not an array
//     }
//   });
//   setBankCodeArray(newBankCodeArray);
// }
console.log(bankCodes);

  
  /////HANDLE OPEN ADD MODAL /////
  const handleAdd = () => {
    // const newankCode = infos.ba;
    // const newwcode = newankCode++;
    // console.log(newwcode);
    setShow(true);
  };
  return (
    <div>
      {infos ? (
        <Content
          data={infos}
          columns={columns}
          modalBody={modalbody}
          show={show}
          handleAdd={handleAdd}
          handleModalClose={() => setShow(false)}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
}
