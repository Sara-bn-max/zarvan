import { useEffect, useState, useLayoutEffect } from "react";
import Content from "../../components/content/Content";
import { del, get, post, put } from "../../servises/axios/api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loading from "../../components/Loading/Loading";
import InputGroup from "react-bootstrap/InputGroup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "../../layout/MainLayout";
import { DatabaseCheck } from "react-bootstrap-icons";

export default function BranchInfoPage() {
  const [infos, setinfos] = useState(null);
  const [show, setShow] = useState(false);
  const [showDl, setShowDl] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [branchCode, setBranchCode] = useState("");
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

  //////GET TOKEN/////////
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
    get(`/api/AccBranches`, token)
      .then((response) => {
        setinfos(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //////DATA VIEW TO SET COLUMNS/////

  const [columnInfo, setColumnInfo] = useState([]);

  useEffect(() => {
    if (langId) {
      get(
        `api/SystemLableNameInfo/GetAllSystemLableNameInfo?tableId=63&languageId=${langId}`,
        token
      ).then((response) => setColumnInfo(response));
    }
  }, [langId]);

  let columns = [
    {
      Key: "id",
      hidden: true,
    },
    {
      customKey: "code",
      title: "کد شعبه",
    },
    {
      customKey: "bankBrancheName",
      title: "نام شعبه",
    },
    {
      customKey: "bankBrancheLname",
      title: "نام لاتین",
    },
    {
      customKey: "bankBrancheTypeName",
      title: "نوع شعبه",
    },
    {
      customKey: "active",
      title: "فعال",
    },
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
    const branchCodes = infos ? infos.map((item) => item.code) : [];
    const maxNumberCode = Math.max(...branchCodes);
    const branchCodeGenerate = Number(maxNumberCode) + 1;
    setBranchCode(branchCodeGenerate);
    setFormData({ ...formData, code: branchCodeGenerate });
    setShow(true);
  };
  const handleCodeBankgenerate = () => {
    const branchCode = infos ? infos.map((item) => item.code) : [];
    const maxNumberCode = Math.max(...branchCode);
    const branchCodeGenerate = Number(maxNumberCode) + 1;
    setBranchCode(branchCodeGenerate);
    setFormData({ ...formData, code: branchCodeGenerate });
  };
  const [notEditedCode, setNotEditedCode] = useState(null);

  const handleAcceptAdd = () => {
    post(`/api/AccBranches`, addDataObject, token)
      .then((response) => {
        setAddedData(response.id);
        toast.success("شعبه مورد نظر به سیستم اضافه شد", {
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
        toast.error("امکان اضافه کردن این شعبه فعلا وجود ندارد", {
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
    const branchName = infos.map((item) => item.branchName);
    const newBranchName = formData.get("branchName");
    if (branchName.includes(newBranchName)) {
      setShowErrorBankName(true);
      setIsSubmitting(false);
      return;
    } else {
      setShowErrorBankName(false);
      const data = Object.fromEntries(formData.entries());
      setFormData({ ...data, code: branchCode });
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
      setNotEditedCode(data.code);
      setShowEdit(true);
    }
  };

  function handleAcceptEdit(e) {
    e.preventDefault();
    const editData = {
      code: preEditData.code,
      bankBrancheName: `${preEditData.bankBrancheName}`,
      bankBrancheType: preEditData.bankBrancheType,
      active: preEditData.true,
      bankBrancheLname: `${preEditData.bankBrancheLname}`,
    };
    const id = preEditData.id;
    put(`/api/AccBranches/${id}`, editData, token)
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
        toast.error("امکان ویرایش این شعبه وجود ندارد !", {
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
    del(`/api/AccBranches/${deleteId}`, token)
      .then((response) => {
        setDeleteResponse(deleteId);
        toast.success("شعبه مورد نظر حذف شد", {
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
        toast.error("امکان حذف این شعبه وجود ندارد", {
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
            <Form.Label>کد شعبه:</Form.Label>
            <InputGroup className="mb-3 custom-rtl-btns">
              <Button
                variant="outline-secondary"
                onClick={handleCodeBankgenerate}
              >
                <DatabaseCheck />
              </Button>
              <Form.Control
                value={branchCode}
                placeholder="کد شعبه"
                name="bankCode"
                type="text"
                onChange={(e) => setBranchCode(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>نام شعبه:</Form.Label>
            <Form.Control
              name="bankName"
              required
              placeholder="نام شعبه"
              type="text"
              className="outline-danger"
            />
            {showErrorBankName && (
              <Form.Text className="text-danger">
                نام شعبه تکراری وارد شده
              </Form.Text>
            )}
          </Form.Group>
        </div>
        <div className="col-12 col-md-6">
          <Form.Group className="mb-3">
            <Form.Label>نوع شعبه</Form.Label>
            <Form.Control
              name="bankWebSite"
              placeholder="نوع شعبه"
              type="text"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>فعال:</Form.Label>
            <Form.Control name="bankDesc" placeholder="فعال" type="text" />
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
            <Form.Label>کد شعبه:</Form.Label>
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
                placeholder="کد شعبه"
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
            <Form.Label>نام شعبه:</Form.Label>
            <Form.Control
              name="bankName"
              required
              placeholder="نام شعبه"
              type="text"
              className="outline-danger"
              value={preEditData ? preEditData.bankName : ""}
              onChange={(e) =>
                setPreEditData({ ...preEditData, bankName: e.target.value })
              }
            />
            {showErrorBankName && (
              <Form.Text className="text-danger">
                نام شعبه تکراری وارد شده
              </Form.Text>
            )}
          </Form.Group>
        </div>
        <div className="col-12 col-md-6">
          <Form.Group className="mb-3">
            <Form.Label>نوع شعبه:</Form.Label>
            <Form.Control
              name="bankWebSite"
              placeholder="نوع شعبه"
              type="text"
              value={preEditData ? preEditData.bankWebSite : ""}
              onChange={(e) =>
                setPreEditData({ ...preEditData, bankWebSite: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>فعال:</Form.Label>
            <Form.Control
              name="bankDesc"
              placeholder="فعال"
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
            modalTitle="اطلاعات شعبه"
            modalBodyDl={`آیا از حذف این شعبه اطمینان دارید`}
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
            modalTitleEdit={"ویرایش اطلاعات شعبه"}
            selected={selected}
            idName="id"
          />
          <ToastContainer />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
