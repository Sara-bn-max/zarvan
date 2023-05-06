import { useEffect, useState, useLayoutEffect } from "react";
import Content from "../../components/content/Content";
import { del, get, post, put } from "../../servises/axios/api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loading from "../../components/Loading/Loading";
import InputGroup from "react-bootstrap/InputGroup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DatabaseCheck } from "react-bootstrap-icons";

export default function BanksInfoPage() {
  const [infos, setinfos] = useState(null);
  const [show, setShow] = useState(false);
  const [showDl, setShowDl] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [bankCodeValue, setBankCodeValue] = useState("");
  const [formData, setFormData] = useState({});
  const [showErrorBankName, setShowErrorBankName] = useState(false);
  const [addDataObject, setAddDataObject] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addedData, setAddedData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [preEditData, setPreEditData] = useState(null);
  const [deleteResponse, setDeleteResponse] = useState(null);
  const [selected, setSelected] = useState(null);
  const [token, setToken] = useState(null);
  const [langId, setLangId] = useState(null);
  const [centerId, setCenterId] = useState(null);

  //////GET DATA OF USER AND TOKEN/////////
  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    const configs = JSON.parse(localStorage.getItem("configs"));

    const lang = configs.systemLanguageId;
    const center = configs.systemLanguageId;
    if (token) {
      setToken(token);
    }
    if (configs) {
      setLangId(lang);
      setCenterId(center);
    }
  }, [token]);
  //////GET ALL DATA OF THE BANKS/////
  useEffect(() => {
    if (token) {
      get(`/api/ACCBank/GetAllBanks`, token)
        .then((response) => {
          setinfos(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  //////DATA VIEW TO SET COLUMNS/////
  const [columnInfo, setColumnInfo] = useState([]);

  useEffect(() => {
    if (langId) {
      get(
        `api/SystemLableNameInfo/GetAllSystemLableNameInfo?tableId=58&languageId=${langId}`,
        token
      ).then((response) => setColumnInfo(response));
    }
  }, [langId]);

  let columns = [
    { customKey: "bankCode", title: "کد بانک" },
    { customKey: "bankName", title: "نام بانک" },
    { customKey: "bankLname", title: "نام لاتین" },
    { customKey: "bankWebSite", title: "وبسایت" },
    { customKey: "bankDesc", title: "توضیحات" },
  ];

  if (columnInfo && columnInfo.length > 0) {
    columns = columnInfo.map((column) => ({
      customKey: column.lableName,
      title: column.lableValue,
    }));
  }


  /////HANDLE OPEN ADD MODAL /////
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

  /////// handle edit
  const handleModalCloseEdit = () => {
    setShowEdit(false);
    setSelected(false);
  };
  const handleEdit = (data) => {
    if (data) {
      setPreEditData(data);
      setNotEditedCode(data.bankCode);
      setShowEdit(true);
    }
  };

  function handleAcceptEdit(e) {
    e.preventDefault();
    const editData = {
      bankCode: preEditData.bankCode,
      bankName: `${preEditData.bankName}`,
      bankWebSite: `${preEditData.bankWebSite}`,
      bankDesc: `${preEditData.bankDesc}`,
    };
    const id = preEditData.bankId;
    put(`/api/ACCBank/${id}`, editData, token)
      .then((response) => {
        console.log(response.body);
        toast.success("ویرایش با موفقیت انجام شد", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.log(error);
        setSelected(false);
        toast.error("امکان ویرایش این بانک وجود ندارد !", {
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
    setShowEdit(false);
  }

  //////////HANDLE DELETE////
  const handleModalCloseDl = () => {
    setShowDl(false);
    setSelected(false);
  };
  const handleDelete = (id) => {
    if (id) {
      setDeleteId(id);
      setShowDl(true);
    }
  };
  const handleAcceptDl = (e) => {
    e.preventDefault();
    del(`/api/ACCBank/${deleteId}`, token)
      .then((response) => {
        setDeleteResponse(deleteId);
        toast.success("بانک مورد نظر حذف شد", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.log(error);
        setSelected(false);
        toast.error("امکان حذف این بانک وجود ندارد", {
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
    setShowDl(false);
  };

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

  const modalBodyEdit = (
    <div className="w-100">
      <div className="row">
        <div className="col-12 col-md-6">
          <Form.Group className="mb-3">
            <Form.Label>کد بانک:</Form.Label>
            <InputGroup className="mb-3 custom-rtl-btns">
              <Button
                variant="outline-secondary"
                onClick={() =>
                  setPreEditData({ ...preEditData, bankCode: notEditedCode })
                }
              >
                <DatabaseCheck />
              </Button>
              <Form.Control
                placeholder="کد بانک"
                name="bankCode"
                type="text"
                value={preEditData ? preEditData.bankCode : ""}
                onChange={(e) =>
                  setPreEditData({ ...preEditData, bankCode: e.target.value })
                }
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
              value={preEditData ? preEditData.bankName : ""}
              onChange={(e) =>
                setPreEditData({ ...preEditData, bankName: e.target.value })
              }
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
              value={preEditData ? preEditData.bankWebSite : ""}
              onChange={(e) =>
                setPreEditData({ ...preEditData, bankWebSite: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>توضیحات:</Form.Label>
            <Form.Control
              name="bankDesc"
              placeholder="توضیحات"
              type="text"
              value={preEditData ? preEditData.bankDesc : ""}
              onChange={(e) =>
                setPreEditData({ ...preEditData, bankDesc: e.target.value })
              }
            />
          </Form.Group>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      {infos ? (
        <>
          <Content
            handleSubmitAdd={handleAcceptModalAdd}
            handleSubmitDl={handleAcceptDl}
            handleSubmitEdit={handleAcceptEdit}
            data={infos}
            columns={columns}
            modalBodyAdd={modalbodyAdd}
            show={show}
            handleAdd={handleAdd}
            handleAcceptAdd={handleAcceptAdd}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleModalCloseAdd={handleModalCloseAdd}
            addFormData={addDataObject}
            addedData={addedData}
            modalAcceptText="تایید"
            modalCloseText="انصراف"
            modalTitle="اطلاعات بانک"
            modalBodyDl={`آیا از حذف این بانک اطمینان دارید`}
            showDl={showDl}
            handleModalCloseDl={handleModalCloseDl}
            modalAcceptTextDl="حذف"
            modalCloseTextDl="انصراف"
            modalTitleDl="حذف"
            deleteResponse={deleteResponse}
            modalBodyEdit={modalBodyEdit}
            showEdit={showEdit}
            handleModalCloseEdit={handleModalCloseEdit}
            modalAcceptTextEdit={"ویرایش"}
            modalCloseTextEdit={"انصراف"}
            modalTitleEdit={"ویرایش اطلاعات بانک"}
            selected={selected}
            idName="bankId"
          />
          <ToastContainer />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
