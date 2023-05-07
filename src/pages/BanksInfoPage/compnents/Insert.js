import React from 'react'
export function insert(){
    
}
export default function Insert() {
   ////// CUSTOM ADD MODAL BODY/////
   const modalbodyAdd = (
    <div className="w-100">
      <div className="row">
        <div className="col-12 col-md-6">
          <Form.Group className="mb-3">
            <Form.Label>کد بانک:</Form.Label>
            <InputGroup className="mb-3 custom-rtl-btns">
              <Button
                variant="outline-secondary"
                onClick={handleCodeBankgenerate}
              >
                <DatabaseCheck />
              </Button>
              <Form.Control
                value={bankCodeValue}
                placeholder="کد بانک"
                name="bankCode"
                type="text"
                onChange={(e) => setBankCodeValue(e.target.value)}
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
              placeholder="آدرس وبسایت"
              type="text"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>توضیحات:</Form.Label>
            <Form.Control name="bankDesc" placeholder="توضیحات" type="text" />
          </Form.Group>
        </div>
      </div>
    </div>
  );

  const handleModalCloseAdd = () => {
    setShow(false);
    setSelected(false);
  };
  const handleAdd = () => {
    const bankCodes = infos ? infos.map((item) => item.bankCode) : [];
    const maxNumberCode = Math.max(...bankCodes);
    const bankCodeGenerate = Number(maxNumberCode) + 1;
    setBankCodeValue(bankCodeGenerate);
    setFormData({ ...formData, bankCode: bankCodeGenerate });
    setShow(true);
  };
  const handleCodeBankgenerate = () => {
    const bankCodes = infos ? infos.map((item) => item.bankCode) : [];
    const maxNumberCode = Math.max(...bankCodes);
    const bankCodeGenerate = Number(maxNumberCode) + 1;
    setBankCodeValue(bankCodeGenerate);
    setFormData({ ...formData, bankCode: bankCodeGenerate });
  };
  const [notEditedCode, setNotEditedCode] = useState(null);

  const handleAcceptAdd = () => {
    post(`/api/ACCBank/Create`, addDataObject, token)
      .then((response) => {
        setAddedData(response.bankId);
        toast.success("بانک مورد نظر به سیستم اضافه شد", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.log(error);
        setSelected(false);
        toast.error("امکان اضافه کردن این بانک فعلا وجود ندارد", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      });
  };
  const handleAcceptModalAdd = (e) => {
    const formData = new FormData(e.target);
    e.preventDefault();
    const bankNames = infos.map((item) => item.bankName);
    const newBankName = formData.get("bankName");
    if (bankNames.includes(newBankName)) {
      setShowErrorBankName(true);
      setIsSubmitting(false);
      return;
    } else {
      setShowErrorBankName(false);
      const data = Object.fromEntries(formData.entries());
      setFormData({ ...data, bankCode: bankCodeValue });
      setAddDataObject(data);
      setIsSubmitting(true);
      setShow(false);
    }
  };
  return (
    <div>Insert</div>
  )
}


