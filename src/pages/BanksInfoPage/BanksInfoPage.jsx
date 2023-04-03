import { useEffect,useState } from "react";
import Content from "../../components/content/Content";
import { get } from "../../servises/axios/api";

export default function BanksInfoPage() {
  const [data, setData] = useState(null);
  useEffect(() => {
    get(`/ACCBank/GetAllBanks/`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  const columns = [
    {
      key: "bankCode",
      title: "کد بانک",
    },
    {
      key: "bankName",
      title: "نام بانک",
    },
  ];
  
  console.log(data);
  console.log(columns);
  return (
    <Content data={data} columns={columns}/>
  )
}

