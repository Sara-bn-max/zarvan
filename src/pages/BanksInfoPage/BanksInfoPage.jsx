import { useEffect, useState } from "react";
import Content from "../../components/content/Content";
import { get } from "../../servises/axios/api";

export default function BanksInfoPage() {
  const [infos, setinfos] = useState(null);
  useEffect(() => {
    get(`/ACCBank/GetAllBanks`)
      .then((response) => {
        setinfos(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  return (
    <div>
      {infos ? <Content data={infos} columns={columns} /> : <p>Loading...</p>}
    </div>
  );
}
