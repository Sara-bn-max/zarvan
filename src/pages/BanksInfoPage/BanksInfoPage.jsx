import { useEffect, useState } from "react";
import Content from "../../components/content/Content";
import { get } from "../../servises/axios/api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loading from "../../components/Loading/Loading";
import InputGroup from "react-bootstrap/InputGroup";
import { QuestionDiamond } from "react-bootstrap-icons";

export default function BanksInfoPage() {
  const [infos, setinfos] = useState(null);
  const [show, setShow] = useState(false);
  const [bankCodeValue, setBankCodeValue] = useState("");
  const [formData, setFormData] = useState({});
  const [showErrorBankName, setShowErrorBankName] = useState(false);
  const [customBankcode, setCustomBankcode] = useState('')

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

  /////HANDLE OPEN ADD MODAL /////
  const handleAdd = () => {
    const bankCodes = infos.map((item) => item.bankCode);
    const maxNumberCode = Math.max(...bankCodes);
    const bankCodeGenerate = Number(maxNumberCode) + 1;
    setBankCodeValue(bankCodeGenerate);
    setFormData({ ...formData, bankCode: bankCodeGenerate }); // <-- replace code with bankCodeValue
    setShow(true);
  };

  //  const handleCodeBankChange = (e) => {
  //   const value = e.target.value;
  //   setCustomBankcode(value)
  // };

  const handleSubmit = (e) => {
    const formData = new FormData(e.target); // <-- add this line
    e.preventDefault();
    const bankNames = infos.map((item) => item.bankName);
    const newBankName = formData.get("bankName");
    if (bankNames.includes(newBankName)) {
      setShowErrorBankName(true);
      return;
    } else {
      setShowErrorBankName(false);
      const data = Object.fromEntries(formData.entries());
      setFormData({ ...data, bankCode: bankCodeValue });
      setShow(false); // <-- fix this line
    }
  };

  ///////HANDLE CHANGE INPUTS OF ADD MODAL////
  ////// CUSTOM ADD MODAL BODY/////
  const modalbody = (
    <Form onSubmit={handleSubmit}>
      <div className="w-100">
        <div className="row">
          <div className="col-12 col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>کد بانک:</Form.Label>
              <InputGroup className="mb-3 custom-rtl-btns">
                <Button variant="outline-secondary">
                  کد تصادفی
                </Button>
                <Form.Control
                  value={bankCodeValue}
                  placeholder="کد بانک"
                  name="bankCode"
                  type="text"
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>نام بانک:</Form.Label>
              <Form.Control
                name="bankName"
                required
                placeholder="نام بانک"
                type="text"
                className="outline-danger"
              />
              {showErrorBankName && (
                <Form.Text className="text-danger">
                  نام بانک تکراری وارد شده
                </Form.Text>
              )}
            </Form.Group>
          </div>
          <div className="col-12 col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>آدرس وبسایت:</Form.Label>
              <Form.Control
                name="bankWebSite"
                required
                placeholder="آدرس وبسایت"
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>توضیحات:</Form.Label>
              <Form.Control
                name="bankDesc"
                required
                placeholder="توضیحات"
                type="text"
              />
            </Form.Group>
          </div>
          <div className="col-12 text-left">
            <Button className="bg-primary" type="submit">
              ثبت اطلاعات
            </Button>
            {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
          </div>
        </div>
      </div>
    </Form>
  );
  const objectFormdata = JSON.stringify(formData, null);
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
          addFormData={objectFormdata}
          modalAcceptText="انصراف"
          modalCloseText="تایید"
          modalTitle="اطلاعات بانک"
          toottipBtnText={<QuestionDiamond />}
          popoverBody='لطفا اطلاعات مربوط به بانکی که مد نظر دارید در فرم وارد کنید'
          popoverHeader='اطلاغات بانک'
          popoverId='popoverId'
        />
      ) : (
        <Loading />
      )}
    </div>
  );
}
